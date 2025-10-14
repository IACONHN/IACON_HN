import carrusel1 from '../../imgSource/carrusel1.jpeg';
import carrusel2 from '../../imgSource/carrusel2.jpeg';
import carrusel3 from '../../imgSource/carrusel3.jpeg';

const images = [carrusel1, carrusel2, carrusel3];
let currentIndex = 0;

export function initHeroCarousel() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  if (!hero.querySelector('.hero-content')) {
    hero.appendChild(heroContent);
  }

  hero.style.backgroundImage = `url(${images[currentIndex]})`;

  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    hero.style.backgroundImage = `url(${images[currentIndex]})`;
  }, 5000);
}
