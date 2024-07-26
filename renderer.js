document.getElementById('downloadBtn').addEventListener('click', async () => {
    const downloadUrl = 'https://cdn-fastly.obsproject.com/downloads/obs-studio-30.2.2-macos-apple.dmg';
    const savePath = 'tmp/OBS-Studio-Installer.dmg'; // Update to a valid path
    alert('Download starting ...\nplease wait for download complete alert');
    try {
      await window.electron.downloadObs(downloadUrl, savePath);
      alert('Download complete');
    } catch (error) {
      alert(`Download failed: ${error}`);
    }
  });
  
  document.getElementById('installBtn').addEventListener('click', async () => {
    const installerPath = 'tmp/OBS-Studio-Installer.dmg'; // Update to a valid path
  
    try {
      await window.electron.installObs(installerPath);
      alert('Move OBS app to Application folder');
    } catch (error) {
      alert(`Installation failed: ${error}`);
    }
  });
  
  document.getElementById('openBtn').addEventListener('click', async () => {
    try {
      await window.electron.openObs();
    } catch (error) {
      alert(`Failed to open OBS: ${error}`);
    }
  });