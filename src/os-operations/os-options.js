import os from 'os'
import {showMessage} from "../utils/utils.js";

export const handleOs = (parameter) => {
    switch (parameter) {
        case '--EOL':
            break;
        case '--cpus':
            const cpus = os.cpus();
            cpus.map((item) => {
                delete item.times
            })
            console.table(cpus)
            break;
        case '--homedir':
            const homedir = os.userInfo().homedir
            showMessage(homedir)
            break;
        case '--username':
            const username = os.userInfo().username
            showMessage(username)
            break;
        case '--architecture':
            const architecture = os.arch()
            showMessage(architecture)
            break;
    }
}
