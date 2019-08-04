# ls-service-form2json

![npm](https://img.shields.io/npm/dt/litespeed.js.svg)
[![npm version](https://badge.fury.io/js/ls-service-form2json.svg)](https://badge.fury.io/js/ls-service-form2json)
[![Build Status](https://travis-ci.org/litespeed-js/ls-service-form2json.svg?branch=master)](https://travis-ci.org/litespeed-js/ls-service-form2json)
[![Chat With Us](https://img.shields.io/gitter/room/litespeed-js/community.svg)](https://gitter.im/litespeed-js/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

Litespeed.js service component that converts an HTML form element to a valid JSON object.

## Installation

This package is wrapped as a [Litespeed.js](https://github.com/litespeed-js/litespeed.js) component. To use it, you need to init a new [Litespeed.js](https://github.com/litespeed-js/litespeed.js) project or use an exisiting [Litespeed.js](https://github.com/litespeed-js/litespeed.js) project. To learn more about [Litespeed.js](https://github.com/litespeed-js/litespeed.js) [Javascript web framework](https://github.com/litespeed-js/litespeed.js) got to the [official repository](https://github.com/litespeed-js/litespeed.js).

Install with [NPM](https://www.npmjs.com/):

```bash
npm install ls-service-form2json
```

Install with CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/ls-service-form2json"></script>
```

## Getting Started

### Keys & Values

The form2json service uses each form element name attribute as a key for the output JSON object and the element value as the JSON key value.

### Arrays & Objects

The form2json service uses a FIELDSET tag to wrap a set of primitives as an object. When multiple form elements have the same name attribute the will be joined into an array. If you wish to force an array casting for single elements who have a unique name attribute, add the data-cast-to="array" attribute to the required form element.

### Data Casting

The form2json service is trying to cast HTML form elements to their most suitable var types. For example, number or range input elements will be converted to into integers, while text or search input elements will be converted to strings. To force a specific type use the data-cast-to="array" on your HTML element. The *data-cast-to* attribute accepts these values: string, int, integer, bool, boolean, array, and JSON. The JSON type converts a resulting form object (FIELDSET tag) to a JSON string.

### Radio & Checkbox

Note that radio button elements can only be true or false and are cast to boolean values. Checkbox elements are automatically cast to an array list.

### Example

This basic form:
```html
<form id="unique">
    <input type="text" name="title" value="Hello World!" />
    <input type="text" name="firstname" value="Eldad" />
    <input type="text" name="lastname" value="Fux" />
</form>
```

```js
let form = document.getElementById('unique');
let form2json = window.ls.container.get('form2json');

return form2json.toJson(form);
```

Will result to this JSON:
```json
{
    "title": "Hello World!",
    "firstname": "Eldad",
    "lastname": "Fux",
}
```

This form:
```html
<form id="unique">
    <input type="text" name="title" value="Coding Languages" />

    <fieldset name="language">
        <input type="text" name="name" value="PHP" />
        <input type="text" name="link" value="https://www.php.net/" />
    </fieldset>
    <fieldset name="language">
        <input type="text" name="name" value="NodeJS" />
        <input type="text" name="link" value="https://nodejs.org/en/" />
    </fieldset>
    <fieldset name="language">
        <input type="text" name="name" value="Ruby" />
        <input type="text" name="link" value="https://www.ruby-lang.org/en/" />
    </fieldset>
</form>
```

```js
let form = document.getElementById('unique');
let form2json = window.ls.container.get('form2json');

return form2json.toJson(form);
```

Will result to this JSON including a list of objects:
```json
{
    "title": "Coding Languages",
    "language": [
        { "name": "PHP", "link": "https://www.php.net/"},
        { "name": "NodeJS", "link": "https://nodejs.org/en/"},
        { "name": "Ruby", "link": "https://www.ruby-lang.org/en/"}
    ]
}
```

[For more examples visit our jest test file](/tests/form2json.test.js)

## Contributing

All code contributions - including those of people having commit access - must go through a pull request and approved by a core developer before being merged. This is to ensure proper review of all the code.

Fork the project, create a feature branch, and send us a pull request.

For security issues, please email security@appwrite.io instead of posting a public issue in GitHub.

## Copyright and license

The MIT License (MIT) http://www.opensource.org/licenses/mit-license.php
