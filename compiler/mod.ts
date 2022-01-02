import { Range, Cell, Formula, Primitive, SpsheDoc } from "../spshe/mod.ts";
import { CompiledCell, CompiledCells, getDependencyArray } from "./dependency.ts"

export function compile(doc: SpsheDoc): string {
	const compiled: CompiledCells = {}
	for (const key in doc) {
		const cell = doc[key]
		if (isPrimitive(cell)) continue
		compiled[key] = compileCell(doc, key, cell)
	}
	const arr = getDependencyArray(compiled)
	return arr.map(key => compiled[key].js).join('\n')
}
function compileCell(doc: SpsheDoc, key: string, cell: Formula): CompiledCell {
	const deps: string[] = []
	function replacer(ref: string, ...args: string[]) {
		if (args[0]) {
			deps.push(ref)
		} else {
			console.log(ref)
			const it = new Range(doc, ref).rows()
			const rows = Array.from(it)
			deps.push(...rows.flatMap(x => x))
		}
		return `$['${ref}']`
	}
	const str = cell.value.replace(/([A-Z]+\d+)(?!:)|([A-Z]+\d+:[A-Z]+\d+)|([A-Z]+:[A-Z]+)|(\d+:\d+)/g, replacer);
	const js = `$['${key}'] = ${str}`
	return { deps, js }
}
function isPrimitive(cell: Cell): cell is Primitive {
	if (typeof cell !== 'object') return true
	if (cell.type == 'datetime') return true
	return false
}
