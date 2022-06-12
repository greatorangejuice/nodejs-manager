import {readdir} from 'fs/promises'
import {getFileOptions, showMessage} from "../utils/utils.js";

export const showList = async (directory) => {
    const options = await getFileOptions(directory);
    if (options.isNotExist) {
        throw 'Invalid input';
    }
    const files = await readdir(directory);
    showMessage(files.join(', '));
};
