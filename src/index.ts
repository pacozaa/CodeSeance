import { traverseDirectory } from './utils/directoryUtils.js';

const main = async () => {
  const directoryPath = '/Users/username/MobileAgent';

  await traverseDirectory(directoryPath);
};

main();