# BU Block Imports

Standardized set of components, hooks, and utilities that can be used within WordPress blocks.

__In Development:__ This is just starting (March 2025) and it should be assumed that nothing actually works yet. Bug reports, feature requests, questions, and pull requests are welcome.

## Installation

1. Run `npm i @bostonuniversity/block-imports -D` within your WordPress theme or plugin.
    - If you want to work from a specific branch, you can set the path in package.json to `git@github.com:bu-ist/block-imports.git#branch-name`.
2. Within your block editor code, import the relevant component(s) e.g. `import { LoadingSpinner } from '@bostonuniversity/block-imports';`.
3. Create a file in the root of the repo named `babel.config.js` and add the following code: `module.exports = { presets: ['@babel/preset-env', '@babel/preset-react'], };`.
4. Find `webpack.config.js` in the root of your repo and look for the rules section in `const blocksConfig`. Add the following rule:

```js
{
  test: /\.(js|mjs)$/,
  loader: 'babel-loader',
  exclude: /node_modules\/(?!(@bostonuniversity)\/).*/,
},
```

## Components

[Components](https://www.w3schools.com/react/react_components.asp) are independent and reusable bits of code. They serve the same purpose as JavaScript functions, but work in isolation and return HTML.

__These should be named in PascalCase without a BU namespace. They should use the [`.mjs`](https://v8.dev/features/modules#mjs) extension.__

- [HelpWrapper](components/HelpWrapper)
- [LoadingSpinner](components/LoadingSpinner)
- [PostChooser](components/PostChooser)
- PostChooserSidebar
- Pagination

### Hooks

These are [React Hooks](https://www.w3schools.com/react/react_hooks.asp), not WordPress Hooks. Hooks allow function components to have access to state, lifecycle methods, and other React features.

__These should be named in camelCase without a BU namespace. They should use the [`.mjs`](https://v8.dev/features/modules#mjs) extension.__

- [useMedia](hooks/useMedia)
- [useRequestData](hooks/useRequestData)
- useGetPagination
- useDebouncedInput

### Utils

These are just your standard garden variety javascript functions. They don't need all the features that hooks have.

__These should be named in camelCase without a BU namespace. They should use the [`.mjs`](https://v8.dev/features/modules#mjs) extension.__

- getImageData

---

### Development

Each folder should contain a README.md file explaining the purpose and usage of the component/hook/util.

## Debugging

There is no build for this package. You can debug it though by running `npx wp-scripts build index.js` and ensure all paths can be resolved.

## Publishing & Release Process

This package is managed through NPM.  It can be found here: <https://www.npmjs.com/package/@bostonuniversity/block-components>

This repo has an action that will run whenever a new release is created. HOWEVER, THIS WILL STOP WORKING SOON...

To learn more about how NPM is managed for BU projects, please read <https://developer.bu.edu/webteam/developer/vcs/npm-javascript-packages/>

NOTE: you should verify that the package JSON file includes the following to make publishing easier:

```javascript
"publishConfig": {
  "access": "public"
}
```
