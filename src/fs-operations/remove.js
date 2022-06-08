import {rm} from 'fs/promises'
import {getFileOptions, showError} from "../utils/utils.js";

export const remove = async (directory) => {
    try {
        const fileOptions = await getFileOptions(directory);
        if (fileOptions.isExist) {
            await rm(fileOptions.directory)
            console.log("\x1b[33m", `File ${directory} was removed`, "\x1b[0m");
        } else {
            showError('Invalid input // Input file name is not exist')
        }
    } catch (e) {
        throw new Error(e);
    }
}
