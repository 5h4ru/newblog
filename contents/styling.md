---
title: "スタイリング確認"
date: "2023-01-25"
---

最初の h2 タグの前に文章があるケース

## h2 タグでございます

文章中のリンク――[外部リンク](https://www.google.com/)――[内部リンク](/)――文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章文章

`<em>` は `*こうやって*` 書くらしいです→*こうやって*書く

- 適切なフォントじゃないと日本語は曲がらない……
  - *italic*←これはイタリックになるはず

`<strong>` は**2つのアスタリスクで囲む**

コンビネーション→***bold & italic***

~~取り消し線~~

以下に hr

---

以上 hr

### h3 タグ

- UnorderdList
- UnorderdList
- UnorderdList
- UnorderdList
- UnorderdList
  - Nest
    - Nest 2
      - Next 3
        - Nest 4
          - Nest 5
            - Nest 6
- UnorderdList
  - Nest
    - Nest 2
      - Next 3
        - Nest 4
          - Nest 5
            - Nest 6
- 箇条書き
  - 入れ子

1. OrderdList
2. 番号付きリスト

> 引用部分
>
> Say😄イエイエイエイエ〜！😙ファンキーココナッツ😎🥥僕らジューシー🍹🍸真夏の申し子さ👙🏄‍♀️イイ感じノッちゃって🎧🎶🕺ヘブン👼ヘブン👼ヘブン👼
>
>> Oh😲ベイベイベイベ〜！👶クレイジー🤪ココナッツ🥥白いハート🤍染めろ🪣ビタミン🍋サマー🌞🐠🌻ハイテンション頂戴🔥🔥🔥ヘブン👼ヘブン👼ヘブン👼

#### h4 はあんまり使わない気がする

文章内の `code` を表示しています

pre記法

```py
print("Python パイよ～")
```

```js
console.log("JS");
```

```c
#include <stdio.h>
int main() {
    printf("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa\n");
}
```

- `pre` に mt と mb を設定した方がいい
  - 現状、隙間が無くてくっついたように見えている
    - 設定しました

表組み

|header1|header2|header3|
|:--|--:|:--:|
|align left|align right|align center|
|a|b|c|

アラインメントがうまく行ってない……

## `details` 記法

:::details タイトル
表示したい内容
:::

## `message` 記法

:::message
メッセージをここに
:::

:::message alert
警告メッセージをここに
:::
