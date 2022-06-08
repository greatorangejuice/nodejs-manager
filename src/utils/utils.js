import os from 'os';
import path from "path";
import {access} from "fs/promises";
import {EOL} from 'os'

export const showDirectory = () => {
    if (!process.env.CURRENT_DIRECTORY) {
        process.env.CURRENT_DIRECTORY = os.homedir();
    }
    const direction = process.env.CURRENT_DIRECTORY
    process.stdout.write(`You are currently in ${direction}:${EOL}`);
}

export const showInvalidInput = () => {
    process.stdout.write(`Invalid input`);
}

export const showError = (error) => {
    const errorText = error ? error : 'Operation failed';
    process.stdout.write(`\x1b[41m${errorText}${EOL}\x1b[0m`)
}

export const getAbsoluteDirectory = (directory) => {
    const normalizedPath = path.normalize(directory);
    return path.join(process.env.CURRENT_DIRECTORY, normalizedPath)
}

export const getFileOptions = async (directory) => {
    const absoluteDirectory = getAbsoluteDirectory(directory);
    const isExist = await isDirectoryExist(absoluteDirectory);

    return { directory: absoluteDirectory, isExist }
}

export const isDirectoryExist = async (directory) => {
    try {
        await access(directory)
        return true
    } catch (e) {
        return false
    }
}
