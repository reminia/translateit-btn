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

function translateElement(element, options) {

}

// defines how to parse the resp from the endpoint
// return the result of translation
function callback(resp) {
  return "";
}