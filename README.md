# SuperExpressive Playground

This is the playground for [SuperExpressive Library](https://github.com/francisrstokes/super-expressive).

<details>
  <summary>Table Of Content</summary>
  <p>

- [SuperExpressive Playground](#superexpressive-playground)
  - [Working application](#working-application)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Challenges](#challenges)
    - [Monaco Editor](#monaco-editor)
    - [Executing the value of the editor](#executing-the-value-of-the-editor)
    - [Scully and Monaco](#scully-and-monaco)
    - [Mobile Responsiveness](#mobile-responsiveness)
  - [Contribution](#contribution)
  - [Credit](#credit)
  - [License](#license)
  </p>
</details>

## Working application

Check out the **working app** -> https://sepg.netlify.app/

![SuperExpressive Playground by @nartc][demo]

## Features

- Use the code editor to write **Regular Expression** using **SuperExpressive API**
- Test the generated RegExp

- [x] Mobile friendly - [@trungk18][trung]
- [ ] Automatic execution

## Technologies

- [Angular](https://angular.io)
- [Scully](https://scully.io)
- [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- [NgxMonacoEditor](https://github.com/atularen/ngx-monaco-editor)
- [TailwindCSS](https://tailwindcss.com/)

## Challenges

There are a couple of challenges that I ran into while working on this project.

### Monaco Editor

Monaco is a powerful library, but it's also very complex. The way it's loaded is pretty tricky. However, the integration is quite smooth using `ngx-monaco-editor`. It was quite satisfied when I was able to load extra library type definitions (for SuperExpressive intellisense) into the Monaco instance

### Executing the value of the editor

This is one tricky task as `eval()` is considered bad practice. So, I use `new Function()` instead. Also, I need to execute a snippet like:

```ts
SuperExpressive().anyChar.toRegex();
```

which will execute `SuperExpressive()` which is a 3rd-party API. Hence, in order for me to execute that, I need to assign `SuperExpressive` onto the `window` object.

```ts
import SuperExpressive from "super-expressive";

window.SuperExpressive = SuperExpressive;
```

Furthermore, I only want to execute a single-invoke of `SuperExpressive()` at a time, so I need to trim the editor's value.

### Scully and Monaco

Scully **will not** work with Monaco as is because Scully will generate the `html` from the Angular build bundle and in turns will inject several `<script>` tags that were used to load Monaco. With multiple `<script>` tags with the same value (because Scully generates multiple `html` for multiple routes), Monaco complains that it's already been loaded.

To resolve that, I write a quick plugin to remove Monaco related `<script>` from the generated `html` by Scully.

```ts
function removeMonacoScriptPluginHandler(html: string) {
  return Promise.resolve(
    html
      .replace(/<script.+(?:editor\.main(?:\.nls)\.js)"><\/script>/g, "") // remove duplicate loader
      .replace(/<script.+(?:tsMode\.js|typescript\.js)"><\/script>/g, "") // remove duplicate loader
      .replace(/<ngx-monaco-editor.+><\/ngx-monaco-editor>/g, "") // remove flickering
  );
}
```

### Mobile Responsiveness

Again, because of how Monaco is loaded and rendered, it's tricky to get Mobile Responsiveness right which I haven't paid too much attention to for the first iteration.

## Contribution

Any contribution is welcome

## Credit

- [Francis Stokes](https://github.com/francisrstokes) for the SuperExpressive logo

## License

The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[trung]: https://github.com/trungk18
[demo]: src/assets/images/super-expressive-demo.gif
