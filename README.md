# spshe.js

スプシjsは、 Excel や google sheets との互換性を完全に無視したゼロベースのスプレッドシートフレームワークです。

## 装飾情報を分離したシンプルな JSON ドキュメント
SpsheDoc は値と計算式(formula)のみを含むシンプルな JSON ドキュメントです。
[calculator](./calculator/readme.md) を通すことで、計算式をすべて計算した SpsheDoc に変換できます。
formula を含まない SpsheDoc を特に SpsheDocConst と呼びます。
これを更に [renderer](./renderer/readme.md) へ渡すことで html を得ることが出来、 CSS で装飾できます。

## JavaScript準拠
caluculator が内部で使用する [compiler](./compiler/readme.md) は SpsheDoc を入力とし、依存関係を自動的に検出して適正な順序に並び替えた単一の Javascript コードを生成します。これを Javascipt エンジンに直接処理させることで、計算式のパースなど複雑な処理を全て委譲します。
基本的な計算処理として、 [Math module](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math) の関数群をトップレベルで使用可能です。
