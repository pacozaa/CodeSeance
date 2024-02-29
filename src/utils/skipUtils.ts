import * as fs from 'fs';
import * as path from 'path';
import gitignore from 'ignore'
import { fileTypeFromFile } from 'file-type';

export const getGitignoreFilter = async (directoryPath: string) => {

    const gitignorePath = path.join(directoryPath, '.gitignore');

    let ignoreRules: string[] = [];

    if (fs.existsSync(gitignorePath)) {
        ignoreRules = fs.readFileSync(gitignorePath, 'utf8').split('\n');
    }

    return gitignore().add(ignoreRules);
}

export const isHiddenPath = (pathToCheck: string): boolean => {

    const folderName = path.basename(pathToCheck);
    return folderName.startsWith('.');

}

export const isNotImage = async (filePath: string): Promise<boolean> => {

    const result = await fileTypeFromFile(filePath)
    const isImage = result?.mime.startsWith('image/')

    return isImage ? false : true;
}

export const isMD = (filePath: string): boolean => {

    const result = path.extname(filePath)
    //Fixed to .summarized.md
    return result === '.md'
}

/**
Checks if a file is ignored by the .gitignore in a directory
@param {string} directoryPath - The path to the directory containing the .gitignore
@param {string} filePath - The path to the file to check
@returns {Promise<boolean>} - Promise resolving to true if file is ignored, false otherwise 
*/
export const isGitIgnore = async (directoryPath: string, filePath: string): Promise<boolean> => {
    // Get gitignore filter  
    const filter = await getGitignoreFilter(directoryPath);

    // Check if file is ignored
    return filter.ignores(path.relative(directoryPath, filePath))

};