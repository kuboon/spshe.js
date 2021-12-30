# renderer
renderer は、 SpsheConstDoc から html や react VirtualDom を生成します。

```
import { renderHtmlTable } from './mod.ts'

const doc = {
	'A1': 3,
	'A2': 7,
	'A3': {
		type: 'func',
		value: 'A1+A2'
	}
}

const cDoc = calculate(doc)
const html = renderHtmlTable(cDoc)
console.log(html)
```

```
<table>
	<tr><td> </td><th>A</th><th>B</th></tr>
	<tr><th>1</th><td>3</td>