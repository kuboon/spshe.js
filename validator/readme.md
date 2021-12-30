# validator

## getKeywords
`type: 'func'` value 文字列から、セル参照、関数名を抽出します。
セル参照は `A-Z` 始まり、関数名は `a-z` 始まりという命名規則とします。

```
import { getKeywords } from './mod.ts'
const words = getKeywords('sum(A1:B2)')
console.log(words)
```

```
{
	'refs': ['A1:B2'],
	'functions': ['sum']
}
```

範囲参照をどう扱うか？

##
