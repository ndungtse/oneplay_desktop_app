"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerInit = void 0;
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const PlayerInit = (window) => {
    const pauseIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'pause.png'));
    const playIcon = electron_1.nativeImage.createFromPath(path_1.default.join(__dirname, 'play.png'));
    console.log(pauseIcon);
    console.log(playIcon);
    window.setThumbarButtons([
        {
            tooltip: 'pause',
            icon: pauseIcon,
            click() { console.log('pause clicked'); }
        }, {
            tooltip: 'play',
            icon: playIcon,
            flags: ['enabled', 'dismissonclick'],
            click() { console.log('play clicked.'); }
        }
    ]);
};
exports.PlayerInit = PlayerInit;
