# compiler
compiler は、 SpsheDoc を Javascript に変換します。

```
import { compile } from './mod.ts'
const doc = {
	'A1': 3,
	'A2': 7,
	'A3': {
		type: 'func',
		value: 'A1+A2'
	}
}

const code = compile(doc)
console.log(code)

```
o['A1']=i['A1']
o['A2']=i['A1']
o['A3']=o['A1'] + o['A2']
return o
```
