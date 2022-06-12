import fs from 'fs';
import {getFileOptions} from "../utils/utils.js";

export const read = async (directory) => {
    const fileOptions = await getFileOptions(directory);
    if (fileOptions.isExist) {
        const readStream = fs.createReadStream(fileOptions.directory);
        readStream.pipe(process.stdout)
        readStream.on('error', () => {
            throw 'Operation failed';
        })
    } else {
        throw 'Invalid input'
    }
}