const sliderWrapper = document.querySelector('.slider-wrapper');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const thumbnails = document.querySelectorAll('.thumbnail');
let currentIndex = 0;
const intervalTime = 3000; 
let autoSlide;

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function updateSlider() {
  const offset = -currentIndex * 100;
  sliderWrapper.style.transform = `translateX(${offset}%)`;
  updateThumbnails();
}

function updateThumbnails() {
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.classList.toggle('active', index === currentIndex);
  });
}

function startAutoSlide() {
  autoSlide = setInterval(nextSlide, intervalTime);
}

function stopAutoSlide() {
  clearInterval(autoSlide);
}

function resetAutoSlide() {
  stopAutoSlide();
  startAutoSlide();
}

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', (e) => {
    currentIndex = parseInt(e.target.dataset.index);
    updateSlider();
    resetAutoSlide();
  });
});

sliderWrapper.addEventListener('mouseenter', stopAutoSlide);
sliderWrapper.addEventListener('mouseleave', startAutoSlide);
nextButton.addEventListener('click', () => {
  nextSlide();
  resetAutoSlide();
});
prevButton.addEventListener('click', () => {
  prevSlide();
  resetAutoSlide();
});

startAutoSlide();
