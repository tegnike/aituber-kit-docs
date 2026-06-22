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
```

## v1 API

APIs under `/api/v1` are authenticated with the `Authorization: Bearer YOUR_API_KEY` header. Set the API key in `AITUBERKIT_API_KEY` in `.env.local`.

### Common Rules

Legend: `●` Required, `△` Conditional, `-` Optional

| Item | Where to specify | Req. | Description |
| --- | --- | --- | --- |
| `Authorization` | HTTP header | `●` | Specify it in the `Bearer YOUR_API_KEY` format. |

`clientId` identifies the target client. It is required for `speak`, `chat`, `stop`, and `status`, and optional for `events` where it filters the event stream. For POST APIs, specify it in the query string or JSON body. For GET APIs, specify it in the query string.

Send POST request bodies as JSON. To send an image, specify a Base64 data URI such as `data:image/png;base64,...` in `image`. Image strings up to about 10 million characters are accepted.

### 1. Speak Directly (POST /api/v1/speak)

Makes the character speak the provided text as is.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | The client ID of the AITuberKit instance that receives the message. Specify it in the query string or JSON body. |
| `text` | `string` | `△` | Text to speak. Required when `messages` is not specified. |
| `messages` | `string[]` | `△` | Multiple text messages to enqueue together. Required when `text` is not specified. |
| `emotion` | `string` | `-` | Expression or emotion used while speaking. If omitted, the normal state is used. |
| `priority` | `"normal"` / `"high"` | `-` | When set to `high`, the message is inserted before normal queued messages. Defaults to `normal`. |
| `interrupt` | `boolean` | `-` | When `true`, the current speech and waiting queue are stopped before this message is queued. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Hello. This is a speech test through the API.", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?clientId=YOUR_CLIENT_ID'
```

### 2. Process as Chat Input (POST /api/v1/chat)

Processes the message through the same flow as input entered in AITuberKit. If you specify `ai_generate` for `mode`, it is handled like the legacy `ai_generate` mode for AI response generation.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | The client ID of the AITuberKit instance that receives the message. Specify it in the query string or JSON body. |
| `text` | `string` | `△` | Input text passed to the character. Required when `messages` is not specified. |
| `messages` | `string[]` | `△` | Multiple input messages to send together. Required when `text` is not specified. |
| `mode` | `"user_input"` / `"ai_generate"` | `-` | `user_input` uses the same flow as the on-screen input field. `ai_generate` treats the input as an AI response generation request. Defaults to `user_input`. |
| `systemPrompt` | `string` | `-` | System prompt used when `mode` is `ai_generate` and `useCurrentSystemPrompt` is `false`. |
| `useCurrentSystemPrompt` | `boolean` | `-` | When `mode` is `ai_generate`, whether to use the current character setting's system prompt. Defaults to `true`. |
| `image` | `string` | `-` | Image as a Base64 data URI. Example: `data:image/png;base64,iVBOR...` |
| `priority` | `"normal"` / `"high"` | `-` | When set to `high`, the message is inserted before normal queued messages. Defaults to `normal`. |
| `interrupt` | `boolean` | `-` | When `true`, the current speech and waiting queue are stopped before this input is queued. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Please give a short greeting for today’s stream.", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

To send an image:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Please describe this image.", "mode": "ai_generate", "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

### 3. Stop Playback (POST /api/v1/stop)

Stops the current speech and queue.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `clientId` | `string` | `●` | The client ID of the AITuberKit instance to stop. Specify it in the query string or JSON body. |
| `mode` | `"speech"` / `"queue"` / `"all"` | `-` | Stop target. `speech` stops the current speech, `queue` stops the waiting queue, and `all` stops both. Defaults to `all`. |
| `reason` | `string` | `-` | A note for the stop reason. It can be kept for event log checks. |

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?clientId=YOUR_CLIENT_ID'
```

### 4. Get Status (GET /api/v1/status)

Returns the connected client status, including speaking state, processing state, and queue counts.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `clientId` | Query string | `●` | The client ID of the AITuberKit instance whose status is requested. |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?clientId=YOUR_CLIENT_ID'
```

### 5. Get Events (GET /api/v1/events)

API events can be subscribed to as Server-Sent Events. In the API Console, you can add `snapshot=true` to check recent events.

| Parameter | Type | Req. | Description |
| --- | --- | --- | --- |
| `clientId` | Query string | `-` | Filters events to the specified client ID. If omitted, events for all clients are included. |
| `snapshot` | `boolean` | `-` | When `true`, returns recent events as JSON. If omitted, it opens an SSE connection. |

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?clientId=YOUR_CLIENT_ID&snapshot=true'
```

## API Console

The message sending page has been expanded into the API Console. You can run both the `/api/v1` APIs and the existing `/api/messages` API from this screen.

## Enabling the Feature

You can toggle ON/OFF the feature that accepts API operations from external sources. When turned ON, a client ID is automatically generated.<br>
You can also edit the client ID to any value you prefer.

::: warning
In restricted mode environments, this toggle is disabled, and the API and polling also stop. The settings screen shows the disabled reason near the toggle.
:::

:::tip Hint
The client ID is required when sending messages from external sources.
:::

## Legacy Message Sending

For backward compatibility, the legacy `/api/messages` endpoint remains available.

The legacy API offers three methods to send messages:

### 1. Make the AI Character Speak Directly (direct_send)

- Makes the AI character speak the input message as is
- If multiple messages are sent, they are processed in order
- The voice model selected in the AITuberKit settings is used

**API Request Example**:

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"messages": ["Hello, the weather is nice today.", "Please tell me your schedule for today."]}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=direct_send'
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
  -d '{"systemPrompt": "You are a helpful assistant.", "useCurrentSystemPrompt": false, "messages": ["Please describe this image."], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=ai_generate'
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
  -d '{"messages": ["Hello, the weather is nice today."], "image": "data:image/png;base64,iVBOR..."}' \
  'http://localhost:3000/api/messages/?clientId=YOUR_CLIENT_ID&type=user_input'
```

## API Response

The response to each API request is returned as a JSON object containing the result of the request processing. The response includes information about the processed messages and processing status.

:::tip Hint
On the message sending page, there is a response display area at the bottom of each sending method form where you can check the response from the API.
:::

## Notes

- The client ID is used to restrict access from external sources. Be careful not to leak it to third parties.
- Sending a large number of messages in a short time may cause processing delays.
- The feature that accepts API operations from external sources involves security risks. Enable it only in trusted environments.
