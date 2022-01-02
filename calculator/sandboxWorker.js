"use strict";
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
function* rangeIter(doc, from, to) {
  const matcher = /^([A-Z]+)([0-9]+)$/;
  const f = matcher.exec(from);
  const t = matcher.exec(to);
  for(let c = f[1]; c <= t[1]; c++) {
    for(let r = Number(f[2]); r <= Number(t[2]); r++) {
      const key = c + r;
      if(doc[key]) {
        yield key
      }
    }
  }
}
const proxyHandler = {
  get(doc, key) {
    const [from, to] = key.split(':')
    if (!to) {
      return doc[key];
    }
    return [...rangeIter(doc, from, to)].map(key => doc[key]);
  },
  set(doc, key, value) {
    doc[key] = value;
    return true;
  }
}
addEventListener("message", ({ data }) => {
  const { code, doc } = data;
  const resolver = new Proxy(doc, proxyHandler)
  const _postMessage = postMessage;
  removeGlobals()
  new Function("$", code)(resolver);

  for(const key in doc) {
    if(typeof doc[key] === "function") {
      delete doc[key]
    }
  }
  _postMessage(doc);
});
