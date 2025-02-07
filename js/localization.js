import { langArr, n } from './init.js'

export var lang = (window.hasOwnProperty("localStorage") && window.localStorage.getItem("lang", lang)) || "en";

const toogleLanguages = document.querySelector('#toogleLanguages')
toogleLanguages.addEventListener('click', () => {
    if (localStorage.getItem("lang") === "en") {
      localStorage.setItem("lang", "de");
    } else {
      localStorage.setItem("lang", "en");
    }
    window.location.reload();
});

export async function setLang(lang) {
    if (!langArr.hasOwnProperty(lang)) return;
    if (window.hasOwnProperty("localStorage"))
        window.localStorage.setItem("lang", lang);
    for (let key in langArr[lang]) {
        let elements = document.querySelectorAll('[dkey="' + key + '"]');
        for (let i = 0; i < elements.length; i++) {
          if (elements[i]) {
            //console.log(`Setting text for dkey="${key}": ${langArr[lang][key]}`);
            elements[i].textContent = langArr[lang][key];
          }
        }

        let elements2 = document.querySelectorAll('[bkey="' + key + '"]');
        for (let i = 0; i < elements2.length; i++) {
          if (elements2[i]) {
            //console.log(`Setting text for bkey="${key}": ${langArr[lang][key]}`);
            elements2[i].textContent = langArr[lang][key];
          }
        }
      }
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
    await checkAndDisplayMessage(lang)
}

async function checkAndDisplayMessage(lang) {
    try {
        if (n[lang]) {
            const messageContainer = document.getElementById('n');
            messageContainer.innerText =""
            messageContainer.style.position = 'fixed';
            messageContainer.style.top = '8dvh';
            messageContainer.style.right = '0.5dvh';
            messageContainer.style.padding = '1dvh';
            messageContainer.style.width = '20dvw';
            messageContainer.style.backgroundColor = 'var(--p10)';
            messageContainer.style.color = 'var(--p5)';
            messageContainer.style.borderRadius = '0.5dvh';
            messageContainer.style.fontSize = '1.5dvh';
            messageContainer.style.zIndex = '1000';
            messageContainer.innerText = n[lang];

            const closeButton = document.createElement('button');
            closeButton.innerText = '✖';
            closeButton.style.bottom = '1dvh';
            closeButton.style.right = '1dvh';
            closeButton.style.position = 'absolute';
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.color = 'white';
            closeButton.style.fontSize = '1dvh';
            closeButton.style.cursor = 'pointer';
            closeButton.addEventListener('click', () => {
                document.body.removeChild(messageContainer);
            });
            
            messageContainer.appendChild(closeButton);
            document.body.appendChild(messageContainer);
        }
    } catch (error) {
        console.error('Error fetching message:', error);
    }
}