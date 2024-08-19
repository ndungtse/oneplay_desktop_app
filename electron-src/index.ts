// import { PlayerInit } from './player';
// Native
import { join } from 'path'
import { format } from 'url'
// import installExtension, { REACT_DEVELOPER_TOOLS, } from 'electron-devtools-installer';
// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, Tray, Menu, globalShortcut } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

const createWindow = async () => {
  await prepareNext('./renderer')
  const mainWindow = new BrowserWindow({
    width: 1160,
    height: 764,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
      devTools: process.env.NODE_ENV === 'development' ? true : false,
    },
    icon: join(__dirname, 'icon.ico'),
    titleBarStyle: 'hidden',
    minWidth: 400,
    minHeight: 400,
  })

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  await mainWindow.loadURL(url);
  return mainWindow;
}

let win: BrowserWindow;
app.on('ready', async () => {
  const mainWindow = await createWindow();
  win = mainWindow;
  const tray = new Tray(join(__dirname, 'icon.ico'));

  tray.addListener('click', () => {
    mainWindow.show()
  })
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Show Player', type: 'normal', click: () => { mainWindow.show() } },
    { label: 'exit Ctrl+Q', type: 'normal', click: () => { app.quit() } },
  ])
  tray.setToolTip('Oneplay')
  tray.setContextMenu(contextMenu)
  
  globalShortcut.register('CommandOrControl+Q', () => {
    app.quit();
  })
})

// globalShortcut.register('MediaPlayPause', () => {
//   win.webContents.send('playPause')
// })

app.on('window-all-closed', () => {
  app.dock.hide();
  win.hide();
})

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  setTimeout(() => event.sender.send('message', message), 500);
})

ipcMain.on('close', () => {
  app.quit()
});
ipcMain.on('hide', ()=> win.hide())
ipcMain.on('show', ()=> win.show())
ipcMain.on('minimize', ()=> win.minimize())
ipcMain.on('maximize', ()=> win.maximize())
ipcMain.on('unmaximize', ()=> win.unmaximize())


// function createMenu() {
//   const application: MenuItemConstructorOptions = {
//     icon: join(__dirname, 'icon.ico'),
//     submenu: [
//       {
//         label: "New",
//         accelerator: "Ctrl+N",
//         click: () => {
//           if (window === null) {
//             createWindow()
//           }
//         }
//       },
//       {
//         type: "separator"
//       },
//       {
//         label: "Quit",
//         accelerator: "Ctrl+Q",
//         click: () => {
//           app.quit()
//         }
//       }
//     ]
//   }

//   const template: MenuItemConstructorOptions[] = [
//     application
//   ]

//   Menu.setApplicationMenu(Menu.buildFromTemplate(template))
// }