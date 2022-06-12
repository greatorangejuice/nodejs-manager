import {rename as setNewName} from 'fs/promises'
import {getFileOptions} from "../utils/utils.js";

export const rename = async (oldFilePath, newFilePath) => {
    const oldFileOptions = await getFileOptions(oldFilePath);
    const newFileOptions = await getFileOptions(newFilePath);
    if (newFileOptions.isExist) {
        throw 'New file name is exist';
    }
    if (oldFileOptions.isNotExist) {
        throw 'Invalid input // Input file name is not exist';
    }
    await setNewName(oldFileOptions.directory, newFileOptions.directory);
}
