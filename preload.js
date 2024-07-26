const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  downloadObs: (url, path) => ipcRenderer.invoke('download-obs', url, path),
  installObs: (path) => ipcRenderer.invoke('install-obs', path),
  openObs: () => ipcRenderer.invoke('open-obs'),
});