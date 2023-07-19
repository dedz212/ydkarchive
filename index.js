document.addEventListener('DOMContentLoaded', function () {
    fetch('list.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('totalTitles').textContent += data.content.length;
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
          description.textContent = item.description;
          itemContent.appendChild(description)
        }

        if (item.platform) {
          const platform = document.createElement('p');
          platform.innerHTML = `<span class="quiz-item-subtitle">Platform: ${item.platform}</span>`;
          itemContent.appendChild(platform);
        }

        if (item.version) {
          const version = document.createElement('p');
          version.innerHTML = `<span class="quiz-item-subtitle">Version:</span> ${item.version}`;
          itemContent.appendChild(version);
        }
  
        if (item.date) {
          const date = document.createElement('p');
          date.innerHTML = `<span class="quiz-item-subtitle">Date:</span> ${item.date}`;
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
          // Вызываем функцию обратного вызова, когда все тайтлы загружены
          callback();
        }
      }, index * 50);
    });
  }
  
  function createDownloadLinks(download) {
    const linkContainer = document.createElement('div');
  
    if (download.archive) {
      const archiveLink = createLink('archive.org', download.archive);
      linkContainer.appendChild(archiveLink);
    }
  
    if (download.own) {
      const ownLink = createLink('ydkjarchive.org', download.own);
      linkContainer.appendChild(ownLink);
    }

    if (download.imgur) {
        const imgurLink = createLink('imgur.org', download.imgur);
        linkContainer.appendChild(imgurLink);
    }

    if (download.sierrachest) {
        const sierrachestLink = createLink('sierrachest.com', download.sierrachest);
        linkContainer.appendChild(sierrachestLink);
    }

    if (download.vimm) {
        const vimmLink = createLink('vimm.net', download.vimm);
        linkContainer.appendChild(vimmLink);
    }

    if (download.jellyvision) {
        const jellyvisionLink = createLink('jellyvision.com', download.jellyvision);
        linkContainer.appendChild(jellyvisionLink);
    }
  
    if (download.other) {
      const otherLink = createLink('alternative link', download.other);
      linkContainer.appendChild(otherLink);
    }

    if (download.video) {
        const videoLink = createLink('video', download.video);
        linkContainer.appendChild(videoLink);
    }

    if (download.compiwareforum) {
        const compiwareforumLink = createLink('compiware-forum.de', download.compiwareforum);
        linkContainer.appendChild(compiwareforumLink);
    }

    if (download.macintoshgarden) {
        const macintoshgardenLink = createLink('macintoshgarden.org', download.macintoshgarden);
        linkContainer.appendChild(macintoshgardenLink);
    }

    if (download.jackde) {
        const jackdeLink = createLink('jack.de', download.jackde);
        linkContainer.appendChild(jackdeLink);
    }

    if (download.jasetupckde) {
        const setupLink = createLink('Setup', download.setup);
        linkContainer.appendChild(setupLink);
    }

    if (download.cdrom) {
        const cdromLink = createLink('CD-ROM', download.cdrom);
        linkContainer.appendChild(cdromLink);
    }

    if (download.macintoshrepository) {
        const macintoshrepositoryLink = createLink('macintoshrepository.org', download.macintoshrepository);
        linkContainer.appendChild(macintoshrepositoryLink);
    }
    
    if (download.amazon) {
        const amazonLink = createLink('amazon.com', download.amazon);
        linkContainer.appendChild(amazonLink);
    }

    if (download.fandom) {
        const fandomLink = createLink('jackboxgames.fandom.com', download.fandom);
        linkContainer.appendChild(fandomLink);
    }

    if (download.dlc1) {
        const dlc1Link = createLink('1 DLC', download.dlc1);
        linkContainer.appendChild(dlc1Link);
    }
    if (download.dlc3) {
        const dlc3Link = createLink('3 DLC', download.dlc3);
        linkContainer.appendChild(dlc3Link);
    }
    if (download.dlc2) {
        const dlc2Link = createLink('2 DLC', download.dlc2);
        linkContainer.appendChild(dlc2Link);
    }
    if (download.dlc4) {
        const dlc4Link = createLink('4 DLC', download.dlc4);
        linkContainer.appendChild(dlc4Link);
    }

    if (download.ebay) {
      const ebayLink = createLink('ebay.com', download.ebay);
      linkContainer.appendChild(ebayLink);
    }

    if (download.bandcamp) {
      const bandcampLink = createLink('bandcamp.com', download.bandcamp);
      linkContainer.appendChild(bandcampLink);
    }

    return linkContainer;
  }
  
  function createLink(text, url) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = url;
    link.target = '_blank';
    return link;
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
          showAll();
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

const textElement = document.getElementById('book');
const texts = ['manual', 'book', 'pdf']; 
let currentIndex = 0;

function changeText() {
  textElement.textContent = texts[currentIndex];
  currentIndex = (currentIndex + 1) % texts.length;
}
setInterval(changeText, 12000);


  document.addEventListener("DOMContentLoaded", function() {
    const version = "1689768979";
    if(sv){
      function siteversion() {
          sv.textContent = `Version: ${version}`;
      }
      siteversion();
    }
    console.log("Version: " + version);
    popup();
    setTimeout(function() {
      activeTag = document.getElementById('showall');
      activeTag.classList.add('active-tag');
  }, 50);
    /*
    const elements = document.querySelectorAll("div");

    function addAnimationClass() {
        elements.forEach(function(element, index) {
            const animationDelay = 200 * index;
            
            setTimeout(function() {
                element.classList.add("fade-in-element");
            }, animationDelay);
        });
    }

    addAnimationClass();*/
});