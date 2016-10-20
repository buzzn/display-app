# kiosk

To run local dev server:
- clone this repository
- install node.js 6.7.0
- run `npm i`
- run `sudo npm i -g webpack`
- run `npm run dev-server`
- open in browser `http://localhost:2999`

To use linter:
- install eslint globally `sudo npm i -g eslint`
- add eslint plugin to your favorite editor

To start as a standalone app in production mode:
- run `nvm install 6.7.0`
- run `sudo npm i -g webpack rimraf cross-env`
- run `npm run build`
- run `npm run start`

with Docker:
- docker build -t buzzn-kiosk .
- docker run -it --rm -p2999:2999 --name kiosk2 buzzn-kiosk
