import os, {EOL} from 'os';
import path from "path";
import fs, {access} from "fs/promises";

export const showDirectory = () => {
    if (!process.env.CURRENT_DIRECTORY) {
        process.env.CURRENT_DIRECTORY = os.homedir();
    }
    const direction = process.env.CURRENT_DIRECTORY
    process.stdout.write(`You are currently in ${direction} :${EOL}`);
}

export const showError = (error) => {
    const errorText = error ? error : 'Operation failed';
    process.stdout.write(`\x1b[41m${errorText}\x1b[0m${EOL}`)
}

export const showMessage = (messageText, color = '\x1b[36m') => {
    process.stdout.write(`${color}${messageText}\x1b[0m${EOL}`)
}

export const getAbsoluteDirectory = (directory) => {
    const normalizedPath = path.normalize(directory);
    return path.join(process.env.CURRENT_DIRECTORY, normalizedPath)
}

export const getFileOptions = async (directory) => {
    let normalizedPath = path.normalize(directory);
    const isAbsolutePath = path.isAbsolute(normalizedPath);
    if (!isAbsolutePath) {
        normalizedPath = getAbsoluteDirectory(directory)
    }
    const isExist = await isDirectoryExist(normalizedPath);
    const isNotExist = !isExist
    let statistic;
    if (isExist) {
        statistic = (await fs.lstat(normalizedPath)).isDirectory();
    }
    //TODO isExisting isNotExisting
    return {directory: normalizedPath, isExist, isNotExist, isFolder: statistic ? statistic : null}
}

export const isDirectoryExist = async (directory) => {
    try {
        await access(directory)
        return true
    } catch (e) {
        return false
    }
}
