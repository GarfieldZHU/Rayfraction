# Rayfraction

[![](https://github.com/GarfieldZHU/Rayfraction/workflows/Rayfraction%20CI/badge.svg)](https://github.com/GarfieldZHU/Rayfraction/actions)


Rayfraction is an cross-platform application for playing with ***ray*** in images.

It is named by "ray" and "refraction". 

## Start

1. Run the following command to install dependencies:
```bash
yarn install
```

2. Start to debug as Electron application by the command:
```bash
yarn start-dev
```

Or, the main process and renderer process can be debugged simultaneously in different terminal:
```bash
yarn start-main-dev
yarn start-renderer-dev
```

3. Start to debug as a Web page (for renderer content) on the browser:
```bash
yarn start-web-dev
```

## Build

- Packaging the Electron application, run the command below:
```bash
yarn build
```

Or the main process and renderer process can be built to separated package:
```bash
yarn build-main
yarn build-renderer
```

- Packaging the web bundle, run the command below:
```bash
yarn build-web
```

- Generate the installer of the Electron app for all platform (Windows, MacOS, Linux), run the command below:
```bash
yarn dist -wml
```


## Contributing

If you are interested in source code, refer to [contributing](./Contributing) section to get stared. 
