# kiosk

To run local dev server:
- clone this repository
- install node.js 6.xx
- run `npm i`
- run `sudo npm i -g webpack`
- run `npm run dev-server`
- open in browser `http://localhost:2999`

To use linter:
- install eslint globally `sudo npm i -g eslint`
- add eslint plugin to your favorite editor

To start as a standalone app in production mode:
- install node.js 6.xx
- run `npm i`
- run `sudo npm i -g webpack rimraf cross-env`
- run `npm run build`
- run `npm run start`
