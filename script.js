// === Carousel ===
const track = document.querySelector('.carousel-track');
const prevButton = document.querySelector('.carousel-btn.prev');
const nextButton = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

// Vérification de l'existence des éléments du carousel avant d'ajouter des événements
if (track && prevButton && nextButton) {
    const moveSlide = (index) => {
        const slideWidth = track.children[0]?.getBoundingClientRect().width || 0;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    };

    prevButton.addEventListener('click', () => {
        currentIndex = Math.max(0, currentIndex - 1);
        moveSlide(currentIndex);
    });

    nextButton.addEventListener('click', () => {
        currentIndex = Math.min(track.children.length - 1, currentIndex + 1);
        moveSlide(currentIndex);
    });
}

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

        toggleButton.textContent = body.classList.contains('light-mode') ? '🌑' : '🌙';
    });
}

// Sélection des éléments nécessaires
const menuToggle = document.querySelector('.menu-toggle');
const headerNav = document.querySelector('.header-nav');

// Gestion de l'ouverture et fermeture du menu
if (menuToggle && headerNav) {
    menuToggle.addEventListener('click', () => {
        // Basculer la classe 'open' pour afficher/masquer le menu
        headerNav.classList.toggle('open');

        // Ajuster la hauteur du menu déroulant pour l'animation
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
}
