import { Cell, Formula, Lambda, Primitive, SpsheDoc } from "../types.ts"
import { CompiledCell, CompiledCells, getDependencyArray } from "./dependency.ts"

export function compile(doc: SpsheDoc): string {
	const compiled: CompiledCells = {}
	for (const key in doc) {
		const cell = doc[key]
		if (!isPrimitive(cell)) {
			compiled[key] = compileCell(key, cell)
		}
	}
	const arr = getDependencyArray(compiled)
	return arr.map(key => compiled[key].js).join('\n')
}
function compileCell(key: string, cell: Formula | Lambda): CompiledCell {
	const deps: string[] = []
	function replacer(ref: string) {
		deps.push(ref)
		return `$.${ref}`;
	}
	const str = cell.value.replace(/([A-Z]+)(\d+)(:([A-Z]+)(\d+))?/g, replacer);
	const js = `$.${key} = ${str}`
	return {deps, js}
}
function isPrimitive(cell: Cell): cell is Primitive {
	if (typeof cell !== 'object') return true
	if (cell.type == 'datetime') return true
	return false
}
