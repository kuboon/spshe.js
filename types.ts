export type DateTime = ReadOnly<{
	type: 'datetime',
	tz: string,
	value: number // Date.getTime() always UTC
}>
export type Primitive = boolean | number | string | bigint | DateTime

export type Formula = ReadOnly<{
	type: 'formula',
	value: string
}>
export type Lambda = ReadOnly<{
	type: 'lambda',
	value: string
}>

export type Cell = Primitive | Formula | Lambda
export type SpsheDoc = {
	[key: string]: Cell
}
