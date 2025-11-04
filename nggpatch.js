// Deobfuscated and renamed variables for clarity

let wasm_bindgen;
(function () {
  // Helper constants (string keys used in obfuscated code)
  const STR_UNDEFINED = "undefined";
  const STR_HREF = "href";
  const STR_SRC = "src";
  const STR_CURRENT_SCRIPT = "currentScript";
  const STR_MAIN = "main";
  const STR_BYTELENGTH = "byteLength";
  const STR_BUFFER = "buffer";
  const STR_MEMORY = "memory";
  const STR_UTF8 = "utf-8";
  const STR_ENCODEINTO = "encodeInto";
  const STR_FUNCTION = "function";
  const STR_ENCODE = "encode";
  const STR_SET = "set";
  const STR_LENGTH = "length";
  const STR_SUBARRAY = "subarray";
  const STR_CHARCODEAT = "charCodeAt";
  const STR_SLICE = "slice";
  const STR_WRITTEN = "written";
  const STR_DECODE = "decode";
  const STR_APPLY_PATCH = "apply_patch";
  const STR_INSTANTIATE_STREAMING = "instantiateStreaming";
  const STR_CONTENT_TYPE = "Content-Type";
  const STR_GET = "get";
  const STR_HEADERS = "headers";
  const STR_APPLICATION_WASM = "application/wasm";
  const STR_WASM_STREAMING_FALLBACK = "`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n";
  const STR_WARN = "warn";
  const STR_ARRAYBUFFER = "arrayBuffer";
  const STR_INSTANTIATE = "instantiate";
  const STR_INSTANCE = "Instance";
  const STR_WBG = "wbg";
  const STR_EXPORTS = "exports";
  const STR_WASM_MODULE = "__wbindgen_wasm_module";
  const STR_MODULE = "Module";
  const STR_BG_WASM = "_bg.wasm";
  const STR_REPLACE = "replace";
  const STR_STRING = "string";
  const STR_ASSIGN = "assign";
  
  // API object
  const api = {};
  let wasmInstance;
  let scriptPath;
  
  // Determine current script path or location
  if (typeof document === STR_UNDEFINED) {
    scriptPath = location[STR_HREF];
  } else {
    scriptPath = new URL(document[STR_CURRENT_SCRIPT][STR_SRC], location[STR_HREF]).toString();
  }

  let wasmModule;
  
  // Entrypoint for module (main)
  api[STR_MAIN] = function () {
    wasmModule[STR_MAIN]();
  };

  let lastEncodedLength = 0;
  let cachedUint8Memory = null;

  // Get cached Uint8Array for wasm memory
  function getUint8Memory() {
    if (cachedUint8Memory === null || cachedUint8Memory[STR_BYTELENGTH] === 0) {
      cachedUint8Memory = new Uint8Array(wasmModule[STR_MEMORY][STR_BUFFER]);
    }
    return cachedUint8Memory;
  }

  // Text encoder
  const encoder = new TextEncoder(STR_UTF8);

  // Encoding function (adapts to browser support)
  const encodeString = typeof encoder[STR_ENCODEINTO] === STR_FUNCTION ?
    function (str, view) {
      return encoder[STR_ENCODEINTO](str, view);
    } :
    function (str, view) {
      const buf = encoder[STR_ENCODE](str);
      view[STR_SET](buf);
      return { read: str[STR_LENGTH], written: buf[STR_LENGTH] };
    };

  // Helper for passing strings to WASM
  function passStringToWasm(str, malloc, realloc) {
    if (realloc === undefined) {
      const buf = encoder[STR_ENCODE](str);
      const ptr = malloc(buf[STR_LENGTH]);
      getUint8Memory()[STR_SUBARRAY](ptr, ptr + buf[STR_LENGTH])[STR_SET](buf);
      lastEncodedLength = buf[STR_LENGTH];
      return ptr;
    }
    let len = str[STR_LENGTH];
    let ptr = malloc(len);
    const mem = getUint8Memory();
    let offset = 0;
    for (; offset < len; offset++) {
      const code = str[STR_CHARCODEAT](offset);
      if (code > 0x7F) {
        break;
      }
      mem[ptr + offset] = code;
    }
    if (offset !== len) {
      if (offset !== 0) {
        str = str[STR_SLICE](offset);
      }
      ptr = realloc(ptr, len, len = offset + str[STR_LENGTH] * 3);
      const view = getUint8Memory()[STR_SUBARRAY](ptr + offset, ptr + len);
      const result = encodeString(str, view);
      offset += result[STR_WRITTEN];
    }
    lastEncodedLength = offset;
    return ptr;
  }

  let cachedInt32Memory = null;

  // Get cached Int32Array for wasm memory
  function getInt32Memory() {
    if (cachedInt32Memory === null || cachedInt32Memory[STR_BYTELENGTH] === 0) {
      cachedInt32Memory = new Int32Array(wasmModule[STR_MEMORY][STR_BUFFER]);
    }
    return cachedInt32Memory;
  }

  // Text decoder
  const decoder = new TextDecoder(STR_UTF8, { ignoreBOM: true, fatal: true });
  decoder[STR_DECODE]();

  // Example function for decoding WASM output (specifically for an apply_patch export)
  api[STR_APPLY_PATCH] = function (inputStr) {
    try {
      const stackPointer = wasmModule.__wbindgen_add_to_stack_pointer(-16);
      const ptr = passStringToWasm(inputStr, wasmModule.__wbindgen_malloc, wasmModule.__wbindgen_realloc);
      const len = lastEncodedLength;
      wasmModule[STR_APPLY_PATCH](stackPointer, ptr, len);
      var resultPtr = getInt32Memory()[stackPointer / 4 + 0];
      var resultLen = getInt32Memory()[stackPointer / 4 + 1];
      return decoder[STR_DECODE](getUint8Memory()[STR_SUBARRAY](resultPtr, resultPtr + resultLen));
    } finally {
      wasmModule.__wbindgen_add_to_stack_pointer(16);
      wasmModule.__wbindgen_free(resultPtr, resultLen);
    }
  };

  // Instantiates a WebAssembly module (with streaming fallback)
  async function loadWasm(source, imports) {
    if (typeof Response === STR_FUNCTION && source instanceof Response) {
      if (typeof WebAssembly[STR_INSTANTIATE_STREAMING] === STR_FUNCTION) {
        try {
          return await WebAssembly[STR_INSTANTIATE_STREAMING](source, imports);
        } catch (e) {
          if (source[STR_HEADERS][STR_GET](STR_CONTENT_TYPE) != STR_APPLICATION_WASM) {
            console[STR_WARN](STR_WASM_STREAMING_FALLBACK, e);
          } else {
            throw e;
          }
        }
      }
      const arrayBuffer = await source[STR_ARRAYBUFFER]();
      return await WebAssembly[STR_INSTANTIATE](arrayBuffer, imports);
    } else {
      const result = await WebAssembly[STR_INSTANTIATE](source, imports);
      if (result instanceof WebAssembly[STR_INSTANCE]) {
        return { instance, module };
      } else {
        return result;
      }
    }
  }

  // Prepares imports object for WASM instantiation (example)
  function getImports() {
    const imports = {};
    imports[STR_WBG] = {};
    return imports;
  }

  // Sets up additional imports (placeholder)
  function setupImports(imports, module) {}

  // Initializes the WASM instance and module
  function initExports(resultInstance, resultModule) {
    wasmModule = resultInstance[STR_EXPORTS];
    initWasm.__wbindgen_wasm_module = resultModule;
    cachedInt32Memory = null;
    cachedUint8Memory = null;
    wasmModule.__wbindgen_start();
    return wasmModule;
  }

  // Main WASM initialization function
  async function initWasm(wasmPath) {
    if (typeof wasmPath === STR_UNDEFINED) {
      wasmPath = scriptPath[STR_REPLACE](/\.js$/, STR_BG_WASM);
    }
    const imports = getImports();
    if (
      typeof wasmPath === STR_STRING ||
      typeof Request === STR_FUNCTION && wasmPath instanceof Request ||
      typeof URL === STR_FUNCTION && wasmPath instanceof URL
    ) {
      wasmPath = fetch(wasmPath);
    }
    setupImports(imports);
    const { instance, module } = await loadWasm(await wasmPath, imports);
    return initExports(instance, module);
  }

  // Final API assignment (bind the initialization method and expose API)
  wasm_bindgen = Object[STR_ASSIGN](initWasm, { initSync: undefined }, api);
})();
