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
    }
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
    }
  }
};

const toogleLanguages = document.querySelector('#toogleLanguages')

  function setLang(lang) {
    if (!langArr.hasOwnProperty(lang)) return;
    if (window.hasOwnProperty("localStorage"))
      window.localStorage.setItem("lang", lang);
    if (lang == "en") {
      console.log(langArr[lang]['lang']);
    }
    if (lang == "de") {
      console.log(langArr[lang]['lang']);
    }
    const texttwo = document.querySelectorAll('#texttwo');
    for (var i = 0; i < texttwo.length; i++) {
      texttwo[i].textContent = `${langArr[lang]['archive']}`;
    }
    if (document.querySelector("#texty3")) {
      document.querySelector("#texty3").textContent = `${langArr[lang]['tinsp']}`;
    }
    toogleLanguages.textContent = `${langArr[lang]['lang2']}`;
    document.querySelector("#made").textContent = `${langArr[lang]['made']}`;
    document.querySelector("#specialthanks").textContent = `${langArr[lang]['specialthanks']}`;
    document.querySelector("#togerman").textContent = `${langArr[lang]['togerman']}`;
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


document.addEventListener('DOMContentLoaded', function () {
    fetch('list.json')
      .then(response => response.json())
      .then(data => {
        var idTotalTitles = document.getElementById('totalTitles');
        idTotalTitles.textContent += `${langArr[lang]['total']} ${data.content.length}`;
        filterByTag(activeTag.textContent);
        displayQuizItems(data.content, function () {
          const loader = document.querySelector('.loader');
          loader.style.display = 'none';
        });
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });
  
  function displayQuizItems(content, callback) {
    const container = document.getElementById('quizContainer');
  
    content.forEach((item, index) => {
      setTimeout(() => {
        const quizItem = document.createElement('div');
        quizItem.classList.add('quiz-item');
  
        item.tags.forEach(tag => quizItem.classList.add(tag));
        
        if (item.image) {
          const image = document.createElement('img');
          image.src = item.image;
          quizItem.appendChild(image);
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
          } else {
            description.textContent = item.description;
          }
          itemContent.appendChild(description)
        }

        if (item.platform) {
          const platform = document.createElement('p');
          platform.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['platform']} ${item.platform}</span>`;
          itemContent.appendChild(platform);
        }

        if (item.version) {
          const version = document.createElement('p');
          version.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['version']}</span> ${item.version}`;
          itemContent.appendChild(version);
        }
  
        if (item.date) {
          const date = document.createElement('p');
          date.innerHTML = `<span class="quiz-item-subtitle">${langArr[lang]['date']}</span> ${item.date}`;
          itemContent.appendChild(date);
        }

        if (item.tagd) {
          item.tagd.forEach(tag => {
            const tagd = document.createElement('p');
            tagd.innerHTML = `<p class="tag4">${tag}</p>`;
            itemContent.appendChild(tagd);
          });
        }
    
        const downloadLinks = createDownloadLinks(item.download);
        itemContent.appendChild(downloadLinks);
    
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
  
    const downloadTypes = [
      { key: 'archive', text: 'archive.org' },
      { key: 'own', text: 'ydkjarchive.org' },
      { key: 'imgur', text: 'imgur.org' },
      { key: 'sierrachest', text: 'sierrachest.com' },
      { key: 'vimm', text: 'vimm.net' },
      { key: 'macintoshgarden', text: 'macintoshgarden.org' },
      { key: 'jellyvision', text: 'jellyvision.com' },
      { key: 'compiwareforum', text: 'compiware-forum.de' },
      { key: 'jackde', text: 'jack.de' },
      { key: 'setup', text: 'Setup' },
      { key: 'cdrom', text: 'CD-ROM' },
      { key: 'macintoshrepository', text: 'macintoshrepository.org' },
      { key: 'amazon', text: 'amazon.com' },
      { key: 'fandom', text: 'jackboxgames.fandom.com' },
      { key: 'ebay', text: 'ebay.com' },
      { key: 'bandcamp', text: 'bandcamp.com' },
      { key: 'dlc1', text: '1 DLC' },
      { key: 'dlc2', text: '2 DLC' },
      { key: 'dlc3', text: '3 DLC' },
      { key: 'dlc4', text: '4 DLC' },
      { key: 'audio', text: 'audio' },
      { key: 'video', text: 'video' },
      { key: 'mac', text: 'mac' },
      { key: 'pc', text: 'pc' },
      { key: 'other', text: 'alternative link' },
    ];
  
    downloadTypes.forEach(type => {
      if (download[type.key]) {
        const link = createLink(type.text, download[type.key]);
        linkContainer.appendChild(link);
      }
    });
  
    return linkContainer;
  }

  function createLink(text, url) {
    const link = document.createElement('a');
    link.textContent = `• ${text}`;
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
    if (event.target.classList.contains('tag')) {
        const tag = event.target.id;
        if (tag === 'showall') {
            showAll();
        } else {
            filterByTag(tag);
        }
    }
});

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
  if (isElementPartiallyVisible(triggerElement)) {
    animatedElement.classList.remove('animate');
  } else {
    animatedElement.classList.add('animate');
  }
}

window.addEventListener('scroll', handleScrollAnimation);
handleScrollAnimation();

function popup() {
  let popupBg = document.querySelector('.modal');
  let popup = document.querySelector('.contentt');
  let openPopupButtons = document.querySelectorAll('.open-popup');
  let closePopupButton = document.querySelector('.actions');
  openPopupButtons.forEach((button)=>{
      button.addEventListener('click', (e)=>{
          e.preventDefault();
          popupBg.classList.add('active');
          popup.classList.add('active');
      }
      )
  }
  );
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
          popup.classList.remove('active');
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

const textElement = document.getElementById('book2');
var book2texts = [`${langArr[lang]['manual']}`, `${langArr[lang]['book']}`, `${langArr[lang]['pdf']}`];
let currentIndex = 0;

function changeText() {
  textElement.textContent = book2texts[currentIndex];
  currentIndex = (currentIndex + 1) % book2texts.length;
}
setInterval(changeText, 12000);

function displayMain() {
  const container = document.querySelector(".container");
  
  if (container.style.display !== 'none') {
    container.style.display = 'none';
  } else {
    container.style.display = 'flex';
    showAll();
  }
}

  document.addEventListener("DOMContentLoaded", function() {
    const version = "1692525660";
    if(sv){
      function siteversion() {
        sv.innerHTML = `<span id="ver">Version:</span> ${version}`;
      }
      siteversion();
    }
    console.log("Version: " + version);
    popup();
    setTimeout(function() {
      activeTag = document.getElementById('showall');
      activeTag.classList.add('active-tag');
  }, 50);
});