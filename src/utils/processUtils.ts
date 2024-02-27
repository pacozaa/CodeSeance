import fs from 'fs';
import path from 'path';
import gitignore from 'ignore'
import {fileTypeFromFile} from 'file-type';

import { readFileContents } from './fileUtils.js';
import { summarizeFile } from './llmUtils.js';
import { writeSummaryToFile } from './fileUtils.js';




const isNotImage = async (filePath: string): Promise<boolean> => {

    const result = await fileTypeFromFile(filePath)
    const isImage = result?.mime.startsWith('image/')

    return isImage?false:true;
}

const isDotPrefix = (filePath: string): boolean =>{
    return path.basename(filePath).startsWith('.')
}

const isSummarizedMD = (filePath: string): boolean => {

    const result = path.extname(filePath)
    //Fixed to .summarized.md
    return result==='.md'
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
    //Add more file skipping utils, custom file name and such
    if(isDotPrefix(filePath)){
        return
    }
    if(isSummarizedMD(filePath)){
        return;
    }
    if (!await isNotImage(filePath)) {
        // console.log(`Skipping image file: ${filePath}`);
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
    //More type of summarization or useful info TableFile, Improvement, Conversion
    //Load file directory three in to context
    /**
     * https://github.com/euberdeveloper/dree
     * https://github.com/mihneadb/node-directory-tree
     * https://dev.to/peaonunes/loading-a-directory-as-a-tree-structure-in-node-52bg
     */
    console.log(`Summary written for ${filePath}`);
};