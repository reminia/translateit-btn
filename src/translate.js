class TranslateIt {
  static defaultOptions = {
    lang: ["English", "Chinese", "French"],
    selector: ".post",
    endpoint: "http://localhost:8080/translate",
    callback: (json) => json.reply
  };

  constructor(selector, options) {
    this.selector = selector;
    this.options = options;
  }

  translate() {
    this.options = Object.assign({}, TranslateIt.defaultOptions, this.options);
    const selector = this.selector || this.options.selector;
    let block = document.querySelector(selector);
    let select = document.createElement("select");
    select.classList.add("translate-btn");
    select.addEventListener("change", (event) => {
      let lang = event.target.value;
      this.translateElement(block, this.options, lang);
    });
    const langs = this.options.lang;
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
    block.insertAdjacentElement("beforebegin", select);
  }

  translateElement(element, options, lang) {
    fetch(options.endpoint, {
      method: "POST", body: JSON.stringify({
        lang: lang,
        content: element.innerHTML
      })
    })
    .then(resp => resp.json())
    .then(json => {
      let content = options.callback(json);
      if (content) {
        element.innerHTML = content;
      } else {
        console.error("error response", json);
      }
    });
  }
}

const translateIt = {
  translate: function (selector, options) {
    new TranslateIt(selector, options).translate();
  }
};

if (typeof module != "undefined") {
  module.exports = translate;
}
