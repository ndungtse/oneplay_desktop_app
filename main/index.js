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
const createWindow = async () => {
    await (0, electron_next_1.default)('./renderer');
    const mainWindow = new electron_1.BrowserWindow({
        width: 1160,
        height: 764,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: false,
            preload: (0, path_1.join)(__dirname, 'preload.js'),
            devTools: process.env.NODE_ENV === 'development' ? true : false,
        },
        icon: (0, path_1.join)(__dirname, 'icon.ico'),
        titleBarStyle: 'hidden',
        minWidth: 400,
        minHeight: 400,
    });
    const url = electron_is_dev_1.default
        ? 'http://localhost:8000/'
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, '../renderer/out/index.html'),
            protocol: 'file:',
            slashes: true,
        });
    await mainWindow.loadURL(url);
    return mainWindow;
};
let win;
electron_1.app.on('ready', async () => {
    const mainWindow = await createWindow();
    win = mainWindow;
    const tray = new electron_1.Tray((0, path_1.join)(__dirname, 'icon.ico'));
    tray.addListener('click', () => {
        mainWindow.show();
    });
    const contextMenu = electron_1.Menu.buildFromTemplate([
        { label: 'Show Player', type: 'normal', click: () => { mainWindow.show(); } },
        { label: 'exit Ctrl+Q', type: 'normal', click: () => { electron_1.app.quit(); } },
    ]);
    tray.setToolTip('Oneplay');
    tray.setContextMenu(contextMenu);
    electron_1.globalShortcut.register('CommandOrControl+Q', () => {
        electron_1.app.quit();
    });
});
// globalShortcut.register('MediaPlayPause', () => {
//   win.webContents.send('playPause')
// })
electron_1.app.on('window-all-closed', () => {
    electron_1.app.dock.hide();
    win.hide();
});
// listen the channel `message` and resend the received message to the renderer process
electron_1.ipcMain.on('message', (event, message) => {
    setTimeout(() => event.sender.send('message', message), 500);
});
electron_1.ipcMain.on('close', () => {
    electron_1.app.quit();
});
electron_1.ipcMain.on('hide', () => win.hide());
electron_1.ipcMain.on('show', () => win.show());
electron_1.ipcMain.on('minimize', () => win.minimize());
electron_1.ipcMain.on('maximize', () => win.maximize());
electron_1.ipcMain.on('unmaximize', () => win.unmaximize());
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
