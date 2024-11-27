const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Fonction pour changer le slide
function moveSlide(index) {
    const slideWidth = track.children[0].getBoundingClientRect().width;
    track.style.transform = `translateX(-${index * slideWidth}px)`;
}

// Gestion des boutons
prevButton.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : 0;
    moveSlide(currentIndex);
});

nextButton.addEventListener('click', () => {
    currentIndex = (currentIndex < track.children.length - 1) ? currentIndex + 1 : track.children.length - 1;
    moveSlide(currentIndex);
});
