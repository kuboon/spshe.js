# calculator
calculator は SpsheDoc から SpsheConstDoc を生成します。
SpsheConstDoc は type: 'func' を1つも含まない SpsheDoc です。
内部で compiler を呼び出し、その script を実行します。

```
import { calcluate } from './mod.ts'

const doc = {
	'A1': 3,
	'A2': 7,
	'A3': {
		type: 'func',
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
