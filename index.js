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
import {getOs} from "./src/os-operations/os-options.js";

export const start = () => {
    sayHelloAndSetUser()
    showDirectory()
    //TODO add in init function
    process.env.CURRENT_DIRECTORY = homedir();

    process.stdin.on('data', (data) => {
        showDirectory()
        const chunk = data.toString().trim().split(' ');
        const command = chunk[0];
        let parameter, parameter1, parameter2;
        if (chunk.length > 1) {
            parameter = chunk[1];
            if (chunk[2]) {
                parameter1 = chunk[2];
            }
            if (chunk[3]) {
                parameter2 = chunk[3];
            }
        }
        // parameter 1
        // parameter 2
        //TODO add handler for bad commands
        //TODO warp switch in async func
        //TODO update navigation.js
        //TODO add folder checker
        //TODO change errors
        switch (command) {
            case 'ls':
                showList(process.env.CURRENT_DIRECTORY).then(() => {
                    showDirectory();
                })
                break;
            case 'cd':
                if (parameter) {
                    changeDirectory(parameter);
                } else {
                    showError('Invalid input');
                }
                showDirectory();
                break;
            case 'up': // Need fix output
                changeDirectory('..');
                showDirectory();
                break;
            case 'cut':
                if (parameter) {
                    read(parameter);
                }
                break;
            case 'add':
                if (parameter) {
                    add(parameter);
                }
                break;
            case 'rm':
                if (parameter) {
                    remove(parameter).then(() => {
                        // showDirectory()
                    })
                }
            case 'rn':
                if (parameter && parameter1) {
                    rename(parameter, parameter1);
                }
                break;
            case 'cp':
                if (parameter && parameter1) {
                    copyFile(parameter, parameter1);
                }
                break;
            case 'mv':
                if (parameter && parameter1) {
                    copyFile(parameter, parameter1, true);
                }
                break;
            case 'os':
                getOs()
                break

        }
    })
}

start()
