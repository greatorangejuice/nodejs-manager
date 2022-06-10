import {showDirectory, showError, showMessage} from "./utils/utils.js";
import {showList} from "./fs-operations/list.js";
import {changeDirectory} from "./navigation.js";
import {read} from "./fs-operations/read.js";
import {add} from "./fs-operations/create.js";
import {remove} from "./fs-operations/remove.js";
import {rename} from "./fs-operations/rename.js";
import {copyFile} from "./fs-operations/copy.js";
import {calculateHash} from "./fs-operations/hash.js";
import {compress} from "./fs-operations/compress.js";
import {handleOs} from "./os-operations/os-options.js";

export const handleCommand = async (command, args) => {
    try {
        switch (command) {
            case '.exit':
                showMessage(`Thank you for using File Manager, ${process.env.USERNAME}!`)
                process.exit();
                break;
            case 'ls':
                await showList(process.env.CURRENT_DIRECTORY)
                showDirectory();
                break;
            case 'cd':
                if (args.length === 1) {
                    await changeDirectory(args[0]);
                    showDirectory();
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'up':
                await changeDirectory('..');
                showDirectory();
                break;
            case 'cut':
                if (args.length === 1) {
                    await read(args[0]);
                    showDirectory();
                } else {
                    throw 'Invalid input // Enter path'
                }
                break;
            case 'add':
                if (args.length === 1) {
                    await add(args[0]);
                } else {
                    throw 'Invalid input // Enter path'
                }
                break;
            case 'rm':
                if (args.length === 1) {
                    await remove(args[0])
                    showDirectory();
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'rn':
                if (args.length === 2) {
                    await rename(args[0], args[1]);
                    showDirectory();
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'cp':
                if (args.length === 2) {
                    await copyFile(args[0], args[1]);
                    showDirectory();
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'mv':
                if (args.length === 2) {
                    await copyFile(args[0], args[1], true);
                    showDirectory();
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'hash':
                if (args.length === 1) {
                    await calculateHash(args[0]);
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'compress':
                if (args.length === 2) {
                    await compress(args[0], args[1], false)
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'decompress':
                if (args.length === 2) {
                    await compress(args[0], args[1], true)
                } else {
                    throw 'Invalid input';
                }
                break;
            case 'os':
                if (args.length === 1) {
                    handleOs(args[0])
                } else {
                    showError('Invalid input // Please provide argument')
                }
                showDirectory();
                break;
            default:
                throw 'Invalid input';
        }
    } catch (e) {
        showError(e)
    }
}