import {createReadStream, createWriteStream} from 'fs';
import zlib from 'zlib';
import {getFileOptions, showError} from "./utils/utils.js";
import {EOL} from "os";

export const compress = async (source, destination, decompress = false) => {
    const sourceFileOptions = await getFileOptions(source);
    const destinationOptions = await getFileOptions(destination);

    if (sourceFileOptions.isNotExist || destinationOptions.isExist) {
        throw 'Invalid input'
    }

    const readStream = createReadStream(sourceFileOptions.directory);
    const writeStream = createWriteStream(destinationOptions.directory);
    const brotliCompress = decompress ? zlib.createBrotliDecompress() : zlib.createBrotliCompress();
    const stream = readStream.pipe(brotliCompress).pipe(writeStream);

    readStream.on('error', () => {
        throw 'Operation failed';
    })
    writeStream.on('error', () => {
        throw 'Operation failed';
    })
    brotliCompress.on('error', () => {
        throw 'Operation failed';
    })

    const message = decompress ? ' done compressing' : ' done decompressing'
    stream.on('finish', () => {
        process.stdout.write(`\x1b[36m${source}\x1b[0m \x1b[33m${message}\x1b[0m${EOL}`);
    })

}