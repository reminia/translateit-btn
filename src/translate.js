class TranslateIt {

  static defaultOptions = {
    lang: ['English', 'Chinese', 'French'],
    selector: '.post',
    endpoint: 'http://localhost:8080/translate',
  };

  constructor(selector, options) {
    this.selector = selector || TranslateIt.defaultOptions.selector;
    this.options = Object.assign({}, TranslateIt.defaultOptions, options);
    this.init();
  }

  init() {
    this.block = document.querySelector(this.selector);
    //cache the original content
    this.originalContent = this.block.innerHTML;
  }

  translate() {
    const select = document.createElement('select');
    select.classList.add('translate-btn');
    select.addEventListener('change', this.translateElement.bind(this));
    this.block.insertAdjacentElement('beforebegin', select);

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

  translateElement(event) {
    if (event.target.selectedIndex === 0) {
      this.block.innerHTML = this.originalContent;
    } else {
      fetch(this.options.endpoint, {
        method: 'POST',
        body: JSON.stringify({
          lang: event.target.value,
          content: this.originalContent,
        }),
      }).then(resp => resp.json()).then(json => {
        const content = json.reply;
        if (content) {
          this.block.innerHTML = content;
        } else {
          console.error('error response', json);
        }
      });
    }
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
