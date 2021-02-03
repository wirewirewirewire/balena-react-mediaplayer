# balena-react-mediaplayer
Mediaplayer using [balena-downloader](https://github.com/wirewirewirewire/balena-downloader), react and electron for [balena.io](https://www.balena.io/)

### Introduction
[managing digital devices for exhibitions](https://wirewire.de/article/managing-digital-devices-for-exhibitions)

### Requirements
-  [balena.io](https://www.balena.io/) account
- [balena CLI](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md)

### How to use it
- clone the repository on your local machine
- replace `webnuc`in the package.json with the name of the balena app
- symlink or copy [balena-downloader](https://github.com/wirewirewirewire/balena-downloader) into your project folder (check if the path in your `docker-compose.yml` is correct
- set the `BASE_URL` variable in in the balena dashboard for the json file to download the data (e.g. `https://example.com/filesanddata.json`)
- `npm run balena push` to build the react application and push it to balena.io
