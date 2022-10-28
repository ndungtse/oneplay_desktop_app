import { BrowserWindow, nativeImage} from 'electron';
import path from 'path';

export const PlayerInit = (window: BrowserWindow) => {
    const pauseIcon = nativeImage.createFromPath(path.join(__dirname, 'pause.png'));
    const playIcon = nativeImage.createFromPath(path.join(__dirname, 'play.png'));
    console.log(pauseIcon);
    console.log(playIcon)
    window.setThumbarButtons([
        {
            tooltip: 'pause',
            icon: pauseIcon,
            click() { console.log('pause clicked') }
        }, {
            tooltip: 'play',
            icon: playIcon,
            flags: ['enabled', 'dismissonclick'],
            click() { console.log('play clicked.') }
        }
    ])
}