import {rename as setNewName} from 'fs/promises'
import {getFileOptions, showError} from "../utils/utils.js";

export const rename = async (oldFilePath, newFilePath) => {
    try {
        const oldFileOptions = await getFileOptions(oldFilePath);
        const newFileOptions = await getFileOptions(newFilePath);
        if (newFileOptions.isExist) {
            showError('New file name is exist');
        }
        if (!oldFileOptions.isExist) {
            showError('Invalid input // Input file name is not exist')
        }
        if (oldFileOptions.isExist && !newFileOptions.isExist) {
            await setNewName(oldFileOptions.directory, newFileOptions.directory)
        }
    } catch (e) {
      throw new Error('Operation failed')
    }
}
