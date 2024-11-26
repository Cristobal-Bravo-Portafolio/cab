document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Manejo de la paginación de artistas
    const pageButtons = document.querySelectorAll('.page-btn');
    const artistPages = document.querySelectorAll('.artist-page');

    // Mostrar solo la primera página al inicio
    artistPages[0].classList.add('active');

    pageButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const pageNumber = this.getAttribute('data-page');
            
            // Remover active de todos los botones y páginas
            pageButtons.forEach(function(btn) {
                btn.classList.remove('active');
            });
            artistPages.forEach(function(page) {
                page.classList.remove('active');
            });
            
            // Activar el botón y página seleccionados
            this.classList.add('active');
            document.querySelector(`.artist-page[data-page="${pageNumber}"]`).classList.add('active');
        });
    });

    // Manejo del formulario
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensaje enviado con éxito');
            this.reset();
        });
    }

    // Animación de scroll para mostrar/ocultar el header
    let lastScrollTop = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scroll hacia abajo
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scroll hacia arriba
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Animación para las tarjetas de servicios
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});