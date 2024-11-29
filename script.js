// === Carousel ===
const track = document.querySelector('.carousel-track');
const images = document.querySelectorAll('.carousel-image');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');
const imageWidth = images[0]?.getBoundingClientRect().width || 0;

// Duplique les images pour permettre un défilement infini
images.forEach((image) => {
    const clone = image.cloneNode(true);
    track.appendChild(clone);
});
images.forEach((image) => {
    const clone = image.cloneNode(true);
    track.insertBefore(clone, track.firstChild);
});

let currentIndex = images.length; // Initialisation au premier ensemble d'images
let isPaused = false;

// Fonction pour déplacer le carrousel
function moveCarousel() {
    track.style.transition = 'transform 0.5s ease-in-out';
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;

    if (currentIndex === 0) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = images.length; // Retourne au début logique
            track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        }, 500);
    }

    if (currentIndex === track.children.length - images.length) {
        setTimeout(() => {
            track.style.transition = 'none';
            currentIndex = images.length; // Retourne au début logique
            track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        }, 500);
    }
}

// Fonction pour l'auto-défilement
function startCarousel() {
    return setInterval(() => {
        if (!isPaused) {
            currentIndex++;
            moveCarousel();
        }
    }, 3000); // Change toutes les 3 secondes
}

let autoSlide = startCarousel();

// Gestion des boutons
prevButton.addEventListener('click', () => {
    clearInterval(autoSlide); // Arrête l'auto-défilement
    isPaused = true;
    currentIndex--;
    moveCarousel();
    autoSlide = startCarousel(); // Redémarre l'auto-défilement
    isPaused = false;
});

nextButton.addEventListener('click', () => {
    clearInterval(autoSlide); // Arrête l'auto-défilement
    isPaused = true;
    currentIndex++;
    moveCarousel();
    autoSlide = startCarousel(); // Redémarre l'auto-défilement
    isPaused = false;
});

// Réinitialisation pour s'assurer que le carrousel est bien centré sur la première image visible
document.addEventListener('DOMContentLoaded', () => {
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
});

// === Mode Clair/Sombre ===
const toggleButton = document.getElementById('toggle-mode');
const body = document.body;
const header = document.querySelector('header');
const projects = document.querySelectorAll('.project');
const form = document.querySelector('form');
const formFields = form ? form.querySelectorAll('input, textarea') : null;
const formLabels = form ? form.querySelectorAll('label') : null;

if (toggleButton) {
    toggleButton.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        header?.classList.toggle('light-mode');

        if (form) {
            form.classList.toggle('light-mode');
            formFields?.forEach(field => field.classList.toggle('light-mode'));
            formLabels?.forEach(label => label.classList.toggle('light-mode'));
        }

        projects.forEach(project => project.classList.toggle('light-mode'));

        // Mettre à jour l'icône du bouton
        toggleButton.textContent = body.classList.contains('light-mode') ? '🌑' : '🌙';
    });
}

// === Menu Déroulant ===
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.header-nav');

// Gestion de l'ouverture et fermeture du menu
if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
        headerNav.classList.toggle('open'); // Bascule la classe 'open' pour afficher/masquer le menu

        // Ajuste la hauteur du menu pour l'animation
        if (headerNav.classList.contains('open')) {
            headerNav.style.maxHeight = `${headerNav.scrollHeight}px`;
        } else {
            headerNav.style.maxHeight = '0';
        }
    });

    // Fermer le menu si on clique en dehors
    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !headerNav.contains(event.target)) {
            headerNav.classList.remove('open');
            headerNav.style.maxHeight = '0';
        }
    });

    // Réinitialise le menu si la fenêtre est redimensionnée
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            headerNav.classList.remove('open');
            headerNav.style.maxHeight = null; // Supprime la limite de hauteur sur les grands écrans
        }
    });
};
