# translateit-btn

A button that can be added to html page to translate the content to any language.
It's a companion of the backend [translateit](https://github.com/reminia/translateit) api.

## Usage

Add the script and css to your html page and call the translate function.

```html
<link rel="stylesheet" href="/path/to/styles/translateit-btn.min.css">
<script src="/path/to/translateit-btn.min.js"></script>
<script>translateIt.translate(selector, options)</script>
```

* selector, html element selector in which the content will be translated.
* options:
  * lang, array of languages to be selected, default to `['English', 'Chinese', 'French']`
  * endpoint, the remote endpoint to accept translate request, default to `http://localhost:8080/translate`

Wanner to customize the css style, overwrite the default [one](src/style/translateit-btn.css).

You can also track the translate behavior in google analysis by configuring **gtag** with
`gtag('config', your-ga-id);`.

[](https://)
