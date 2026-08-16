# Lab 001 v1 — 最初の安全な変更フィクスチャ

これは[Lab 001](../../book/labs/lab-001-first-safe-task-JA.md)用の小さな合成フィクスチャです。実在プロジェクト、Git 履歴、認証情報、ネットワーク、インストール、アカウント、モデル呼び出し、外部副作用は含みません。

## 変更するもの

この**ディレクトリ全体**を、捨ててもよい場所へコピーします。コピー内の `seed/README.md` を確認し、そのファイルだけを変更します。`verify_readme.py` と `expected/acceptance.json` は編集しません。

修正は受け入れ契約から分かります。プレビューのコマンドにはポート `8080` が必要で、README にはローカル URL が必要です。モデルの回答を当てにせず、固定されたローカル証拠を比較します。

## 手順

コピー内で `seed/README.md` と `expected/acceptance.json` を並べて開きます。

1. README にポートとローカル URL がないことを確認します。
2. 許可された一回の README 修正を行います。
3. すべての `required_readme_strings` を確認します。手動確認は `3/3` です。

すでに Python 3 があれば `python .\seed\verify_readme.py` も実行できます。最初は `FIRST_SAFE_CHANGE_FAILED`、修正後は `FIRST_SAFE_CHANGE_OK` です。このためだけに Python を入れないでください。

## 範囲を限定したタスクカード

```text
目標：seed/README.md のローカルプレビュー手順を修正する。
先に読む：seed/README.md と expected/acceptance.json。
許可する編集：計画を示した後、seed/README.md のみ。
禁止：検証器や受け入れファイルの編集、インストール、ネットワーク、秘密情報、commit、push、公開。
受領書：基準状態、計画、正確な diff、二回目の結果、未検証リスト。
停止：ローカルコピー、対象、受け入れソースがない場合。
```

合格はこの固定合成チェッカーに限られます。学習者の完了、モデルの挙動、実際のコマンド、転移は証明しません。
