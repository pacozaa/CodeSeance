import { traverseDirectory } from './utils/directoryUtils.js';

const main = async () => {
  const directoryPath = '/path/to/your/directory';

  await traverseDirectory(directoryPath);
};

main();