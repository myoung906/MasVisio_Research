// Get base path for GitHub Pages compatibility
function getBasePath() {
  const path = window.location.pathname;
  // Check if running on GitHub Pages (contains /MasVisio_Research/)
  if (path.includes("/MasVisio_Research/")) {
    return "/MasVisio_Research/";
  }
  // Local development
  return "/";
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
        throw new Error("JSON 파싱 실패: 데이터 형식이 올바르지 않습니다.");
      }
    } catch (error) {
      clearTimeout(timeoutId);
      if (error.name === "AbortError") {
        throw new Error("요청 시간 초과: 네트워크 연결을 확인해주세요.");
      }
      throw error;
    }
  },

  clear() {
    this._cache = {};
    this._pending = {};
  },
};

// 사용자 친화적 에러 메시지 생성
function getErrorMessage(error, lang) {
  const messages = {
    ko: {
      network: "네트워크 연결을 확인해주세요.",
      timeout: "요청 시간이 초과되었습니다. 나중에 다시 시도해주세요.",
      parse: "데이터를 처리하는 중 오류가 발생했습니다.",
      default: "일시적인 오류가 발생했습니다. 나중에 다시 시도해주세요.",
    },
    en: {
      network: "Please check your network connection.",
      timeout: "Request timed out. Please try again later.",
      parse: "Error processing data.",
      default: "A temporary error occurred. Please try again later.",
    },
  };

  const m = messages[lang] || messages.en;

  if (
    error.message.includes("시간 초과") ||
    error.message.includes("timeout")
  ) {
    return m.timeout;
  }
  if (error.message.includes("JSON") || error.message.includes("파싱")) {
    return m.parse;
  }
  if (error.message.includes("fetch") || error.message.includes("network")) {
    return m.network;
  }
  return m.default;
}

function initVisualSummationStimuli() {
  const spatialTarget = document.querySelector('[data-spatial-gabor="canvas"]');
  const temporalTarget = document.querySelector('[data-temporal-flicker="canvas"]');
  
  if (!spatialTarget && !temporalTarget) return;
  
  let spatialConfig = null;
  if (spatialTarget) {
    const canvas = spatialTarget.querySelector(".spatial-gabor-canvas");
    const captionValue = spatialTarget.closest("figure")?.querySelector(".gabor-caption-value");
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (canvas && ctx) {
      spatialConfig = {
        canvas, ctx, captionValue,
        start: Number(spatialTarget.dataset.freqStart || 1),
        end: Number(spatialTarget.dataset.freqEnd || 30),
        duration: Number(spatialTarget.dataset.duration || 3000)
      };
    }
  }
  
  let temporalConfig = null;
  if (temporalTarget) {
    const canvas = temporalTarget.querySelector(".temporal-flicker-canvas");
    const captionValue = temporalTarget.closest("figure")?.querySelector(".temporal-caption-value");
    const ctx = canvas ? canvas.getContext("2d") : null;
    if (canvas && ctx) {
      const onImg = new Image();
      const offImg = new Image();
      onImg.src = temporalTarget.dataset.onSrc;
      offImg.src = temporalTarget.dataset.offSrc;
      
      temporalConfig = {
        canvas, ctx, captionValue, onImg, offImg,
        start: Number(temporalTarget.dataset.freqStart || 1),
        end: Number(temporalTarget.dataset.freqEnd || 30),
        duration: Number(temporalTarget.dataset.rampDuration || 3000),
        accumulator: 0,
        state: 1,
        lastTime: performance.now()
      };
    }
  }
  
  const resize = (config) => {
    if (!config) return;
    const rect = config.canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    config.canvas.width = Math.max(1, Math.round(rect.width * dpr));
    config.canvas.height = Math.max(1, Math.round(rect.height * dpr));
  };
  
  resize(spatialConfig);
  resize(temporalConfig);
  window.addEventListener("resize", () => {
    resize(spatialConfig);
    resize(temporalConfig);
  });
  
  const startTime = performance.now();
  
  const drawGabor = (config, freq) => {
    const { ctx, canvas } = config;
    const width = canvas.width;
    const height = canvas.height;
    
    const imgData = ctx.createImageData(width, height);
    const data = imgData.data;
    const sigma = width * 0.23;
    const xc = width / 2;
    const yc = height / 2;
    const cycles = freq * 0.35;
    
    for (let y = 0; y < height; y++) {
      const dy = y - yc;
      const dy2 = dy * dy;
      const rowOffset = y * width;
      for (let x = 0; x < width; x++) {
        const dx = x - xc;
        const dx2 = dx * dx;
        const gauss = Math.exp(-(dx2 + dy2) / (2 * sigma * sigma));
        const val = Math.cos(2 * Math.PI * cycles * (dx / width));
        const color = Math.round(128 + 120 * gauss * val);
        const idx = (rowOffset + x) * 4;
        data[idx] = color;
        data[idx+1] = color;
        data[idx+2] = color;
        data[idx+3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  };
  
  const update = (now) => {
    if (!document.hidden) {
      const elapsed = (now - startTime) % 3000;
      const ratio = elapsed / 3000;
      const freq = Math.min(30, Math.max(1, Math.round(1 + (30 - 1) * ratio)));
      
      if (spatialConfig) {
        drawGabor(spatialConfig, freq);
        if (spatialConfig.captionValue) {
          spatialConfig.captionValue.textContent = String(freq);
        }
      }
      
      if (temporalConfig) {
        const dt = Math.max(0.001, (now - temporalConfig.lastTime) / 1000);
        temporalConfig.lastTime = now;
        
        const halfPeriod = 0.5 / freq;
        temporalConfig.accumulator += dt;
        while (temporalConfig.accumulator >= halfPeriod) {
          temporalConfig.state = temporalConfig.state ? 0 : 1;
          temporalConfig.accumulator -= halfPeriod;
        }
        
        const alpha = temporalConfig.state;
        const { ctx, canvas } = temporalConfig;
        
        if (temporalConfig.offImg.complete && temporalConfig.onImg.complete && temporalConfig.offImg.naturalWidth > 0) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
          ctx.drawImage(temporalConfig.offImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = alpha;
          ctx.drawImage(temporalConfig.onImg, 0, 0, canvas.width, canvas.height);
          ctx.globalAlpha = 1;
        } else {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = alpha ? "rgba(169, 214, 238, 0.9)" : "rgba(8, 12, 17, 0.9)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        if (temporalConfig.captionValue) {
          temporalConfig.captionValue.textContent = String(freq);
        }
      }
    } else {
      if (temporalConfig) {
        temporalConfig.lastTime = now;
      }
    }
    requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCopyrightYear() {
  const year = new Date().getFullYear();
  document.querySelectorAll(".copyright").forEach((el) => {
    el.innerHTML = el.innerHTML.replace(/\d{4}/, String(year));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCopyrightYear();
  loadAdvancedPhases();
  initPublicationsSubmenuToggle();

  // Initialize Mobile Navigation
  initMobileNav();
  initVisualSummationStimuli();
  initAccessibilityControls();


  // Close menu with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const sidebar = document.querySelector(".sidebar");
      if (sidebar && sidebar.classList.contains("active")) {
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
  window.addEventListener("scroll", handleScrollAnimations, { passive: true });
  handleScrollAnimations(); // Also check on load

  // If there is a research projects container, load projects
  if (document.getElementById("research-projects-container")) {
    loadResearchProjects();
  }

  // If there is a publications container, load publications
  if (document.getElementById("publications-container")) {
    loadPublications();
    initPublicationsNavigation();
  }

  // If there is a project detail container, load details
  if (document.getElementById("project-detail-container")) {
    loadProjectDetails();
  }

  // If there is a team container, load team members
  if (document.getElementById("team-container")) {
    loadTeamMembers();
  }

  // If there is a diagnostics container, load diagnostics
  if (document.getElementById("diagnostics-container")) {
    loadDiagnostics();
  }
});

function refreshPublicationsView() {
  const container = document.getElementById("publications-container");
  if (!container) return;

  const submenuLinks = document.querySelectorAll(
    '.sidebar-submenu .nav-item[href^="#"]',
  );
  if (!submenuLinks.length) return;

  const hash = window.location.hash;
  const targetLink = Array.from(submenuLinks).find(
    (link) => link.getAttribute("href") === hash,
  );
  const targetId = hash ? hash.slice(1) : "";
  const targetSection = targetId ? document.getElementById(targetId) : null;
  const hasTarget = Boolean(targetLink && targetSection);

  // 1. Sidebar Active State
  submenuLinks.forEach((link) => {
    link.classList.toggle("active", hasTarget && link === targetLink);
  });

  const header = document.querySelector(".publications-header");
  const sections = document.querySelectorAll(
    "#publications-container > div[id]",
  );

  // 2. Visibility Logic (Unified for Desktop/Mobile)
  if (hasTarget) {
    // Case: Specific Section Selected
    if (header) {
      header.style.setProperty("display", "none", "important");
    }
    sections.forEach((section) => {
      if (section.id === targetId) {
        section.style.setProperty("display", "block", "important");
      } else {
        section.style.setProperty("display", "none", "important");
      }
    });

    // Scroll to top to ensure user sees the content
    window.scrollTo(0, 0);
  } else {
    // Case: Overview / No Selection
    if (header) {
      header.style.setProperty("display", "block", "important");
    }
    sections.forEach((section) => {
      section.style.setProperty("display", "none", "important");
    });
  }

  // 3. Mobile Specific: Close Sidebar on selection
  const isMobile = window.innerWidth <= 1024;
  if (isMobile) {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar && sidebar.classList.contains("active")) {
      toggleMobileNav();
    }
  }
}

function initPublicationsNavigation() {
  const container = document.getElementById("publications-container");
  if (!container) return;

  const submenuLinks = document.querySelectorAll(
    '.sidebar-submenu .nav-item[href^="#"]',
  );
  if (!submenuLinks.length) return;

  submenuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(refreshPublicationsView, 0);
    });
  });

  window.addEventListener("hashchange", refreshPublicationsView);
  window.addEventListener("resize", refreshPublicationsView);
  refreshPublicationsView();
}

function initPublicationsSubmenuToggle() {
  const nav = document.querySelector(".sidebar-nav");
  if (!nav) return;
  const submenuStorageKey = "mv_publications_submenu_open";

  const topLevelLinks = Array.from(nav.querySelectorAll(":scope > .nav-item"));
  const rootLink = topLevelLinks.find((link) => {
    const href = link.getAttribute("href") || "";
    return (
      href.includes("publications/index.html") ||
      (link.classList.contains("active") &&
        /\/(?:ko\/)?publications\/index\.html$/.test(window.location.pathname))
    );
  });
  if (!rootLink) return;

  const isKo = window.location.pathname.includes("/ko/");
  const isPublicationsPage = /\/(?:ko\/)?publications\/index\.html$/.test(
    window.location.pathname,
  );
  const basePath = getBasePath();
  const publicationsPath = isKo
    ? `${basePath}ko/publications/index.html`
    : `${basePath}publications/index.html`;

  const submenuItems = isKo
    ? [
        { label: "연구논문", hash: "#reviewed-papers" },
        { label: "학술발표", hash: "#conference" },
        { label: "특허", hash: "#patent" },
      ]
    : [
        { label: "Reviewed Papers", hash: "#reviewed-papers" },
        { label: "Conference", hash: "#conference" },
        { label: "Patent", hash: "#patent" },
      ];
  const submenuHashSet = new Set(submenuItems.map((item) => item.hash));
  const hasSubmenuHash = submenuHashSet.has(window.location.hash);

  let persistedOpen = false;
  try {
    persistedOpen = window.localStorage.getItem(submenuStorageKey) === "1";
  } catch (error) {
    persistedOpen = false;
  }

  let submenu = rootLink.nextElementSibling;
  if (!submenu || !submenu.classList.contains("sidebar-submenu")) {
    submenu = document.createElement("div");
    submenu.className = "sidebar-submenu";
    rootLink.insertAdjacentElement("afterend", submenu);
  }
  submenu.removeAttribute("style");

  submenu.innerHTML = "";
  submenuItems.forEach((item) => {
    const link = document.createElement("a");
    link.className = "nav-item";
    link.textContent = item.label;
    link.href = isPublicationsPage ? item.hash : `${publicationsPath}${item.hash}`;
    link.addEventListener("click", () => {
      try {
        window.localStorage.setItem(submenuStorageKey, "1");
      } catch (error) {
        // Ignore localStorage access failures.
      }
    });
    submenu.appendChild(link);
  });

  const defaultOpen = isPublicationsPage || hasSubmenuHash || persistedOpen;
  submenu.classList.toggle("open", defaultOpen);
  rootLink.setAttribute("aria-expanded", defaultOpen ? "true" : "false");

  rootLink.addEventListener("click", (event) => {
    event.preventDefault();
    const isOpen = submenu.classList.toggle("open");
    rootLink.setAttribute("aria-expanded", isOpen ? "true" : "false");
    try {
      window.localStorage.setItem(submenuStorageKey, isOpen ? "1" : "0");
    } catch (error) {
      // Ignore localStorage access failures.
    }
  });

  topLevelLinks.forEach((link) => {
    if (link === rootLink) return;
    link.addEventListener("click", () => {
      submenu.classList.remove("open");
      rootLink.setAttribute("aria-expanded", "false");
      try {
        window.localStorage.setItem(submenuStorageKey, "0");
      } catch (error) {
        // Ignore localStorage access failures.
      }
    });
  });
}

async function loadAdvancedPhases() {
  const mount = document.getElementById("advanced-phase-mount");
  if (!mount) return;

  const sourcePath = mount.dataset.advancedPhaseSource;
  if (!sourcePath) return;

  try {
    const response = await fetch(sourcePath);
    if (!response.ok) return;

    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const sourceList = doc.querySelector(".challenge-list");
    if (!sourceList) return;

    const fragment = document.createDocumentFragment();
    Array.from(sourceList.children).forEach((node) => {
      if (node.classList && node.classList.contains("phase-tab-nav")) {
        return;
      }
      fragment.appendChild(node.cloneNode(true));
    });

    mount.innerHTML = "";
    mount.appendChild(fragment);
  } catch (error) {
    console.error("Could not load advanced challenge sections:", error);
  }
}

function initMobileNav() {
  // 1. Check if elements exist, if not inject them
  if (!document.querySelector(".mobile-nav-toggle")) {
    const toggleBtn = document.createElement("button");
    toggleBtn.className = "mobile-nav-toggle";
    toggleBtn.setAttribute("aria-label", "Toggle Navigation");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.innerHTML = `
            <div class="hamburger-icon">
                <span></span>
                <span></span>
                <span></span>
            </div>
        `;
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", toggleMobileNav);
  }

  if (!document.querySelector(".mobile-nav-overlay")) {
    const overlay = document.createElement("div");
    overlay.className = "mobile-nav-overlay";
    document.body.appendChild(overlay);

    overlay.addEventListener("click", toggleMobileNav);
  }

  const sidebar = document.querySelector(".sidebar");
  if (sidebar && !sidebar.dataset.mobileNavBound) {
    sidebar.addEventListener("click", (event) => {
      const link = event.target.closest("a");
      if (!link) return;

      if (window.innerWidth <= 1024 && sidebar.classList.contains("active")) {
        toggleMobileNav();
      }
    });
    sidebar.dataset.mobileNavBound = "true";
  }

  ensureMobileHeader();
}

function toggleMobileNav() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".mobile-nav-overlay");
  const toggleBtn = document.querySelector(".mobile-nav-toggle");

  if (sidebar && overlay && toggleBtn) {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
    toggleBtn.classList.toggle("active");
    const isOpen = sidebar.classList.contains("active");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  }
}

function ensureMobileHeader() {
  if (document.querySelector(".mobile-header")) return;

  const lang = document.documentElement.lang || "en";
  const basePath = getBasePath();
  const homeHref =
    lang === "ko" ? `${basePath}ko/index.html` : `${basePath}index.html`;

  // 언어 토글 링크 생성
  const currentPath = window.location.pathname;
  let langToggleHref, langToggleLabel;
  if (lang === "ko") {
    langToggleHref = currentPath.replace("/ko/", "/").replace("/MasVisio_Research/ko/", "/MasVisio_Research/");
    langToggleLabel = "EN";
  } else {
    langToggleHref = currentPath.replace("/MasVisio_Research/", "/MasVisio_Research/ko/");
    langToggleLabel = "KO";
  }

  const header = document.createElement("header");
  header.className = "mobile-header";
  header.innerHTML = `
        <a href="${homeHref}" class="mobile-logo">
            <h1>Optinex<br>Research</h1>
            <span class="logo-subtitle">Vision Intelligence &<br>Biomedical Engineering</span>
        </a>
        <a href="${langToggleHref}" class="mobile-lang-toggle" aria-label="Switch language">${langToggleLabel}</a>
    `;
  document.body.insertBefore(header, document.body.firstChild);

  // main 태그에 role 추가
  const mainEl = document.querySelector("main");
  if (mainEl && !mainEl.getAttribute("role")) {
    mainEl.setAttribute("role", "main");
  }
}

// Old functions removed/replaced
// function toggleMobileMenu() { ... }
// function closeMobileMenu() { ... }

function setupDesktopDropdowns() {
  const dropdownItems = document.querySelectorAll(".nav-item.dropdown");

  dropdownItems.forEach((item) => {
    const dropdownMenu = item.querySelector(".dropdown-menu");

    item.addEventListener("mouseenter", () => {
      if (window.innerWidth > 768) {
        dropdownMenu.style.display = "block";
      }
    });

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 768) {
        dropdownMenu.style.display = "none";
      }
    });
  });
}

function handleScrollAnimations() {
  const elementsToAnimate = document.querySelectorAll(
    ".data-card, .highlight-card",
  );

  elementsToAnimate.forEach((element, index) => {
    const rect = element.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      !element.classList.contains("animated")
    ) {
      setTimeout(() => {
        element.classList.add("animated");
      }, index * 100);
    }
  });
}

async function loadResearchProjects() {
  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("research-projects-container");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    const projects = data[lang]?.projects || [];

    if (projects.length > 0) {
      const basePath = getBasePath();
      const linkPrefix =
        lang === "ko" ? basePath + "ko" : basePath.slice(0, -1);
      const buttonText = lang === "ko" ? "자세히 보기" : "Learn More";

      container.innerHTML = projects
        .map(
          (project) => `
                <div class="project-card">
                    <h3>${project.title}</h3>
                    <p>${project.subtitle}</p>
                    <a href="${linkPrefix}/research/project.html?id=${project.id}" class="btn-secondary">${buttonText}</a>
                </div>
            `,
        )
        .join("");
    } else {
      container.innerHTML =
        lang === "ko"
          ? "<p>진행 중인 프로젝트가 없습니다.</p>"
          : "<p>No active projects at the moment.</p>";
    }
  } catch (error) {
    console.error("Could not load research projects:", error);
    container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
  }
}

async function loadPublications() {
  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("publications-container");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    const publications = data[lang]?.publications || [];

    if (publications.length > 0) {
      // Categorize Publications
      const reviewedPapers = [];
      const conferences = [];
      const patents = [];

      publications.forEach((pub) => {
        // Normalize field to lower case for check (though data is mixed case/lang)
        const f = (pub.field || "").trim();

        // Map specific fields to categories
        // Conference
        if (["학술발표", "Conference", "conference"].includes(f)) {
          conferences.push(pub);
        }
        // Patent
        else if (["특허", "Patent", "patent"].includes(f)) {
          patents.push(pub);
        }
        // Reviewed Papers (Default for 'Policy', 'Clinical', 'Prototype', etc.)
        else {
          reviewedPapers.push(pub);
        }
      });

      let htmlContent = "";

      // Helper to sort by year desc
      const sortByYear = (list) => {
        return list.sort((a, b) => parseInt(b.year) - parseInt(a.year));
      };

      // --- SECTION 1: Reviewed Papers ---
      if (reviewedPapers.length > 0) {
        const sorted = sortByYear(reviewedPapers);

        // Statistics for Reviewed Papers only
        const fieldCounts = sorted.reduce((acc, pub) => {
          const field = pub.field || "Other";
          acc[field] = (acc[field] || 0) + 1;
          return acc;
        }, {});

        const totalCount = sorted.length;

        const statsOrder =
          lang === "ko"
            ? ["시제품", "임상", "정책"]
            : ["Prototype", "Clinical", "Policy"];
        const totalLabel = lang === "ko" ? "전체" : "Total";
        const sectionTitle = lang === "ko" ? "연구논문" : "Reviewed Papers";

        htmlContent += `<div id="reviewed-papers" class="publication-section">`;
        htmlContent += `<h3 class="publication-section-title">${sectionTitle}</h3>`;

        // Stats Bar
        htmlContent += '<div class="stats-bar-container">';

        // Total
        htmlContent += `
                            <div class="stat-badge">
                                ${totalLabel} <span class="stat-count">${totalCount}</span>
                            </div>
                        `;

        // Sub-fields
        statsOrder.forEach((field) => {
          const count = fieldCounts[field] || 0;
          htmlContent += `
                                <div class="stat-badge-outline">
                                    ${field} <span class="stat-count">${count}</span>
                                </div>
                            `;
        });
        htmlContent += "</div>";

        // List
        htmlContent += '<div class="publication-list-iso">';
        sorted.forEach((pub, index) => {
          htmlContent += `
                                <div class="iso-item">
                                    <span class="iso-item-number">${index + 1}.</span>
                                    <span class="authors">${pub.authors}.</span>
                                    <a href="${pub.doi || "#"}" target="_blank" class="iso-item-title-link" style="pointer-events: ${pub.doi ? "auto" : "none"};">
                                        "${pub.title}"
                                    </a>.
                                    <span class="iso-item-journal">${pub.journal}</span>.
                                </div>
                            `;
        });
        htmlContent += "</div></div>";
      }

      // --- SECTION 2: Conference ---
      if (conferences.length > 0) {
        const sorted = sortByYear(conferences);
        const sectionTitle = lang === "ko" ? "학술발표" : "Conference";

        htmlContent += `<div id="conference" class="publication-section">`;
        htmlContent += `<h3 class="publication-section-title">${sectionTitle}</h3>`;

        htmlContent += '<div class="publication-list-iso">';
        sorted.forEach((pub, index) => {
          htmlContent += `
                                <div class="iso-item">
                                    <span class="iso-item-number">${index + 1}.</span>
                                    <span class="authors">${pub.authors}.</span>
                                    <span class="iso-item-title">
                                        "${pub.title}"
                                    </span>.
                                    <span class="iso-item-journal">${pub.journal}</span>.
                                </div>
                            `;
        });
        htmlContent += "</div></div>";
      }

      // --- SECTION 3: Patents ---
      if (patents.length > 0) {
        const sorted = sortByYear(patents);
        const sectionTitle = lang === "ko" ? "특허" : "Patent";

        htmlContent += `<div id="patent" class="publication-section">`;
        htmlContent += `<h3 class="publication-section-title">${sectionTitle}</h3>`;

        htmlContent += '<div class="publication-list-iso">';
        sorted.forEach((pub, index) => {
          htmlContent += `
                                <div class="iso-item">
                                    <span class="iso-item-number">${index + 1}.</span>
                                    <span class="authors">${pub.authors}.</span>
                                    <span class="iso-item-title">
                                        "${pub.title}"
                                    </span>.
                                    <span class="iso-item-journal">${pub.journal}</span>.
                                </div>
                            `;
        });
        htmlContent += "</div></div>";
      }

      container.innerHTML = htmlContent;
      refreshPublicationsView();
    } else {
      container.innerHTML =
        lang === "ko"
          ? "<p>등록된 논문이 없습니다.</p>"
          : "<p>No publications listed yet.</p>";
    }
  } catch (error) {
    console.error("Could not load publications:", error);
    container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
  }
}

// Helper functions renderPublicationsByYear, createPublicationItem, openTab are no longer needed
// and replaced by the logic inside loadPublications or removed.

async function loadProjectDetails() {
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("id");

  if (!projectId) return;

  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("project-detail-container");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    const projects = data[lang]?.projects || [];
    const project = projects.find((p) => p.id === projectId);

    if (project) {
      document.title = `${project.title} - Optinex Research`;

      let mechanismsHtml = "";
      if (project.mechanisms) {
        mechanismsHtml = "<h3>Mechanisms</h3><ul>";
        project.mechanisms.forEach((m) => {
          mechanismsHtml += `<li><strong>${m.title}</strong><ul>${m.points.map((p) => `<li>${p}</li>`).join("")}</ul></li>`;
        });
        mechanismsHtml += "</ul>";
      }

      let resultsHtml = "";
      if (project.results) {
        resultsHtml = '<div class="stats-grid">';
        project.results.forEach((r) => {
          resultsHtml += `<div class="stat-item"><h3>${r.value}</h3><p>${r.title}</p><small>${r.description}</small></div>`;
        });
        resultsHtml += "</div>";
      }

      let imagesHtml = "";
      if (project.images && project.images.length > 0) {
        // Determine base path for images ensuring no double slashes if path starts with /
        const basePath = getBasePath();
        imagesHtml =
          '<div class="project-images" style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem;">';
        project.images.forEach((img) => {
          // Remove leading slash if present to append cleanly to basePath
          const cleanPath = img.startsWith("/") ? img.slice(1) : img;
          imagesHtml += `<img src="${basePath + cleanPath}" alt="Project Image" style="width: 100%; border-radius: 8px; border: 1px solid #e2e8f0;">`;
        });
        imagesHtml += "</div>";
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
    console.error("Error loading project details:", error);
    container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
  }
}

async function loadTeamMembers() {
  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("team-container");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    let teamMembers = data[lang]?.team || [];

    if (teamMembers.length > 0) {
      // CEO(이환희)를 강제로 맨 위로 정렬 (근본적 해결)
      teamMembers.sort((a, b) => {
        if (a.name === "이환희" || a.name === "Hwan-Hee Lee" || a.role === "대표" || a.role === "CEO") return -1;
        if (b.name === "이환희" || b.name === "Hwan-Hee Lee" || b.role === "대표" || b.role === "CEO") return 1;
        return 0;
      });

      container.innerHTML = teamMembers
        .map(
          (member) => `
                <div class="team-card">
                    <h3>${member.name}</h3>
                    ${member.affiliation ? `<p class="affiliation">${member.affiliation}</p>` : ""}
                    <p class="role">${member.role}</p>
                    <p class="bio">${member.bio}</p>
                    <p class="expertise"><small>${member.expertise}</small></p>
                </div>
            `,
        )
        .join("");
    } else {
      container.innerHTML =
        lang === "ko"
          ? "<p>팀원 정보를 불러올 수 없습니다.</p>"
          : "<p>No team members found.</p>";
    }
  } catch (error) {
    console.error("Could not load team members:", error);
    container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
  }
}

async function loadDiagnostics() {
  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("diagnostics-container");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    const diagnostics = data[lang]?.diagnostics;

    if (diagnostics) {
      let html = `
        <div class="diagnostic-intro">
            <h2 class="section-title">${diagnostics.title}</h2>
            <p class="section-subtitle">${diagnostics.description}</p>
        </div>
        
        <div class="diagnostic-grid">
      `;

      diagnostics.visualizations.forEach(vis => {
        const basePath = getBasePath();
        const cleanPath = vis.image.startsWith("/") ? vis.image.slice(1) : vis.image;
        const targetDiseasesTitle = lang === "ko" ? "예측 가능 질환" : "Predictable Diseases";
        html += `
            <div class="diagnostic-card">
                <div class="diagnostic-image">
                    <img src="${basePath + cleanPath}" alt="${vis.title}">
                </div>
                <div class="diagnostic-info">
                    <h3>${vis.title}</h3>
                    <p class="analysis-text">${vis.analysis}</p>
                    <div class="target-diseases">
                        <strong>${targetDiseasesTitle}:</strong>
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
      const tableTitle = lang === "ko" ? "질환별 예측 위험도" : "Predictive Risk Level by Disease";
      const tableRank = lang === "ko" ? "순위" : "Rank";
      const tablePart = lang === "ko" ? "부위" : "Part";
      const tableDisease = lang === "ko" ? "질환명" : "Disease";
      const tableRisk = lang === "ko" ? "위험도" : "Risk Level";

      html += `
          <div class="risk-table-section">
              <h3 class="table-title">${tableTitle}</h3>
              <div class="table-wrapper">
                  <table class="risk-table">
                      <thead>
                          <tr>
                              <th>${tableRank}</th>
                              <th>${tablePart}</th>
                              <th>${tableDisease}</th>
                              <th>${tableRisk}</th>
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
      container.innerHTML = lang === 'ko'
          ? '<p class="error-text">진단 정보를 로드할 수 없습니다. 데이터 형식을 확인해주세요.</p>'
          : '<p class="error-text">Unable to load diagnostics. Please check data format.</p>';
    }
  } catch (error) {
    console.error('Error loading diagnostics:', error);
    container.innerHTML = `<p class="error-text">${getErrorMessage(error, lang)}</p>`;
  }
}

// =========================================
// Accessibility & Voice Guide (TTS) System
// =========================================
let voiceGuideActive = false;
let largeTextActive = false;
let highContrastActive = false;

function initAccessibilityControls() {
  // Load saved settings
  try {
    voiceGuideActive = localStorage.getItem("mv_voice_guide") === "1";
    largeTextActive = localStorage.getItem("mv_large_text") === "1";
    highContrastActive = localStorage.getItem("mv_high_contrast") === "1";
  } catch (e) {
    console.error("Local storage error:", e);
  }

  // Create UI Controls Toolbar dynamically
  if (!document.querySelector(".accessibility-controls")) {
    const controls = document.createElement("div");
    controls.className = "accessibility-controls";
    controls.setAttribute("role", "toolbar");
    controls.setAttribute("aria-label", "접근성 컨트롤");
    controls.innerHTML = `
      <button id="btn-large-text" class="acc-btn" onclick="toggleLargeText()" aria-label="큰 글씨 모드" aria-pressed="${largeTextActive}">🔍</button>
      <button id="btn-high-contrast" class="acc-btn" onclick="toggleHighContrast()" aria-label="고대비 모드" aria-pressed="${highContrastActive}">🌓</button>
      <button id="btn-voice-guide" class="acc-btn" onclick="toggleVoiceGuide()" aria-label="음성 가이드" aria-pressed="${voiceGuideActive}">🔊</button>
    `;
    document.body.appendChild(controls);
  }

  // Apply CSS styling for accessibility controls
  injectAccessibilityStyles();

  // Apply loaded states
  if (largeTextActive) document.body.classList.add("large-text");
  if (highContrastActive) document.body.classList.add("high-contrast");

  // Welcome message if voice guide is active
  if (voiceGuideActive) {
    const isKo = document.documentElement.lang === "ko";
    const welcome = isKo 
      ? "시각재활 연구 웹사이트에 오신 것을 환영합니다. 마우스를 올리거나 탭 키로 이동하면 안내 음성이 나옵니다." 
      : "Welcome to Optinex Research. Hover or tab to hear descriptions.";
    setTimeout(() => speakText(welcome), 1000);
  }

  // Bind mouseover and focus events
  bindAccessibilityEvents();
}

function injectAccessibilityStyles() {
  if (document.getElementById("accessibility-inline-css")) return;
  const style = document.createElement("style");
  style.id = "accessibility-inline-css";
  style.innerHTML = `
    .accessibility-controls {
      position: fixed;
      bottom: 20px;
      right: 20px;
      display: flex;
      gap: 10px;
      z-index: 1002;
      background: rgba(255, 255, 255, 0.95);
      border: 1px solid #cbd5e1;
      padding: 8px 12px;
      border-radius: 30px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(10px);
    }
    .acc-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 1px solid #e2e8f0;
      background: white;
      cursor: pointer;
      font-size: 1.1rem;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .acc-btn:hover {
      background: #f1f5f9;
      transform: scale(1.1);
    }
    .acc-btn[aria-pressed="true"] {
      background: #1a73e8;
      border-color: #1a73e8;
      color: white;
    }
    body.large-text {
      font-size: 1.25rem !important;
      line-height: 1.8 !important;
    }
    body.large-text .section-heading-hero,
    body.large-text .section-title {
      font-size: 2.8rem !important;
    }
    body.large-text p, 
    body.large-text a, 
    body.large-text span, 
    body.large-text li {
      font-size: 1.15rem !important;
    }
    body.high-contrast {
      background-color: #000000 !important;
      color: #ffffff !important;
    }
    body.high-contrast .main-content {
      background-color: #000000 !important;
      color: #ffffff !important;
    }
    body.high-contrast .sidebar {
      background-color: #121212 !important;
      border-right-color: #333333 !important;
    }
    body.high-contrast a {
      color: #ffff00 !important;
    }
    body.high-contrast .feature-card,
    body.high-contrast .team-card,
    body.high-contrast .diagnostic-card {
      background: #121212 !important;
      border-color: #ffff00 !important;
    }
    body.high-contrast h1,
    body.high-contrast h2,
    body.high-contrast h3,
    body.high-contrast h4 {
      color: #ffff00 !important;
    }
  `;
  document.head.appendChild(style);
}

function toggleLargeText() {
  largeTextActive = !largeTextActive;
  document.body.classList.toggle("large-text", largeTextActive);
  document.getElementById("btn-large-text").setAttribute("aria-pressed", String(largeTextActive));
  try {
    localStorage.setItem("mv_large_text", largeTextActive ? "1" : "0");
  } catch (e) {}
  
  const isKo = document.documentElement.lang === "ko";
  const msg = largeTextActive 
    ? (isKo ? "큰 글씨 모드가 켜졌습니다." : "Large text mode enabled.")
    : (isKo ? "큰 글씨 모드가 꺼졌습니다." : "Large text mode disabled.");
  speakText(msg);
}

function toggleHighContrast() {
  highContrastActive = !highContrastActive;
  document.body.classList.toggle("high-contrast", highContrastActive);
  document.getElementById("btn-high-contrast").setAttribute("aria-pressed", String(highContrastActive));
  try {
    localStorage.setItem("mv_high_contrast", highContrastActive ? "1" : "0");
  } catch (e) {}

  const isKo = document.documentElement.lang === "ko";
  const msg = highContrastActive 
    ? (isKo ? "고대비 모드가 켜졌습니다." : "High contrast mode enabled.")
    : (isKo ? "고대비 모드가 꺼졌습니다." : "High contrast mode disabled.");
  speakText(msg);
}

function toggleVoiceGuide() {
  voiceGuideActive = !voiceGuideActive;
  document.getElementById("btn-voice-guide").setAttribute("aria-pressed", String(voiceGuideActive));
  try {
    localStorage.setItem("mv_voice_guide", voiceGuideActive ? "1" : "0");
  } catch (e) {}

  if (!voiceGuideActive) {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  } else {
    const isKo = document.documentElement.lang === "ko";
    const msg = isKo ? "음성 가이드가 활성화되었습니다." : "Voice guide enabled.";
    speakText(msg);
  }
}

function speakText(text) {
  if (!voiceGuideActive || !window.speechSynthesis) return;

  window.speechSynthesis.cancel(); // Stop current speech
  const utterance = new SpeechSynthesisUtterance(text);
  const isKo = document.documentElement.lang === "ko";
  utterance.lang = isKo ? "ko-KR" : "en-US";
  window.speechSynthesis.speak(utterance);
}

function bindAccessibilityEvents() {
  const elements = document.querySelectorAll(
    "a, button, .feature-card, .team-card, .data-card, h1, h2, h3, .research-pillar"
  );

  elements.forEach((el) => {
    const handleEvent = (e) => {
      if (!voiceGuideActive) return;
      e.stopPropagation();

      let textToSpeak = "";
      if (el.getAttribute("aria-label")) {
        textToSpeak = el.getAttribute("aria-label");
      } else if (el.tagName.startsWith("H")) {
        textToSpeak = el.textContent;
      } else if (el.classList.contains("feature-card")) {
        const title = el.querySelector("h3")?.textContent || "";
        const desc = el.querySelector("p")?.textContent || "";
        textToSpeak = `${title}. ${desc}`;
      } else if (el.classList.contains("team-card")) {
        const name = el.querySelector("h3")?.textContent || "";
        const role = el.querySelector(".role")?.textContent || "";
        textToSpeak = `${name}. ${role}`;
      } else if (el.classList.contains("research-pillar")) {
        const title = el.querySelector(".pillar-title")?.textContent || "";
        const desc = el.querySelector(".pillar-desc")?.textContent || "";
        textToSpeak = `${title}. ${desc}`;
      } else {
        textToSpeak = el.textContent || el.innerText || "";
      }

      // 스크린리더 충돌 방지: 음성 가이드 동작 시 해당 요소를 일시적으로 aria-hidden 처리하여 스크린리더 중복 낭독 억제
      if (textToSpeak.trim()) {
        const originalAriaHidden = el.getAttribute("aria-hidden");
        el.setAttribute("aria-hidden", "true");
        speakText(textToSpeak);
        
        // 낭독이 끝나거나 일정 시간 후 원상복구
        setTimeout(() => {
          if (originalAriaHidden === null) {
            el.removeAttribute("aria-hidden");
          } else {
            el.setAttribute("aria-hidden", originalAriaHidden);
          }
        }, 100);
      }
    };

    el.addEventListener("mouseenter", handleEvent);
    el.addEventListener("focus", handleEvent);
  });
}

