export const version = "1723712341";

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
  langArr = await loadJSON('/json/localization.json');
  list = await loadJSON('/json/list.json');
  tags = await loadJSON('/json/tags.json');
  titles = await loadJSON('/json/titles.json');
}