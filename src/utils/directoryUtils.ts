import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processUtils';

export const traverseDirectory = async (directoryPath: string): Promise<void> => {
  const apiUrl = 'https://api.example.com/summarize';
  try {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        await traverseDirectory(filePath);
      } else {
        await processFile(filePath, directoryPath, apiUrl);
      }
    }
  } catch (error) {
    console.error(`Error traversing directory ${directoryPath}: ${error}`);
    throw error;
  }
};