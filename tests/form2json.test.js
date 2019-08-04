// __tests__/displayUser-test.js
'use strict';

require('litespeed.js');
require('ls-service-form2json');

test('basic form', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="Hello World!" />
    <input type="text" name="firstname" value="Eldad" />
    <input type="text" name="lastname" value="Fux" />
</form>`;

        window.ls.run(window);

        let form        = document.getElementById('unique');
        let form2json   = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({ title: 'Hello World!', firstname: 'Eldad', lastname: 'Fux' });
});

test('basic array', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="Coding Languages" />
    <input type="text" name="language" value="PHP" />
    <input type="text" name="language" value="JS" />
    <input type="text" name="language" value="Ruby" />
    <input type="text" name="language" value="Python" />
    <input type="text" name="language" value="NodeJS" />
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({ title: 'Coding Languages', language: ['PHP', 'JS', 'Ruby', 'Python', 'NodeJS'] });
});

test('basic array (force single value)', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="Coding Languages" />
    <input type="text" name="language" value="PHP" data-cast-to="array" />
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({ title: 'Coding Languages', language: ['PHP'] });
});

test('basic form with data casting', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="Coding Languages" />
    <input type="text" name="number1" value="31" data-cast-to="int" />
    <input type="text" name="number2" value="31" data-cast-to="integer" />
    <input type="text" name="bool1" value="" data-cast-to="bool" />
    <input type="text" name="bool2" value="" data-cast-to="boolean" />
    <input type="text" name="bool3" value="x" data-cast-to="bool" />
    <input type="text" name="bool4" value="x" data-cast-to="boolean" />
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({ title: 'Coding Languages', number1: 31, number2: 31, bool1: false, bool2: false, bool3: true, bool4: true });
});


test('basic array with objects', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="Coding Languages" />

    <fieldset name="language">
        <input type="text" name="name" value="PHP" />
        <input type="text" name="url" value="https://www.php.net/" />
    </fieldset>
    <fieldset name="language">
        <input type="text" name="name" value="NodeJS" />
        <input type="text" name="url" value="https://nodejs.org/en/" />
    </fieldset>
    <fieldset name="language">
        <input type="text" name="name" value="Ruby" />
        <input type="text" name="url" value="https://www.ruby-lang.org/en/" />
    </fieldset>
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({
        title: 'Coding Languages', language: [
            { name: 'PHP', url: 'https://www.php.net/' },
            { name: 'NodeJS', url: 'https://nodejs.org/en/' },
            { name: 'Ruby', url: 'https://www.ruby-lang.org/en/' }
        ]
    });
});

test('basic form with checkboxes', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="What Languages do you know?" />
    <input type="checkbox" name="language" value="PHP" checked>
    <input type="checkbox" name="language" value="JS">
    <input type="checkbox" name="language" value="Python" checked>
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({
        title: 'What Languages do you know?', language: ['PHP', 'Python']
    });
});

test('basic form with radio buttons', () => {
    expect(function () {
        document.body.innerHTML = `<form id="unique">
    <input type="text" name="title" value="What is the best language?" />
    <input type="radio" name="language" value="PHP">
    <input type="radio" name="language" value="JS" checked>
    <input type="radio" name="language" value="Python">
</form>`;

        window.ls.run(window);

        let form = document.getElementById('unique');
        let form2json = window.ls.container.get('form2json');

        return form2json.toJson(form);
    }()).toEqual({
        title: 'What is the best language?', language: 'JS'
    });
});
