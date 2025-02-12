import { setLang, lang } from './js/localization.js'
import { loadLocalization, langArr, list, tags, titles } from './js/init.js'
import { popup } from './js/popup.js'
import { ladtheme } from './js/ladtheme.js'
import { handleScrollAnimation } from './js/scroll.js'

let activeTag = document.getElementById('showall');

async function initLang() {
  try {
    lad()
    await loadLocalization();
    await setLang(lang);
    handleScrollAnimation();
    if (document.getElementById("quizContainer")) {
      await tagsContainer();
      await start();
    } else if (document.getElementById("titlescontent")) {
      await startTitle();
    } else if (document.getElementById("wikiacontent")) {
      await startWikia();
    }
    if (document.getElementById("tagsContainer")) book2();
    lightth();
    popup();
    setTimeout(() => {
      showAll();
    }, 100);
  } catch (error) {
    console.error("Error:", error);
    alert(error);
    window.location.href = "/error.html";
  }
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
    const lp = document.getElementById('lp');
    searchInput.style.display = "flex"
    lp.style.display = "flex"
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
        //div.innerHTML = "✕"
        const ni = document.createElement('div');
        ni.className = "ni"
        ni.innerHTML = "<span>NO</span></br>IMAGE"
        div.appendChild(ni);
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
          link.href = "https://ftp.ydkjarchive.com/get?file=" + item.link;
        } else if (item.id === "meganz") {
          link.innerHTML = `Download (mega.nz)`;
          link.href = "https://mega.nz/file/" + item.link;
        } else if (item.id === "vimm") {
          link.innerHTML = `Download (vimm.net)`;
          link.href = "https://vimm.net/vault/" + item.link;
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
    const wikiacontent = document.querySelector("#wikiacontent");
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
    } else if (wikiacontent) {
      if (wikiacontent.style.display !== 'none') {
        wikiacontent.style.display = 'none';
      } else {
        wikiacontent.style.display = 'flex';
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
      var gtJsonData = titles
      const contentDiv = document.getElementById('titlescontent');
      var urlFragment = window.location.hash.substr(1);
      var jsonData = filterDataByIds(gtJsonData, urlFragment);
      var listData = list;

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
          pcr.className = 'boxtcp2';

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

            const datum = document.createElement('div');
            datum.className = 'rtl';
            const datuml = document.createElement('div');
            datuml.textContent = item.info.date ? `${langArr[lang]['date']}` : ``;
            datuml.className = 'boxtcp';

            const dpcr = document.createElement('p');
            dpcr.textContent = item.info.date ? formatDate(item.info.date, lang) : ``;
            dpcr.className = 'boxtcprr';
            datum.appendChild(datuml);
            datum.appendChild(dpcr);
            ssd2.appendChild(datum);
/*
            const osItem = document.createElement('p');
            item.info.os.forEach(os => {
              osItem.textContent = os;
              osItem.className = 'boxtcp';
            });
            ssd2.appendChild(osItem);
*/
            const rat = document.createElement('div');
            rat.className = 'rtl';

            for (var rating in item.info.ratings) {
              const ratl = document.createElement('div');
              const ratingItem = document.createElement('p');

              if (rating === 'usk') { var rate = 'USK' };

              ratl.textContent = `${rate}: `;
              ratl.className = 'boxtcp';

              ratingItem.textContent = `${item.info.ratings[rating]}`;
              ratingItem.className = 'boxtcprr';

              rat.appendChild(ratl);
              rat.appendChild(ratingItem);
            }
            ssd2.appendChild(rat);
            divcrpp.appendChild(ssd2);

            createSection('Resolution:', item.info.resolution.pbp.concat(item.info.resolution.sbs, item.info.resolution.colors));
            function createSection(header, items) {
              const sectionDiv = document.createElement('div');
              sectionDiv.className = 'boxtcp lil';
              sectionDiv.textContent = header;
          
              const listDiv = document.createElement('div');
              listDiv.className = 'rtl';
          
              items.forEach(item => {
                const itemElement = document.createElement('p');
                itemElement.className = 'boxtcprr';
                itemElement.textContent = item + ' '; // Добавляем пробел между элементами
                listDiv.appendChild(itemElement);
              });
          
              sectionDiv.appendChild(listDiv);
              ssd2.appendChild(sectionDiv);
            }

            const aDiv = document.createElement('div');
            aDiv.id = "adiv"

            const developerDiv = document.createElement('div');
            developerDiv.className = 'boxtcp lil';
            const developerl = document.createElement('div');
            developerl.className = 'boxtcp';
            developerl.textContent = "Developers: "
            developerDiv.appendChild(developerl);
            const developerr = document.createElement('div');
            developerr.className = 'rtl';

            item.info.a.developer.forEach(developer => {
              const developerItem = document.createElement('a');
              developerItem.textContent = developer;
              developerItem.href = `../wikia/#${developer}`
              developerr.appendChild(developerItem);
            });
            developerDiv.appendChild(developerr);
            aDiv.appendChild(developerDiv);

            const localizationDiv = document.createElement('div');
            localizationDiv.className = 'boxtcp lil';
            localizationDiv.textContent = "Localization: "
            const localizationl = document.createElement('div');
            localizationl.className = 'rtl';
            item.info.a.localization.forEach(localization => {
              const localizationItem = document.createElement('a');
              localizationItem.textContent = localization;
              localizationItem.href = `../wikia/#${localization}`
              localizationl.appendChild(localizationItem);
            });
            localizationDiv.appendChild(localizationl);
            aDiv.appendChild(localizationDiv);

            const publisherDiv = document.createElement('div');
            publisherDiv.className = 'boxtcp lil';
            publisherDiv.textContent = "Publisher: "
            const publisherl = document.createElement('div');
            publisherl.className = 'rtl';
            item.info.a.publisher.forEach(publisher => {
              const publisherItem = document.createElement('a');
              publisherItem.textContent = publisher;
              publisherItem.href = `../wikia/#${publisher}`
              publisherl.appendChild(publisherItem);
            });
            publisherDiv.appendChild(publisherl);
            aDiv.appendChild(publisherDiv);

            const distribitionDiv = document.createElement('div');
            distribitionDiv.className = 'boxtcp lil';
            distribitionDiv.textContent = "Disitribition: "
            const distribitionl = document.createElement('div');
            distribitionl.className = 'rtl';
            item.info.a.distribition.forEach(distribition => {
              const distribitionItem = document.createElement('a');
              distribitionItem.textContent = distribition;
              distribitionItem.href = `../wikia/#${distribition}`
              distribitionl.appendChild(distribitionItem);
            });
            distribitionDiv.appendChild(distribitionl);
            aDiv.appendChild(distribitionDiv);


            const bDiv = document.createElement('div');
            const WRek = document.createElement('div');
            WRek.textContent = "Windows Requirements:";
            WRek.className = 'rek';
            bDiv.appendChild(WRek);

            const wosDiv = document.createElement('div');
            wosDiv.className = 'boxtcp lil';
            const wosl = document.createElement('div');
            wosl.className = 'boxtcp';
            wosl.textContent = "OS: "
            wosDiv.appendChild(wosl);
            const wosr = document.createElement('div');
            wosr.className = 'rtl';

            item.info.requirement.windows.os.forEach(os => {
              const wosItem = document.createElement('p');
              wosItem.textContent = os;
              wosItem.className = 'boxtcprr';
              wosr.appendChild(wosItem);
            });
            wosDiv.appendChild(wosr);
            bDiv.appendChild(wosDiv);

            const wramDiv = document.createElement('div');
            wramDiv.className = 'boxtcp lil';
            const wraml = document.createElement('div');
            wraml.className = 'boxtcp';
            wraml.textContent = "RAM: "
            wramDiv.appendChild(wraml);
            const wramr = document.createElement('div');
            wramr.className = 'rtl';

            const wramItem = document.createElement('p');
            wramItem.textContent = item.info.requirement.windows.ram;
            wramItem.className = 'boxtcprr';
            wramr.appendChild(wramItem);

            wramDiv.appendChild(wramr);
            bDiv.appendChild(wramDiv);

            const whdDiv = document.createElement('div');
            whdDiv.className = 'boxtcp lil';
            const whdl = document.createElement('div');
            whdl.className = 'boxtcp';
            whdl.textContent = "HD: "
            whdDiv.appendChild(whdl);
            const whdr = document.createElement('div');
            whdr.className = 'rtl';

            const whdItem = document.createElement('p');
            whdItem.textContent = item.info.requirement.windows.hd;
            whdItem.className = 'boxtcprr';
            whdr.appendChild(whdItem);

            whdDiv.appendChild(whdr);
            bDiv.appendChild(whdDiv);


            ssd2.appendChild(aDiv);
            ssd2.appendChild(bDiv);

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
    const lp = document.getElementById('lp');
    lp.style.display = "flex"
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

function formatDate(dateObj, lang) {
  const day = dateObj.day;
  const month = dateObj.month;
  const year = dateObj.year;

  if (lang === 'en') {
    return `${month}/${day}/${year}`; // Формат: MM/DD/YYYY
  } else if (lang === 'de') {
    return `${day}.${month}.${year}`; // Формат: DD.MM.YYYY
  }
  return '';
}

async function startWikia() {
  fetch('../json/wikia.json')
  .then(response => response.json())
  .then(data => {
      const container = document.getElementById('wikiacontent');

      data.forEach(entry => {
          const box = document.createElement('div');
          box.className = 'boxfortc two';
          box.id = entry.id;

          const dt = document.createElement('div');
          dt.classList.add('divhpcr2');

          const kd = document.createElement('div');

          const title = document.createElement('h2');
          title.textContent = entry.title;
          title.classList.add('boxtch2');
          
          const description = document.createElement('p');
          description.textContent = entry.description;
          description.classList.add('box3p');

          kd.appendChild(title);
          kd.appendChild(description);

          const logo = document.createElement('img');
          logo.src = entry.logo;
          logo.classList.add('box3img');

          dt.appendChild(kd);
          dt.appendChild(logo);

          box.appendChild(dt);
          
          if (entry.publisher) {
            const dh = document.createElement('div');
            dh.classList.add('boxtch23');
            dh.textContent = "Published";
            kd.appendChild(dh);

            const table = document.createElement('table');
            const thead = document.createElement('thead');
            const tbody = document.createElement('tbody');
            
            const headerRow = document.createElement('tr');
            ['Name', 'Platform', 'Release', 'Type'].forEach(text => {
                const th = document.createElement('th');
                th.textContent = text;
                headerRow.appendChild(th);
            });
            thead.appendChild(headerRow);
            
            entry.publisher.forEach(game => {
              const row = document.createElement('tr');
              
              const cell1 = document.createElement('td');
              cell1.className = 'ass';

              const special = document.createElement('div');
              cell1.appendChild(special);

              const localizationItem = document.createElement('a');
              localizationItem.textContent = game.game;
              special.appendChild(localizationItem);

              const popup = document.createElement('div');
              popup.id = 'popup2';
              popup.className = 'sm';

              special.appendChild(popup);
              special.className = 'hm';
              special.addEventListener('mouseenter', () => {
                popup.innerHTML = "";
                const title = document.createElement('div');
                title.textContent = game.game;
                title.style.width = "70%";

                const idid_o = document.createElement('div');
                idid_o.className = 'idid_o';

                const idid = document.createElement('a');
                idid.href = `/titles/index.html#${game.id}`;
                idid.className = 'seemore2';
                idid.textContent = langArr[lang]['seemore'];

                idid_o.appendChild(title);
                idid_o.appendChild(idid);
                popup.appendChild(idid_o);

                if (game.info) {
                  const titleif = document.createElement('div');
                  titleif.className = 'box3p2';
                  titleif.textContent = game.info;
                  popup.appendChild(titleif);
                }

                if (game.seealso) {
                  const titleif = document.createElement('div');
                  titleif.className = 'titleif';
                  titleif.textContent = "See also";
                  popup.appendChild(titleif);

                  game.seealso.forEach(s => {
                    const platformDiv = document.createElement('div');
                    platformDiv.className = 'pd';

                    const platformA = document.createElement('a');
                    const listItem = list.content.find(item => item.seemore === s);
                    if (listItem) {
                      platformA.textContent = listItem.title + (listItem.subtitle ? ` ` +  listItem.subtitle : ``);
                    } else {
                      platformA.textContent = s;
                    }
                    platformA.href = `/titles/index.html#${s}`;
                    platformDiv.appendChild(platformA);
                    popup.appendChild(platformDiv);
                  });
                }

                popup.style.display = 'block';
              });
              special.addEventListener('mouseleave', () => {
                popup.style.display = 'none';
              });
              row.appendChild(cell1);
              
              const cell2 = document.createElement('td');
              cell2.textContent = game.platform.length ? game.platform.join(', ') : '-';
              row.appendChild(cell2);
              
              const cell3 = document.createElement('td');
              cell3.textContent = game.release;
              row.appendChild(cell3);
              
              const cell4 = document.createElement('td');
              cell4.textContent = game.type;
              row.appendChild(cell4);
              
              tbody.appendChild(row);
            });

            table.appendChild(thead);
            table.appendChild(tbody);
            kd.appendChild(table);
          }
/*
          if (entry.localization) {
            entry.localization.forEach(loc => {
                const locBox = document.createElement('div');
                locBox.classList.add('localization-box');
                
                const locTitle = document.createElement('h3');
                locTitle.textContent = loc.game;
                locBox.appendChild(locTitle);
                
                const locInfo = document.createElement('p');
                locInfo.innerHTML = `<strong>ID:</strong> ${loc.id} | <strong>Release:</strong> ${loc.release}`;
                locBox.appendChild(locInfo);
                
                if (loc.info) {
                    if (loc.info.writer) {
                        const writers = document.createElement('p');
                        writers.innerHTML = `<strong>Writers:</strong> ${loc.info.writer.join(', ')}`;
                        locBox.appendChild(writers);
                    }
                    if (loc.info.director) {
                        const directors = document.createElement('p');
                        directors.innerHTML = `<strong>Directors:</strong> ${loc.info.director.join(', ')}`;
                        locBox.appendChild(directors);
                    }
                    if (loc.info.voices) {
                        const voiceList = document.createElement('ul');
                        loc.info.voices.forEach(voice => {
                            const li = document.createElement('li');
                            li.textContent = `${voice.r}: ${voice.a}`;
                            voiceList.appendChild(li);
                        });
                        const voicesHeader = document.createElement('p');
                        voicesHeader.innerHTML = '<strong>Voices:</strong>';
                        locBox.appendChild(voicesHeader);
                        locBox.appendChild(voiceList);
                    }
                    if (loc.info.cast) {
                        const cast = document.createElement('p');
                        cast.innerHTML = `<strong>Cast:</strong> ${loc.info.cast.join(', ')}`;
                        locBox.appendChild(cast);
                    }
                }
                box.appendChild(locBox);
            });
        }
*/          
          container.appendChild(box);
      });
    const lp = document.getElementById('lp');
    lp.style.display = "flex"
  })
  .catch(error => console.error('Error loading JSON:', error));

}