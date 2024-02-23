import fs from 'fs';
import path from 'path';
import gitignore from 'ignore'
import {fileTypeFromFile} from 'file-type';

import { readFileContents } from './fileUtils.js';
import { summarizeFile } from './llmUtils.js';
import { writeSummaryToFile } from './fileUtils.js';




const isTextFile = async (filePath: string): Promise<boolean> => {

    // const mimeType = await new Promise<string>((resolve, reject) => {
    //     magic.detectFile(filePath, (err, result) => {
    //         if (err) {
    //             reject(err);
    //         } else {
    //             resolve(result);
    //         }
    //     });
    // });
    const result = await fileTypeFromFile(filePath)
    const mime = result?.mime.startsWith('text/')

    return mime?mime:false;
}

const getGitignoreFilter = async (directoryPath: string) => {

    const gitignorePath = path.join(directoryPath, '.gitignore');

    let ignoreRules: string[] = [];

    if (fs.existsSync(gitignorePath)) {
        ignoreRules = fs.readFileSync(gitignorePath, 'utf8').split('\n');
    }

    return gitignore().add(ignoreRules);
}

export const processFile = async (
    filePath: string,
    directoryPath: string
): Promise<void> => {
    if (!await isTextFile(filePath)) {
        console.log(`Skipping non-text file: ${filePath}`);
        return;
    }
    // Get gitignore filter  
    const filter = await getGitignoreFilter(directoryPath);

    // Check if file is ignored
    if (filter.ignores(path.relative(directoryPath, filePath))) {
        console.log(`Ignoring ${filePath} based on .gitignore rules`);
        return;
    }
    const fileContent = await readFileContents(filePath);
    const summary = await summarizeFile(fileContent, filePath, directoryPath);
    await writeSummaryToFile(filePath, summary);
    //TableFile, Improvement, Conversion
    console.log(`Summary written for ${filePath}`);
};