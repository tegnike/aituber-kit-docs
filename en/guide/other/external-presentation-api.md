# External Presentation API

## Overview

You can register presentations created in external systems with AITuberKit, assign them to specific clients, and control playback, pausing, slide navigation, and other actions through the API. Presentations and client assignments are stored on the server, so they can be restored after AITuberKit restarts.

The existing local slide feature remains available. While an external presentation is assigned, it takes priority. Unassigning it returns the application to the selected local slide set.

## Prerequisites

```bash
# Enable API operations from external sources
NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED=true

# Client ID used to identify the target of operations
NEXT_PUBLIC_CLIENT_ID="main-stage"

# Server-side API key used for /api/v1 Bearer authentication
AITUBERKIT_API_KEY="replace-with-a-random-api-key"

# Persistent storage location for external Presentation Manifests and Assignments
# Default when omitted: <project-root>/.aituber-kit/presentations
AITUBERKIT_PRESENTATION_STORAGE_DIR=""
```

Include the following authentication header with every endpoint.

```http
Authorization: Bearer YOUR_API_KEY
```

When `NEXT_PUBLIC_MESSAGE_RECEIVER_ENABLED` is disabled, the browser does not receive external commands. External control and file access are rejected in restricted mode.

## Basic Flow

1. Register a Presentation Manifest
2. Assign the registered revision to a client
3. Confirm that loading is complete through the status API
4. Start, navigate, or stop the presentation through the control API
5. Subscribe to SSE events as needed

## Endpoints

| Method | Path | Purpose |
| --- | --- | --- |
| `PUT` | `/api/v1/presentations/{presentationId}` | Register or update a Manifest |
| `GET` | `/api/v1/presentations/{presentationId}` | Retrieve a stored Manifest |
| `POST` | `/api/v1/presentations/{presentationId}/activate` | Assign it to a client |
| `POST` | `/api/v1/presentation/control` | Control playback state and visibility |
| `GET` | `/api/v1/presentation/status` | Retrieve the assignment and actual browser state |
| `GET` | `/api/v1/events` | Subscribe to Presentation events through SSE |

## Register a Manifest

IDs such as `presentationId`, Section IDs, and Slide IDs must start with an alphanumeric character and may contain alphanumeric characters, hyphens, and underscores. The `presentationId` in the URL must match the one in the Manifest.

```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "schemaVersion": 1,
    "presentationId": "product-demo",
    "revision": 1,
    "title": "Product Demo",
    "locale": "en-US",
    "createdAt": "2026-08-03T12:00:00.000Z",
    "theme": "default",
    "sections": [
      {
        "id": "introduction",
        "title": "Overview",
        "qaBrief": "Answer questions based on the content of the product demo.",
        "responsePolicy": "Do not state assumptions as facts when the information is not in the presentation.",
        "slides": [
          {
            "id": "intro-1",
            "markdown": "# Product Demo\\n\\nThis slide was registered through the external API.",
            "narration": "Let's begin the product demo.",
            "pauseAfter": true
          }
        ]
      }
    ]
  }' \
  'http://localhost:3000/api/v1/presentations/product-demo'
```

- A new registration returns `201`; an update or resubmission of identical content returns `200`
- Resubmitting the same revision with identical content is idempotent and makes no changes
- An older revision than the stored revision, or an update with different content at the same revision, returns `409`
- The request body is limited to 5 MB
- `theme` supports `default` and `dark`. Unsupported values are displayed as `default`

### Main Manifest Fields

| Field | Requirement | Description |
| --- | --- | --- |
| `schemaVersion` | Required | Currently `1` |
| `presentationId` | Required | Presentation ID that matches the URL |
| `revision` | Required | Integer greater than or equal to 1 |
| `title` | Required | Presentation name |
| `createdAt` | Required | ISO 8601 date and time including a time zone |
| `thumbnail` | Optional | Image Asset used in the presentation list or while the presentation is hidden |
| `description` / `locale` | Optional | Description and locale information |
| `theme` | Optional | `default` or `dark` |
| `sections` | Required | At least 1 and at most 50 |
| `sections[].slides` | Required | At least 1 per Section and at most 200 in total |
| `slides[].markdown` | Required | At most 50,000 characters per Slide |
| `slides[].narration` | Optional | Narration text, up to 10,000 characters |
| `slides[].pauseAfter` | Optional | When `true`, pauses the Section after that Slide |
| `slides[].assets` | Optional | Up to 20 `http` or `https` images |
| `qaBrief` | Optional | Presentation information used for question answering within the Section |
| `responsePolicy` | Optional | Response policy for the Section |
| `sources` | Optional | Source information referenced during question answering, up to 500 in total |
| `metadata` | Optional | Additional information whose values are strings, numbers, booleans, or `null`, up to 50 entries |

HTML, event handlers, and `javascript:`, `data:`, or `file:` links in Markdown are rejected. Image Assets require `alt` text.

## Retrieve a Manifest

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentations/product-demo?revision=1'
```

`revision` is optional. If the specified value differs from the stored revision, the API returns `409 REVISION_MISMATCH`.

## Assign a Presentation to a Client

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"clientId":"main-stage","revision":1,"autoStart":false}' \
  'http://localhost:3000/api/v1/presentations/product-demo/activate'
```

You can also specify `clientId` in the query string. `autoStart` defaults to `false`, so loading the presentation does not automatically start speech.

## Control a Presentation

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{"clientId":"main-stage","action":"start"}' \
  'http://localhost:3000/api/v1/presentation/control'
```

| `action` | Behavior |
| --- | --- |
| `start` | Start speech and automatic progression from the beginning or current position |
| `pause` | Stop automatic progression after the current speech finishes |
| `resume` | Resume from the paused position |
| `next_slide` / `previous_slide` | Move to the next or previous Slide |
| `next_section` / `previous_section` | Move to the next or previous Section |
| `goto` | Move to `target.sectionId` or `target.slideId` |
| `reset` | Stop speech and return to the initial `ready` state |
| `hide` / `show` | Hide or show the presentation while preserving the current position |
| `unload` | Remove the assignment from the client |

For `goto`, specify the destination as follows. Set `speak: true` to narrate the destination slide after navigation.

```json
{
  "clientId": "main-stage",
  "action": "goto",
  "target": {
    "sectionId": "introduction",
    "slideId": "intro-1"
  },
  "speak": true
}
```

The control API returns `202` when it accepts a command. Confirm that it has actually been applied through the status API or SSE events.

## Check Status

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/presentation/status?clientId=main-stage'
```

The response includes the assignment stored on the server as `desired`, the actual state reported by the browser as `actual`, and `inSync`, which indicates whether they match.

`actual.state` is one of `unassigned`, `loading`, `ready`, `playing`, `paused`, `section_paused`, `completed`, or `error`.

## Subscribe to Events

The existing `GET /api/v1/events` endpoint can receive the following Presentation events.

- `presentation_registered`
- `presentation_assigned`
- `presentation_loaded`
- `presentation_started`
- `slide_changed`
- `section_paused`
- `presentation_paused`
- `presentation_completed`
- `presentation_unloaded`
- `presentation_error`

```bash
curl -N -H "Authorization: Bearer YOUR_API_KEY" \
  'http://localhost:3000/api/v1/events?clientId=main-stage'
```

## Storage and Operational Notes

By default, Manifests and assignments are stored in `<project-root>/.aituber-kit/presentations`. Set `AITUBERKIT_PRESENTATION_STORAGE_DIR` to use a different location.

This feature is intended for writable local Node.js environments, the desktop version, and self-hosted environments. Registration or assignment may return `503 PRESENTATION_STORAGE_UNAVAILABLE` in read-only environments or environments that provide only an ephemeral file system.

AITuberKit does not determine whether you have permission to use external images. The system registering an image must confirm its rights and intended publication scope.
