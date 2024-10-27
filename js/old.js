document.addEventListener("DOMContentLoaded", function() {
  const version = "1723712341";
  if(sv){
    function siteversion() {
      sv.innerHTML = `<span id="ver">Version:</span> ${version}`;
    }
    siteversion();
  }
  console.log("Version: " + version);
  popup();
  setTimeout(function() {
    showAll();
}, 100);
});

const langArr = {
  en: {
    lang: 'English',
    lang2: 'Deutsch',
    "5dstart.zip": {
      description: "These fixes will get the 5th Dementia game running, but the audio will be glitching a bit, and the entire window will be off-center, so if you want the full experience, you'll still need a VM."
    },
    "plugdll.zip": {
      description: "These fixes will get the 5th Dementia game running, but the audio will be glitching a bit, and the entire window will be off-center, so if you want the full experience, you'll still need a VM."
    },
    info: 'info',
    showall: 'show all',
    d90s: '90s',
    d00s: '00s',
    d10s: '10s',
    volume: 'volume',
    subject: 'subject',
    iso: 'iso',
    DLC: 'DLC',
    steam: 'steam',
    online: 'online',
    offline: 'offline',
    playstation: 'playstation',
    event: 'event',
    lostmedia: 'lost media',
    flash: 'flash',
    evolution: 'evolution',
    mobile: 'mobile',
    demo: 'demo',
    international: 'international',
    patch: 'patch',
    deutsch: 'deutsch',
    manual: 'manual',
    book: 'book',
    pdf: 'pdf',
    fix: 'fix',
    bundle: 'bundle',
    other: 'other',
    total: 'Total:',
    archive: 'ARCHIVE',
    version: 'Version:',
    date: 'Date:',
    platform: 'Platform:',
    "Question Pack": {
      description: "Only adds 230 questions instead of 400",
    },
    made: 'Made:',
    specialthanks: 'Special thanks:',
    togerman: 'Translated into german:',
    credits: 'CREDITS:',
    setup: 'Setup:',
    "You Don't Know Jack 4": {
      description: 'Trailer of YDKJ 4 from ydkj.de website.',
    },
    for: 'For \'YDKJ Volume 2\'',
    oops: 'Oops..',
    tinsp: 'There is no such page',
    "You Don't Know Jack 5": {
      description: '5th Dementia promotional flash game',
    },
    "You Don't Know Jack P": {
      description: 'This will update You Don\'t Know Jack 1 to 1.01. Extract the 101update.zip file and run update.exe. Please view the readme.txt for a compleate list of fixes.',
    },
    "jackau": {
      description: 'Volume 1 Demo instructional audio',
    },
    "You Don't Hear Jack": {
      description: 'Extracted from YDKJ German 3',
    },
    "You Don't Know Jack Sports": {
      description: 'Courtesy of adidas',
    },
    altlink: "alternative link",
    hab: "archive.org (fixes and bonuses)",
    info: "information",
    search: "Search...",
    noway: "No search results found",
    seemore: "See more",
    showall: "Show all"
  },
  de: {
    lang: 'Deutsch',
    lang2: 'English',
    "5dstart.zip": {
      description: "Diese Korrekturen werden das 5. Dementia-Spiel zum Laufen bringen, Aber Audio wird ein wenig verbuggt sein, und das fenster wird nicht zentriert sein, also wenn du die realistisch Erfahrung haben möchtest, brauchst du eine Virtual Machine."
    },
    "plugdll.zip": {
      description: "Diese Korrekturen werden das 5. Dementia-Spiel zum Laufen bringen, Aber Audio wird ein wenig verbuggt sein, und das fenster wird nicht zentriert sein, also wenn du die realistisch Erfahrung haben möchtest, brauchst du eine Virtual Machine."
    },
    info: 'info',
    showall: 'zeigle alles',
    d90s: '90er',
    d00s: '00er',
    d10s: '10er',
    volume: 'volume',
    subject: 'subjekt',
    iso: 'iso',
    DLC: 'DLC',
    steam: 'steam',
    online: 'online',
    offline: 'offline',
    playstation: 'playstation',
    event: 'event',
    lostmedia: 'lost media',
    flash: 'flash',
    evolution: 'evolution',
    mobile: 'handys',
    demo: 'demo',
    international: 'international',
    patch: 'patch',
    deutsch: 'deutsch',
    manual: 'anleitung',
    book: 'buch',
    pdf: 'pdf',
    fix: 'reperatur',
    bundle: 'bündle',
    other: 'andere',
    total: 'Insgesamt:',
    archive: 'ARCHIV',
    version: 'Version:',
    date: 'Datum:',
    platform: 'Platform:',
    "Question Pack": {
      description: "Fügt nur 230 fragen hinzu anstatt 400 fragen",
    },
    made: 'Gemacht von:',
    specialthanks: 'Special thanks:',
    togerman: 'Translated into german:',
    credits: 'CREDITS:',
    setup: 'Setup:',
    "You Don't Know Jack 4": {
      description: 'Trailer für YDKJ 4 von der ydkj.de webseite.',
    },
    for: 'Für \'YDKJ Volume 2\'',
    oops: 'Ups..',
    tinsp: 'Es gibt nicht so eine Webseite',
    "You Don't Know Jack 5": {
      description: '5. Dementia werbliches flash Spiel',
    },
    "You Don't Know Jack P": {
      description: 'Dadurch wird You Don\'t Know Jack 1 auf 1.01 aktualisiert. Entpacken Sie die Datei 101update.zip und führen Sie update.exe aus. Bitte lesen Sie die readme.txt für eine vollständige Liste der Fehlerbehebungen.',
    },
    "jackau": {
      description: 'Volume 1 Demo Lehraudio',
    },
    "You Don't Hear Jack": {
      description: 'Extrahiert aus YDKJ German 3',
    },
    "You Don't Know Jack Sports": {
      description: 'Gesponsort von adidas',
    },
    altlink: "alternative link",
    hab: "archive.org (Fehlerbehebungen und Bonus Inhalte)",
    info: "Information",
    search: "Such nach...",
    noway: "Keine Ergebnisse gefunden",
    seemore: "Mehr...",
    showall: "Zeige alles"
  }
};

const toogleLanguages = document.querySelector('#toogleLanguages')

function setLang(lang) {
    if (!langArr.hasOwnProperty(lang)) return;
    if (window.hasOwnProperty("localStorage"))
      window.localStorage.setItem("lang", lang);
    if (lang == "en") {
      console.log(langArr[lang]['lang']);
      window.addEventListener('resize', function() {
        const s3Element = document.querySelector('.s3');
        if (window.innerWidth <= 480) {
          s3Element.style.left = '18.85vh';
        } else if (window.innerWidth <= 590) {
          s3Element.style.left = '21vh';
        } else if (window.innerWidth <= 660) {
          s3Element.style.left = '25.1vh';
        } else {
          s3Element.style.left = '29.35vh';
        }
      });
      window.dispatchEvent(new Event('resize'));      
    }
    if (lang == "de") {
      console.log(langArr[lang]['lang']);
      window.addEventListener('resize', function() {
        const s3Element = document.querySelector('.s3');
        if (window.innerWidth <= 480) {
          s3Element.style.left = '15.4vh';
        } else if (window.innerWidth <= 590) {
          s3Element.style.left = '17vh';
        } else if (window.innerWidth <= 660) {
          s3Element.style.left = '20.5vh';
        } else {
          s3Element.style.left = '23.75vh';
        }
      });
      window.dispatchEvent(new Event('resize'));  
    }
    const texttwo = document.querySelectorAll('#texttwo');
    for (var i = 0; i < texttwo.length; i++) {
      texttwo[i].textContent = `${langArr[lang]['archive']}`;
    }
    if (document.querySelector("#texty3")) {
      document.querySelector("#texty3").textContent = `${langArr[lang]['tinsp']}`;
    }
    toogleLanguages.textContent = `${langArr[lang]['lang2']}`;
    const elementTextMappings = {
      "made": "made",
      "specialthanks": "specialthanks",
      "togerman": "togerman"
    };
    
    Object.keys(elementTextMappings).forEach((elementId) => {
      const element = document.getElementById(elementTextMappings[elementId]);
      if (element) {
        element.innerHTML = `${langArr[lang][elementId]}`;
      }
    });
    

}
var lang = (window.hasOwnProperty("localStorage") && window.localStorage.getItem("lang", lang)) || "en";
setLang(lang);

toogleLanguages.addEventListener('click', () => {
  if (localStorage.getItem("lang") === "en") {
    localStorage.setItem("lang", "de");
  } else {
    localStorage.setItem("lang", "en");
  }
  window.location.reload();
});

if (document.getElementById("quizContainer")) {
  document.addEventListener('DOMContentLoaded', function () {
      fetch('/json/list.json')
        .then(response => response.json())
        .then(data => {
          var idTotalTitles = document.getElementById('totalTitles');
          idTotalTitles.textContent += `${langArr[lang]['total']} ${data.content.length}`;
          debugger
          filterByTag(activeTag.textContent);
          displayQuizItems(data, function () {
            const loader = document.querySelector('.loader');
            loader.style.display = 'none';
            document.getElementById('tagsContainer').style.display = 'block';

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
        })
        .catch(error => console.error('Error fetching JSON:', error));
  });
 
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
          if (item.title === "plugdll.zip" && langArr[lang][item.title]) {
            description.textContent = langArr[lang][item.title].description;
          } else if (item.title === "5dstart.zip" && langArr[lang][item.title]) {
            description.textContent = langArr[lang][item.title].description;
          } else if (item.title === "You Don't Know Jack 4" && item.subtitle === "Trailer") {
            description.textContent = langArr[lang]["You Don't Know Jack 4"].description;
          } else if (item.title === "You Don't Know Jack" && item.subtitle === "Psych Test") {
            description.textContent = langArr[lang]["You Don't Know Jack 5"].description;
          } else if (item.title === "You Don't Know Jack" && item.subtitle === "Patch") {
            description.textContent = langArr[lang]["You Don't Know Jack P"].description;
          } else if (item.title === "jack.au") {
            description.textContent = langArr[lang]["jackau"].description;
          } else if (item.title === "You Don't Hear Jack" && item.subtitle === "") {
            description.textContent = langArr[lang]["You Don't Hear Jack"].description;
          } else if (item.title === "You Don't Know Jack Sports") {
            description.textContent = langArr[lang]["You Don't Know Jack Sports"].description;
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
          seemore.href = `/titles/index.html#${index+1}`;
          seemore.className = 'quiz-item-seemore';
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
        if (item.key) {
          link.setAttribute("key", item.key);
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

  function createLink(text, url) {
    const link = document.createElement('a');
    link.innerHTML = `${text}`;
    link.href = url;
    link.target = '_blank';
    return link;
  }

  function createTagElement(tagText, tagId) {
    const tagElement = document.createElement('p');
    tagElement.classList.add('tag');
    tagElement.id = tagId;
    tagElement.innerHTML = tagText;
    return tagElement;
  }
  
  const tagsContainer = document.getElementById('tagsContainer');
  
  const tagsList = [
    { text: `${langArr[lang]['showall']}`, id: 'showall' },
    { text: `${langArr[lang]['d90s']}`, id: '90s' },
    { text: `${langArr[lang]['d00s']}`, id: '00s' },
    { text: `${langArr[lang]['d10s']}`, id: '10s' },
    { text: `${langArr[lang]['volume']}`, id: 'volume' },
    { text: `${langArr[lang]['subject']}`, id: 'subject' },
    { text: `${langArr[lang]['iso']}`, id: 'iso' },
    { text: `${langArr[lang]['DLC']}`, id: 'DLC' },
    { text: `${langArr[lang]['steam']}`, id: 'steam' },
    { text: `${langArr[lang]['online']}`, id: 'online' },
    { text: `${langArr[lang]['offline']}`, id: 'offline' },
    { text: `${langArr[lang]['playstation']}`, id: 'playstation' },
    { text: `${langArr[lang]['event']}`, id: 'event' },
    { text: `${langArr[lang]['lostmedia']}`, id: 'lostmedia' },
    { text: `${langArr[lang]['flash']}`, id: 'flash' },
    { text: `${langArr[lang]['evolution']}`, id: 'evolution' },
    { text: `${langArr[lang]['mobile']}`, id: 'mobile' },
    { text: `${langArr[lang]['demo']}`, id: 'demo' },
    { text: `${langArr[lang]['international']}`, id: 'international' },
    { text: `${langArr[lang]['patch']}`, id: 'patch' },
    { text: `${langArr[lang]['deutsch']}`, id: 'deutsch' },
    { text: '<span id="book2">manual</span>', id: 'book' },
    { text: `${langArr[lang]['fix']}`, id: 'fix' },
    { text: `${langArr[lang]['bundle']}`, id: 'bundle' },
    { text: `${langArr[lang]['other']}`, id: 'other' },
  ];
  
  tagsList.forEach(tagData => {
    const tagElement = createTagElement(tagData.text, tagData.id);
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
let activeTag = document.getElementById('showall');

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

function showAll() {
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

function isElementPartiallyVisible(el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}

function handleScrollAnimation() {
  var triggerElement = document.querySelector('.tdlrc');
  var animatedElement = document.querySelector('.ton');
  var toup = document.querySelector('#toup');
  if (isElementPartiallyVisible(triggerElement)) {
    animatedElement.classList.remove('animate');
    toup.classList.remove('animate');
  } else {
    animatedElement.classList.add('animate');
    toup.classList.add('animate');
  }
}

document.querySelector("#toup").addEventListener("click", function(e) {
  e.preventDefault();
  const targetSection = document.querySelector("#info");
  window.scrollTo({
      top: targetSection.offsetTop,
      behavior: "smooth"
  });
});


window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

function popup() {
  let popupBg = document.querySelector('.modal');
  let popup = document.querySelector('.contentt');
  let popup2 = document.querySelector('.contentt2');
  let openPopupButtons = document.querySelectorAll('.open-popup');
  let closePopupButton = document.querySelector('.actions');
  openPopupButtons.forEach((button)=>{
    button.addEventListener('click', (e)=>{
        e.preventDefault();
        popupBg.classList.add('active');
        if (popup) {
          popup.classList.add('active');
        } else if (popup2) {
          popup2.classList.add('active');
        }

        document.getElementById("info").style.color = "var(--p12)";
        document.getElementById("info").style.border = "var(--p12) solid 0.2vh";
    })
  });
  /*
  closePopupButton.addEventListener('click', ()=>{
      popupBg.classList.remove('active');
      popup.classList.remove('active');
      showAll();
  }
  );
  */
  document.addEventListener('click', (e)=>{
      if (e.target === popupBg) {
          popupBg.classList.remove('active');
          if (popup) {
            popup.classList.remove('active');
          } else if (popup2) {
            popup2.classList.remove('active');
          }
          displayMain();
      }
  }
  );
}

const tct = document.querySelectorAll("#tct");

tct.forEach(function(tct) {
	if (tct) {
		function ladtheme() {
			const toggleTheme = document.querySelectorAll('.toggle-theme')
			console.log('.toggle-theme is found!')
			let el = document.documentElement
			console.log('tct atrasts!')

			for (var i = 0; i < toggleTheme.length; i++) {
				toggleTheme[i].addEventListener('click', function() {
					console.log('nospiedis');
					if (el.hasAttribute('data-theme')) {
						el.removeAttribute('data-theme');
						console.log('The light theme has been turned on!');
						//x.classList.remove("lang-toggleladoff");
						//x.classList.add("lang-toggleladon");
						tct.innerHTML = '🌛';
						localStorage.removeItem('theme');
						console.log('Item removed from local storage');
					} else {
						el.setAttribute('data-theme', 'dark');
						console.log('The dark theme has been turned on!');
						//x.classList.remove("lang-toggleladon");
						//x.classList.add("lang-toggleladoff");
						tct.innerHTML = '🌞';
						localStorage.setItem('theme', 'dark');
						console.log('Item added in local storage');
					}
				})
			}

			if (localStorage.getItem('theme') !== null) {
				el.setAttribute('data-theme', 'dark');
				//x.classList.add("lang-toggleladoff");
				tct.innerHTML = '🌞';
			} else {
				//x.classList.add("lang-toggleladon");
				tct.innerHTML = '🌛';
			}
		}
		ladtheme()
		console.log('LAD working!');
	} else {
		alert('LAD not working');
	}
});

if (document.getElementById("tagsContainer")) {
const textElement = document.getElementById('book2');
var book2texts = [`${langArr[lang]['manual']}`, `${langArr[lang]['book']}`, `${langArr[lang]['pdf']}`];
let currentIndex = 0;

function changeText() {
  textElement.textContent = book2texts[currentIndex];
  currentIndex = (currentIndex + 1) % book2texts.length;
}
setInterval(changeText, 12000);
}

function displayMain() {
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

if (document.getElementById("titlescontent")) {
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
                  const listItem = listData.content[key-1];

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
                  if(jsonData[0]) { var titlehisis = item.title } else {var titlehisis = listItem.title + (listItem.subtitle ? ` ` +  listItem.subtitle : ``)};
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
                    osItem.className = 'tag4';
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
  rest.textContent = langArr[lang]['showall']
  function resetId() {
    document.getElementById('titlescontent').innerHTML = "";
    if (rest) {
      rest.style.display = "none";
    }
    window.location.hash = '';
    displayContent();
  }
}