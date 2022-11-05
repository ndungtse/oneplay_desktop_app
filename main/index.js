"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PlayerInit } from './player';
// Native
const path_1 = require("path");
const url_1 = require("url");
// import installExtension, { REACT_DEVELOPER_TOOLS, } from 'electron-devtools-installer';
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
// Prepare the renderer once the app is ready
electron_1.app.on('ready', async () => {
    await (0, electron_next_1.default)('./renderer');
    const mainWindow = new electron_1.BrowserWindow({
        width: 156,
        height: 764,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            devTools: process.env.NODE_ENV === 'development' ? true : false,
        },
        icon: (0, path_1.join)(__dirname, 'icon.ico'),
    });
    console.log(__dirname);
    console.log((0, path_1.join)(__dirname, 'preload.js'));
    const url = electron_is_dev_1.default
        ? 'http://localhost:8000/'
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, '../renderer/out/index.html'),
            protocol: 'file:',
            slashes: true,
        });
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
});
// Quit the app once all windows are closed
electron_1.app.on('window-all-closed', electron_1.app.quit);
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on('message', (event, message) => {
    console.log(message);
    setTimeout(() => event.sender.send('message', 'hi from electron'), 500);
});
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
