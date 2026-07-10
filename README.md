# Portfolio - Allan Wanderley Alves

Template Freelancer - Start Bootstrap, maintained for Start Bootstrap LLC.

**Access:**
[https://allanalves23.dev](https://allanalves23.dev)

## Develop

Install dependencies

```bash
npm i
```

____

Start Local Http Server

```bash
npm start
```

Open _index.html_ file and enjoy.

## Internationalization (i18n)

The site supports **English (default)** and **Brazilian Portuguese (pt-BR)**.

- The language is auto-detected from the visitor's browser (`navigator.language`): any `pt*` locale gets pt-BR, everything else falls back to English.
- A manual toggle in the navbar (PT-BR / EN) overrides detection and is persisted in `localStorage` under the `portfolio-lang` key.
- All translatable elements in `index.html` are tagged with `data-i18n="<key>"` (or `data-i18n-placeholder` for input placeholders), and the dictionaries for both languages live in [js/i18n.js](js/i18n.js).
- To add or change text: edit the English text in `index.html`, then update the same key in **both** the `en` and `pt-BR` dictionaries in `js/i18n.js`.

___

**Template Used:**
[https://startbootstrap.com/theme/freelancer](https://startbootstrap.com/theme/freelancer)

