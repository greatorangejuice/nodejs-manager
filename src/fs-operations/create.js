import fs from 'fs';
import path from "path";
import {getFileOptions, showError} from "../utils/utils.js";
import {EOL} from 'os'

export const add = async (directory) => {
    try {
        const normalizedPath = path.normalize(directory);
        const absoluteDirection = path.join(process.env.CURRENT_DIRECTORY, normalizedPath)
        const fileOptions = await getFileOptions(directory);

        if (fileOptions.isExist) {
            showError('Input error // Input name is exist', EOL);
        } else {
            const writeStream = fs.createWriteStream(absoluteDirection);
            writeStream.end();
        }
    } catch (e) {
        throw new Error(e)
    }
}
