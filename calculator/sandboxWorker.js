"use strict";
const _addEventListener = addEventListener;
function removeGlobals(){
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
  let current = globalThis;
  do {
    Object.getOwnPropertyNames(current).forEach((name) => {
      if (keepProperties.indexOf(name) === -1) {
        delete current[name];
      }
    });
    current = Object.getPrototypeOf(current);
  } while (current !== Object.prototype);
}

addEventListener("message", ({ data }) => {
  const { code, doc } = data;
  const resolver = new Proxy(doc, {
    get(_, key) {
      return doc[key]
    },
    set(_, key, value) {
      doc[key] = value;
      return true;
    }
  })
  const _postMessage = postMessage;
  removeGlobals()
  console.log(code)
  new Function("$", code)(resolver);

  for(const key in doc) {
    if(typeof doc[key] === "function") {
      delete doc[key]
    }
  }
  _postMessage(doc);
});
