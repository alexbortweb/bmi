const { app, BrowserWindow } = require('electron')
const path = require('path')
const { shell } = require('electron');

const createWindow = () => {
    const win = new BrowserWindow({
/*        width: 800,
        height: 570,*/ //fixme 1

        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        icon: `${__dirname}/build/icon.png`
    })
    win.setMenu(null)

    win.loadFile('index.html')
    // win.once('ready-to-show', () => {
    //     win.maximize()
    //     win.webContents.openDevTools()
    // }) //fixme 1
    win.webContents.setWindowOpenHandler((edata) => {
        shell.openExternal(edata.url);
        return { action: "deny" };
    });
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})