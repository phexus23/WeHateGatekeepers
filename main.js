const STRINGS = {
  match: "match",
  nowggBaseUrl: "https://now.gg/play/",
  slash: "/",
  period: ".",
  split: "split",
  empty: "",
  text: "text",
  open: "open",
  write: "write",
  close: "close",
  value: "value",
  inputId: "nggurl",
  getElementById: "getElementById",
  appsApi: "aHR0cHM6Ly9tYXRoc3Nwb3QuY29tL2FwaS9hcHBzL3YxL3BvcHVsYXIvYXBwcy9saXN0",
  json: "json",
  data: "data",
  playPageUrl: "playPageUrl",
  filter: "filter",
  toLowerCase: "toLowerCase",
  name: "name",
  localeCompare: "localeCompare",
  sort: "sort",
  innerHTML: "innerHTML",
  btnBoxId: "btnBox",
  getElementsByClassName: "getElementsByClassName",
  ldBtn: "ldBtn",
  button: "button",
  createElement: "createElement",
  className: "className",
  btnClass: "btn",
  onclick: "onclick",
  log: "log",
  query: "?",
  appendChild: "appendChild",
  forEach: "forEach",
  onload: "onload",
  defaultPlayUrl: "https://now.gg/play/roblox-corporation/5349/roblox"
};

const { apply_patch } = wasm_bindgen;

async function run() {
  await wasm_bindgen();
}
run();

function buildNowggPlayUrl(url) {
  // Match URL: https://now.gg/(apps|play)/company/id/game
  let matchResult = url.match(/https:\/\/now\.gg\/(?:apps|play)\/(.+)\/([0-9]+)\/(.+)/);
  if (!matchResult) {
    return false;
  }
  return `${STRINGS.nowggBaseUrl}${matchResult[1]}${STRINGS.slash}${matchResult[2]}${STRINGS.slash}${matchResult[3].split(STRINGS.period)[0]}${STRINGS.empty}`;
}

async function loadNowggGame(url) {
  url = buildNowggPlayUrl(url);
  if (!url) return;
  const response = await fetch(url);
  let html = await response.text();
  html = apply_patch(html);
  document.open();
  document.write(html);
  document.close();
}

function submitUrl() {
  loadNowggGame(document.getElementById(STRINGS.inputId).value);
  return false;
}

async function renderGamesList() {
  let response = await fetch(atob(STRINGS.appsApi));
  let responseJson = await response.json();
  let games = responseJson.data;
  games = games.filter(game =>
    buildNowggPlayUrl(game.playPageUrl)
  );
  games = games.sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  document.getElementsByClassName(STRINGS.btnBoxId)[0].innerHTML = STRINGS.empty;
  document.getElementById(STRINGS.ldBtn).innerHTML = STRINGS.empty;
  games.forEach(game => {
    let button = document.createElement(STRINGS.button);
    button.innerHTML = game.name;
    button.className = STRINGS.btnClass;
    button.onclick = function () {
      console.log(game.playPageUrl);
      loadNowggGame(game.playPageUrl.split(STRINGS.query)[0]);
    };
    document.getElementsByClassName(STRINGS.btnBoxId)[0].appendChild(button);
  });
}

setTimeout(() => {
  document.onload = loadNowggGame(STRINGS.defaultPlayUrl);
}, 1000);
