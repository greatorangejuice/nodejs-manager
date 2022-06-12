import path from 'path'
import {homedir} from 'os'
import {getFileOptions} from "./utils/utils.js";

export const changeDirectory = async (directory) => {
    const options = await getFileOptions(directory);
    const rootPath = path.parse(homedir()).root;
    if (options.isNotExist) {
        throw 'Path does not exist';
    }
    if (options.directory.substring(0, rootPath.length) !== rootPath) {
        throw 'Cannot change the disk drive';
    }
    if (options.isFolder) {
        process.env.CURRENT_DIRECTORY = options.directory;
    } else {
        throw 'Path is not a directory';
    }
}