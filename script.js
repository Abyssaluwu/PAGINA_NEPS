const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('main-navigation');

if (menuToggle && navigation) {
    const menuIcon = menuToggle.querySelector('i');

    const setMenuState = (isOpen) => {
        navigation.classList.toggle('is-open', isOpen);
        menuToggle.classList.toggle('is-open', isOpen);
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
        menuIcon.classList.toggle('fa-bars', !isOpen);
        menuIcon.classList.toggle('fa-xmark', isOpen);
    };

    menuToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        setMenuState(!navigation.classList.contains('is-open'));
    });

    navigation.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuState(false));
    });

    document.addEventListener('click', (event) => {
        if (navigation.classList.contains('is-open') && !navigation.contains(event.target) && !menuToggle.contains(event.target)) {
            setMenuState(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setMenuState(false);
    });
}

// Visor modal de los boletines y afiches oficiales de NEPS.
const psaModal = document.getElementById('psa-modal');
const psaModalImage = document.getElementById('psa-modal-image');
const psaModalTitle = document.getElementById('psa-modal-title');
let lastFocusedElement = null;

if (psaModal && psaModalImage && psaModalTitle) {
    const closePsaModal = () => {
        psaModal.hidden = true;
        document.body.style.overflow = '';
        if (lastFocusedElement) lastFocusedElement.focus();
    };

    document.querySelectorAll('[data-lightbox]').forEach((trigger) => {
        trigger.addEventListener('click', () => {
            lastFocusedElement = trigger;
            psaModalImage.src = trigger.dataset.lightbox;
            psaModalImage.alt = trigger.dataset.title || 'Afiche oficial NEPS';
            psaModalTitle.textContent = trigger.dataset.title || 'Material oficial NEPS';
            psaModal.hidden = false;
            document.body.style.overflow = 'hidden';
            psaModal.querySelector('.psa-modal-close').focus();
        });
    });

    psaModal.querySelectorAll('[data-modal-close]').forEach((control) => {
        control.addEventListener('click', closePsaModal);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !psaModal.hidden) closePsaModal();
    });
}