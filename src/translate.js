class TranslateIt {

  static defaultOptions = {
    lang: ['English', 'Chinese', 'French'],
    selector: '.post',
    endpoint: 'http://localhost:8080/translate',
  };

  constructor(selector, options) {
    this.selector = selector || this.options.selector;
    this.options = Object.assign({}, TranslateIt.defaultOptions, options);
  }

  translate() {
    const block = document.querySelector(this.selector);

    const select = document.createElement('select');
    select.classList.add('translate-btn');
    select.addEventListener('change', (event) => {
      const lang = event.target.value;
      this.translateElement(block, this.options, lang);
    });
    block.insertAdjacentElement('beforebegin', select);

    this.createOption(select, 'Translate', ['selected']);
    for (const lang of this.options.lang) {
      this.createOption(select, lang, ['translate-option']);
    }

  }

  createOption(select, text, classes) {
    const option = document.createElement('option');
    option.text = text;
    classes.forEach(name => option.classList.add(name));
    select.appendChild(option);
  }

  translateElement(element, options, lang) {
    fetch(options.endpoint, {
      method: 'POST', body: JSON.stringify({
        lang: lang,
        content: element.innerHTML,
      }),
    }).then(resp => resp.json()).then(json => {
      const content = json.reply;
      if (content) {
        element.innerHTML = content;
      } else {
        console.error('error response', json);
      }
    });
  }
}

const translateIt = {
  translate: function(selector, options) {
    new TranslateIt(selector, options).translate();
  },
};

if (typeof module != 'undefined') {
  module.exports = translateIt;
}
