import { SpsheDoc } from "../types"

export function compile(doc: SpsheDoc){
	const arr = getDependencyArray(doc)
  const ret: string[] = arr.map(key=>{
		const cell = doc[key]
		switch(typeof cell){}
	})
	return ret.join('\n')
}
function getDependencyArray(doc: SpsheDoc): (keyof doc)[]{
	return []
}
