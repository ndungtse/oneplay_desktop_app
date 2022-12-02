// import { PlayerInit } from './player';
// Native
import { join } from 'path'
import { format } from 'url'
// import installExtension, { REACT_DEVELOPER_TOOLS, } from 'electron-devtools-installer';
// Packages
import { BrowserWindow, app, ipcMain, IpcMainEvent, } from 'electron'
import isDev from 'electron-is-dev'
import prepareNext from 'electron-next'

// Prepare the renderer once the app is ready
app.on('ready', async () => {
  await prepareNext('./renderer')

  const mainWindow = new BrowserWindow({
    width: 1560,
    height: 764,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: false,
      preload: join(__dirname, 'preload.js'),
      devTools: process.env.NODE_ENV === 'development'? true : false,
    },
    icon: join(__dirname, 'icon.ico'),
    titleBarStyle: 'hidden',
  })

  console.log(__dirname);
  console.log(join(__dirname, 'preload.js'));

  const url = isDev
    ? 'http://localhost:8000/'
    : format({
      pathname: join(__dirname, '../renderer/out/index.html'),
      protocol: 'file:',
      slashes: true,
    })

  await mainWindow.loadURL(url);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // try {
  //   const name = await installExtension(REACT_DEVELOPER_TOOLS);
  //   // PlayerInit(mainWindow);
  //   console.log(`Added Extension:  ${name}`);
  // } catch (error) {
  //   console.log('Error ocurred in installing extension');

  // }
  // createMenu()

})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)

// listen the channel `message` and resend the received message to the renderer process
ipcMain.on('message', (event: IpcMainEvent, message: any) => {
  console.log(message)
  setTimeout(() => event.sender.send('message', 'hi from electron'), 500)
})

// function createMenu() {
//   const application: MenuItemConstructorOptions = {
//     label: "Icon Generator",
//     submenu: [
//       {
//         label: "New",
//         accelerator: "Ctrl+N",
//         click: () => {
//           if (window === null) {
//             // createWindow()
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