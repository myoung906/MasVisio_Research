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

    // If there is a diagnostics container, load diagnostics
    if (document.getElementById('diagnostics-container')) {
        loadDiagnostics();
    }

    // Initialize Lightbox
    setupLightbox();
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

function setupLightbox() {
    // Create lightbox elements if they don't exist
    if (!document.querySelector('.lightbox-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'lightbox-overlay';
        overlay.innerHTML = `
            <div class="lightbox-close">&times;</div>
            <img class="lightbox-content" src="" alt="Enlarged view">
        `;
        document.body.appendChild(overlay);

        // Event listeners for closing
        overlay.addEventListener('click', (e) => {
            if (e.target !== document.querySelector('.lightbox-content')) {
                closeLightbox();
            }
        });

        document.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    }

    // Add click listeners to all feature card images
    const featureImages = document.querySelectorAll('.feature-card img');
    featureImages.forEach(img => {
        img.classList.add('zoomable-image');
        img.addEventListener('click', function () {
            openLightbox(this.src);
        });
    });
}

function openLightbox(imageSrc) {
    const overlay = document.querySelector('.lightbox-overlay');
    const content = document.querySelector('.lightbox-content');

    // Update src and show
    content.src = imageSrc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const overlay = document.querySelector('.lightbox-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function loadResearchProjects() {
    const lang = document.documentElement.lang || 'en';
    // Use absolute path to avoid relative path issues with nested directories
    const dataPath = '/assets/data/content.json';

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
                        const linkPrefix = lang === 'ko' ? '/ko' : '';
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
    const dataPath = '/assets/data/content.json';

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
                    // Group by field
                    const grouped = publications.reduce((acc, pub) => {
                        const field = pub.field || 'Other';
                        if (!acc[field]) {
                            acc[field] = [];
                        }
                        acc[field].push(pub);
                        return acc;
                    }, {});

                    // Define fixed order
                    const orderEn = ['Prototype', 'Clinical', 'Policy'];
                    const orderKo = ['시제품', '임상', '정책'];
                    const targetOrder = lang === 'ko' ? orderKo : orderEn;

                    // Sort fields based on fixed order
                    const fields = Object.keys(grouped).sort((a, b) => {
                        const indexA = targetOrder.indexOf(a);
                        const indexB = targetOrder.indexOf(b);

                        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                        if (indexA !== -1) return -1;
                        if (indexB !== -1) return 1;
                        return a.localeCompare(b);
                    });

                    // Prepare 'All' tab data
                    const allLabel = lang === 'ko' ? '전체' : 'All';
                    const totalCount = publications.length;

                    // Create Tabs
                    let tabsHtml = '<div class="tab-container">';

                    // Add 'All' tab button
                    tabsHtml += `<button class="tab-button active" onclick="openTab(event, 'All')">
                        ${allLabel} <span class="count-badge">${totalCount}</span>
                    </button>`;

                    // Add other field tab buttons
                    fields.forEach(field => {
                        const count = grouped[field].length;
                        tabsHtml += `<button class="tab-button" onclick="openTab(event, '${field}')">
                            ${field} <span class="count-badge">${count}</span>
                        </button>`;
                    });
                    tabsHtml += '</div>';

                    // Create Content
                    let contentHtml = '';

                    // 1. Create 'All' content block (Active by default)
                    contentHtml += `<div id="All" class="tab-content active">`;
                    contentHtml += renderPublicationsByYear(publications, lang);
                    contentHtml += `</div>`;

                    // 2. Create individual field content blocks (Hidden by default)
                    fields.forEach(field => {
                        contentHtml += `<div id="${field}" class="tab-content">`;
                        contentHtml += renderPublicationsByYear(grouped[field], lang);
                        contentHtml += `</div>`;
                    });

                    container.innerHTML = tabsHtml + contentHtml;
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

function renderPublicationsByYear(publications, lang) {
    // Group by year
    const byYear = publications.reduce((acc, pub) => {
        const year = pub.year || 'Unknown';
        if (!acc[year]) acc[year] = [];
        acc[year].push(pub);
        return acc;
    }, {});

    // Sort years descending
    const years = Object.keys(byYear).sort((a, b) => parseInt(b) - parseInt(a));

    let html = '';
    years.forEach(year => {
        const yearLabel = lang === 'ko' ? `${year}년` : year;
        html += `<h3 class="year-header">${yearLabel}</h3>`;
        html += `<div class="year-group">`; // Container for this year's items

        // Sort items within year if needed (optional, assuming already sorted or order doesn't matter much)
        byYear[year].forEach(pub => {
            html += createPublicationItem(pub, lang);
        });
        html += `</div>`;
    });
    return html;
}

function createPublicationItem(pub, lang) {
    const linkText = lang === 'ko' ? '논문 보기' : 'View Paper';
    const authorLabel = lang === 'ko' ? '저자:' : 'Authors:';

    return `
        <div class="publication-item">
            <h4>${pub.title}</h4>
            <p><strong>${authorLabel}</strong> ${pub.authors}</p>
            <p><em>${pub.journal}</em>, ${pub.year}</p>
            <a href="${pub.doi}" target="_blank" class="publication-link">${linkText}</a>
        </div>
    `;
}

function openTab(evt, fieldName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
        tabContents[i].style.display = "none"; // Ensure hidden
    }

    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }

    // Show the specific tab content
    const activeContent = document.getElementById(fieldName);
    if (activeContent) {
        activeContent.style.display = "block";
        // Small delay to allow display:block to apply before adding active class for animation
        setTimeout(() => {
            activeContent.classList.add("active");
        }, 10);
    }

    // Add active class to the button that opened the tab
    evt.currentTarget.classList.add("active");
}

function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) return;

    const lang = document.documentElement.lang || 'en';
    const dataPath = '/assets/data/content.json';

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
    const dataPath = '/assets/data/content.json';

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

function loadDiagnostics() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = '/assets/data/content.json';

    fetch(dataPath)
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('diagnostics-container');
            const diagnostics = data[lang]?.diagnostics;

            if (container && diagnostics) {
                let html = `
                    <div class="diagnostic-intro">
                        <h2 class="section-title">${diagnostics.title}</h2>
                        <p class="section-subtitle">${diagnostics.description}</p>
                    </div>
                    
                    <div class="diagnostic-grid">
                `;

                diagnostics.visualizations.forEach(vis => {
                    html += `
                        <div class="diagnostic-card">
                            <div class="diagnostic-image">
                                <img src="${vis.image}" alt="${vis.title}">
                            </div>
                            <div class="diagnostic-info">
                                <h3>${vis.title}</h3>
                                <p class="analysis-text">${vis.analysis}</p>
                                <div class="target-diseases">
                                    <strong>예측 가능 질환:</strong>
                                    <ul>
                                        ${vis.diseases.map(d => `<li>${d}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    `;
                });

                html += `</div>`;

                // Add Risk Table
                html += `
                    <div class="risk-table-section">
                        <h3 class="table-title">질환별 예측 위험도 (Risk Level)</h3>
                        <div class="table-wrapper">
                            <table class="risk-table">
                                <thead>
                                    <tr>
                                        <th>순위</th>
                                        <th>부위</th>
                                        <th>질환명</th>
                                        <th>위험도</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${diagnostics.risk_table.map(row => `
                                        <tr class="risk-row-${row.risk.toLowerCase()}">
                                            <td>${row.rank}</td>
                                            <td>${row.part}</td>
                                            <td>${row.name}</td>
                                            <td><span class="risk-badge badge-${row.risk.toLowerCase()}">${row.risk}</span></td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `;

                container.innerHTML = html;
            } else {
                if (container) {
                    container.innerHTML = lang === 'ko'
                        ? '<p class="error-text">진단 정보를 로드할 수 없습니다. 데이터 형식을 확인해주세요.</p>'
                        : '<p class="error-text">Unable to load diagnostics. Please check data format.</p>';
                }
            }
        })
        .catch(error => {
            console.error('Error loading diagnostics:', error);
            const container = document.getElementById('diagnostics-container');
            if (container) {
                container.innerHTML = lang === 'ko'
                    ? '<p class="error-text">데이터를 불러오는 중 오류가 발생했습니다. (' + error.message + ')</p>'
                    : '<p class="error-text">Error loading data. (' + error.message + ')</p>';
            }
        });
}