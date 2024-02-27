import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processUtils.js';

export const traverseDirectory = async (directoryPath: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.promises.stat(filePath);

      if (stat.isDirectory()) {
        // Add folder skip utils and can add more custom skip folder name, same for files
        if (await isHiddenFolder(directoryPath)) {
          console.log(`Skipping hidden folder ${directoryPath}`);
          return;
        }
        await traverseDirectory(filePath);
      } else {
        await processFile(filePath, directoryPath);
      }
    }
  } catch (error) {
    console.error(`Error traversing directory ${directoryPath}: ${error}`);
    throw error;
  }
};

export const isHiddenFolder=async(folderPath: string): Promise<boolean>=> {

  const folderName = path.basename(folderPath);

  return folderName.startsWith('.');

}