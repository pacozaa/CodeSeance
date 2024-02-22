import { readFileContents } from './fileUtils.js';
import { summarizeFile } from './apiUtils.js';
import { writeSummaryToFile } from './fileUtils.js';

export const processFile = async (
    filePath: string,
    directoryPath: string,
    apiUrl: string,
): Promise<void> => {
    const fileContent = await readFileContents(filePath);
    const summary = await summarizeFile(fileContent, filePath, directoryPath, apiUrl);
    await writeSummaryToFile(filePath, summary);
    console.log(`Summary written for ${filePath}`);
};