export type CompiledCell = {
	deps: string[],
	js: string
}
export type CompiledCells = {
	[key: string]: CompiledCell
}
export function getDependencyArray(doc: CompiledCells): string[]{
	const ret: string[] = []
	const cycle = new Set()
	const resolve = (key: string) => {
		if(cycle.has(key)) throw new Error(`Cycle detected: ${key}`)
		if(ret.includes(key)) return
		cycle.add(key)
		const cell = doc[key]
		if(cell){
			cell.deps.forEach(resolve)
			ret.push(key)
			cycle.clear()
		}
	}
	Object.keys(doc).forEach(resolve)
	return ret
}
