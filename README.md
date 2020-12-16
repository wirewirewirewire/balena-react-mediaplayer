# balena-react-mediaplayer
Mediaplayer using [balena-downloader](https://github.com/wirewirewirewire/balena-downloader), react and electron for [balena.io](https://www.balena.io/)


### Requirements
-  [balena.io](https://www.balena.io/) account
- [balena CLI](https://github.com/balena-io/balena-cli/blob/master/INSTALL.md)

### How to use it
- clone the repository on your local machine
- replace `webnuc`in the package.json with the name of the balena app
- symlink or copy [balena-downloader](https://github.com/wirewirewirewire/balena-downloader) into your project folder (checck if the path in your `docker-compose.yml` is correct
- `npm run balena push` to build the react application and push it to balena.io
