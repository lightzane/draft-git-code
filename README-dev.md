# Git Code

## Environment Variables

| Key            | Description                                |
| -------------- | ------------------------------------------ |
| `GIT_CODE_DEV` | Enable development environment             |
| `NO_BROWSER`   | Disables the browser to open automatically |

## Development

### Server

For functional testing:

```bash
npm start
```

This will execute the following command: `node scripts/cleanup.mjs && tsc && node bin`

> `tsc` will generate required folders to be pushed to the repository.

### UI

See: https://github.com/lightzane/git-code-ui

## DOs and DONTs

This project is installed via command:

```
npm i -g git+https://github.com/lightzane/git-code
```

So there are things needed to keep in mind:

- ✅ `npm start` before pushing. This will generate the `bin` and `lib` folders which are needed for production / end-users

- ❌ **DO NOT ADD** scripts such as `npm run build` / `npm run prepare`

**Failing to follow these actions will result in an empty production build for end-users.**
