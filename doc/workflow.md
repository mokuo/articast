```mermaid
---
title: 技術系メディアを音声変換してポッドキャスト配信
---
stateDiagram-v2
    [*] --> ブログFeed購読
    ブログFeed購読 --> 記事クロール(複数)
    記事クロール(複数) --> テキスト音声変換
    テキスト音声変換 --> ポッドキャスト配信
    ポッドキャスト配信 --> [*]
```