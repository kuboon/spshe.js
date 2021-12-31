import { SpsheDoc } from "../types";

export function calculate(doc: SpsheDoc): Promise<SpsheDoc> {
	const js = compile(doc) + '\nreturn $'
	return safeEval(doc, js)
}
function copyPrimitives(doc: SpsheDoc): SpsheDoc {
	const ret: SpsheDoc = {}
	for (key in doc) {
		const cell = doc[key]
		if (isPrimitive(cell)) {
			ret[key] = cell
		}
	}
}


// https://stackoverflow.com/a/37154736
// runs `new Function('$', code)(doc)`
function safeEval(doc: SpsheDoc, code: string, timeoutms = 1000): Promise<SpsheDoc> {
	const sandboxCode = [
		"(",
		function () {
			const _postMessage = postMessage;
			const _addEventListener = addEventListener;
			(function (obj) {
				"use strict";
				const keepProperties = [
					'Object', 'Function', 'Infinity', 'NaN', 'undefined', 'caches', 'TEMPORARY', 'PERSISTENT',
					// Optional, but trivial to get back
					'Array', 'Boolean', 'Number', 'String', 'Symbol',
					// Optional
					'Map', 'Math', 'Set',
				];
				let current = obj;
				do {
					Object.getOwnPropertyNames(current).forEach(function (name) {
						if (keepProperties.indexOf(name) === -1) {
							delete current[name];
						}
					});
					current = Object.getPrototypeOf(current);
				}	while (current !== Object.prototype)
			})(this);
			_addEventListener("message", ({data, doc}) => {
				_postMessage(new Function('$', data)(doc));
			});
		}.toString(),
		")()"]
	return new Promise((resolve, reject) => {
		const blob = new Blob(sandboxCode, { type: "application/javascript" })
		const blobURL = URL.createObjectURL(blob)
		const worker = new Worker(blobURL);
		URL.revokeObjectURL(blobURL);

		worker.onmessage = function (evt) {
			worker.terminate();
			resolve(evt.data);
		};
		worker.onerror = function (evt) {
			reject(new Error(evt.message));
		};
		worker.postMessage(untrustedCode);
		setTimeout(() => {
			worker.terminate();
			reject(new Error('The worker timed out.'));
		}, timeoutms);
	});
}
