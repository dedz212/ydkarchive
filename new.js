import { setLang, lang } from './js/localization.js'
import { loadLocalization, langArr, list, tags } from './js/init.js'
import { popup } from './js/popup.js'
import { ladtheme } from './js/ladtheme.js'
import { handleScrollAnimation } from './js/scroll.js'

let activeTag = document.getElementById('showall');

async function initLang() {
  console.log(`1729994561`)
  lad()
  await loadLocalization();
  await setLang(lang);
  handleScrollAnimation();
  if (document.getElementById("quizContainer")) {
    await tagsContainer();
    await start();
  } else if (document.getElementById("titlescontent")) {
    await startTitle();
  }
  if (document.getElementById("tagsContainer")) book2();
  lightth();
  popup();
  setTimeout(() => {
    showAll();
  }, 100);
}
initLang();

async function start() {
  var idTotalTitles = document.getElementById('totalTitles');
  idTotalTitles.textContent += `${langArr[lang]['total']} ${list.content.length}`;
  filterByTag(activeTag);
  displayQuizItems(list, async function () {
    const loader = document.querySelector('.loader');
    loader.style.display = 'none';
    document.getElementById('tagsContainer').style.display = 'block';

    await setLang(lang);
    const searchInput = document.getElementById('searchInput');
    searchInput.style.display = "flex"
    searchInput.placeholder = langArr[lang]['search'];
    const quizItems = document.querySelectorAll('.quiz-item-content');
    const noResultMessage = document.getElementById('noResultMessage');

    searchInput.addEventListener('input', function () {
      showAll();
      const searchText = searchInput.value.toLowerCase();
      let found = false;
      quizItems.forEach(quizItem => {
        const title = quizItem.querySelector('h2').textContent.toLowerCase();
        if (title.includes(searchText)) {
          quizItem.parentElement.style.display ='flex';
          found = true;
        } else {
          quizItem.parentElement.style.display ='none';
        }
      });
      if (!found && searchText !== '') {
        noResultMessage.style.display = 'block';
        noResultMessage.textContent = langArr[lang]['noway']
      } else {
        noResultMessage.style.display = 'none';
      }
    });
  });
}

function displayQuizItems(isa, callback) {
  const container = document.getElementById('quizContainer');
  const content = isa.content;

  content.forEach((item, index) => {
    setTimeout(() => {
      const quizItem = document.createElement('div');
      quizItem.classList.add('quiz-item');
      quizItem.id = 'qi';

      const imgc = document.createElement('div');
      imgc.id = 'imgw';

      item.tags.forEach(tag => quizItem.classList.add(tag));
      
      if (item.image) {
        const image = document.createElement('img');
        image.src = item.image;
        image.className = 'thumbnail';
        image.addEventListener('click', () => {
          lightbox.style.display = 'flex'; // Показываем лайтбокс
          lightboxImg.src = item.image; // Устанавливаем источник изображения
        });
        imgc.appendChild(image);
        quizItem.appendChild(imgc);
      } else {
        const div = document.createElement('div');
        div.classList.add('div');
        div.innerHTML = "✕"
        imgc.appendChild(div);
        quizItem.appendChild(imgc);
    }
  
      const itemContent = document.createElement('div');
      itemContent.classList.add('quiz-item-content');
  
      const title = document.createElement('h2');
      if (item.subtitle) {
        title.innerHTML = `${item.title} <span class="quiz-item-subtitle">${item.subtitle}</span>`;
      } else {
        title.textContent = item.title;
      }
      itemContent.appendChild(title);
    
      if (item.description) {
        const description = document.createElement('p');
        description.className = 'quiz-item-p';
        if (item.dkey) {
          description.setAttribute("dkey", item.dkey);
        } else {
          description.textContent = item.description;
        }
        itemContent.appendChild(description)
      }

      if (item.platform) {
        const platform = document.createElement('p');
        platform.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['platform']} ${item.platform}</span>`;
        platform.className = 'quiz-item-p';
        itemContent.appendChild(platform);
      }

      if (item.version) {
        const version = document.createElement('p');
        version.className = 'quiz-item-p';
        version.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['version']}</span> ${item.version}`;
        itemContent.appendChild(version);
      }

      if (item.date) {
        const date = document.createElement('p');
        date.className = 'quiz-item-p';
        date.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['date']}</span> ${item.date}`;
        itemContent.appendChild(date);
      }

      if (item.tagd) {
        item.tagd.forEach(tag => {
          const tagd = document.createElement('p');
          tagd.className = 'tag4';
          tagd.textContent = tag;
          itemContent.appendChild(tagd);
        });
      }
      
      if (item.download) {
        const downloadLinks = createDownloadLinks(item.download);
        itemContent.appendChild(downloadLinks);
      }

      if (item.seemore) {
        const seemore = document.createElement('a');
        seemore.href = `/titles/index.html#${item.seemore}`;
        seemore.className = 'quiz-item-seemore seemore';
        seemore.textContent = langArr[lang]['seemore'];
        itemContent.appendChild(seemore);
      }

      quizItem.appendChild(itemContent);
  
      container.appendChild(quizItem);
      if (index === content.length - 1) {
        callback();
      }
    }, index * 50);
  });
}

function createDownloadLinks(download) {
    const linkContainer = document.createElement('div');

    download.forEach(item => {
      if(item.hide) {
        return
      }
      const link = document.createElement('a');
      if (item.id) {
        if (item.bkey) {
          link.setAttribute("bkey", item.bkey);
        } else if (item.id === "archive") {
          link.innerHTML = "Download (Archive)";
          link.href = "https://archive.org/details/" + item.link;
        } else if (item.id === "compiware") {
          link.innerHTML = "Download (CompiWare)";
          link.href = "https://www.compiware-forum.de/downloads/file/" + item.link;
        } else if (item.id === "dejelnieks") {
          link.innerHTML = `Download ${item.name}`;
          link.href = "https://test.dejelnieks.lv/get?file=" + item.link;
        }
      } else {
        link.innerHTML = item.name;
        link.href = item.link;
      }
      if (item.format) {
        link.setAttribute("format", item.format);
      }
      link.target = '_blank';
      linkContainer.appendChild(link);
      linkContainer.id = "linkss";
    });

    return linkContainer;
}

function filterByTag(tag) {
    const items = document.querySelectorAll('.quiz-item');
    const tagElements = document.querySelectorAll('.tag');
    if (activeTag) {
      activeTag.classList.remove('active-tag');
    }
  
    items.forEach(item => {
      if (item.classList.contains(tag)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  
    tagElements.forEach(element => {
      if (element.id === tag) {
        element.classList.add('active-tag');
        activeTag = element;
      }
    });
}

async function tagsContainer() {
    const tagsContainer = document.getElementById('tagsContainer');
    tags.forEach(tagData => {
      const tagElement = createTagElement(tagData.key, tagData.id, tagData.special);
      tagsContainer.appendChild(tagElement);
    });
  
    tagsContainer.addEventListener('click', (event) => {
      document.getElementById('searchInput').value = '';
        if (event.target.classList.contains('tag')) {
            const tag = event.target.id;
            if (tag === 'showall') {
                showAll();
            } else {
                filterByTag(tag);
            }
        }
    });
}

function createTagElement(tagText, tagId, special = null) {
    const tagElement = document.createElement('p');
    tagElement.classList.add('tag');
    tagElement.id = tagId;
    if (special) {
        const e = document.createElement(special.e);
        e.id = special.id;
        e.innerHTML = langArr[lang][tagText];
        tagElement.appendChild(e);
    } else {
        tagElement.innerHTML = langArr[lang][tagText];
    }
    return tagElement;
}

export function showAll() {
    const items = document.querySelectorAll('.quiz-item');
    const tagElements = document.querySelectorAll('.tag');
  
    if (activeTag) {
      activeTag.classList.remove('active-tag');
      activeTag = null;
    }
    
    items.forEach(item => {
      item.style.display = 'block';
    });
  
    tagElements.forEach(element => {
      const showall = "showall"
      if (element.id === showall) {
        element.classList.add('active-tag');
        activeTag = element;
      }
    });
}

export function displayMain() {
    const container = document.querySelector(".container");
    const titlescontent = document.querySelector("#titlescontent");
    document.getElementById("info").style.color = "var(--p10)";
      document.getElementById("info").style.border = "var(--p10) solid 0.2vh";
    
    if (container) {
      if (container.style.display !== 'none') {
        container.style.display = 'none';
      } else {
        container.style.display = 'flex';
        showAll();
      }
    } else if (titlescontent) {
      if (titlescontent.style.display !== 'none') {
        titlescontent.style.display = 'none';
      } else {
        titlescontent.style.display = 'flex';
        showAll();
      }
    }
}

function lad() {
    const tctElements = document.querySelectorAll("#tct");

    tctElements.forEach(function (tct) {
        if (tct) {
            ladtheme(tct);
            console.log('LAD working!');
        } else {
            alert('LAD not working');
        }
    });
}

async function startTitle() {
    function filterDataByIds(jsonData, ids) {
        if (!ids) {
          delete jsonData["0"];
          var rest = document.getElementById('rest');
          if (rest) {
              rest.style.display = "none";
          }
          return jsonData;
        }

        var idArray = ids.split(',');
        var filteredData = {};

        idArray.forEach(function (id) {
            id = id.trim();
            if (jsonData.hasOwnProperty(id)) {
                filteredData[id] = jsonData[id];
            }
        });

        document.querySelector("#toup").addEventListener("click", function(e) {
        e.preventDefault();
        const targetSection = document.querySelector("#info");
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
        });
        });

        return filteredData;
    }

    function displayContent() {
        fetch('/json/titles.json')
        .then(response => response.json())
        .then(gtJsonData => {
            const contentDiv = document.getElementById('titlescontent');
            var urlFragment = window.location.hash.substr(1);
            var jsonData = filterDataByIds(gtJsonData, urlFragment);
            fetch('/json/list.json')
            .then(response => response.json())
            .then(listData => {

            for (var key in jsonData) {
                if (jsonData.hasOwnProperty(key)) {
                    var item = jsonData[key];
                    const listItem = listData.content.find(item => item.seemore === "ydkjgs");

                    const divcr = document.createElement('div');
                    divcr.id = key;
                    divcr.className = 'boxfortc';
                    contentDiv.appendChild(divcr);
                    const divhpcr = document.createElement('div');
                    divhpcr.className = 'divhpcr';

                    const pcr = document.createElement('p');
                    pcr.textContent = key;
                    pcr.className = 'boxtcp';

                    const h2cr = document.createElement('h2');
                    h2cr.className = 'boxtch2';
                    if(jsonData[0]) {
                      var titlehisis = item.title;
                    } else {
                      var titlehisis = listItem.title + (listItem.subtitle ? ` ` +  listItem.subtitle : ``)
                    };
                    h2cr.textContent = titlehisis
                    divhpcr.appendChild(h2cr);
                    divcr.appendChild(divhpcr);
                    if(!jsonData[0]) { 
                      const divcrpp = document.createElement('div');
                      divcrpp.className = 'listofsvd';

                      const ssd2 = document.createElement('div');
                      ssd2.className = 'todown';

                      const dpcr = document.createElement('p');
                      dpcr.textContent = listItem.date ? `${langArr[lang]['date']} ` + listItem.date : ``;
                      dpcr.className = 'boxtcp';
                      ssd2.appendChild(dpcr);

                      const osItem = document.createElement('p');
                      item.info.os.forEach(os => {
                          osItem.textContent = os;
                          osItem.className = 'boxtcp';
                      });
                      ssd2.appendChild(osItem);

                      for (var rating in item.info.ratings) {
                          console.log(rating);
                          const ratingItem = document.createElement('p');
                          if (rating === 'usk') { var rate = 'USK' };
                          ratingItem.textContent = `${rate}: ${item.info.ratings[rating]}`;
                          ratingItem.className = 'boxtcp';
                          ssd2.appendChild(ratingItem);
                      }
                    divcrpp.appendChild(ssd2);

                    const ssd = document.createElement('div');
                    ssd.className = 'todown';

                        item.info.developer.forEach(developer => {
                        const developerItem = document.createElement('a');
                        developerItem.className = 'tag5';
                        developerItem.textContent = developer;
                        developerItem.href = `https://jackboxgames.fandom.com/wiki/${developer}`
                        ssd.appendChild(developerItem);
                        });
                        divcrpp.appendChild(ssd);

                    const vpcr = document.createElement('p');
                    vpcr.textContent = listItem.version ? `${langArr[lang]['version']}` + listItem.version : ``;
                    vpcr.className = 'boxtcp';
                    
                    divhpcr.appendChild(pcr);
                    divcrpp.appendChild(vpcr);
                    divcr.appendChild(divcrpp);
                    }
                    for (var typeKey in item.types) {
                        const divcr2 = document.createElement('div');
                        divcr2.className = 'redwow';
                        divcr.appendChild(divcr2);
                        if (item.types.hasOwnProperty(typeKey)) {
                        const divcr3 = document.createElement('div');
                        divcr3.className = 'torightaby';
                        var type = item.types[typeKey];
                        const h3cr = document.createElement('h3');
                        h3cr.className = 'boxtch3';
                        h3cr.textContent = type.type + ' - ' + type.language;
                        const abyd = document.createElement('h3');
                        abyd.className = 'boxtaby';
                        abyd.innerHTML = `Made by<br>${type.aby}`;
                        divcr3.appendChild(h3cr);
                        divcr3.appendChild(abyd);
                        divcr2.appendChild(divcr3);
                        const divfimgcr = document.createElement('div');
                        divfimgcr.className = "divfimgcr"
                        divcr2.appendChild(divfimgcr);
                            
                        for (var imageKey in type.images) {
                          if (type.images.hasOwnProperty(imageKey)) {
                            const divappp = document.createElement('div');
                            divappp.className = 'divappp';

                            const imgt = document.createElement('img');
                            imgt.src = `../titles/${key}/${typeKey}/` + type.images[imageKey];
                            imgt.alt = imageKey;
                            imgt.className = 'thumbnail';
                            imgt.addEventListener('click', (() => {
                              const currentImage = type.images[imageKey];
                              return () => {
                                  lightbox.style.display = 'flex';
                                  lightboxImg.src = `../titles/${key}/${typeKey}/` + currentImage;
                              };
                          })());

                            const pt = document.createElement('p');
                            if (imageKey === "frontcover") {
                                pt.textContent = "Front cover"
                            } else if (imageKey === "insidecover") {
                                pt.textContent = "Inside cover"
                            } else if (imageKey === "cd1") {
                                pt.textContent = "CD"
                            }
                            pt.className = 'pttt';

                            divappp.appendChild(imgt);
                            divappp.appendChild(pt);
                            divfimgcr.appendChild(divappp);
                          }
                        }
                      }
                    }
                }
            }
            
            })
            .catch(error => console.error('Error fetching JSON:', error));
        })
        .catch(error => console.error('Error fetching JSON:', error));
    }

    window.onload = displayContent;
    var rest = document.getElementById('rest')
    rest.textContent = langArr[lang]['showall_2']
    function resetId() {
        document.getElementById('titlescontent').innerHTML = "";
        if (rest) {
        rest.style.display = "none";
        }
        window.location.hash = '';
        displayContent();
    }
    rest.addEventListener('click', resetId)
    displayContent();
}

const thumbnails = document.querySelectorAll('.thumbnail');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close');

function lightth() {
    // Открытие изображения в лайтбоксе
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            lightbox.style.display = 'flex'; // Показываем лайтбокс
            lightboxImg.src = thumbnail.src; // Устанавливаем источник изображения
        });
    });

    // Закрытие лайтбокса
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none'; // Скрываем лайтбокс
    });

    // Закрытие лайтбокса при клике вне изображения
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            lightbox.style.display = 'none'; // Скрываем лайтбокс
        }
    });
}

function book2() {
  const textElement = document.getElementById('book2');
  var book2texts = [`${langArr[lang]['manual']}`, `${langArr[lang]['book']}`, `${langArr[lang]['pdf']}`];
  let currentIndex = 0;
  
  function changeText() {
    textElement.textContent = book2texts[currentIndex];
    currentIndex = (currentIndex + 1) % book2texts.length;
  }
  setInterval(changeText, 12000);
}