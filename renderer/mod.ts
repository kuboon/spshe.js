import { SpsheDoc, Cell } from "../spshe/types.ts";

type renderOptions = {
	withHeaders: boolean
}
type SpsheMatrix = {
	cells: Cell[][],
	maxCol: number,
	maxRow: number,
}
export function renderHtmlTable(doc: SpsheDoc, opts: renderOptions = {
	withHeaders: true
}): string {
	const html: string[] = [];
	html.push('<table>');
	if(opts.withHeaders) {
		html.push('<tr>');
		for(const key in doc) {
			html.push(`<th>${key}</th>`);
		}
		html.push('</tr>');
	}
	for (const [key, cell] of Object.entries(doc)) {
		html.push(`<tr><td>${key}</td><td>${cell}</td></tr>`);
	}
	html.push('</table>');
	return html.join('\n');
}
