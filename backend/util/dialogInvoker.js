'use strict';

import colors from 'colors';
import constants from './constants.js';

const def = "000";

colors.setTheme({
    error: ['black', 'bgRed', 'bold'],
    success: ['black', 'bgGreen', 'bold'],
    warning: ['black', 'bgYellow', 'bold'],
    info: ['black', 'bgOrange', 'bold']
});

const showMessage = (message, type, status) => {
    switch(type) {
        case constants.ERROR.TYPE:
            console.log(colors.error(`[${type}] ${status || def}:`) + ' ' + message);
            break;
        case constants.SUCCESS.TYPE:
            console.log(colors.success(`[${type}] ${status || def}:`) + ' ' + message);
            break;
        case constants.WARNING.TYPE:
            console.log(colors.warning(`[${type}] ${status || def}:`) + ' ' + message);
            break;
       default:
            console.log(colors.warning(`[${type}] ${status || def}:`) + ' ' + message);
            break;
    }
}

export default showMessage;