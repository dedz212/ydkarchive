import { displayMain } from '../new.js'

document.querySelector('.footer #info').addEventListener('click', function() {
  displayMain();
});

export function popup() {
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