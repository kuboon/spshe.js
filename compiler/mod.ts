import { Range, Cell, Formula, Primitive, SpsheDoc, CellRef } from "../spshe/mod.ts";
import { CompiledCell, CompiledCells, getDependencyArray } from "./dependency.ts"

export class Compiler {
	private _max: { col: number; row: number; } | undefined
	constructor(public doc: SpsheDoc) { }
	get max() {
		if (!this._max) {
			let col = 1
			let row = 1
			for(const key in this.doc){
				const ref = new CellRef(this.doc, key)
				const { col: c, row: r } = ref.colRow
				if (c > col) col = c
				if (r > row) row = r
			}
			this._max = { col, row }
		}
		return this._max
	}
	getCode(): string {
		const compiled: CompiledCells = {}
		for (const key in this.doc) {
			const cell = this.doc[key]
			if (isPrimitive(cell)) continue
			compiled[key] = this.compileCell(key, cell)
		}
		const arr = getDependencyArray(compiled)
		return arr.map(key => compiled[key].js).join('\n')
	}
	compileCell(key: string, cell: Formula): CompiledCell {
		const { doc } = this

		const deps: string[] = []
		function replacer(ref: string, ...args: string[]) {
			let refs: string[] = []
			if (args[0]) {
				refs = [ref]
			} else {
				const it = new Range(doc, ref).rows()
				const rows = Array.from(it)
				refs = rows.flatMap(x => x)
			}
			deps.push(...refs)
			return `$['${refs.join(',')}']`
		}
		const str = cell.value.replace(/([A-Z]+\d+)(?!:)|([A-Z]+\d+:[A-Z]+\d+)|([A-Z]+:[A-Z]+)|(\d+:\d+)/g, replacer);
		const js = `$['${key}'] = ${str}`
		return { deps, js }
	}
}
function isPrimitive(cell: Cell): cell is Primitive {
	if (typeof cell !== 'object') return true
	if (cell.type == 'datetime') return true
	return false
}
