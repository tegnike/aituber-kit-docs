# API Settings

## Overview

Settings for accepting instructions to the AI character from external sources. When this feature is enabled, you can make the AI character speak through a dedicated API.

The external API is provided as purpose-specific endpoints under `/api/v1`. The existing `/api/messages` endpoint remains available for backward compatibility.

**Environment Variables**:

```bash
# Enable external instruction acceptance setting (true/false)
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=false

# Client ID
NEXT_PUBLIC_CLIENT_ID=""

# API key for /api/v1 Bearer authentication
AITUBERKIT_API_KEY=""
```

## v1 API

APIs under `/api/v1` are authenticated with the `Authorization: Bearer YOUR_API_KEY` header. Set the API key in `AITUBERKIT_API_KEY` in `.env.local`.

### 1. Speak Directly (POST /api/v1/speak)

Makes the character speak the provided text as is.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Hello. This is a speech test from the external API.", "emotion": "neutral", "priority": "normal", "interrupt": false}' \
  'http://localhost:3000/api/v1/speak/?clientId=YOUR_CLIENT_ID'
```

### 2. Process as Chat Input (POST /api/v1/chat)

Processes the message through the same flow as input entered in AITuberKit. If you specify `ai_generate` for `mode`, it is handled like the legacy `ai_generate` mode for AI response generation.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"text": "Please give a short greeting for today’s stream.", "mode": "user_input", "interrupt": false}' \
  'http://localhost:3000/api/v1/chat/?clientId=YOUR_CLIENT_ID'
```

### 3. Stop Playback (POST /api/v1/stop)

Stops the current speech and queue.

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"mode": "all", "reason": "external_control"}' \
  'http://localhost:3000/api/v1/stop/?clientId=YOUR_CLIENT_ID'
```

### 4. Get Status (GET /api/v1/status)

Returns the connected client status, including speaking state, processing state, and queue counts.

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/status/?clientId=YOUR_CLIENT_ID'
```

### 5. Get Events (GET /api/v1/events)

API events can be subscribed to as Server-Sent Events. In the API Console, you can add `snapshot=true` to check recent events.

```bash
curl -X GET \
  -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events/?clientId=YOUR_CLIENT_ID&snapshot=true'
```

## API Console

The message sending page has been expanded into the API Console. You can run both the `/api/v1` APIs and the existing `/api/messages` API from this screen.

## Enabling the Feature

You can toggle ON/OFF the feature to accept instructions from external sources. When turned ON, a client ID is automatically generated.<br>
You can also edit the client ID to any value you prefer.

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
- The feature to accept instructions from external sources involves security risks. Enable it only in trusted environments.
