// Get base path for GitHub Pages compatibility
function getBasePath() {
    const path = window.location.pathname;
    // Check if running on GitHub Pages (contains /MasVisio_Research/)
    if (path.includes('/MasVisio_Research/')) {
        return '/MasVisio_Research/';
    }
    // Local development
    return '/';
}

document.addEventListener('DOMContentLoaded', () => {
    // This is the only DOMContentLoaded listener
    console.log('DOM is fully loaded and parsed');

    // Mobile menu functionality
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const mobileMenu = document.getElementById('mobile-nav-menu');
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                closeMobileMenu();
            }
        }
    });

    // Close menu by clicking a link
    document.querySelectorAll('.mobile-nav-menu .nav-link').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Handle dropdown menus on desktop
    setupDesktopDropdowns();

    // Scroll animation logic
    window.addEventListener('scroll', handleScrollAnimations);
    handleScrollAnimations(); // Also check on load

    // If there is a research projects container, load projects
    if (document.getElementById('research-projects-container')) {
        loadResearchProjects();
    }

    // If there is a publications container, load publications
    if (document.getElementById('publications-container')) {
        loadPublications();
    }

    // If there is a project detail container, load details
    if (document.getElementById('project-detail-container')) {
        loadProjectDetails();
    }

    // If there is a team container, load team members
    if (document.getElementById('team-container')) {
        loadTeamMembers();
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
    const lang = document.documentElement.lang || 'en';
    // Use absolute path to avoid relative path issues with nested directories
    const dataPath = getBasePath() + 'assets/data/content.json';

    fetch(dataPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('research-projects-container');
            const projects = data[lang]?.projects || [];

            if (container) {
                if (projects.length > 0) {
                    let html = '';
                    projects.forEach(project => {
                        // Adjust link based on language
                        const basePath = getBasePath();
                        const linkPrefix = lang === 'ko' ? basePath + 'ko' : basePath.slice(0, -1);
                        const buttonText = lang === 'ko' ? '자세히 보기' : 'Learn More';

                        html += `
                            <div class="project-card">
                                <h3>${project.title}</h3>
                                <p>${project.subtitle}</p>
                                <a href="${linkPrefix}/research/project.html?id=${project.id}" class="btn-secondary">${buttonText}</a>
                            </div>
                        `;
                    });
                    container.innerHTML = html;
                } else {
                    // Graceful fallback for empty data (e.g. English version currently)
                    container.innerHTML = lang === 'ko'
                        ? '<p>진행 중인 프로젝트가 없습니다.</p>'
                        : '<p>No active projects at the moment.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Could not load research projects:', error);
            const container = document.getElementById('research-projects-container');
            if (container) {
                container.innerHTML = lang === 'ko'
                    ? '<p>프로젝트를 불러올 수 없습니다. 나중에 다시 시도해주세요.</p>'
                    : '<p>Unable to load projects. Please try again later.</p>';
            }
        });
}


function loadPublications() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';

    fetch(dataPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('publications-container');
            const publications = data[lang]?.publications || [];

            if (container) {
                if (publications.length > 0) {

                    // Categorize Publications
                    const reviewedPapers = [];
                    const conferences = [];
                    const patents = [];

                    publications.forEach(pub => {
                        // Normalize field to lower case for check (though data is mixed case/lang)
                        const f = (pub.field || '').trim();

                        // Map specific fields to categories
                        // Conference
                        if (['학술발표', 'Conference', 'conference'].includes(f)) {
                            conferences.push(pub);
                        }
                        // Patent
                        else if (['특허', 'Patent', 'patent'].includes(f)) {
                            patents.push(pub);
                        }
                        // Reviewed Papers (Default for 'Policy', 'Clinical', 'Prototype', etc.)
                        else {
                            reviewedPapers.push(pub);
                        }
                    });

                    let htmlContent = '';

                    // Helper to sort by year desc
                    const sortByYear = (list) => {
                        return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
                    };

                    // --- SECTION 1: Reviewed Papers ---
                    if (reviewedPapers.length > 0) {
                        const sorted = sortByYear(reviewedPapers);

                        // Statistics for Reviewed Papers only
                        const fieldCounts = sorted.reduce((acc, pub) => {
                            const field = pub.field || 'Other';
                            acc[field] = (acc[field] || 0) + 1;
                            return acc;
                        }, {});

                        const totalCount = sorted.length;

                        const statsOrder = lang === 'ko'
                            ? ['시제품', '임상', '정책']
                            : ['Prototype', 'Clinical', 'Policy'];
                        const totalLabel = lang === 'ko' ? '전체' : 'Total';
                        const sectionTitle = lang === 'ko' ? '연구논문' : 'Reviewed Papers';

                        htmlContent += `<div id="reviewed-papers" style="margin-bottom: 4rem;">`;
                        htmlContent += `<h3 style="font-size: 1.8rem; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">${sectionTitle}</h3>`;

                        // Stats Bar
                        htmlContent += '<div class="stats-bar-container" style="display: flex; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">';

                        // Total
                        htmlContent += `
                            <div class="stat-badge" style="background: #f1f5f9; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 600; color: #475569; font-size: 0.9rem;">
                                ${totalLabel} <span style="color: #003366;">${totalCount}</span>
                            </div>
                        `;

                        // Sub-fields
                        statsOrder.forEach(field => {
                            const count = fieldCounts[field] || 0;
                            htmlContent += `
                                <div class="stat-badge" style="background: #fff; border: 1px solid #e2e8f0; padding: 0.5rem 1rem; border-radius: 20px; font-weight: 500; color: #64748b; font-size: 0.9rem;">
                                    ${field} <span style="color: #003366; font-weight: 600;">${count}</span>
                                </div>
                            `;
                        });
                        htmlContent += '</div>';

                        // List
                        htmlContent += '<div class="publication-list-iso" style="display: flex; flex-direction: column; gap: 1.5rem;">';
                        sorted.forEach((pub, index) => {
                            htmlContent += `
                                <div class="iso-item" style="font-size: 1rem; line-height: 1.6; padding-left: 1.5rem; text-indent: -1.5rem;">
                                    <span style="color: #334155; font-weight: 600;">${index + 1}.</span> 
                                    <span class="authors">${pub.authors}.</span> 
                                    <a href="${pub.doi || '#'}" target="_blank" style="color: #003366; font-weight: 600; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color 0.2s; pointer-events: ${pub.doi ? 'auto' : 'none'};">
                                        "${pub.title}"
                                    </a>. 
                                    <span class="journal" style="font-style: italic; color: #475569;">${pub.journal}</span>.
                                </div>
                            `;
                        });
                        htmlContent += '</div></div>';
                    }

                    // --- SECTION 2: Conference ---
                    if (conferences.length > 0) {
                        const sorted = sortByYear(conferences);
                        const sectionTitle = lang === 'ko' ? '학술발표' : 'Conference';

                        htmlContent += `<div id="conference" style="margin-bottom: 4rem;">`;
                        htmlContent += `<h3 style="font-size: 1.8rem; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">${sectionTitle}</h3>`;

                        htmlContent += '<div class="publication-list-iso" style="display: flex; flex-direction: column; gap: 1.5rem;">';
                        sorted.forEach((pub, index) => {
                            htmlContent += `
                                <div class="iso-item" style="font-size: 1rem; line-height: 1.6; padding-left: 1.5rem; text-indent: -1.5rem;">
                                    <span style="color: #334155; font-weight: 600;">${index + 1}.</span> 
                                    <span class="authors">${pub.authors}.</span> 
                                    <span style="color: #003366; font-weight: 600;">
                                        "${pub.title}"
                                    </span>. 
                                    <span class="journal" style="font-style: italic; color: #475569;">${pub.journal}</span>.
                                </div>
                            `;
                        });
                        htmlContent += '</div></div>';
                    }

                    // --- SECTION 3: Patents ---
                    if (patents.length > 0) {
                        const sorted = sortByYear(patents);
                        const sectionTitle = lang === 'ko' ? '특허' : 'Patent';

                        htmlContent += `<div id="patent" style="margin-bottom: 4rem;">`;
                        htmlContent += `<h3 style="font-size: 1.8rem; margin-bottom: 1.5rem; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.5rem;">${sectionTitle}</h3>`;

                        htmlContent += '<div class="publication-list-iso" style="display: flex; flex-direction: column; gap: 1.5rem;">';
                        sorted.forEach((pub, index) => {
                            htmlContent += `
                                <div class="iso-item" style="font-size: 1rem; line-height: 1.6; padding-left: 1.5rem; text-indent: -1.5rem;">
                                    <span style="color: #334155; font-weight: 600;">${index + 1}.</span> 
                                    <span class="authors">${pub.authors}.</span> 
                                    <span style="color: #003366; font-weight: 600;">
                                        "${pub.title}"
                                    </span>. 
                                    <span class="journal" style="font-style: italic; color: #475569;">${pub.journal}</span>.
                                </div>
                            `;
                        });
                        htmlContent += '</div></div>';
                    }

                    container.innerHTML = htmlContent;

                } else {
                    container.innerHTML = lang === 'ko'
                        ? '<p>등록된 논문이 없습니다.</p>'
                        : '<p>No publications listed yet.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Could not load publications:', error);
            const container = document.getElementById('publications-container');
            if (container) {
                container.innerHTML = lang === 'ko'
                    ? '<p>논문을 불러올 수 없습니다. 나중에 다시 시도해주세요.</p>'
                    : '<p>Unable to load publications. Please try again later.</p>';
            }
        });
}

// Helper functions renderPublicationsByYear, createPublicationItem, openTab are no longer needed 
// and replaced by the logic inside loadPublications or removed.


function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) return;

    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';

    fetch(dataPath)
        .then(response => response.json())
        .then(data => {
            const projects = data[lang]?.projects || [];
            const project = projects.find(p => p.id === projectId);

            if (project) {
                document.title = `${project.title} - MasVisio Research`;

                const container = document.getElementById('project-detail-container');
                if (container) {
                    let mechanismsHtml = '';
                    if (project.mechanisms) {
                        mechanismsHtml = '<h3>Mechanisms</h3><ul>';
                        project.mechanisms.forEach(m => {
                            mechanismsHtml += `<li><strong>${m.title}</strong><ul>${m.points.map(p => `<li>${p}</li>`).join('')}</ul></li>`;
                        });
                        mechanismsHtml += '</ul>';
                    }

                    let resultsHtml = '';
                    if (project.results) {
                        resultsHtml = '<div class="stats-grid">';
                        project.results.forEach(r => {
                            resultsHtml += `<div class="stat-item"><h3>${r.value}</h3><p>${r.title}</p><small>${r.description}</small></div>`;
                        });
                        resultsHtml += '</div>';
                    }

                    container.innerHTML = `
                        <h1>${project.title}</h1>
                        <p class="subtitle">${project.subtitle}</p>
                        <div class="project-meta">
                            <span><strong>Status:</strong> ${project.status}</span>
                            <span><strong>Period:</strong> ${project.research_period}</span>
                        </div>
                        <div class="project-content">
                            <h3>Objective</h3>
                            <p>${project.objective}</p>
                            ${mechanismsHtml}
                            ${resultsHtml}
                        </div>
                    `;
                }
            }
        })
        .catch(error => console.error('Error loading project details:', error));
}

function loadTeamMembers() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';

    fetch(dataPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('team-container');
            const teamMembers = data[lang]?.team || [];

            if (container) {
                if (teamMembers.length > 0) {
                    let html = '';
                    teamMembers.forEach(member => {
                        html += `
                            <div class="team-card">
                                <div class="team-photo"></div>
                                <h3>${member.name}</h3>
                                <p class="role">${member.role}</p>
                                <p class="bio">${member.bio}</p>
                                <p class="expertise"><small>${member.expertise}</small></p>
                            </div>
                        `;
                    });
                    container.innerHTML = html;
                } else {
                    container.innerHTML = lang === 'ko'
                        ? '<p>팀원 정보를 불러올 수 없습니다.</p>'
                        : '<p>No team members found.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Could not load team members:', error);
            const container = document.getElementById('team-container');
            if (container) {
                container.innerHTML = lang === 'ko'
                    ? '<p>팀원 정보를 불러올 수 없습니다. 나중에 다시 시도해주세요.</p>'
                    : '<p>Unable to load team members. Please try again later.</p>';
            }
        });
}