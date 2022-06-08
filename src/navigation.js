import path from 'path'
import {homedir} from 'os'
import {isDirectoryExist} from "./fs-operations/list.js";
import {showError} from "./utils/utils.js";

export const changeDirectory = async (directory) => {
    const normalizedPath = path.normalize(directory);
    const isAbsolutePath = normalizedPath.includes(homedir());

    if (isAbsolutePath && await isDirectoryExist(normalizedPath)) {
        process.env.CURRENT_DIRECTORY = normalizedPath;
    } else if (!isAbsolutePath) {
        const currentDirectory = process.env.CURRENT_DIRECTORY;
        const absoluteDirectory = path.join(currentDirectory, normalizedPath);
        if (await isDirectoryExist(absoluteDirectory)) {
            process.env.CURRENT_DIRECTORY = absoluteDirectory
        } else {
            showError('Direction is not exist')
        }
        if (!absoluteDirectory.includes(homedir())) {
            process.env.CURRENT_DIRECTORY = homedir();
        }
    } else {
        showError('Direction is not exist')
    }
}

