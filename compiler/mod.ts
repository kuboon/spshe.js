import { Primitive, SpsheDoc } from "../types"
import { CompiledCell } from "./dependency"
import { CompiledCells, getDependencyArray } from "./dependency"

export function compile(doc: SpsheDoc): string{
	const compiled: CompiledCells = {}
	for(const key in doc){
		const cell = doc[key]
		if(!isPrimitive(cell)){
			compiled[key] = compileCell(cell)
		}
	}
	const arr = getDependencyArray(compiled)
  return arr.map(key =>	compiled[key].js).join('\n')
}
function compileCell(cell): CompiledCell {
	const rows = cell.rows || 1
	const cols = cell.cols || 1
	if(rows === 1 && cols === 1){
		const left = `$[${key}]`
		const {type, value} = cell
		const {deps, right} = compileFormula({col, row, value})
		switch(type){
		case 'formula':
			return { deps, js: `${left}=${right}`}
		case 'lambda':
			return { deps, js: `${left}=(...args)=>${right}`}
		default:
			throw 'not impl'
		}
	}
}
function isPrimitive(cell): cell is Primitive{
	if(typeof cell !== 'object') return true
	if(cell.type == 'datetime') return true
	return false
}
function compileFormula({col, row, value}){
	// A1 
}