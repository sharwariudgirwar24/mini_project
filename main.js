import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { fork } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;
let backendProcess;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    backendProcess = fork(path.join(__dirname, 'backend/server.js'), [], {
        env: {
            ...process.env,
            NODE_ENV: 'production',
            RESOURCES_PATH: process.resourcesPath || path.join(__dirname, 'resources')
        }
    });

    backendProcess.on('error', (err) => {
        console.error('Failed to start backend process:', err);
    });

    if (app.isPackaged) {
        mainWindow.loadFile(path.join(__dirname, 'dist-frontend', 'index.html'));
        mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription, validatedURL) => {
            console.error('Load failed:', errorDescription);
        });
    } else {
        mainWindow.loadURL('http://localhost:5173');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('will-quit', () => {
    if (backendProcess) {
        backendProcess.kill();
    }
});
