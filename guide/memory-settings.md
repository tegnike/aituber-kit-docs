# 記憶設定

## 概要

AITuberKitでは、IndexedDBとOpenAIのEmbedding APIを使用した長期記憶機能を提供しています。この機能を有効にすると、過去の会話から関連する内容を自動的に検索し、AIの応答生成時にコンテキストとして活用します。

**環境変数**:

```bash
# メモリ機能の有効/無効
NEXT_PUBLIC_MEMORY_ENABLED=false

# 類似度閾値（0.1-0.95）- 値が高いほど関連性の高い記憶のみを使用
NEXT_PUBLIC_MEMORY_SIMILARITY_THRESHOLD=0.7

# 検索結果上限（1-10）
NEXT_PUBLIC_MEMORY_SEARCH_LIMIT=5

# コンテキスト最大トークン数
NEXT_PUBLIC_MEMORY_MAX_CONTEXT_TOKENS=1000
```

::: tip
Embedding APIの利用にはOpenAI APIキーが必要です。`text-embedding-3-small`モデル（1536次元）を使用しています。
:::

## 仕組み

1. 会話内容がIndexedDBにベクトル化されて保存されます
2. 新しい会話時に、過去の会話からコサイン類似度ベースで関連する内容を検索します
3. 検索結果がシステムプロンプトに自動追記され、AIがより文脈に沿った応答を生成します

## データの管理

- **検索プレビュー**: 設定画面から記憶の検索結果をプレビューできます
- **バックアップ/復元**: メモリデータのファイルベースのバックアップと復元が可能です
- **クリア**: すべてのメモリデータを削除できます
