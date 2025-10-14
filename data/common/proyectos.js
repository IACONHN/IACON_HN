const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImage');
const closeBtn = modal.querySelector('.close-modal');
const prevModalBtn = document.getElementById('prevModal');
const nextModalBtn = document.getElementById('nextModal');

let modalImgs = [];
let modalIndex = 0;
let scale = 1;
let translateX = 0;
let translateY = 0;
let isDragging = false;
let startX, startY;

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

modalImg.addEventListener('click', e => {
  e.stopPropagation();
});

function showModalImage(index) {
  modalImg.src = modalImgs[index].src;
  scale = 1;
  translateX = 0;
  translateY = 0;
  modalImg.style.transform = `translate(0px,0px) scale(1)`;
}

modalImg.addEventListener('wheel', e => {
  e.preventDefault();
  const zoomIntensity = 0.1;
  scale += e.deltaY < 0 ? zoomIntensity : -zoomIntensity;
  scale = Math.max(1, scale);
  modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

modalImg.addEventListener('mousedown', e => {
  if (scale <= 1) return;
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
  modalImg.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => {
  isDragging = false;
  modalImg.style.cursor = 'grab';
});
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  modalImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
});

document.querySelectorAll('.card').forEach(card => {
  const imgs = Array.from(card.querySelectorAll('.card-images img'));
  const prevBtn = card.querySelector('.prev');
  const nextBtn = card.querySelector('.next');
  let current = 0;

  if (!imgs.length) return;

  const showCardImage = index => {
    imgs.forEach((img, i) => img.classList.toggle('active', i === index));
  };
  showCardImage(current);

  if (nextBtn) {
    nextBtn.addEventListener('click', e => {
      e.preventDefault();
      current = (current + 1) % imgs.length;
      showCardImage(current);
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', e => {
      e.preventDefault();
      current = (current - 1 + imgs.length) % imgs.length;
      showCardImage(current);
    });
  }

  card.querySelector('.card-images').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') return;

    modalImgs = Array.from(card.querySelectorAll('img'));
    modalIndex = 0;
    showModalImage(modalIndex);
    modal.style.display = 'flex';
  });
});

prevModalBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (!modalImgs.length) return;
  modalIndex = (modalIndex - 1 + modalImgs.length) % modalImgs.length;
  showModalImage(modalIndex);
});
nextModalBtn.addEventListener('click', e => {
  e.stopPropagation();
  if (!modalImgs.length) return;
  modalIndex = (modalIndex + 1) % modalImgs.length;
  showModalImage(modalIndex);
});
