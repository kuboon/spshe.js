export type DateTime = {
	type: 'datetime',
	tz: string,
	value: number // Date.getTime() always UTC
}
export type Primitive = boolean | number | string | bigint | DateTime

export type Formula = {
	type: 'formula',
	value: string
}
export type Lambda = {
	type: 'lambda',
	value: string
}

export type Cell = Primitive | Formula | Lambda
export type SpsheDoc = {
	[key: string]: Cell
}
