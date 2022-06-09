import {sayHelloAndSetUser} from "./src/welcome/welcome.js";
import {showDirectory, showError} from "./src/utils/utils.js";
import {homedir} from 'os'
import {showList} from "./src/fs-operations/list.js";
import {changeDirectory} from "./src/navigation.js";
import {read} from "./src/fs-operations/read.js";
import {add} from "./src/fs-operations/create.js";
import {remove} from "./src/fs-operations/remove.js";
import {rename} from "./src/fs-operations/rename.js";
import {copyFile} from "./src/fs-operations/copy.js";
import {handleOs} from "./src/os-operations/os-options.js";
import {compress} from "./src/compress.js";
import {calculateHash} from "./src/fs-operations/hash.js";

const handleCommand = async (command, args) => {
    try {
        switch (command) {
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
                    showDirectory();
                } else {
                    throw 'Invalid input // Enter path'
                }
                break;
            case 'rm':
                if (args.length === 1) {
                    await remove(args[0])
                    showDirectory();
                }
                break;
            case 'rn':
                if (args.length === 2) {
                    await rename(args[0], args[1]);
                    showDirectory();
                }
                break;
            case 'cp':
                if (args.length === 2) {
                    await copyFile(args[0], args[1]);
                    showDirectory();
                }
                break;
            case 'mv':
                if (args.length === 2) {
                    await copyFile(args[0], args[1], true);
                    showDirectory();
                }
                break;
            case 'hash':
                if (args.length === 1) {
                    await calculateHash(args[0]);
                    showDirectory();
                }
                break;
            case 'compress':
                if (args.length === 2) {
                    await compress(args[0], args[1])
                }
                break;
            case 'decompress':
                if (args.length === 2) {
                    await compress(args[0], args[1], true)
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
        }
    } catch (e) {
        showError(e)
    }
}

export const start = () => {
    sayHelloAndSetUser()
    showDirectory()
    //TODO add in init function
    //TODO fix EOL
    //TODO fix remove
    process.env.CURRENT_DIRECTORY = homedir();
    process.stdin.on('data', async (data) => {
        showDirectory()
        const [command, ...args] = data.toString().trim().split(/\s+/);
        await handleCommand(command, args)
    })
}

start()
