import * as fs from 'fs';
import * as path from 'path';
import { processFile } from './processUtils.js';
import { isGitIgnore, isHiddenPath } from './skipUtils.js';

export const traverseDirectory = async (directoryPath: string): Promise<void> => {
  try {
    const files = await fs.promises.readdir(directoryPath);

    for (const file of files) {
      const filePath = path.join(directoryPath, file);
      const stat = await fs.promises.stat(filePath);
      // console.log({
      //   file,
      //   filePath,
      //   directoryPath
      // })
      if (stat.isDirectory()) {
        // Add folder skip utils and can add more custom skip folder name, same for files
        if (isHiddenPath(file)) {
          console.log(`Skipping hidden folder ${file}`);
          continue;
        }
        if (await isGitIgnore(directoryPath, filePath)) {
          continue;
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