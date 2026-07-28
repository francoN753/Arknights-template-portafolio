//js/contact.js
const contactTrigger = document.getElementById('contact-trigger');
const contactModal = document.getElementById('contact-modal');
const contactOverlay = document.getElementById('contact-modal-overlay');
const contactClose = document.getElementById('contact-close');

function openModal() {
    contactModal.classList.add('is-open');
}

function closeModal() {
    contactModal.classList.remove('is-open');
}

contactTrigger.addEventListener('click', openModal);
contactClose.addEventListener('click', closeModal);
contactOverlay.addEventListener('click', closeModal);

// Cerrar también presionando la tecla ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && contactModal.classList.contains('is-open')) {
        closeModal();
    }
});
