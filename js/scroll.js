function isElementPartiallyVisible(el) {
  var rect = el.getBoundingClientRect();
  return rect.top < window.innerHeight && rect.bottom >= 0;
}
  
export function handleScrollAnimation() {
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