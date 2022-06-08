import fs from 'fs';
import readline from "readline";
import {getFileOptions} from "../utils/utils.js";

export const read = async (directory) => {
    const fileOptions = await getFileOptions(directory);
    if (fileOptions.isExist) {
        const readStream = fs.createReadStream(fileOptions.directory);
        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            process.stdout.write(line)
        }
    }
}
