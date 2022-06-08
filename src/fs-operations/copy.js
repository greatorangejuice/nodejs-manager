import {createReadStream, createWriteStream} from 'fs'
import {getFileOptions, showError} from "../utils/utils.js";
import {remove} from "./remove.js";

export const copyFile = async (sourcePath, newFilePath, deleteSourceAfterComplete = false) => {
    const removeSource = () => {
        if (deleteSourceAfterComplete) {
            remove(sourcePath);
        }
    }
   try {
       const sourceFileOptions = await getFileOptions(sourcePath);
       const newFileOptions = await getFileOptions(newFilePath);

       if (!sourceFileOptions.isExist) {
           showError('Invalid input // Input source name is not exist');
           return
       }
       if (newFileOptions.isExist) {
           showError('Invalid input // New file name is exist');
           return
       }

       const readStream = createReadStream(sourceFileOptions.directory);
       const writeStream = createWriteStream(newFileOptions.directory);
       readStream.pipe(writeStream);
       writeStream.on('finish', removeSource)
   } catch (e) {
        throw new Error(e);
   }
}
