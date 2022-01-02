export type DateTime = Readonly<{
	type: 'datetime',
	tz: string,
	value: number // Date.getTime() always UTC
}>
export type Primitive = boolean | number | string | bigint | DateTime

export type Formula = Readonly<{
	type: 'formula',
	value: string
}>

export type Cell = Primitive | Formula
export type SpsheDoc = {
	[key: string]: Cell
}
