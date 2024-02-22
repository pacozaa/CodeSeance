import { readFileContents } from './fileUtils.js';
import { summarizeFile } from './llmUtils.js';
import { writeSummaryToFile } from './fileUtils.js';

export const processFile = async (
    filePath: string,
    directoryPath: string
): Promise<void> => {
    const fileContent = await readFileContents(filePath);
    const summary = await summarizeFile(fileContent, filePath, directoryPath);
    await writeSummaryToFile(filePath, summary);
    //TableFile, Improvement, Conversion
    console.log(`Summary written for ${filePath}`);
};