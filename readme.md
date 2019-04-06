# js-forkify

Course project from
[The Complete JavaScript Course](https://www.udemy.com/the-complete-javascript-course/?data_h=AkMYeF9bRXo%3D) on Udemy by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman)


Initially started purely in JavaScript, I then moved to nearly purely TypeScript.

Dev setup
- `webpack-dev-server` for hot reload during development
- `tslint` for linting TypeScript (moslty depended on VS Code's `tslint` extension)
- VS Code is wonderful, a few must have plugins
  - [Auto Close Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag)
  - [TODO Highlight](https://marketplace.visualstudio.com/items?itemName=wayou.vscode-todo-highlight)
  - [TSlint](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin)
  - [Vim](https://marketplace.visualstudio.com/items?itemName=vscodevim.vim)
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Settings Sync](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)
- unittest framework (TODO)

Build tools
- Initially, I used `tsc` command to compile from `src` dir (TypeScript) to `built` dir (JavaScript). Then I ask `webpack` to start with `built/index.js` as entry point and build `dist/js/bundle.js`.
  - `index.html` is copied over by `html-webpack-plugin`, other static assets are manually copied over (TODO)
- With `webpack` and `awesome-typescript-loader`, we can compile/bundle from `src` (TypeScript) directy to `dist`
  - `awesome-typescript-loader` still respects `tsconfig.json` (I guess other than `outDir` field).
  - ref1: https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html
  - ref2: ref1 has outdated info about webpack rules/loaders, see this on how to fix https://stackoverflow.com/questions/39919793/tslint-loader-with-webpack-2-1-0-beta-25/39997947#39997947


To start this app
`npm install`
then
`npm start`
