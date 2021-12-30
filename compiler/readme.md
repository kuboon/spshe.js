# compiler
compiler は、 SpsheDoc を Javascript に変換します。
出力されたコードに SpsheConstDoc を渡し、計算結果の SpsheConstDoc を得られます。
計算式を変更しない限り、 compile 不要で高速に再計算を実行できます。
SpsheConstDoc 専用の (計算式編集を含まない) エディタにコンパイル済みのコードを添付すれば、計算機能のみのスプレッドシートを軽量に公開できます。

## compile
```
import { compile } from './mod.ts'
const doc = {
	'A1': 3,
	'A2': 7,
	'A3': {
		type: 'formula',
		value: 'A1+A2'
	}
}

const code = compile(doc)
console.log(code)

```
(i, o) => {
	o['A1']=i['A1']
	o['A2']=i['A1']
	o['A3']=o['A1'] + o['A2']
	return o
}
```

## getDependencyArray
SpsheDoc 内のすべての formula から参照せるを抽出し有効グラフを作成する。その後、幅優先走査して一列の配列を返す。

## compileFormula
formula 内のセル参照を変数参照に置換し、ECMAScript にする。
