const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const https = require('https');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,  // Ensure nodeIntegration is disabled for security
    },
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.handle('download-obs', async (event, downloadUrl, savePath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(savePath);
    https.get(downloadUrl, function (response) {
      response.pipe(file);
      file.on('finish', function () {
        file.close(resolve);
      });
    }).on('error', function (err) {
      fs.unlink(savePath, () => reject(err.message));
    });
  });
});

ipcMain.handle('install-obs', async (event, dmgPath) => {
    return new Promise((resolve, reject) => {
        exec('open ' + dmgPath, (error) => {
            if (error) return reject(`Open error: ${error}`);
            resolve()
        });
    });
});
  
  
  // Handle opening OBS
  ipcMain.handle('open-obs', async () => {
    return new Promise((resolve, reject) => {
      exec('open /Applications/OBS.app', (error) => {
        if (error) return reject(`Open error: ${error}`);
        resolve();
      });
    });
  });