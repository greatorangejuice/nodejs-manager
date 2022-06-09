import {createReadStream} from 'fs';
import {getFileOptions, showMessage} from "../utils/utils.js";
import crypto from "crypto";

export const calculateHash = async (sourcePath) => {
        const sourceOptions = await getFileOptions(sourcePath);
        if (sourceOptions.isFolder) {
            throw 'Invalid input // Cannot calculate hash for folder'
        }
        if (sourceOptions.isExist) {
            const readStream = createReadStream(sourceOptions.directory)
            const hash = crypto.createHash('sha1').setEncoding('hex');
            readStream.pipe(hash)

            hash.on('data',  (data) => {
                showMessage(`Calculated hash: ${data}`)
            })
            hash.on('error', () => {
                throw 'Operation failed';
            })
            readStream.on('error', () => {
                throw 'Operation failed';
            })
        }
}