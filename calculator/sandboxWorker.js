"use strict";
const _postMessage = postMessage;
const _addEventListener = addEventListener;
((obj) => {
  const keepProperties = [
    "Object",
    "Function",
    "Infinity",
    "NaN",
    "undefined",
    "caches",
    "TEMPORARY",
    "PERSISTENT",
    "MessageEvent",
    "globalThis",
    "ErrorEvent",
    "console",
    // Optional, but trivial to get back
    "Array",
    "Boolean",
    "Number",
    "String",
    "Symbol",
    // Optional
    "Map",
    "Math",
    "Set",
  ];
  let current = obj;
  do {
    Object.getOwnPropertyNames(current).forEach((name) => {
      if (keepProperties.indexOf(name) === -1) {
        delete current[name];
      }
    });
    current = Object.getPrototypeOf(current);
  } while (current !== Object.prototype);
})(globalThis);

_addEventListener("message", ({ data }) => {
  const { code, doc } = data;
  const fm = (key, val) => {
    if (val) doc[key] = val;
    return doc[key];
  };
  new Function("$", code)(fm);
  _postMessage(doc);
});
