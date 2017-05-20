# terminus-client
A client for a terminus terminal, communicating with terminus-server.

## Developing
* Make sure nodejs and npm packages are installed
* Clone this repo
* Go into the repository folder
* Run `npm install`
* Run `npm start` to start the application

## Troubleshooting
If js code isn't executed and the Chromium debugger console shows a message about node module version problems do the following:
* Go into the repository folder
* Run `npm view electron version` and note the version number
* Run `npm rebuild --runtime=electron --target=<version-number> --disturl=https://atom.io/download/atom-shell --build-from-source` be sure to replace `<version-number>` with the version number you noted before