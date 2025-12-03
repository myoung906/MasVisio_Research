
document.addEventListener('DOMContentLoaded', () => {
    // Dette er den eneste DOMContentLoaded-lytteren
    console.log('DOM er fullstendig lastet og parset');

    // Funksjonalitet for mobilmeny
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Lukk menyen med Escape-tasten
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-nav-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // Lukk menyen ved å klikke på en link
    document.querySelectorAll('.mobile-nav-menu .nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Håndter dropdown-menyer på desktop
    setupDesktopDropdowns();

    // Scroll-animeringslogikk
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Sjekk også ved lasting

    // Hvis det er en forskningsprosjekt-container, last inn prosjekter
    if (document.getElementById('research-projects-container')) {
        loadResearchProjects();
    }

    // Hvis det er en publikasjons-container, last inn publikasjoner
    if (document.getElementById('publications-container')) {
        loadPublications();
    }
});

function toggleMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-nav-menu');

    if (mobileToggle && mobileMenu) {
        const isActive = mobileToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    }
}

function closeMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-nav-menu');

    if (mobileToggle && mobileMenu) {
        mobileToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function setupDesktopDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        
        item.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                dropdownMenu.style.display = 'block';
            }
        });

        item.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                dropdownMenu.style.display = 'none';
            }
        });
    });
}

function handleScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.data-card, .highlight-card');
    
    elementsToAnimate.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !element.classList.contains('animated')) {
            setTimeout(() => {
                element.classList.add('animated');
            }, index * 100);
        }
    });
}

function loadResearchProjects() {
    fetch('/assets/data/content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nettverksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('research-projects-container');
            const projects = data.ko.projects;
            
            if (container && projects) {
                let html = '';
                projects.forEach(project => {
                    html += `
                        <div class="project-card">
                            <h3>${project.title}</h3>
                            <p>${project.subtitle}</p>
                            <a href="/ko/research/projects/${project.id}.html" class="btn-secondary">Les mer</a>
                        </div>
                    `;
                });
                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Kunne ikke laste forskningsprosjekter:', error);
            const container = document.getElementById('research-projects-container');
            if(container) {
                container.innerHTML = '<p>Kunne ikke laste prosjekter. Prøv igjen senere.</p>';
            }
        });
}

function loadPublications() {
    fetch('/assets/data/content.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Nettverksrespons var ikke ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('publications-container');
            const publications = data.ko.publications;

            if (container && publications) {
                let html = '';
                publications.forEach(pub => {
                    html += `
                        <div class="publication-item">
                            <h4>${pub.title}</h4>
                            <p><strong>Forfattere:</strong> ${pub.authors}</p>
                            <p><em>${pub.journal}</em>, ${pub.year}</p>
                            <a href="${pub.doi}" target="_blank" class="publication-link">Les publikasjon</a>
                        </div>
                    `;
                });
                container.innerHTML = html;
            }
        })
        .catch(error => {
            console.error('Kunne ikke laste publikasjoner:', error);
            const container = document.getElementById('publications-container');
            if(container){
                container.innerHTML = '<p>Kunne ikke laste publikasjoner. Prøv igjen senere.</p>';
            }
        });
}
