# buzzn kiosk

Production | Staging
--- | ---
https://kiosk.buzzn.io | https://staging-kiosk.buzzn.io
[ ![Codeship Status for buzzn/kiosk](https://app.codeship.com/projects/c13ce210-78d2-0134-4f8b-0a260436cc6e/status?branch=release)](https://app.codeship.com/projects/180313) | [ ![Codeship Status for buzzn/kiosk](https://app.codeship.com/projects/c13ce210-78d2-0134-4f8b-0a260436cc6e/status?branch=master)](https://app.codeship.com/projects/180313)

To run local dev server:
- clone this repository
- install node.js 6.xx
- run `sudo npm i -g yarn webpack`
- run `yarn`
- run `yarn run dev-server`
- open in browser `http://localhost:2999`

To run tests:
- run `sudo npm i -g mocha`
- run `yarn run test`

How to build automatically on codeship:
- setup commands:
```
nvm install 6.7.0
npm cache clean
npm i -g yarn cross-env rimraf
yarn
npm rebuild node-sass
```
- test pipeline commands:
```
yarn run test
yarn run build
```

To use linter:
- install eslint globally `sudo npm i -g eslint`
- add eslint plugin to your favorite editor
