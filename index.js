import {sayHelloAndSetUser} from "./src/welcome/welcome.js";
import {showDirectory, showMessage} from "./src/utils/utils.js";
import {homedir} from 'os'
import {handleCommand} from "./src/commandHandler.js";

export const start = () => {
    sayHelloAndSetUser()
    showDirectory()
    process.env.CURRENT_DIRECTORY = homedir();
    process.stdin.on('data', async (data) => {
        showDirectory();
        const [command, ...args] = data.toString().trim().split(/\s+/);
        await handleCommand(command, args);
    })
    process.on('SIGINT', () => {
        showMessage(`Thank you for using File Manager, ${process.env.USERNAME}!`);
        process.exit();
    })

}
start();