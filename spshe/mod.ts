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
		const base = 26
		const codebase = "A".charCodeAt(0) - 1
		const ret: string[] = []
		do {
			let num = n % base
			if(num === 0) {
				num = base
				n -= base
			}
			ret.unshift(String.fromCharCode(codebase + num))
			n = Math.floor(n / base)
		} while (n > 0)
		return ret.join('')
	},
	decode(str: string): number {
		const base = 26
		const codebase = "A".charCodeAt(0) - 1
		return Array.from(str, c => c.charCodeAt(0) - codebase).reduce((acc, x) => acc * base + x, 0)
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
