class TranslateIt {

  static defaultOptions = {
    lang: ['English', 'Chinese', 'French'],
    endpoint: 'http://localhost:8080/translate',
  };

  constructor(selector, options) {
    this.selector = selector;
    this.options = Object.assign({}, TranslateIt.defaultOptions, options);
    this.init();
  }

  init() {
    this.block = document.querySelector(this.selector);
    //cache the original content
    this.originalContent = this.block.innerHTML;
  }

  translate() {
    const div = document.createElement('div');
    const button = document.createElement('button');
    const ul = document.createElement('ul');
    div.classList.add('translate-div');
    div.addEventListener('mouseleave', function() {
      ul.style.display = 'none';
    });
    button.textContent = 'Translate';
    button.classList.add('translate-btn');
    button.addEventListener('click', function() {
      ul.style.display = (ul.style.display === 'block') ? 'none' : 'block';
    });
    ul.classList.add('translate-ul');
    div.appendChild(button);
    div.appendChild(ul);
    this.block.insertAdjacentElement('beforebegin', div);
    for (const lang of this.options.lang) {
      this.createOption(ul, lang, ['translate-li']);
    }
  }

  createOption(ul, text, classes) {
    const li = document.createElement('li');
    li.innerText = text;
    classes.forEach(name => li.classList.add(name));
    ul.appendChild(li);
    const self = this;
    li.addEventListener('click', function() {
      self.translateElement(li.textContent);
      ul.style.display = 'none';
    });
  }

  translateElement(lang) {
    /* global gtag */
    if (typeof gtag === 'function') {
      gtag('event', 'translate', {
        'page': document.URL,
        'lang': lang,
      });
    }
    fetch(this.options.endpoint, {
      method: 'POST',
      body: JSON.stringify({
        lang: lang,
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

const translateIt = {
  translate: function(selector, options) {
    new TranslateIt(selector, options).translate();
  },
};

if (typeof module != 'undefined') {
  module.exports = translateIt;
}
