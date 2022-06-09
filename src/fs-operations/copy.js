import {createReadStream, createWriteStream} from 'fs'
import {getFileOptions} from "../utils/utils.js";
import {remove} from "./remove.js";
import path from "path";

export const copyFile = async (sourcePath, newFilePath, deleteSourceAfterComplete = false) => {
    const sourceFileOptions = await getFileOptions(sourcePath);
    if (sourceFileOptions.isNotExist) {
        throw 'Invalid input // Input source name is not exist';
    }
    const fileName = path.parse(sourceFileOptions.directory).base;
    const fullNewPath = path.join(newFilePath, fileName);
    const newFileOptions = await getFileOptions(fullNewPath);
    if (newFileOptions.isExist) {
        throw 'Invalid input // New file name is exist';
    }
    const readStream = createReadStream(sourceFileOptions.directory);
    const writeStream = createWriteStream(newFileOptions.directory);
    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        if (deleteSourceAfterComplete) {
            remove(sourcePath);
        }
    });
    readStream.on('error', () => {
        throw 'Operation failed';
    });
    writeStream.on('error', () => {
        throw 'Operation failed';
    });
}
