// Basic init
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow} = electron

// Let electron reloads by itself when webpack watches changes in ./app/
// require('electron-reload')(__dirname)

require('electron-reload')(`${__dirname}/app/build`);

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

    let mainWindow = new BrowserWindow({width: 800, height: 600})

    mainWindow.loadURL('http://localhost:8080/')
    mainWindow.toggleDevTools();

})

app.on('uncaughtException', function (err) {
    console.log(err);
  })
