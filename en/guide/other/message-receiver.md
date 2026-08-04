# API Settings

## Overview

Settings for enabling API operations from external sources. When this feature is enabled, you can run speech, chat input, stop commands, and related actions through the API.

Purpose-specific endpoints are provided under `/api/v1`. The existing `/api/messages` endpoint remains available for backward compatibility.

**Environment Variables**:

```bash
# Enable API operations from external sources (true/false)
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=false

# Client ID
NEXT_PUBLIC_CLIENT_ID=""

# API key for /api/v1 Bearer authentication
AITUBERKIT_API_KEY=""

# API key used by the browser-side MessageReceiver when calling /api/v1
NEXT_PUBLIC_AITUBERKIT_API_KEY=""
```

`NEXT_PUBLIC_AITUBERKIT_API_KEY` is exposed to the browser. Use it only when the MessageReceiver needs to call authenticated `/api/v1` endpoints in a trusted private or local environment. Do not treat it as a secret on public sites.

## v1 API

APIs under `/api/v1` are authenticated with the `Authorization: Bearer YOUR_API_KEY` header. Set the API key in `AITUBERKIT_API_KEY` in `.env.local`.

### Common Rules

Legend: `●` Required, `△` Conditional, `-` Optional

| Item | Where to specify | Req. | Description |
| --- | --- | --- | --- |
| `Authorization` | HTTP header | `●` | Specify it in the `Bearer YOUR_API_KEY` format. |

`receiverId` is a routing ID that identifies a specific AITuberKit screen, such as a browser tab or OBS Browser Source. Either `receiverId` or the legacy `clientId` is required for `speak`, `chat`, `stop`, and `status`, and optional for `events` where it filters the event stream. For POST APIs, specify it in the query string or JSON body. For GET APIs, specify it in the query string.

If both are specified, they take precedence in the following order: `receiverId` in the JSON body, `clientId` in the JSON body, `receiverId` in the query string, and `clientId` in the query string. `receiverId` is recommended for new integrations. `clientId` remains available for compatibility with existing integrations.

Send POST request bodies as JSON. To send an image, specify a Base64 data URI such as `data:image/png;base64,...` in `image`. Image strings up to about 10 million characters are accepted.

### Get Connected Receivers (GET /api/v1/receivers)

Returns a list of AITuberKit screens connected to the same server. Use this endpoint to select a target from multiple browser tabs or OBS Browser Sources.

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/receivers/'
```

```json
{
  "ok": true,
  "receivers": [
    {
      "receiverId": "aituber-receiver-7be9e2c4-57de-4ddb-a808-e85da6fb2387",
      "configuredClientId": "main-stage",
      "displayName": "Chrome a6fb2387",
      "kind": "browser",
      "capabilities": ["presentation", "chat", "speech"],
      "connected": true,
      "isSpeaking": false,
      "lastSeenAt": "2026-08-04T10:00:00.000Z"
    }
  ]
}
```

| Field | Description |
| --- | --- |
| `receiverId` | A temporary ID used as the destination for speech, chat, stop, and presentation operations. |
| `configuredClientId` | The legacy logical client ID saved in the settings screen. It may be shared by multiple Receivers. |
| `displayName` | A supplementary display name for selection UIs. Do not use it as a persistent identifier. |
| `kind` | One of `browser`, `obs`, or `legacy` for compatibility routes. |
| `capabilities` | A list of supported capabilities: `presentation`, `chat`, and `speech`. |
| `isSpeaking` | Indicates whether the Receiver was speaking when the list was retrieved. |
| `lastSeenAt` | The time when the Receiver last reported its state. |

`receiverId` persists when the same tab is reloaded, but it is a temporary ID that changes when the tab or OBS instance is recreated. Receivers whose latest state report is more than 10 seconds old are removed from the list. If a saved ID is not found, retrieve the list again.

The Receiver Registry is managed within a single Node.js process running AITuberKit. Receiver lists are not shared across multiple processes or serverless instances. Also, `receiverId` is not a credential. An API key is required for every `/api/v1` operation.

### 1. Speak Directly (POST /api/v1/speak)

Makes the character speak the provided text as is.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | The Receiver ID of the AITuberKit screen that receives the message, or a client ID for compatibility. Specify it in the query string or JSON body. |
| `text` | `string` | `△` | Text to speak. Required when `messages` is not specified. |
| `messages` | `string[]` | `△` | Multiple text messages to enqueue together. Required when `text` is not specified. |
| `emotion` | `string` | `-` | Expression or emotion used while speaking. If omitted, the normal state is used. |
| `priority` | `"normal"` / `"high"` | `-` | When set to `high`, the message is inserted before normal queued messages. Defaults to `normal`. |
| `interrupt` | `boolean` | `-` | When `true`, the current speech and waiting queue are stopped before this message is queued. |
| `speechSessionId` | `string` | `-` | ID that groups split requests for the same response into one speech session. It must be 1 to 200 characters after trimming whitespace. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Hello. This is a speech test through the API.", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

When sending a streaming response in sentence-sized or similar chunks, use the same `speechSessionId` for every request in that response. Messages with the same ID are appended to the same speech queue in request order (FIFO), including when `priority` is `high`. If omitted, each request is handled as an independent speech session.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "This is the first sentence.", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "This is the next sentence.", "speechSessionId": "answer-stream-001"}' \
  'http://localhost:3000/api/v1/speak/?receiverId=YOUR_RECEIVER_ID'
```

### 2. Process as Chat Input (POST /api/v1/chat)

Processes the message through the same flow as input entered in AITuberKit. If you specify `ai_generate` for `mode`, it is handled like the legacy `ai_generate` mode for AI response generation.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | The Receiver ID of the AITuberKit screen that receives the message, or a client ID for compatibility. Specify it in the query string or JSON body. |
| `text` | `string` | `△` | Input text passed to the character. Required when `messages` is not specified. |
| `messages` | `string[]` | `△` | Multiple input messages to send together. Required when `text` is not specified. |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` uses the same flow as the on-screen input field. `ai_generate` treats the input as an AI response generation request. Defaults to `user_input`. |
| `systemPrompt` | `string` | `-` | System prompt used when `mode` is `ai_generate` and `useCurrentSystemPrompt` is `false`. |
| `useCurrentSystemPrompt` | `boolean` | `-` | When `mode` is `ai_generate`, whether to use the current character setting's system prompt. Defaults to `true`. |
| `image` | `string` | `-` | Image as a Base64 data URI. Example: `data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | When set to `high`, the message is inserted before normal queued messages. Defaults to `normal`. |
| `interrupt` | `boolean` | `-` | When `true`, the current speech and waiting queue are stopped before this input is queued. |
| `responseCallback` | `object` | `-` | Specify this to return the AI response to a local HTTP callback. See below for details. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Please give a short greeting for today’s stream.", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

To send an image:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Please describe this image.", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?receiverId=YOUR_RECEIVER_ID'
```

#### AI Response Callback

When `responseCallback` is specified, the AITuberKit server can send the result to a local HTTP endpoint after the AI response has been generated.

```json
{
  "text": "Please explain the key points of this presentation.",
  "mode": "user_input",
  "responseCallback": {
    "url": "http://127.0.0.1:8787/aituber-kit/callback",
    "interactionId": "request-001",
    "token": "replace-with-a-random-token"
  }
}
```

The callback endpoint receives a POST request in the following format.

```json
{
  "interactionId": "request-001",
  "token": "replace-with-a-random-token",
  "status": "completed",
  "content": "Generated AI response"
}
```

- `url` is limited to `http://127.0.0.1`, `http://localhost`, or `http://[::1]`
- `interactionId` must start with an alphanumeric character and may contain alphanumeric characters, hyphens, and underscores, up to 128 characters
- `token` must be 8 to 256 characters. Verify it at the callback receiver
- `status` is one of `completed`, `empty`, or `failed`. When it is `failed`, the payload includes `error`

### 3. Stop Playback (POST /api/v1/stop)

Stops the current speech and queue.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | `string` | `●` | The Receiver ID of the AITuberKit screen to stop, or a client ID for compatibility. Specify it in the query string or JSON body. |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | Stop target. `speech` stops the current speech, `queue` stops the waiting queue, and `all` stops both. Defaults to `all`. |
| `reason` | `string` | `-` | A note for the stop reason. It can be kept for event log checks. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?receiverId=YOUR_RECEIVER_ID'
```

### 4. Get Status (GET /api/v1/status)

Returns the connected client status, including speaking state, processing state, and queue counts.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | Query string | `●` | The Receiver ID of the AITuberKit screen whose status is requested, or a client ID for compatibility. |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?receiverId=YOUR_RECEIVER_ID'
```

### 5. Get Events (GET /api/v1/events)

API events can be subscribed to as Server-Sent Events. In the API Console, you can add `snapshot=true` to check recent events.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `receiverId` / `clientId` | Query string | `-` | Filters events to the specified Receiver ID or client ID for compatibility. If omitted, events for all Receivers are included. |
| `snapshot` | `boolean` | `-` | When `true`, returns recent events as JSON. If omitted, it opens an SSE connection. |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?receiverId=YOUR_RECEIVER_ID&snapshot=true'
```

To subscribe to live events, omit `snapshot` and send `Accept: text/event-stream`. With `curl`, use `-N` to disable output buffering.

```bash
curl -N \
  -H "Accept: text/event-stream" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?receiverId=YOUR_RECEIVER_ID'
```

Events arrive as SSE frames in the following format.

```text
id: evt_01K1ABCDEF
event: message_queued
data: {"id":"evt_01K1ABCDEF","timestamp":1785877200000,"clientId":"aituber-receiver-123","type":"message_queued","payload":{"count":1,"messageType":"direct_send","source":"v1","interrupt":false}}
```

Use `event` (or `data.type`) to choose what to fetch and use `data.clientId` as the destination ID. For `message_queued`, call `GET /api/v1/client/messages/?receiverId=<data.clientId>`. For `command_queued` and `stop_requested`, call `GET /api/v1/client/commands/?receiverId=<data.clientId>`. Both fetch APIs require the same Bearer authentication.

The following events can be used for new-work notifications and speech-state synchronization.

| Event | Description |
| --- | --- |
| `message_queued` | A speech or chat message was added to the queue |
| `command_queued` | A command such as a presentation operation was added to the queue |
| `stop_requested` | A stop was requested for speech or the waiting queue |
| `speech_started` | The client entered the speaking state |
| `speech_ended` | The client left the speaking state |
| `speech_chunk_started` | Playback of a split speech chunk started. The payload includes `speechChunkId` and `text` |
| `speech_chunk_ended` | Playback of a speech chunk ended. The payload includes `speechChunkId` |

The AITuberKit screen's MessageReceiver subscribes to authenticated SSE and immediately fetches the relevant data when it receives `message_queued`, `command_queued`, or `stop_requested`. While connected, it performs a safety check every 15 seconds. Only while disconnected does it fall back to one-second polling. SSE reconnects use exponential backoff starting at 250 milliseconds and capped at 5 seconds.

For external presentation events, see [External Presentation API](/en/guide/other/external-presentation-api#subscribe-to-events).

## API Console

The message sending page has been expanded into the API Console. You can run the standard `/api/v1` APIs, the External Presentation API, and the existing `/api/messages` API from this screen.

## Enabling the Feature

You can toggle ON/OFF the feature that accepts API operations from external sources. When turned ON, a client ID is automatically generated.<br>
You can also edit the client ID to any value you prefer.

::: warning
In restricted mode environments, this toggle is disabled, and the API plus SSE and polling receiver processing also stop. The settings screen shows the disabled reason near the toggle.
:::

:::tip Hint
The client ID is required when sending messages from external sources.
:::

## Message API (POST /api/v1/messages)

The message sending page can run multiple `/api/v1` endpoints depending on the use case. When calling the API directly, include `receiverId` (or `clientId` for compatibility) and the `Authorization: Bearer YOUR_API_KEY` header.

:::tip Hint
Use the value configured in the server-side `AITUBERKIT_API_KEY` as `YOUR_API_KEY`. Manage it as a server-side value, not as a browser-exposed environment variable.
:::

`/api/v1/messages/` is a general endpoint that switches between direct speech, AI generation, and normal user input with the `type` field. Use `messages` for multiple messages or `text` for a single message.

### 1. Make the AI Character Speak Directly (direct_send)

- Makes the AI character speak the input message as is
- If multiple messages are sent, they are processed in order
- The voice model selected in the AITuberKit settings is used

**API Request Example**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["Hello, the weather is nice today.", "Please tell me your schedule for today."], "type": "direct_send"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

### 2. Generate an Answer with AI and Then Speak (ai_generate)

- The AI generates a response from the input message, and the AI character speaks that response
- If multiple messages are sent, they are processed in order
- The AI model and voice model selected in the AITuberKit settings are used
- How to set the system prompt:
  - To use the AITuberKit system prompt, set `useCurrentSystemPrompt: true`
  - To use a custom system prompt, specify it in the `systemPrompt` parameter and set `useCurrentSystemPrompt: false`
- To load past conversation history, you can include the string `[conversation_history]` anywhere in the system prompt or user message
- By attaching an image (Base64 format data URI) to the `image` parameter, you can send an external image to the AI instead of using camera capture

**API Request Example**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["Please tell me your schedule for today."], "type": "ai_generate"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

### 3. Send User Input (user_input)

- The sent message is processed the same as if it were input from the AITuberKit input form
- If multiple messages are sent, they are processed in order
- The AI model and voice model selected in the AITuberKit settings are used
- The system prompt and conversation history from AITuberKit are used
- By attaching an image (Base64 format data URI) to the `image` parameter, you can use an external image instead of camera capture for processing

**API Request Example**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"messages": ["Hello, the weather is nice today.", "Please tell me your schedule for today."], "type": "user_input"}' \
  'http://localhost:3000/api/v1/messages/?receiverId=YOUR_RECEIVER_ID'
```

## Purpose-specific Endpoints

When the purpose is fixed, you can also use these endpoints.

| Endpoint | Purpose |
| --- | --- |
| `POST /api/v1/speak/` | Make the character speak text directly |
| `POST /api/v1/chat/` | Process text as normal input or AI generation |
| `POST /api/v1/stop/` | Stop current speech or queued work |
| `GET /api/v1/status/` | Get connected client status |
| `GET /api/v1/events/` | Subscribe to API events over SSE or check recent events |
| `GET /api/v1/receivers/` | Get a list of connected Receivers |

For presentation registration, assignment, and playback controls, see the [External Presentation API](/en/guide/other/external-presentation-api).

## API Response

The response to each API request is returned as a JSON object containing the result of the request processing. The response includes information about the processed messages and processing status.

:::tip Hint
On the message sending page, there is a response display area at the bottom of each sending method form where you can check the response from the API.
:::

## Notes

- `receiverId` and `clientId` identify routing destinations; they are not credentials. Do not disclose the API key to third parties.
- Sending a large number of messages in a short time may cause processing delays.
- The feature that accepts API operations from external sources involves security risks. Enable it only in trusted environments.
