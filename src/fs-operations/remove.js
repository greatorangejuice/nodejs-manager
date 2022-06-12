import {rm} from 'fs/promises'
import {getFileOptions, showMessage} from "../utils/utils.js";

export const remove = async (directory) => {
    const fileOptions = await getFileOptions(directory);
    if (fileOptions.isNotExist) {
        throw 'Invalid input // Input file name is not exist';
    }
    await rm(fileOptions.directory)
    showMessage(`File ${directory} was removed`, '\x1b[33m');
}
