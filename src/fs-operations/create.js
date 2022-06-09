import fs from 'fs';
import {getFileOptions} from "../utils/utils.js";

export const add = async (directory) => {
    const options = await getFileOptions(directory);
    if (options.isExist) {
        throw 'Invalid input // Input name is exist';
    }
    const writeStream = fs.createWriteStream(options.directory);
    writeStream.on('error', () => {
        throw 'Operation failed';
    });
}
