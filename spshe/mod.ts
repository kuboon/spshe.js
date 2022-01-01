import { SpsheDoc } from "../types.ts";

export function* rangeIterator(doc: SpsheDoc, from: string, to: string) {
  const matcher = /^([A-Z]+)([0-9]+)$/;
  const f = matcher.exec(from);
  const t = matcher.exec(to);
	if (!f || !t) throw new Error(`Invalid range: ${from}-${to}`)
  for(let c = f[1]; c <= t[1]; c = String.fromCharCode(c.charCodeAt(0) + 1)) {
    for(let r = Number(f[2]); r <= Number(t[2]); r++) {
      const key = c + r;
      if(doc[key]) {
        yield key
      }
    }
  }
}