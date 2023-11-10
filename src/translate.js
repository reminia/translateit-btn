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
    const block = document.querySelector(selector);

    const select = document.createElement("select");
    select.classList.add("translate-btn");
    select.addEventListener("change", (event) => {
      const lang = event.target.value;
      this.translateElement(block, this.options, lang);
    });

    this.createOption(select, "Translate", ["selected"]);
    for (const lang of this.options.lang) {
      this.createOption(select, lang, ["translate-option"]);
    }

    block.insertAdjacentElement("beforebegin", select);
  }

  createOption(select, text, classes) {
    const option = document.createElement("option");
    option.text = text;
    classes.forEach(name => option.classList.add(name));
    select.appendChild(option);
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
