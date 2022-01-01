import { SpsheDoc } from "../types.ts";
import { compile } from "../compiler/mod.ts";
export function calculate(doc: SpsheDoc): Promise<SpsheDoc> {
	const js = compile(doc) + '\nreturn $'
	return safeEval(doc, js)
}

// https://stackoverflow.com/a/37154736
// runs `new Function('$', code)(doc)`
function safeEval(doc: SpsheDoc, code: string, timeoutms = 1000): Promise<SpsheDoc> {
	const worker = new Worker(new URL("sandboxWorker.js", import.meta.url).href, { type: "module", name: "sandboxWorker" });

	return new Promise((resolve, reject) => {
		const timer = setTimeout(() => {
			worker.terminate();
			reject(new Error('The worker timed out.'));
		}, timeoutms);
		worker.onmessage = function (evt) {
			worker.terminate();
			clearTimeout(timer);
			resolve(evt.data);
		};
		worker.onerror = function (evt) {
			clearTimeout(timer);
			reject(new Error(evt.message));
		};
		worker.postMessage({ code, doc });
	});
}

