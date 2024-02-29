import { traverseDirectory } from './utils/directoryUtils.js';

const main = async () => {
  // Check if at least one command line argument is provided
  if (process.argv.length < 3) {
    console.error('Usage: node index.ts <your_argument>');
    process.exit(1);
  }
  // Access the command line argument
  const directoryPath: string = process.argv[2];

  // const directoryPath = '/Users/xx/MobileAgent';

  await traverseDirectory(directoryPath);
};

main();