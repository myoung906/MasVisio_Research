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

// DataCache Singleton - 중복 fetch 방지
const DataCache = {
    _cache: {},
    _pending: {},

    async get(url, timeout = 10000) {
        // 이미 캐시된 데이터 반환
        if (this._cache[url]) {
            return this._cache[url];
        }

        // 이미 요청 중이면 그 Promise 반환 (중복 요청 방지)
        if (this._pending[url]) {
            return this._pending[url];
        }

        // 새 요청 시작
        this._pending[url] = this._fetchWithTimeout(url, timeout);

        try {
            const data = await this._pending[url];
            this._cache[url] = data;
            return data;
        } finally {
            delete this._pending[url];
        }
    },

    async _fetchWithTimeout(url, timeout) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(timeoutId);

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const text = await response.text();
            try {
                return JSON.parse(text);
            } catch (parseError) {
                throw new Error('JSON 파싱 실패: 데이터 형식이 올바르지 않습니다.');
            }
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw new Error('요청 시간 초과: 네트워크 연결을 확인해주세요.');
            }
            throw error;
        }
    },

    clear() {
        this._cache = {};
        this._pending = {};
    }
};

// 사용자 친화적 에러 메시지 생성
function getErrorMessage(error, lang) {
    const messages = {
        ko: {
            network: '네트워크 연결을 확인해주세요.',
            timeout: '요청 시간이 초과되었습니다. 나중에 다시 시도해주세요.',
            parse: '데이터를 처리하는 중 오류가 발생했습니다.',
            default: '일시적인 오류가 발생했습니다. 나중에 다시 시도해주세요.'
        },
        en: {
            network: 'Please check your network connection.',
            timeout: 'Request timed out. Please try again later.',
            parse: 'Error processing data.',
            default: 'A temporary error occurred. Please try again later.'
        }
    };

    const m = messages[lang] || messages.en;

    if (error.message.includes('시간 초과') || error.message.includes('timeout')) {
        return m.timeout;
    }
    if (error.message.includes('JSON') || error.message.includes('파싱')) {
        return m.parse;
    }
    if (error.message.includes('fetch') || error.message.includes('network')) {
        return m.network;
    }
    return m.default;
}

function initGaborCaptionAnimations() {
    const captions = Array.from(document.querySelectorAll('[data-gabor-caption="true"]'));
    if (captions.length === 0) return;

    const configs = captions.map((caption) => {
        const valueEl = caption.querySelector('.gabor-caption-value');
        if (!valueEl) return null;

        const start = Number(caption.dataset.captionStart);
        const end = Number(caption.dataset.captionEnd);
        const frames = Number(caption.dataset.captionFrames);
        const duration = Number(caption.dataset.captionDuration);

        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(frames) || !Number.isFinite(duration)) {
            return null;
        }

        return {
            valueEl,
            start,
            end,
            frames: Math.max(1, Math.floor(frames)),
            duration: Math.max(1, duration),
            startTime: performance.now(),
            lastValue: null
        };
    }).filter(Boolean);

    if (configs.length === 0) return;

    const update = (now) => {
        if (!document.hidden) {
            configs.forEach((config) => {
                const elapsed = (now - config.startTime) % config.duration;
                const frameIndex = Math.floor((elapsed / config.duration) * config.frames);
                const ratio = config.frames > 1 ? frameIndex / (config.frames - 1) : 0;
                const value = Math.round(config.start + (config.end - config.start) * ratio);

                if (value !== config.lastValue) {
                    config.valueEl.textContent = String(value);
                    config.lastValue = value;
                }
            });
        }

        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}

function initTemporalFlicker() {
    const targets = Array.from(document.querySelectorAll('[data-temporal-flicker="canvas"]'));
    if (targets.length === 0) return;

    const configs = targets.map((target) => {
        const canvas = target.querySelector('.temporal-flicker-canvas');
        if (!canvas) return null;

        const start = Number(target.dataset.freqStart);
        const end = Number(target.dataset.freqEnd);
        const duration = Number(target.dataset.rampDuration);
        const stepDuration = Number(target.dataset.stepDuration || 1000);
        const onSrc = target.dataset.onSrc;
        const offSrc = target.dataset.offSrc;
        if (!Number.isFinite(start) || !Number.isFinite(end) || !Number.isFinite(duration) || !Number.isFinite(stepDuration) || !onSrc || !offSrc) {
            return null;
        }

        const captionValue = target.closest('figure')?.querySelector('.temporal-caption-value') || null;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        const onImg = new Image();
        const offImg = new Image();
        onImg.src = onSrc;
        offImg.src = offSrc;

        return {
            canvas,
            ctx,
            onImg,
            offImg,
            captionValue,
            start,
            end,
            duration: Math.max(1, duration),
            stepDuration: Math.max(100, stepDuration),
            startTime: performance.now(),
            lastCaption: null,
            lastTime: performance.now(),
            lastElapsed: 0,
            stepIndex: -1,
            accumulator: 0,
            state: 1
        };
    }).filter(Boolean);

    if (configs.length === 0) return;

    const resizeCanvas = (config) => {
        const { canvas } = config;
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = Math.max(1, Math.round(rect.width * dpr));
        canvas.height = Math.max(1, Math.round(rect.height * dpr));
    };

    configs.forEach(resizeCanvas);
    window.addEventListener('resize', () => configs.forEach(resizeCanvas));

    const update = (now) => {
        if (!document.hidden) {
            const nowSeconds = now / 1000;
            configs.forEach((config) => {
                const { ctx, canvas } = config;
                const elapsed = (now - config.startTime) % config.duration;
                const totalSteps = Math.max(1, Math.floor((config.end - config.start) + 1));
                const stepIndex = Math.floor(elapsed / config.stepDuration) % totalSteps;
                const freq = config.start + stepIndex;
                if (stepIndex !== config.stepIndex) {
                    config.stepIndex = stepIndex;
                    config.accumulator = 0;
                    config.state = 1;
                }
                const stepElapsed = elapsed - (stepIndex * config.stepDuration);

                const dt = Math.max(0.001, (now - config.lastTime) / 1000);
                config.lastTime = now;
                if (elapsed < config.lastElapsed || stepElapsed < (config.lastElapsed % config.stepDuration)) {
                    config.accumulator = 0;
                    config.state = 1;
                }
                config.lastElapsed = elapsed;
                const halfPeriod = 0.5 / freq;
                config.accumulator += dt;
                while (config.accumulator >= halfPeriod) {
                    config.state = config.state ? 0 : 1;
                    config.accumulator -= halfPeriod;
                }
                const alpha = config.state;

                if (config.offImg.complete && config.onImg.complete) {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = 1;
                    ctx.drawImage(config.offImg, 0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = alpha;
                    ctx.drawImage(config.onImg, 0, 0, canvas.width, canvas.height);
                    ctx.globalAlpha = 1;
                }

                if (config.captionValue) {
                    if (freq !== config.lastCaption) {
                        config.captionValue.textContent = String(freq);
                        config.lastCaption = freq;
                    }
                }
            });
        }

        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    // This is the only DOMContentLoaded listener
    console.log('DOM is fully loaded and parsed');

    // Initialize Mobile Navigation
    initMobileNav();
    initGaborCaptionAnimations();
    initTemporalFlicker();

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                toggleMobileNav(); // Use unified toggle function
            }
        }
    });

    // Close menu by clicking a link (optional, if we want auto-close on navigate)
    // Not strictly needed for multi-page app, but good for anchors.
    // Keeping it simple for now.

    // Handle dropdown menus on desktop

    // Handle dropdown menus on desktop
    setupDesktopDropdowns();

    // Scroll animation logic (passive for better scroll performance)
    window.addEventListener('scroll', handleScrollAnimations, { passive: true });
    handleScrollAnimations(); // Also check on load

    // If there is a research projects container, load projects
    if (document.getElementById('research-projects-container')) {
        loadResearchProjects();
    }

    // If there is a publications container, load publications
    if (document.getElementById('publications-container')) {
        loadPublications();
        initPublicationsNavigation();
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

function refreshPublicationsView() {
    const container = document.getElementById('publications-container');
    if (!container) return;

    const submenuLinks = document.querySelectorAll('.sidebar-submenu .nav-item[href^="#"]');
    if (!submenuLinks.length) return;

    const hash = window.location.hash;
    const targetLink = Array.from(submenuLinks).find(link => link.getAttribute('href') === hash);
    const targetId = hash ? hash.slice(1) : '';
    const targetSection = targetId ? document.getElementById(targetId) : null;
    const hasTarget = Boolean(targetLink && targetSection);

    // 1. Sidebar Active State
    submenuLinks.forEach(link => {
        link.classList.toggle('active', hasTarget && link === targetLink);
    });

    const header = document.querySelector('.publications-header');
    const sections = document.querySelectorAll('#publications-container > div[id]');

    // 2. Visibility Logic (Unified for Desktop/Mobile)
    if (hasTarget) {
        // Case: Specific Section Selected
        if (header) {
            header.style.setProperty('display', 'none', 'important');
        }
        sections.forEach(section => {
            if (section.id === targetId) {
                section.style.setProperty('display', 'block', 'important');
            } else {
                section.style.setProperty('display', 'none', 'important');
            }
        });

        // Scroll to top to ensure user sees the content
        window.scrollTo(0, 0);

    } else {
        // Case: Overview / No Selection
        if (header) {
            header.style.setProperty('display', 'block', 'important');
        }
        sections.forEach(section => {
            section.style.setProperty('display', 'none', 'important');
        });
    }

    // 3. Mobile Specific: Close Sidebar on selection
    const isMobile = window.innerWidth <= 1024;
    if (isMobile) {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar && sidebar.classList.contains('active')) {
            toggleMobileNav();
        }
    }
}

function initPublicationsNavigation() {
    const container = document.getElementById('publications-container');
    if (!container) return;

    const submenuLinks = document.querySelectorAll('.sidebar-submenu .nav-item[href^="#"]');
    if (!submenuLinks.length) return;

    submenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(refreshPublicationsView, 0);
        });
    });

    window.addEventListener('hashchange', refreshPublicationsView);
    window.addEventListener('resize', refreshPublicationsView);
    refreshPublicationsView();
}

function initMobileNav() {
    // 1. Check if elements exist, if not inject them
    if (!document.querySelector('.mobile-nav-toggle')) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.ariaLabel = 'Toggle Navigation';
        toggleBtn.innerHTML = `
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
        document.body.appendChild(toggleBtn);

        toggleBtn.addEventListener('click', toggleMobileNav);
    }

    if (!document.querySelector('.mobile-nav-overlay')) {
        const overlay = document.createElement('div');
        overlay.className = 'mobile-nav-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', toggleMobileNav);
    }

    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.dataset.mobileNavBound) {
        sidebar.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link) return;

            if (window.innerWidth <= 1024 && sidebar.classList.contains('active')) {
                toggleMobileNav();
            }
        });
        sidebar.dataset.mobileNavBound = 'true';
    }

    ensureMobileHeader();
}

function toggleMobileNav() {
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-nav-overlay');
    const toggleBtn = document.querySelector('.mobile-nav-toggle');

    if (sidebar && overlay && toggleBtn) {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        toggleBtn.classList.toggle('active');
        document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }
}

function ensureMobileHeader() {
    if (document.querySelector('.mobile-header')) return;

    const lang = document.documentElement.lang || 'en';
    const basePath = getBasePath();
    const homeHref = lang === 'ko' ? `${basePath}ko/index.html` : `${basePath}index.html`;

    const header = document.createElement('header');
    header.className = 'mobile-header';
    header.innerHTML = `
        <a href="${homeHref}" class="mobile-logo">
            <h1>MasVisio<br>Research</h1>
            <span class="logo-subtitle">Vision Intelligence &<br>Biomedical Engineering</span>
        </a>
    `;
    document.body.insertBefore(header, document.body.firstChild);
}

// Old functions removed/replaced
// function toggleMobileMenu() { ... }
// function closeMobileMenu() { ... }

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

async function loadResearchProjects() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';
    const container = document.getElementById('research-projects-container');

    if (!container) return;

    try {
        const data = await DataCache.get(dataPath);
        const projects = data[lang]?.projects || [];

        if (projects.length > 0) {
            const basePath = getBasePath();
            const linkPrefix = lang === 'ko' ? basePath + 'ko' : basePath.slice(0, -1);
            const buttonText = lang === 'ko' ? '자세히 보기' : 'Learn More';

            container.innerHTML = projects.map(project => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.subtitle}</p>
                    <a href="${linkPrefix}/research/project.html?id=${project.id}" class="btn-secondary">${buttonText}</a>
                </div>
            `).join('');
        } else {
            container.innerHTML = lang === 'ko'
                ? '<p>진행 중인 프로젝트가 없습니다.</p>'
                : '<p>No active projects at the moment.</p>';
        }
    } catch (error) {
        console.error('Could not load research projects:', error);
        container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
    }
}


async function loadPublications() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';
    const container = document.getElementById('publications-container');

    if (!container) return;

    try {
        const data = await DataCache.get(dataPath);
        const publications = data[lang]?.publications || [];

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
            refreshPublicationsView();
        } else {
            container.innerHTML = lang === 'ko'
                ? '<p>등록된 논문이 없습니다.</p>'
                : '<p>No publications listed yet.</p>';
        }
    } catch (error) {
        console.error('Could not load publications:', error);
        container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
    }
}

// Helper functions renderPublicationsByYear, createPublicationItem, openTab are no longer needed 
// and replaced by the logic inside loadPublications or removed.


async function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) return;

    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';
    const container = document.getElementById('project-detail-container');

    if (!container) return;

    try {
        const data = await DataCache.get(dataPath);
        const projects = data[lang]?.projects || [];
        const project = projects.find(p => p.id === projectId);

        if (project) {
            document.title = `${project.title} - MasVisio Research`;

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

            let imagesHtml = '';
            if (project.images && project.images.length > 0) {
                // Determine base path for images ensuring no double slashes if path starts with /
                const basePath = getBasePath();
                imagesHtml = '<div class="project-images" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">';
                project.images.forEach(img => {
                    // Remove leading slash if present to append cleanly to basePath
                    const cleanPath = img.startsWith('/') ? img.slice(1) : img;
                    imagesHtml += `<img src="${basePath + cleanPath}" alt="Project Image" style="width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;">`;
                });
                imagesHtml += '</div>';
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
                    ${imagesHtml}
                </div>
            `;
        }
    } catch (error) {
        console.error('Error loading project details:', error);
        container.innerHTML = `< p class="error-text" > ${getErrorMessage(error, lang)}</p > `;
    }
}

async function loadTeamMembers() {
    const lang = document.documentElement.lang || 'en';
    const dataPath = getBasePath() + 'assets/data/content.json';
    const container = document.getElementById('team-container');

    if (!container) return;

    try {
        const data = await DataCache.get(dataPath);
        const teamMembers = data[lang]?.team || [];

        if (teamMembers.length > 0) {
            container.innerHTML = teamMembers.map(member => `
                <div class="team-card">
                    <h3>${member.name}</h3>
                    ${member.affiliation ? `<p class="affiliation">${member.affiliation}</p>` : ''}
                    <p class="role">${member.role}</p>
                    <p class="bio">${member.bio}</p>
                    <p class="expertise"><small>${member.expertise}</small></p>
                </div>
            `).join('');
        } else {
            container.innerHTML = lang === 'ko'
                ? '<p>팀원 정보를 불러올 수 없습니다.</p>'
                : '<p>No team members found.</p>';
        }
    } catch (error) {
        console.error('Could not load team members:', error);
        container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
    }
}
