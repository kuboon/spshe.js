# calculator
calculator は SpsheDoc から SpsheConstDoc を生成します。
SpsheConstDoc は type: 'func' を1つも含まない SpsheDoc です。

## calculate
内部で compiler を呼び出し、その script を実行します。

```
import { calcluate } from './mod.ts'

const doc = {
	'A1': 3,
	'A2': 7,
	'A3': {
		type: 'formula',
		value: 'A1+A2'
	}
}

const cDoc = calculate(doc)
console.log(cDoc)
```
{
	'A1': 3,
	'A2': 7,
	'A3': 10
}
```

## runInSandbox
sandbox 内で JSを実行します。
[Math](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math) の全てのプロパティはトップレベルで使用出来ます。

