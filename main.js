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

    let mainWindow = new BrowserWindow({width: 1200, height: 600})

    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
    // mainWindow.toggleDevTools();

})

app.on('uncaughtException', function (err) {
    console.log(err);
  })

ipc.on('get', function(event, arg) {
    switch(arg) {
        case "items":
            DB.getItems(event);
            break;
            // console.log(db);
            // event.sender.send('data', db);//DB.getItems());
    }
})

ipc.on('post', function(event, arg) {
    switch(arg.type) {
        case 'itemPurchase':
            DB.postItemPurchase(event, arg.data, arg.date)
            // console.log(arg.data[0]);
            break;
    }
})

