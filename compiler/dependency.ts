export type CompiledCell = {
	deps: string[],
	js: string
}
export type CompiledCells = {
	[key: string]: CompiledCell
}
export function getDependencyArray(doc: CompiledCells): (keyof doc)[]{
	return []
}
