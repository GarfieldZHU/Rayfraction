# Rayfraction

[![https://www.npmjs.com/package/electron/v/9.0.2)](https://img.shields.io/badge/electron-v9.0-47848F)](https://www.npmjs.com/package/electron/v/9.0.2)
[![https://www.npmjs.com/package/node/v/12.16.2)](https://img.shields.io/badge/node-v12.16-brightgreen)](https://www.npmjs.com/package/node/v/12.16.2)
[![https://www.npmjs.com/package/typescript/v/3.9.2](https://img.shields.io/badge/typescript-v3.9.2-blue)](https://www.npmjs.com/package/typescript/v/3.9.2)
[![https://www.npmjs.com/package/react/v/16.13.1)](https://img.shields.io/badge/react-v16.13.1-61dafb)](https://www.npmjs.com/package/react/v/16.13.1)




## Install
Clone the repository with Git
And then install the dependencies:

```bash
yarn install
```

## Develop
Both processes have to be started **simultaneously** in different console tabs:

```bash
yarn start-renderer-dev
yarn start-main-dev
```

This will start the application with hot-reload so you can instantly start developing your application.

You can also run do the following to start both in a single process:

```bash
yarn start-dev
```

## Packaging
We use [Electron builder](https://www.electron.build/) to build and package the application. By default you can run the following to package for your current platform:

```bash
yarn dist
```

This will create a installer for your platform in the `releases` folder.

You can make builds for specific platforms (or multiple platforms) by using the options found [here](https://www.electron.build/cli). E.g. building for all platforms (Windows, Mac, Linux):

```bash
yarn dist -mwl
```

## Husky and Prettier
This project comes with both Husky and Prettier setup to ensure a consistent code style. 

To change the code style, you can change the configuration in `.prettierrc`. 

In case you want to get rid of this, you can removing the following from `package.json`:

1. Remove `precommit` from the `scripts` section
1. Remove the `lint-staged` section
1. Remove `lint-staged`, `prettier`, `eslint-config-prettier`, and `husky` from the `devDependencies`

Also remove all mentions of Prettier from the `extends` section in `.eslintrc.json`.


## Guides and tips

- Suggest to write pure TypeScript for source code. JS is not encouraged and JSX file extension is disabled as module code. 

## About the template of this project
This project was set up from the template [electron-react-typescript](https://github.com/Robinfr/electron-react-typescript), which is heavily influenced by the [Electron React Boilerplate project](https://github.com/chentsulin/electron-react-boilerplate) and [React Redux TypeScript guide](https://github.com/piotrwitek/react-redux-typescript-guide).


