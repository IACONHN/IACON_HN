import './Less/style.less';
import { initHeroCarousel } from './data/common/hero.js';

initHeroCarousel();

document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".carousel img");
  let index = 0;

  function showSlide(i) {
    slides.forEach((slide, idx) => {
      slide.classList.toggle("active", idx === i);
    });
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
  }

  showSlide(index);
  setInterval(nextSlide, 4000);
});
