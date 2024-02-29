import { readFileContents } from './fileUtils.js';
import { summarizeFile } from './llmUtils.js';
import { writeSummaryToFile } from './fileUtils.js';
import { isGitIgnore, isHiddenPath, isMD, isNotImage } from './skipUtils.js';




export const processFile = async (
    filePath: string,
    directoryPath: string
): Promise<void> => {
    //Add more file skipping utils, custom file name and such
    if(isHiddenPath(filePath)){
        return
    }
    if(isMD(filePath)){
        return;
    }
    if (!await isNotImage(filePath)) {
        // console.log(`Skipping image file: ${filePath}`);
        return;
    }

    if(await isGitIgnore(directoryPath, filePath)){
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