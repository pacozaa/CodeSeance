import { app, BrowserWindow, ipcMain } from 'electron';
import { traverseDirectory } from './utils/directoryUtils.js';
import { processFile } from './utils/processUtils.js';
import * as path from 'path';

let win: BrowserWindow | null = null;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    win.loadFile('../index.html');
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    // Handle the 'process-directory' event from the renderer process
    ipcMain.on('process-directory', async (event, directoryPath) => {
        const apiUrl = 'https://api.example.com/summarize';

        try {
            await traverseDirectory(directoryPath);
        } catch (error) {
            console.error(`Error processing directory: ${error}`);
        }
    });

    // Handle the 'process-file' event from the renderer process
    ipcMain.on('process-file', async (event, filePath) => {
        const directoryPath = path.dirname(filePath);
        const apiUrl = 'https://api.example.com/summarize';

        try {
            const summary = await processFile(filePath, directoryPath, apiUrl);
            event.reply('summarized-content', summary);
        } catch (error) {
            console.error(`Error processing file: ${error}`);
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});