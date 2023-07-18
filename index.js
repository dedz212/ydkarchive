let activeTag = document.querySelector('.active-tag');

document.addEventListener('DOMContentLoaded', function () {
    fetch('list.json')
      .then(response => response.json())
      .then(data => {
        document.getElementById('totalTitles').textContent += data.content.length;
        filterByTag(activeTag.textContent);
        displayQuizItems(data.content);
      })
      .catch(error => console.error('Error fetching JSON:', error));
  });
  
  function displayQuizItems(content) {
    const container = document.getElementById('quizContainer');
  
    content.forEach(item => {
      const quizItem = document.createElement('div');
      quizItem.classList.add('quiz-item');

      item.tags.forEach(tag => quizItem.classList.add(tag));
  
      const image = document.createElement('img');
      image.src = item.image;
  
      const itemContent = document.createElement('div');
      itemContent.classList.add('quiz-item-content');
  
      const title = document.createElement('h2');
      if (item.subtitle) {
        title.innerHTML = `${item.title} <span class="quiz-item-subtitle">${item.subtitle}</span>`;
      } else {
        title.textContent = item.title;
      }
      itemContent.appendChild(title);
    
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
        
      if (item.description) {
        const description = document.createElement('p');
        description.textContent = item.description;
        itemContent.appendChild(description)
      }
  
  
      const downloadLinks = createDownloadLinks(item.download);
      itemContent.appendChild(downloadLinks);
  
      quizItem.appendChild(image);
      quizItem.appendChild(itemContent);
  
      container.appendChild(quizItem);
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

    return linkContainer;
  }
  
  function createLink(text, url) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = url;
    link.target = '_blank';
    return link;
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
      if (element.textContent === tag) {
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
      if (element.textContent === 'show all') {
        element.classList.add('active-tag');
        activeTag = element;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    const version = "1689676294";
    if(sv){
      function siteversion() {
          sv.innerHTML = version;
      }
      siteversion();
    }
    console.log("Version: " + version);
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