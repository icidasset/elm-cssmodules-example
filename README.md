__CSS Modules with Elm__.

```
brew install elm
npm install
npm run dev
open http://localhost:8080/
```


## How it works

You define CSS modules in `/app`, where every css file is a "module".
For example, here we have `Main.css` and `Wrapper.css`, that becomes a javascript object:

```js
{
  "Main.classFromMain": "GeneratedClassNameByCSSModules",
  "Wrapper.somethingElse": "..."
}
```

To dissect it further, `"Main"` is the basename of `Main.css`, so you can store your files in subdirectories. For example, say we have `/app/css_components/Button.css`, that would become `{ "Button.example": "..." }`.

In our Elm code we can then use it like this:

```elm
view model =
  let
    cssmodule = (CSSModule.get model)
  in
    div
      [ cssmodule "Main.classFromMain" ]
      [ text "Hello world!" ]
```
