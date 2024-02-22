import { ipcRenderer } from 'electron';

// Add code to handle file input and send it to the main process
export const openDirectoryInput = document.getElementById('open-directory-input') as HTMLInputElement;
openDirectoryInput.addEventListener('change', (event) => {
  const directory = (event.target as HTMLInputElement).files?.[0].path;
  if (directory) {
    ipcRenderer.send('process-directory', directory);
  }
});

// Add code to handle file input and send it to the main process
const openFileInput = document.getElementById('open-file-input') as HTMLInputElement;
openFileInput.addEventListener('change', (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    ipcRenderer.send('process-file', file.path);
  }
});

// Add code to receive summarized content from the main process and display it
ipcRenderer.on('summarized-content', (event, summary) => {
  const summaryOutput = document.getElementById('summary-output') as HTMLTextAreaElement;
  summaryOutput.value = summary;
});