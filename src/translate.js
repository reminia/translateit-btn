// default options
let options = {
  lang: ["English", "Chinese"],
  selector: "post",
  endpoint: "http://localhost:8080/translate",
  callback: callback,
};

function translate(selector, options = {}) {
  const _selector = selector || options.selector;
  let block = document.querySelector(_selector);
  let select = document.createElement("select");
  select.classList.add("translate-btn");
  select.style.all = "float:right";
  select.addEventListener("change", (event) => {
    let lang = event.target.value;
    translateElement(block, options, lang);
  });
  const langs = options.lang;
  let option = document.createElement("option");
  option.text = "translate";
  option.classList.add("translate-option", "selected", "disabled");
  select.appendChild(option);
  for (let i = 0; i < langs.length; i++) {
    let option = document.createElement("option");
    option.text = langs[i];
    option.classList.add("translate-option");
    select.appendChild(option);
  }
  block.prepend(select);
}

function translateElement(element, options, lang) {
  fetch(options.endpoint, {
    method: "POST",
    body: JSON.stringify({
      lang: lang,
      content: element.innerHTML
    })
  })
  .then(resp => resp.json())
  .then(json => {
    let content = callback(json);
    element.innerHTML = content;
  });
}

// defines how to parse the json resp from the endpoint
// return the result of translation
function callback(json) {
  return json.reply;
}