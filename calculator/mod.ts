import { SpsheDoc } from "../types";

export function calculate(doc: SpsheDoc): Promise<SpsheDoc> {
	const js = compile(doc) + '\nreturn $'
	return safeEval(doc, js)
}

// https://stackoverflow.com/a/37154736
// runs `new Function('$', code)(doc)`
function safeEval(doc: SpsheDoc, code: string, timeoutms = 1000): Promise<SpsheDoc> {
	const worker = new Worker('./sandboxWorker.js');
	return new Promise((resolve, reject) => {
		worker.onmessage = function (evt) {
			worker.terminate();
			resolve(evt.data);
		};
		worker.onerror = function (evt) {
			reject(new Error(evt.message));
		};
		worker.postMessage(code);
		setTimeout(() => {
			worker.terminate();
			reject(new Error('The worker timed out.'));
		}, timeoutms);
	});
}
