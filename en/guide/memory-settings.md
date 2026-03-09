# Memory Settings

## Overview

The Memory Settings screen manages long-term memory features and conversation history.

## Long-term Memory

AITuberKit provides a long-term memory feature using IndexedDB and OpenAI's Embedding API. When enabled, it automatically searches for relevant content from past conversations and uses it as context when generating AI responses.

**Environment Variables**:

```bash
# Enable/disable memory feature
NEXT_PUBLIC_MEMORY_ENABLED=false

# Similarity threshold (0.1-0.95) - Higher values use only more relevant memories
NEXT_PUBLIC_MEMORY_SIMILARITY_THRESHOLD=0.7

# Search result limit (1-10)
NEXT_PUBLIC_MEMORY_SEARCH_LIMIT=5

# Maximum context token count
NEXT_PUBLIC_MEMORY_MAX_CONTEXT_TOKENS=1000
```

::: tip
An OpenAI API key is required to use the Embedding API. The `text-embedding-3-small` model (1536 dimensions) is used.
:::

### How It Works

1. Conversation content is vectorized and stored in IndexedDB
2. When a new conversation occurs, relevant content is searched from past conversations using cosine similarity
3. Search results are automatically appended to the system prompt, allowing the AI to generate more contextually appropriate responses

### Data Management

- **Search Preview**: You can preview memory search results from the settings screen
- **Backup/Restore**: File-based backup and restore of memory data is supported. When the "Vectorize on restore" option is enabled, embeddings are also rebuilt during restoration
- **Clear**: You can delete all memory data

## Conversation History

AITuberKit maintains conversation history with the AI to preserve the context of conversations. The conversation history is used by the AI to reference past conversations and generate appropriate responses.

### Display and Editing

In the memory settings screen, you can check and edit the currently maintained conversation history. Each message is distinguished by the labels "You" (user) and "Character" (AI character).

You can directly edit the conversation content by clicking on the text field. This allows you to modify the AI's responses or your own questions. You can also delete individual messages.

### Number of Past Messages to Retain

By default, AITuberKit retains the 10 most recent conversations as memory. This value can be changed in the memory settings screen.

Increasing the retention number allows the AI to understand a longer conversation context, but it may increase the size of API requests and lead to longer response times.

::: warning Note
If you set the retention number too high, you may reach the token limit of the AI service. Please set an appropriate value, especially when having long conversations.
:::

### Resetting Conversation History

By clicking the "Reset Conversation History" button, you can delete all currently maintained conversation history and IndexedDB long-term memory data. This allows you to start a new conversation with the AI.

::: tip TIP
When you reset the conversation history, the AI loses the context of previous conversations. It is effective to reset when you want to start talking about a new topic or when the AI's responses become strange.
:::

::: warning Note
When using **Dify** as the AI service, the past message retention setting is not used. Conversation management is handled on the Dify side.
:::
