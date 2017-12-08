// Basic init
const electron = require('electron')
const path = require('path')
const {app, BrowserWindow} = electron
const ipc = require('electron').ipcMain;
const DB = require('./db')

// Let electron reloads by itself when webpack watches changes in ./app/
// require('electron-reload')(__dirname)

require('electron-reload')(`${__dirname}/app`, {
    electron: path.join(__dirname, 'node_modules', '.bin', 'electron')
  });

// To avoid being garbage collected
let mainWindow

app.on('ready', () => {

    let mainWindow = new BrowserWindow({width: 800, height: 600})

    setTimeout(() => {
        mainWindow.loadURL(`file:///${__dirname}/app/index.html`);
      }, 2000);
    // mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    // mainWindow.toggleDevTools();

})

app.on('uncaughtException', function (err) {
    console.log(err);
  })

ipc.on('get', function(event, arg) {
    switch(arg) {
        case "items":
            DB.getItems(event);
            // console.log(db);
            // event.sender.send('data', db);//DB.getItems());
    }
})

