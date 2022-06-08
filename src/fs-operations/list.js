import fs from 'fs';
import {readdir} from 'fs/promises'
import {access} from "fs/promises";
import path from 'path';
import {showError} from "../utils/utils.js";

export const showList = async (directory) => {
    try {
        if (!await isDirectoryExist(directory)) {
            showError('File not exist');
        }
        const files = await readdir(directory)
        console.log('\x1b[36m%s\x1b[0m', files.join(', '))

        await readdir(directory, (err, files) => {
            if (err) {
                throw Error(err);
            }
            console.log('\x1b[36m%s\x1b[0m', files.join(', '))
        });
    } catch (e) {
        throw Error(e);
    }
};

export const isDirectoryExist = async (directory) => {
    try {
        await access(directory)
        return true
    } catch (e) {
        return false
    }
}
