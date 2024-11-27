export let version;

export async function loadJSON(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading JSON:', error);
      return null;
    }
}

export let langArr, list, tags, titles = {};
export const activeTag = document.getElementById('showall');
export async function loadLocalization() {
  langArr = await loadJSON('https://ftp.ydkjarchive.com/api?get=localization');
  list = await loadJSON('https://ftp.ydkjarchive.com/api?get=list');
  tags = await loadJSON('/json/tags.json');
  titles = await loadJSON('https://ftp.ydkjarchive.com/api?get=titles');
  await loadVersion();
}

export async function loadVersion() {
  try {
    let versionData = await loadJSON('https://test.dejelnieks.lv/v');
  
    if (versionData && versionData.ydkjarchive) {
      version = versionData.ydkjarchive;
    } else {
      console.error('Failed to load version data or "ydkjarchive" not found.');
    }
  } catch (error) {
    console.error('Error loading version:', error);
  }
}