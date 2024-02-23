import { traverseDirectory } from './utils/directoryUtils.js';

const main = async () => {
  const directoryPath = '/Users/xx/MobileAgent';

  await traverseDirectory(directoryPath);
};

main();