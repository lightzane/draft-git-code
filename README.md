# Git Code

Easily get a list of repositories and open them in GitHub or vscode.

You can also host static websites in your local when your repository contains the following:

- `index.html`
- `docs/index.html`
- `site/index.html`
- `build/index.html`

## Installation

```bash
npm i -g git-code
```

## Add Parent Directory

```bash
gcode add "path/to/parent"
```

Or you can add a directory via the **UI interface**
but you will have to restart the server again
to serve the static assets within your repository.

## Starting Server and accessing UI interface

```bash
gcode
```

Type `gcode help` for more options.

## Environment Variables

| Key          | Description                                |
| ------------ | ------------------------------------------ |
| `NO_BROWSER` | Disables the browser to open automatically |

## Docs

Aside from static assets, you can also add a main asset that can easily be accessible via the `Docs` tab.

Simple add the a parent directory with `gcode/`.

```txt
~
└─ gcode/
    └─ docs/
```

Put all your assets inside the `docs/` sub-directory

### Navigate back from Docs to Git Code

You can simply add a link to `http://localhost:3500`.

Or if you want to use your `Home` page in your website as a proxy to navigate back to `Git Code`, then
in your static website, you can add the following snippet to your proxy Homepage:

```html
<script>
  // Automatically route back
  if (document.referrer.includes('_')) {
    window.location.href = 'http://localhost:3500';
  }
</script>
```

The underscore (`_`) is a special route in `Git Code` that tells the server to access the static assets.
When you are using a **single-page application** as a website, then make sure it does not contain any
underscore. Otherwise, you're good to improvise the snippet acoording to your needs.

## Hidden Features not in UI

```bash
gcode -e "some text" # -> c29tZSB0ZXh0
gcode -d "c29tZSB0ZXh0" # -> some text
```
