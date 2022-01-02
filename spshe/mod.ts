import { SpsheDoc } from "./types.ts";
export * from "./types.ts";

export function* rangeIterator(doc: SpsheDoc, from: string, to: string) {
	const matcher = /^([A-Z]+)([0-9]+)$/;
	const f = matcher.exec(from);
	const t = matcher.exec(to);
	if (!f || !t) throw new Error(`Invalid range: ${from}-${to}`)
	for (let c = f[1]; c <= t[1]; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
		for (let r = Number(f[2]); r <= Number(t[2]); r++) {
			const key = c + r;
			if (doc[key]) {
				yield key
			}
		}
	}
}
const RowNum = {
	encode(n: number): string {
		const ret: string[] = []
		const z = "Z".charCodeAt(0)
		do {
			const base = ret.length == 0 ? 26 : 27
			ret.push(String.fromCharCode(z - base + 1 + (n % base)))
			n = Math.floor(n / base)
		} while (n > 0)
		return ret.reverse().join('')
	},
	decode(str: string): number {
		let ret = 0
		const z = "Z".charCodeAt(0)
		for (let i = 0; i < str.length; i++) {
			const base = i == str.length - 1 ? 26 : 27
			ret = ret * base + str.charCodeAt(i) - (z - base + 1)
		}
		return ret
	}
}
export class CellRef {
	constructor(public doc: SpsheDoc, public key: string) { }
	get colRow() {
		const m = this.key.match(/^([A-Z]+)([0-9]+)$/)
		if (!m) throw new Error(`Invalid cell reference: ${this.key}`)
		const row = Number(m[2]) - 1
		const col = RowNum.decode(m[1])
		return { col, row }
	}
}
export class Range {
	constructor(public doc: SpsheDoc, public key: string) { }
	get fromTo() {
		const [from, to] = this.key.split(':').map(key => new CellRef(this.doc, key))
		return { from, to }
	}
	*rows() {
		const { from, to } = this.fromTo
		for (let r = from.colRow.row; r <= to.colRow.row; r++) {
			const row: string[] = []
			for (let c = from.colRow.col; c <= to.colRow.col; c++) {
				const key = RowNum.encode(c) + (r + 1)
				if (this.doc[key]) {
					row.push(key)
				}
			}
			yield row
		}
	}
}

export const test = { RowNum }
