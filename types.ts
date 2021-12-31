export type Formula = {
	type: 'formula',
	value: string
}
export type SpsheDoc = {
	[key: string]: boolean | number | string | bigint | Formula
}
