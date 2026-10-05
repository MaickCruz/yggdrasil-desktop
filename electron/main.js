import { app, BrowserWindow, ipcMain } from 'electron'

let mainWindow

function createWindow() {
    mainWindow = new BrowserWindow({
    width: 1240,
    height: 760,

    frame: false,
    transparent: true,
    backgroundColor: '#00000000',

    resizable: false,
    maximizable: false,

    hasShadow: false,

    webPreferences: {
        contextIsolation: true,
        nodeIntegration: false
    }
})

    mainWindow.loadURL('http://localhost:5173')
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