import {showList} from "./fs-operations/list.js";
import {showDirectory, showError} from "./utils/utils.js";
import {changeDirectory} from "./navigation.js";
import {read} from "./fs-operations/read.js";
import {add} from "./fs-operations/create.js";
import {remove} from "./fs-operations/remove.js";
import {rename} from "./fs-operations/rename.js";
import {copyFile} from "./fs-operations/copy.js";
import {getOs} from "./os-operations/os-options.js";
import {compress} from "./compress.js";

export const handleCommand = async (command) => {
    switch (command) {
        case 'ls':
            showList(process.env.CURRENT_DIRECTORY).then(() => {
                showDirectory();
            })
            break;
        case 'cd':
            if (parameter) {
                await changeDirectory(parameter);
                showDirectory();
            } else {
                showError('Invalid input');
            }
            break;
        case 'up': // Need fix output
            await changeDirectory('..');
            showDirectory();
            break;
        case 'cut':
            if (parameter) {
                await read(parameter);
            }
            break;
        case 'add':
            if (parameter) {
                await add(parameter);
            }
            break;
        case 'rm':
            if (parameter) {
                remove(parameter).then(() => {
                    // showDirectory()
                })
            }
            break;
        case 'rn':
            if (parameter && parameter1) {
                await rename(parameter, parameter1);
            }
            break;
        case 'cp':
            if (parameter && parameter1) {
                await copyFile(parameter, parameter1);
            }
            break;
        case 'mv':
            if (parameter && parameter1) {
                await copyFile(parameter, parameter1, true);
            }
            break;
        case 'os':
            getOs()
            break;
        case 'hash':
            //
            break;
        case 'compress':
            if (parameter && parameter1) {
                await compress(parameter, parameter1)
            }
            break;
        case 'decompress':
            if (parameter && parameter1) {
                await compress(parameter, parameter1, true)
            }
    }
}