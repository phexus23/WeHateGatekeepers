var _0x3711 = ["match", "https://now.gg/play/", "/", ".", "split", "", "text", "open", "write", "close", "value", "nggurl", "getElementById", "aHR0cHM6Ly9tYXRoc3Nwb3QuY29tL2FwaS9hcHBzL3YxL3BvcHVsYXIvYXBwcy9saXN0", "json", "data", "playPageUrl", "filter", "toLowerCase", "name", "localeCompare", "sort", "innerHTML", "btnBox", "getElementsByClassName", "ldBtn", "button", "createElement", "className", "btn", "onclick", "log", "?", "appendChild", "forEach", "onload", "https://now.gg/play/roblox-corporation/5349/roblox"];
const {
  apply_patch
} = wasm_bindgen;
async function run() {
  await wasm_bindgen();
}
run();
function checkNggUrl(_0xd523x3) {
  let _0xd523x4 = _0xd523x3[_0x3711[0]](/https:\/\/now\.gg\/(?:apps|play)\/(.+)\/([0-9]+)\/(.+)/);
  if (!_0xd523x4) {
    return false;
  }
  ;
  return `${_0x3711[1]}${_0xd523x4[1]}${_0x3711[2]}${_0xd523x4[2]}${_0x3711[2]}${_0xd523x4[3][_0x3711[4]](_0x3711[3])[0]}${_0x3711[5]}`;
}
async function getNggGame(_0xd523x3) {
  _0xd523x3 = checkNggUrl(_0xd523x3);
  if (!_0xd523x3) {
    return;
  }
  ;
  const _0xd523x6 = await fetch(_0xd523x3);
  let _0xd523x7 = await _0xd523x6[_0x3711[6]]();
  _0xd523x7 = apply_patch(_0xd523x7);
  document[_0x3711[7]]();
  document[_0x3711[8]](_0xd523x7);
  document[_0x3711[9]]();
}
function urlSubmit() {
  getNggGame(document[_0x3711[12]](_0x3711[11])[_0x3711[10]]);
  return false;
}
async function getGames() {
  let _0xd523xa = await fetch(atob(_0x3711[13]));
  _0xd523xa = await _0xd523xa[_0x3711[14]]();
  _0xd523xa = _0xd523xa[_0x3711[15]];
  _0xd523xa = _0xd523xa[_0x3711[17]](_0xd523xb => {
    return checkNggUrl(_0xd523xb[_0x3711[16]]);
  });
  _0xd523xa = _0xd523xa[_0x3711[21]]((_0xd523xc, _0xd523xd) => {
    return _0xd523xc[_0x3711[19]][_0x3711[18]]()[_0x3711[20]](_0xd523xd[_0x3711[19]][_0x3711[18]]());
  });
  document[_0x3711[24]](_0x3711[23])[0][_0x3711[22]] = _0x3711[5];
  document[_0x3711[12]](_0x3711[25])[_0x3711[22]] = _0x3711[5];
  _0xd523xa[_0x3711[34]](_0xd523xb => {
    let _0xd523xe = document[_0x3711[27]](_0x3711[26]);
    _0xd523xe[_0x3711[22]] = _0xd523xb[_0x3711[19]];
    _0xd523xe[_0x3711[28]] = _0x3711[29];
    _0xd523xe[_0x3711[30]] = function () {
      console[_0x3711[31]](_0xd523xb[_0x3711[16]]);
      getNggGame(_0xd523xb[_0x3711[16]][_0x3711[4]](_0x3711[32])[0]);
    };
    document[_0x3711[24]](_0x3711[23])[0][_0x3711[33]](_0xd523xe);
  });
}
setTimeout(() => {
  document[_0x3711[35]] = getNggGame(_0x3711[36]);
}, 1000);
