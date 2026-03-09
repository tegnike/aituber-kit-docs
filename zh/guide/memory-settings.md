# 记忆设置

## 概述

AITuberKit提供使用IndexedDB和OpenAI Embedding API的长期记忆功能。启用此功能后，会自动从过去的对话中搜索相关内容，并在AI生成回应时作为上下文使用。

**环境变量**:

```bash
# 记忆功能的启用/禁用
NEXT_PUBLIC_MEMORY_ENABLED=false

# 相似度阈值（0.1-0.95）- 值越高，仅使用相关性越高的记忆
NEXT_PUBLIC_MEMORY_SIMILARITY_THRESHOLD=0.7

# 搜索结果上限（1-10）
NEXT_PUBLIC_MEMORY_SEARCH_LIMIT=5

# 上下文最大令牌数
NEXT_PUBLIC_MEMORY_MAX_CONTEXT_TOKENS=1000
```

::: tip
使用Embedding API需要OpenAI API密钥。使用的是 `text-embedding-3-small` 模型（1536维）。
:::

## 工作原理

1. 对话内容被向量化后保存到IndexedDB
2. 在新的对话中，基于余弦相似度从过去的对话中搜索相关内容
3. 搜索结果自动追加到系统提示中，使AI能够生成更符合上下文的回应

## 数据管理

- **搜索预览**: 可以在设置界面中预览记忆的搜索结果
- **备份/恢复**: 支持基于文件的记忆数据备份和恢复
- **清除**: 可以删除所有记忆数据
