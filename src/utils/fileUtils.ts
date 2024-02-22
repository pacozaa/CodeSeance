import * as fs from 'fs';
import * as path from 'path';

export const readFileContents = async (filePath: string): Promise<string> => {
    try {
        const fileContent = await fs.promises.readFile(filePath, 'utf-8');
        return fileContent;
    } catch (error) {
        console.error(`Error reading file ${filePath}: ${error}`);
        throw error;
    }
};

export const writeSummaryToFile = async (filePath: string, summary: string): Promise<void> => {
    const dirname = path.dirname(filePath);
    const basename = path.basename(filePath, path.extname(filePath));
    const summaryFilePath = path.join(dirname, `${basename}.summarized`);

    await fs.promises.writeFile(summaryFilePath, summary, 'utf-8');
};