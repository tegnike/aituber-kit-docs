# Memory Settings

## Overview

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

## How It Works

1. Conversation content is vectorized and stored in IndexedDB
2. When a new conversation occurs, relevant content is searched from past conversations using cosine similarity
3. Search results are automatically appended to the system prompt, allowing the AI to generate more contextually appropriate responses

## Data Management

- **Search Preview**: You can preview memory search results from the settings screen
- **Backup/Restore**: File-based backup and restore of memory data is supported
- **Clear**: You can delete all memory data
