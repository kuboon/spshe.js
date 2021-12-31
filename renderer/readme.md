# renderer
renderer は、 SpsheConstDoc から html や VirtualDom を生成します。

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
<table class='spshe'>
	<tr><td class='topleft'></td><th>A</th><th>B</th></tr>
	<tr><th>1</th><td>3</td></tr>
	<tr><th>2</th><td>7</td></tr>
	<tr><th>3</th><td>10</td></tr>
</table>
```
