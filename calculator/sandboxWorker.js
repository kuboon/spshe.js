"use strict";
const _postMessage = postMessage;
const _addEventListener = addEventListener;
((obj) => {
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

Object.assign(this, Math)
_addEventListener("message", ({data, doc}) => {
	_postMessage(new Function('$', data)(doc));
});
