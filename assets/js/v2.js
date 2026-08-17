/**
 * Optinex Research - Publications V2 Script
 * 3대 연구 테마 그룹화, 학술적 배경 보강 및 Three.js 3D 인터랙티브 안구 모델링 제어
 */

document.addEventListener("DOMContentLoaded", () => {
  // v2 컨테이너가 존재할 때만 실행하여 기존 페이지와의 충돌 방지
  if (document.getElementById("publications-container-v2")) {
    initPublicationsV2();
  }
});

// 전역 변수 (3D Eyeball 및 Theme 1 Wavefront, 2D 스케일 연동)
let scene, camera, renderer;
let eyeballMesh, corneaShell, irisMesh, pupilMesh, nerveMesh;
let corneaGrid, scleraGrid;
let wavefrontMesh, wavefrontGridMesh, laserScannerLine; // 테마 1 전용 Zernike 수차 곡면 & 레이저 라인
let retinaShell, shellT, shellS;
let rayLines = [];
let metrologyDecorations = [];
let scanPlaneMeshGlobal; // 테마 1 전용 레이저 스캔 슬라이싱 평면
let pulseParticles = [];
let myopiaDecorations = [];
let animationFrameId;
let currentTheme = "metrology";
let pupilPulseDirection = -1;
let pupilScale = 1.0;
let pupilTime = 0; // 동공 바이오마커 사인파 애니메이션 시간 축
let pupilHistory = []; // 테마 2 실시간 동공 그래프 기록용
let myopiaAngleIndex = 0; // 테마 3 2D 스케일 순환용 (0, 15, 30도)
let myopiaIntervalId = null; // 테마 3 루프 타이머 ID

/**
 * Publications V2 초기화
 */
async function initPublicationsV2() {
  const lang = document.documentElement.lang || "en";
  
  // 1. 사이드바 메뉴 V2 형태로 재구성
  initPublicationsSubmenuToggleV2();

  // 2. V2 전용 데이터 로드 및 렌더링
  await loadPublicationsV2();

  // 3. 3D 안구 시각화 초기화
  init3DEyeballVisualization();

  // 4. 네비게이션 및 스크롤 이벤트 활성화
  initPublicationsNavigationV2();
}

/**
 * 1. 사이드바 메뉴 V2 형태로 재구성
 */
function initPublicationsSubmenuToggleV2() {
  const nav = document.querySelector(".sidebar-nav");
  if (!nav) return;

  // 연구성과(Publications) 루트 링크 탐색 (v2.html 및 메인 index.html 모두 대응)
  const topLevelLinks = Array.from(nav.querySelectorAll(":scope > .nav-item"));
  const rootLink = topLevelLinks.find((link) => {
    const href = link.getAttribute("href") || "";
    return href.includes("publications/") || href.includes("v2.html") || link.classList.contains("active");
  });
  if (!rootLink) return;

  const isKo = window.location.pathname.includes("/ko/");
  const basePath = getBasePath();
  const publicationsPath = isKo
    ? `${basePath}ko/publications/v2.html`
    : `${basePath}publications/v2.html`;

  // V2 전용 서브메뉴 항목 정의
  const submenuItems = isKo
    ? [
        { label: "시광학 및 정밀 계측", hash: "#theme-metrology" },
        { label: "AI 안구 바이오마커", hash: "#theme-biomarker" },
        { label: "근시 제어 및 시각 재활", hash: "#theme-myopia-rehab" },
        { label: "기타 연구 아카이브", hash: "#theme-archive" }
      ]
    : [
        { label: "Metrology & Ray-Tracing", hash: "#theme-metrology" },
        { label: "AI Ocular Biomarkers", hash: "#theme-biomarker" },
        { label: "Myopia & Visual Rehab", hash: "#theme-myopia-rehab" },
        { label: "Research Archive", hash: "#theme-archive" }
      ];

  let submenu = rootLink.nextElementSibling;
  if (!submenu || !submenu.classList.contains("sidebar-submenu")) {
    submenu = document.createElement("div");
    submenu.className = "sidebar-submenu open";
    rootLink.insertAdjacentElement("afterend", submenu);
  }
  submenu.removeAttribute("style");
  submenu.innerHTML = "";

  submenuItems.forEach((item) => {
    const link = document.createElement("a");
    link.className = "nav-item";
    link.textContent = item.label;
    link.href = item.hash; // v2.html 내부 앵커 링크로 다이렉트 전환
    submenu.appendChild(link);
  });
}

/**
 * 2. V2 전용 데이터 로드 및 테마별 다이내믹 분류
 */
async function loadPublicationsV2() {
  const lang = document.documentElement.lang || "en";
  const dataPath = getBasePath() + "assets/data/content.json";
  const container = document.getElementById("publications-container-v2");

  if (!container) return;

  try {
    const data = await DataCache.get(dataPath);
    const publications = data[lang]?.publications || [];

    if (publications.length > 0) {
      // 테마별 그룹 버킷
      const metrologyGroup = [];
      const biomarkerGroup = [];
      const myopiaRehabGroup = [];
      const archiveGroup = [];

      publications.forEach((pub) => {
        const title = pub.title || "";
        const field = pub.field || "";
        const journal = pub.journal || "";

        // 분류 키워드 체크
        const metrologyKeywords = ["망막", "초평면", "곡률", "광선추적", "굴절", "공막", "3D scanner", "안구 버전스", "안위", "주시시차", "칼라필터", "난시", "cornea", "sclera", "optics", "ray-tracing", "refraction"];
        const biomarkerKeywords = ["동공반응", "동공 반응", "바이오마커", "신경학적 질환", "스크리닝", "아이트래커", "가독성", "홍채 순응", "성적 지향성", "휘도", "pupil", "biomarker"];
        const myopiaRehabKeywords = ["근시억제", "근시 억제", "시생활", "시각적 삶", "대비감도", "대비감도함수", "입체시", "입체시각", "시보조기구", "반맹시", "재활", "중심외주시", "주변시야", "생리적 가중", "시기능", "스포츠비젼", "myopia", "eccentric viewing", "hemianopia", "rehabilitation"];
        const archiveKeywords = ["전자상거래", "온라인 판매", "안경사 교육", "안경사제도", "양성기관", "교과목", "마이스터"];

        const matches = (text, keywords) => keywords.some(kw => text.includes(kw));

        // 1순위: 무관한 아카이브 분류
        if (matches(title, archiveKeywords) || field === "정책" && matches(title, ["온라인", "교육", "제도"])) {
          archiveGroup.push(pub);
        }
        // 2순위: 각 핵심 테마 매핑
        else if (matches(title, metrologyKeywords) || matches(journal, ["3D scanner", "주시시차", "안굴절계"])) {
          metrologyGroup.push(pub);
        }
        else if (matches(title, biomarkerKeywords) || matches(journal, ["동공반응", "아이트래커"])) {
          biomarkerGroup.push(pub);
        }
        else if (matches(title, myopiaRehabKeywords) || matches(journal, ["대비감도", "시보조기구", "재활치료"])) {
          myopiaRehabGroup.push(pub);
        }
        // 3순위: 디폴트 처리
        else {
          if (field === "임상") {
            myopiaRehabGroup.push(pub);
          } else {
            archiveGroup.push(pub);
          }
        }
      });

      // 렌더링에 사용될 테마 데이터 구조
      const themes = [
        {
          id: "theme-metrology",
          title: lang === "ko" ? "시광학 및 정밀 광학 계측" : "Ophthalmic Metrology & Ray-Tracing",
          foundations: lang === "ko" 
            ? "각공막의 3D 표면 위상과 미세 안구 운동을 마이크로미터 단위로 포착하는 광학 계측 기술을 다룹니다. 이는 안구의 수학적 광학 모델(Navarro Eyeball Model) 및 고차 파면 수차(Wavefront Aberrations) 분석을 바탕으로, 비침습적으로 안구 전면부 및 후면부의 기하학적 형태를 복원하는 원천 기술에 기반합니다."
            : "Focuses on optical measurement technologies capturing 3D corneo-scleral topography and micro-ocular movements at the micrometer scale. This is grounded in mathematical eye models (Navarro Eyeball Model) and wavefront aberrations analysis, providing non-invasive anatomical reconstruction.",
          citations: [
            "Navarro, R., et al. (1985). Accommodation-dependent model of the human eye with aspheric surfaces. JOSA A.",
            "Thibos, L. N., et al. (2002). Standards for reporting the optical aberrations of eyes. Journal of Vision."
          ],
          items: metrologyGroup
        },
        {
          id: "theme-biomarker",
          title: lang === "ko" ? "AI 동공 바이오마커 및 생체 스크리닝" : "AI Pupil Dynamics & Biomarker Screening",
          foundations: lang === "ko" 
            ? "동공 광반사(Pupillary Light Reflex, PLR)의 반응 대기시간(Latency), 수축 속도(Constriction Velocity), 적응적 복잡성 신호는 자율신경계 및 중추신경계의 변성을 조기에 스크리닝할 수 있는 디지털 바이오마커로 기능합니다. Optinex는 Basler 고속 카메라 기반 계측을 통해 기존 문헌에서 제시된 치매 및 신경퇴행성 질환의 미세 동공 반응 특이성을 고도화하고 있습니다."
            : "Analyzes Pupil Light Reflex (PLR) dynamics—including latency, constriction velocity, and complexity metrics—as digital biomarkers for autonomic and central nervous system degeneration. Optinex enhances screening specificity for neurodegenerative anomalies using high-speed imaging.",
          citations: [
            "Fotiou, D. F., et al. (2000). Evaluation of the pupillary light reflex in Alzheimer's disease: a review. Journal of Neurology.",
            "Chougule, P. S., et al. (2019). Pupillometry in Alzheimer's Disease: A Systematic Review. Frontiers in Neurology."
          ],
          items: biomarkerGroup
        },
        {
          id: "theme-myopia-rehab",
          title: lang === "ko" ? "개인맞춤형 시각 재활 및 근시 제어" : "Myopia Control & Visual Rehabilitation",
          foundations: lang === "ko" 
            ? "주변부 망막에 맺히는 상의 초점 이탈(Peripheral Hyperopic Defocus)은 안구의 후방 축성 성장(Axial Elongation)을 자극하여 근시 진행을 유도하는 핵심 기전입니다. Optinex는 주변부 상점의 위치를 인위적으로 망막 전방(Myopic Defocus)에 위치시키는 광학 패턴 알고리즘 및 황반변성 저시력 환자를 위한 중심외주시(Eccentric Viewing) 재활 기법을 통합적으로 고안합니다."
            : "Peripheral hyperopic defocus triggers axial elongation, accelerating myopia progression. Optinex develops optical algorithms to shift peripheral foci anterior to the retina (myopic defocus) and designs eccentric viewing (EV) training strategies using Preferred Retinal Loci (PRL) for macular degeneration patients.",
          citations: [
            "Smith III, E. L., et al. (2005). Peripheral vision can influence eye growth and refractive development in infant monkeys. IOVS.",
            "Smith III, E. L. (2011). Prentice Award Lecture 2010: A Case for Peripheral Optical Treatment Strategies for Myopia. Optom Vis Sci.",
            "Crossland, M. D., et al. (2005). Reading with a preferred retinal locus in macular disease. Ophthalmic & Physiological Optics."
          ],
          items: myopiaRehabGroup
        }
      ];

      let htmlContent = "";

      // 1. 핵심 테마 렌더링
      themes.forEach((theme) => {
        htmlContent += `
          <div id="${theme.id}" class="publication-section" style="margin-bottom: 60px; scroll-margin-top: 60px;">
            <h3 class="publication-section-title" style="border-bottom: 2px solid var(--line-strong); padding-bottom: 12px; margin-bottom: 20px;">
              ${theme.title}
            </h3>
            
            <!-- Academic Foundation Card (DeepMind Science Core) -->
            <div class="academic-foundation-card">
              <h4>
                <span style="color: var(--primary-color);">💡</span> 
                ${lang === "ko" ? "학술적 이론 배경" : "Scientific Foundations"}
              </h4>
              <p>${theme.foundations}</p>
              
              <div class="academic-references">
                <div class="academic-references-title">${lang === "ko" ? "핵심 관련 학계 문헌" : "Key Supporting Literature"}</div>
                ${theme.citations.map(cit => `<div class="ref-item">${cit}</div>`).join("")}
              </div>
            </div>
            
            <!-- Publications List -->
            <div class="publication-list-iso">
        `;

        if (theme.items.length > 0) {
          // 연도 내림차순 정렬
          theme.items.sort((a, b) => parseInt(b.year) - parseInt(a.year));
          theme.items.forEach((pub, index) => {
            const isJournal = !["학술발표", "Conference", "conference"].includes(pub.field);
            const tag = isJournal 
              ? (lang === "ko" ? "[학술지 논문]" : "[Journal Paper]")
              : (lang === "ko" ? "[학술대회 발표]" : "[Conference Abstract]");
            const tagClass = isJournal ? "color: var(--primary-color);" : "color: var(--text-light);";

            htmlContent += `
              <div class="iso-item" style="margin-bottom: 16px;">
                <span class="iso-item-number" style="font-family: var(--mono-font); font-size: 12px; color: var(--text-light); margin-right: 8px;">${index + 1}.</span>
                <span style="font-family: var(--mono-font); font-size: 10px; margin-right: 8px; ${tagClass}">${tag}</span>
                <span class="authors">${pub.authors}.</span>
                <a href="${pub.doi || "#"}" target="_blank" class="iso-item-title-link" style="font-weight: 500; pointer-events: ${pub.doi ? "auto" : "none"}; text-decoration: ${pub.doi ? "underline" : "none"};">
                  "${pub.title}"
                </a>.
                <span class="iso-item-journal" style="font-style: italic; color: var(--text-light);">${pub.journal}</span> (${pub.year}).
              </div>
            `;
          });
        } else {
          htmlContent += `<p style="color: var(--text-light);">${lang === "ko" ? "준비된 연구 성과가 없습니다." : "No publications listed yet."}</p>`;
        }

        htmlContent += `</div></div>`;
      });

      // 2. 과거 정책 아카이브 아코디언 렌더링
      if (archiveGroup.length > 0) {
        archiveGroup.sort((a, b) => parseInt(b.year) - parseInt(a.year));
        const archiveTitle = lang === "ko" ? "기타 안보건 정책 및 검안 교육 아카이브" : "Archived Optometry Policy & Educational Studies";
        
        htmlContent += `
          <div id="theme-archive" class="archive-accordion" style="scroll-margin-top: 60px;">
            <button class="archive-header" onclick="toggleArchiveAccordion()">
              <h3>📦 ${archiveTitle} (${archiveGroup.length})</h3>
              <span class="archive-icon">▼</span>
            </button>
            <div class="archive-content">
              <div class="publication-list-iso">
        `;

        archiveGroup.forEach((pub, index) => {
          htmlContent += `
            <div class="iso-item" style="margin-bottom: 16px; border-bottom: 1px solid rgba(168, 200, 224, 0.05); padding-bottom: 12px;">
              <span class="iso-item-number" style="font-family: var(--mono-font);">${index + 1}.</span>
              <span class="authors">${pub.authors}.</span>
              <a href="${pub.doi || "#"}" target="_blank" class="iso-item-title-link" style="pointer-events: ${pub.doi ? "auto" : "none"};">
                "${pub.title}"
              </a>.
              <span class="iso-item-journal">${pub.journal}</span> (${pub.year}).
              ${pub.abstract ? `<p style="font-size: 12.5px; color: var(--text-light); margin-top: 6px; line-height: 1.5; text-align: justify;">${pub.abstract}</p>` : ""}
            </div>
          `;
        });

        htmlContent += `</div></div></div>`;
      }

      container.innerHTML = htmlContent;
    }
  } catch (error) {
    console.error("Could not load publications V2:", error);
    container.innerHTML = `<p class="error-text">오류가 발생했습니다: ${error.message}</p>`;
  }
}

/**
 * 아카이브 아코디언 토글 함수
 */
function toggleArchiveAccordion() {
  const accordion = document.getElementById("theme-archive");
  if (!accordion) return;
  accordion.classList.toggle("open");
}

/**
 * 3. Three.js 3D 안구 시각화 초기화 및 실시간 제어
 */
function init3DEyeballVisualization() {
  const container = document.getElementById("threejs-visual-panel");
  if (!container) return;

  const width = container.clientWidth;
  const height = container.clientHeight;

  // Scene
  scene = new THREE.Scene();

  // Camera
  camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.set(0, 0, 5.2);

  // Renderer
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio || 1);
  container.innerHTML = "";
  container.appendChild(renderer.domElement);

  // Create 2D canvas for Myopia Ray Trace Sketch (Theme 3)
  const canvas2d = document.createElement("canvas");
  canvas2d.id = "myopia-2d-canvas";
  // Set dimensions directly to prevent blurriness
  const r = window.devicePixelRatio || 1;
  canvas2d.width = width * r;
  canvas2d.height = height * r;
  canvas2d.style.position = "absolute";
  canvas2d.style.top = "0";
  canvas2d.style.left = "0";
  canvas2d.style.width = "100%";
  canvas2d.style.height = "100%";
  canvas2d.style.display = "none";
  canvas2d.style.pointerEvents = "none";
  container.appendChild(canvas2d);
  container.style.position = "relative";

  // 1. Sclera Mesh (안구 뒤쪽 공막 반구 - 실감나는 흰색 눈알 렌더링)
  const scleraGeo = new THREE.SphereGeometry(1.6, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const scleraMat = new THREE.MeshPhongMaterial({
    color: 0xf6f8fa,
    transparent: true,
    opacity: 0.9,
    shininess: 30,
    depthWrite: false
  });
  eyeballMesh = new THREE.Mesh(scleraGeo, scleraMat);
  eyeballMesh.rotation.x = Math.PI / 2; // 정면을 향하도록 설정
  scene.add(eyeballMesh);

  // 1-2. Sclera Red Grid Overlay (공막 적색 격자선 - 테마 1용)
  const scleraGridGeo = new THREE.SphereGeometry(1.605, 32, 32, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2);
  const scleraGridMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    wireframe: true,
    transparent: true,
    opacity: 0.25,
    depthWrite: false
  });
  scleraGrid = new THREE.Mesh(scleraGridGeo, scleraGridMat);
  scleraGrid.rotation.x = Math.PI / 2;
  scleraGrid.visible = false;
  scene.add(scleraGrid);

  // 2. Cornea Dome (각막 전면 돔 - 투명 셸)
  const corneaGeo = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const corneaMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    opacity: 0.25,
    transparent: true,
    flatShading: true,
    depthWrite: false
  });
  corneaShell = new THREE.Mesh(corneaGeo, corneaMat);
  corneaShell.rotation.x = Math.PI / 2;
  scene.add(corneaShell);

  // 2-2. Cornea Red Grid Overlay (각막 적색 격자선 - 테마 1용)
  const corneaGridGeo = new THREE.SphereGeometry(1.505, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const corneaGridMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    wireframe: true,
    transparent: true,
    opacity: 0.5,
    depthWrite: false
  });
  corneaGrid = new THREE.Mesh(corneaGridGeo, corneaGridMat);
  corneaGrid.rotation.x = Math.PI / 2;
  corneaGrid.visible = false;
  scene.add(corneaGrid);

  // 3. Iris Ring (홍채 판넬 - 내경을 0.05로 좁혀 공막 비침 방지 및 갈색 면적 두껍게 확장)
  const irisGeo = new THREE.RingGeometry(0.05, 1.48, 32);
  const irisMat = new THREE.MeshBasicMaterial({
    color: 0x111922,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });
  irisMesh = new THREE.Mesh(irisGeo, irisMat);
  irisMesh.position.z = 0.45;
  scene.add(irisMesh);

  // 4. Pupil Circle (동공 내부 구멍 암흑화)
  const pupilGeo = new THREE.CircleGeometry(0.5, 32);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x080c11 });
  pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
  pupilMesh.position.z = 0.46;
  scene.add(pupilMesh);

  // 5. Optic Nerve Cylinder (시신경 다발 실린더)
  const nerveGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 16);
  const nerveMat = new THREE.MeshBasicMaterial({
    color: 0x475569,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  nerveMesh = new THREE.Mesh(nerveGeo, nerveMat);
  nerveMesh.position.set(0, 0, -1.8);
  nerveMesh.rotation.x = Math.PI / 2;
  nerveMesh.position.set(0, 0, -1.8);
  nerveMesh.rotation.x = Math.PI / 2;
  scene.add(nerveMesh);

  // 5-2. Wavefront Aberration Surface & Laser Sweep (테마 1 전용 Zernike 계측 모델)
  const wavefrontGeo = new THREE.PlaneGeometry(3.0, 3.0, 24, 24);
  const wavefrontMat = new THREE.MeshPhongMaterial({
    color: 0x0ea5e9,
    shininess: 90,
    transparent: true,
    opacity: 0.75,
    side: THREE.DoubleSide,
    depthWrite: false
  });
  wavefrontMesh = new THREE.Mesh(wavefrontGeo, wavefrontMat);
  wavefrontMesh.rotation.x = -Math.PI / 3.5; // 계측 장비 앵글
  wavefrontMesh.position.set(0, 0, 0);
  wavefrontMesh.visible = false;
  scene.add(wavefrontMesh);

  const wavefrontGridMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
    depthWrite: false
  });
  wavefrontGridMesh = new THREE.Mesh(wavefrontGeo, wavefrontGridMat);
  wavefrontGridMesh.rotation.x = -Math.PI / 3.5;
  wavefrontGridMesh.position.set(0, 0, 0.015); // 약간 위쪽에 밀착
  wavefrontGridMesh.visible = false;
  scene.add(wavefrontGridMesh);

  const laserGeo = new THREE.BoxGeometry(0.05, 3.2, 0.15);
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0xef4444,
    transparent: true,
    opacity: 0.95
  });
  laserScannerLine = new THREE.Mesh(laserGeo, laserMat);
  laserScannerLine.rotation.x = -Math.PI / 3.5;
  laserScannerLine.position.set(0, 0, 0.1);
  laserScannerLine.visible = false;
  scene.add(laserScannerLine);

  // 6. Lights
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);
  
  const ambLight = new THREE.AmbientLight(0x1a2e3a);
  scene.add(ambLight);

  // 창 크기 조정 처리
  window.addEventListener("resize", () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    if (canvas2d) {
      const r = window.devicePixelRatio || 1;
      canvas2d.width = w * r;
      canvas2d.height = h * r;
    }
  });

  // 애니메이션 루프 실행
  animate3DEyeball();
}

/**
 * 3D 안구 애니메이션 루프
 */
function animate3DEyeball() {
  animationFrameId = requestAnimationFrame(animate3DEyeball);

  // 안구 공통 회전 모션 (공막/각막 적색 격자선도 함께 회전)
  const rotateSpeed = currentTheme === "myopia-rehab" ? 0.001 : 0.003;
  if (eyeballMesh && eyeballMesh.visible) eyeballMesh.rotation.y += rotateSpeed;
  if (scleraGrid && scleraGrid.visible) scleraGrid.rotation.y += rotateSpeed;
  if (corneaShell && corneaShell.visible) corneaShell.rotation.y += rotateSpeed;
  if (corneaGrid && corneaGrid.visible) corneaGrid.rotation.y += rotateSpeed;
  if (irisMesh && irisMesh.visible) irisMesh.rotation.z += rotateSpeed;
  if (pupilMesh && pupilMesh.visible) pupilMesh.rotation.z += rotateSpeed;

  // 테마별 실시간 특화 애니메이션 제어
  if (currentTheme === "metrology") {
    // 3D 각막 지형 맵(Corneal Topography)의 다이내믹 회전 효과
    if (corneaShell && corneaShell.visible) {
      corneaShell.rotation.y += 0.002;
    }
    if (corneaGrid && corneaGrid.visible) {
      corneaGrid.rotation.y += 0.002;
    }
    // 녹색 레이저 스캔 평면 슬라이싱 애니메이션 (눈 계측 행위 표현)
    if (scanPlaneMeshGlobal) {
      const time = Date.now() * 0.0018;
      // Z축을 따라 각막 앞뒤를 관통 왕복하며 단면 계측 모사 (-0.15 ~ 0.75)
      scanPlaneMeshGlobal.position.z = 0.3 + Math.sin(time) * 0.45;
    }
  } else if (currentTheme === "biomarker") {
    // 1. 동공 크기 수축/이완 맥박 애니메이션 (선형 등속도 0.016 방식을 적용하여 감속/대기시간 없이 상하한 도달 시 즉시 방향 전환)
    const pulseSpeed = 0.016; 
    pupilScale += pupilPulseDirection * pulseSpeed;

    // 0.4(최소 축동) ~ 1.2(최대 산동) 경계 도달 시 딜레이 없이 즉시 반사
    if (pupilScale <= 0.4) {
      pupilScale = 0.4;
      pupilPulseDirection = 1.0; // 최소 지점 도달 시 즉시 팽창 시작
    } else if (pupilScale >= 1.2) {
      pupilScale = 1.2;
      pupilPulseDirection = -1.0; // 최대 지점 도달 시 즉시 수축 시작
    }
    
    if (pupilMesh) {
      pupilMesh.scale.set(pupilScale, pupilScale, 1.0);
    }

    // 2. 실시간 동공 직경 값 그래프 기록 (3D 동공은 선형으로 즉시 튕기되, 그래프는 부드러운 사인 파형으로 변환해 적재)
    const normalized = (pupilScale - 0.4) / (1.2 - 0.4); // 0 ~ 1
    // 0 ~ 1 범위를 -PI/2 ~ PI/2 로 변환하여 sin 값을 취함 (부드러운 곡선화)
    const angle = normalized * Math.PI - Math.PI / 2;
    const currentPupilSizeMM = 5.5 + Math.sin(angle) * 2.0; // 3.5mm ~ 7.5mm
    
    pupilHistory.push(currentPupilSizeMM);
    if (pupilHistory.length > 80) pupilHistory.shift();

    // 3. 실시간 동공 크기 2D 그래프 그리기 호출
    drawPupilSizeGraph();

    // 4. 시신경 전달 펄스 파티클 흐름 시각화
    if (pulseParticles.length === 0) {
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: 0.9, depthWrite: false });
      for (let i = 0; i < 12; i++) {
        const pGeo = new THREE.SphereGeometry(0.045, 8, 8);
        const pMesh = new THREE.Mesh(pGeo, pulseMat);
        pMesh.position.set(
          (Math.random() - 0.5) * 0.15, 
          (Math.random() - 0.5) * 0.15, 
          0.4 - (i * 0.2)
        );
        scene.add(pMesh);
        pulseParticles.push(pMesh);
      }
    }

    // 파티클 후방 전송 모션
    pulseParticles.forEach(p => {
      p.position.z -= 0.025;
      if (p.position.z < -2.0) {
        p.position.z = 0.4;
        p.position.x = (Math.random() - 0.5) * 0.15;
        p.position.y = (Math.random() - 0.5) * 0.15;
      }
    });

  } else if (currentTheme === "myopia-rehab") {
    pupilScale = 0.7; // 고정된 동공 긴장 상태 표현
    if (pupilMesh) pupilMesh.scale.set(pupilScale, pupilScale, 1.0);
  }

  renderer.render(scene, camera);
}

/**
 * 4. 테마 선택에 따른 3D 안구 상태 업데이트
 */
/**
 * 2D Canvas를 이용하여 실감나는 홍채(Iris) 다층 섬유질 텍스처 생성
 */
function createIrisTexture(colorTheme) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  
  // 1. 기본 홍채 색상 방사형 그라데이션
  const grad = ctx.createRadialGradient(256, 256, 40, 256, 256, 256);
  if (colorTheme === "brown") {
    grad.addColorStop(0, "#221102");   // 내경 어두운 갈색
    grad.addColorStop(0.3, "#78350f");  // 중간 황갈색 (Amber)
    grad.addColorStop(0.7, "#451a03");  // 외경 짙은 갈색
    grad.addColorStop(1.0, "#0c0200");  // 가장자리 링 블랙 라인
  } else {
    grad.addColorStop(0, "#082f49");
    grad.addColorStop(0.3, "#0ea5e9");
    grad.addColorStop(0.7, "#0369a1");
    grad.addColorStop(1.0, "#0f172a");
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // 2. 홍채 섬유질(Iris Fibers / Spoke Lines) 묘사
  ctx.strokeStyle = colorTheme === "brown" ? "rgba(251, 191, 36, 0.14)" : "rgba(14, 165, 233, 0.15)";
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 360; i += 1.5) {
    const angle = (i * Math.PI) / 180;
    const startRadius = 50 + Math.random() * 10;
    const endRadius = 220 + Math.random() * 20;
    
    ctx.beginPath();
    ctx.moveTo(256 + Math.cos(angle) * startRadius, 256 + Math.sin(angle) * startRadius);
    ctx.lineTo(256 + Math.cos(angle) * endRadius, 256 + Math.sin(angle) * endRadius);
    ctx.stroke();
  }
  
  // 3. 미세 홍채 동심원 주름 추가
  ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(256, 256, 110, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(256, 256, 170, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

/**
 * 4. 테마 선택에 따른 3D 안구 상태 업데이트
 */
/**
 * 2D Canvas를 이용하여 난시(Astigmatism)의 전형적인 '리본 넥타이(Bow-Tie)' 각막 지형도(Corneal Topography) 텍스처 생성
 */
function createTopographyTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  
  // 1. 배경 베이스: 평평한 곡률을 뜻하는 파란색/청록색 방사형 그라데이션
  const baseGrad = ctx.createRadialGradient(256, 256, 20, 256, 256, 250);
  baseGrad.addColorStop(0, "#0284c7");   // 중심부 평평한 푸른빛 (sky-blue)
  baseGrad.addColorStop(0.5, "#0369a1");  // 주변부 깊은 푸른빛 (deep-blue)
  baseGrad.addColorStop(1.0, "#090d16");  // 외곽 가장자리 어두운 배경
  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(256, 256, 250, 0, Math.PI * 2);
  ctx.fill();

  // 2. 난시의 급격한 경사(Steep Axis)를 뜻하는 리본 넥타이(Bow-Tie) 모양 그리기
  // 상/하 세로 방향으로 길게 뻗은 적색/황색 타원 로브들을 합성하여 자연스러운 열지도 묘사
  ctx.save();
  ctx.globalCompositeOperation = "screen"; // 부드러운 색상 혼합

  // 상단 적색/황색 로브
  const topGrad = ctx.createRadialGradient(256, 120, 10, 256, 170, 160);
  topGrad.addColorStop(0, "rgba(239, 68, 68, 0.95)");  // 핵심부 가파른 곡률 (Red)
  topGrad.addColorStop(0.3, "rgba(245, 158, 11, 0.75)"); // 이행부 (Orange/Yellow)
  topGrad.addColorStop(0.7, "rgba(16, 185, 129, 0.4)");  // 완만한 경사 (Green)
  topGrad.addColorStop(1.0, "rgba(2, 132, 199, 0)");
  ctx.fillStyle = topGrad;
  ctx.beginPath();
  ctx.ellipse(256, 150, 90, 140, 0, 0, Math.PI * 2);
  ctx.fill();

  // 하단 적색/황색 로브
  const bottomGrad = ctx.createRadialGradient(256, 392, 10, 256, 342, 160);
  bottomGrad.addColorStop(0, "rgba(239, 68, 68, 0.95)");
  bottomGrad.addColorStop(0.3, "rgba(245, 158, 11, 0.75)");
  bottomGrad.addColorStop(0.7, "rgba(16, 185, 129, 0.4)");
  bottomGrad.addColorStop(1.0, "rgba(2, 132, 199, 0)");
  ctx.fillStyle = bottomGrad;
  ctx.beginPath();
  ctx.ellipse(256, 362, 90, 140, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // 3. 플라시도 링(Placido Rings) 무늬 투영선 오버레이
  ctx.strokeStyle = "rgba(255, 255, 255, 0.25)";
  ctx.lineWidth = 2.0;
  for (let r = 40; r < 240; r += 40) {
    ctx.beginPath();
    ctx.arc(256, 256, r, 0, Math.PI * 2);
    ctx.stroke();
  }

  return new THREE.CanvasTexture(canvas);
}

/**
 * 4. 테마 선택에 따른 3D 안구 상태 업데이트
 */
function update3DModelByTheme(themeId) {
  currentTheme = themeId;
  const readoutStatus = document.getElementById("readout-status-val");
  const readoutMode = document.getElementById("readout-mode-val");
  const readoutIndex = document.getElementById("readout-index-val");

  scanPlaneMeshGlobal = null; // 레이저 단면 스캔 전역 참조 초기화

  // 기존 테마 데코레이션(링, 파티클, 셸 등) 일체 정리
  metrologyDecorations.forEach(d => scene.remove(d));
  metrologyDecorations = [];
  myopiaDecorations.forEach(d => scene.remove(d));
  myopiaDecorations = [];
  pulseParticles.forEach(p => scene.remove(p));
  pulseParticles = [];

  // 테마 3용 인터벌 타이머 해제
  if (myopiaIntervalId) {
    clearInterval(myopiaIntervalId);
    myopiaIntervalId = null;
  }

  // 기본 스케일 및 가시성 초기화
  if (eyeballMesh) {
    eyeballMesh.visible = true;
    eyeballMesh.material.color.setHex(0xf6f8fa);
    eyeballMesh.material.opacity = 0.95;
    eyeballMesh.material.wireframe = false;
  }
  if (corneaShell) {
    corneaShell.visible = true;
    corneaShell.scale.set(1.0, 1.0, 1.0);
    corneaShell.material.color.setHex(0x38bdf8);
    corneaShell.material.opacity = 0.25;
    corneaShell.material.wireframe = false;
    corneaShell.material.map = null; // 각막 지형 텍스처 리셋
    corneaShell.material.needsUpdate = true;
  }
  if (irisMesh) {
    irisMesh.visible = true;
    irisMesh.material.map = null; // 텍스처 초기화
    irisMesh.material.color.setHex(0x111922); // 기본 어두운 컬러 복구
    irisMesh.material.needsUpdate = true;
  }
  if (pupilMesh) pupilMesh.visible = true;
  if (nerveMesh) nerveMesh.visible = true;
  if (scleraGrid) scleraGrid.visible = false;
  if (corneaGrid) corneaGrid.visible = false;

  // Zernike 파면 Mesh들 기본 비활성화
  if (wavefrontMesh) wavefrontMesh.visible = false;
  if (wavefrontGridMesh) wavefrontGridMesh.visible = false;
  if (laserScannerLine) laserScannerLine.visible = false;

  // 디폴트로 3D WebGL은 보이게, 2D 캔버스는 감춤
  const canvas2d = document.getElementById("myopia-2d-canvas");
  if (canvas2d) canvas2d.style.display = "none";
  if (renderer) renderer.domElement.style.display = "block";

  // 동공 크기 그래프 감춤 (기본)
  const pupilGraphCanvas = document.getElementById("pupil-graph-canvas");
  if (pupilGraphCanvas) pupilGraphCanvas.style.display = "none";

  if (themeId === "metrology") {
    // 테마 1: 3D 각막 지형도 + 정밀 광학 스캐닝 슬라이스 결합 (눈알과 계측의 융합 시각화)
    if (eyeballMesh) {
      eyeballMesh.visible = true;
      eyeballMesh.material.opacity = 0.85; // 공막 외형이 명확히 보이도록 설정
      eyeballMesh.material.color.setHex(0xf6f8fa);
    }
    if (corneaShell) {
      corneaShell.visible = true;
      corneaShell.material.map = createTopographyTexture(); // 난시 리본타이 열지도 텍스처 입힘
      corneaShell.material.color.setHex(0xffffff); // 틴트 초기화
      corneaShell.material.opacity = 0.85; // 지형도가 입체 각막 위에 매핑됨
      corneaShell.material.needsUpdate = true;
    }
    if (corneaGrid) {
      corneaGrid.visible = true; // 그 위에 붉은색 레이저 계측 격자선 투사
      corneaGrid.material.color.setHex(0xef4444);
    }
    if (irisMesh) {
      irisMesh.visible = true;
      irisMesh.material.map = createIrisTexture("brown"); // 갈색 홍채를 노출하여 안구의 사실성 부각
      irisMesh.material.color.setHex(0xffffff);
      irisMesh.material.needsUpdate = true;
    }
    if (pupilMesh) {
      pupilMesh.visible = true;
      pupilMesh.scale.set(0.7, 0.7, 1.0); // 고정된 크기의 안정적인 동공
    }
    if (nerveMesh) {
      nerveMesh.visible = true;
    }

    // 1. 단면을 뚫고 지나가는 녹색 레이저 스캔 평면 (OCT/Scheimpflug 단면 스캔 표현)
    const scanPlaneGeo = new THREE.PlaneGeometry(2.4, 2.4);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.set(0, 0, 0.4);
    
    // 테두리 와이어 선 추가로 하이테크 느낌 강조
    const scanPlaneEdges = new THREE.EdgesGeometry(scanPlaneGeo);
    const scanPlaneLineMat = new THREE.LineBasicMaterial({ color: 0x10b981, linewidth: 2 });
    const scanPlaneWire = new THREE.LineSegments(scanPlaneEdges, scanPlaneLineMat);
    scanPlane.add(scanPlaneWire);
    
    scene.add(scanPlane);
    metrologyDecorations.push(scanPlane);
    scanPlaneMeshGlobal = scanPlane; // 실시간 애니메이션 루프 연동용 전역 변수 할당

    // 2. 안구 전방에 뜨는 홀로그램 HUD 조준선 (Target HUD / Reticle)
    const hudRingGeo = new THREE.RingGeometry(0.9, 0.93, 40);
    const hudRingMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.6 });
    const hudRing = new THREE.Mesh(hudRingGeo, hudRingMat);
    hudRing.position.set(0, 0, 1.1);
    
    // HUD 조준선 십자 크로스헤어
    const crossMat = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.4 });
    const crossPoints = [];
    crossPoints.push(new THREE.Vector3(-0.6, 0, 0));
    crossPoints.push(new THREE.Vector3(0.6, 0, 0));
    crossPoints.push(new THREE.Vector3(0, -0.6, 0));
    crossPoints.push(new THREE.Vector3(0, 0.6, 0));
    const crossGeo = new THREE.BufferGeometry().setFromPoints(crossPoints);
    const crossLine = new THREE.LineSegments(crossGeo, crossMat);
    hudRing.add(crossLine);

    scene.add(hudRing);
    metrologyDecorations.push(hudRing);

    // 시점 조정: 각막 돔의 입체 지형과 스캐너 평면을 한눈에 살피는 사선 구도
    camera.position.set(0.8, 0.4, 4.4);
    camera.lookAt(0, 0, 0);
    
    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "CORNEAL TOPOGRAPHY";
    if (readoutMode) readoutMode.textContent = "PLACIDO SCANNERS";
    if (readoutIndex) readoutIndex.textContent = "ROC: 7.82 ± 0.02 mm (Astigmatism)";

  } else if (themeId === "biomarker") {
    // 테마 2: 동공 바이오마커 (동공 크기 수축/이완 스캔)
    if (corneaShell) corneaShell.material.opacity = 0.08; // 각막을 극도로 투명화
    
    // 갈색 홍채 질감 텍스처 동적 바인딩 (실감나는 눈알 묘사)
    if (irisMesh) {
      irisMesh.material.map = createIrisTexture("brown");
      irisMesh.material.color.setHex(0xffffff); // 틴트 초기화하여 텍스처 본연의 색상 노출
      irisMesh.material.needsUpdate = true;
    }
    
    // 시점 조정: 동공 수축의 정면 확인을 위한 정면 구도
    camera.position.set(0, 0, 4.6);
    camera.lookAt(0, 0, 0);

    pupilScale = 1.2; // 최대 크기에서 시작
    pupilPulseDirection = -1.0; // 즉시 수축 시작하도록 설정

    // 동공 크기 실시간 선 그래프용 Canvas 동적 마운트
    const readoutPanel = document.querySelector(".threejs-readout-panel");
    let pupilCanvas = document.getElementById("pupil-graph-canvas");
    if (!pupilCanvas && readoutPanel) {
      pupilCanvas = document.createElement("canvas");
      pupilCanvas.id = "pupil-graph-canvas";
      pupilCanvas.height = 65;
      pupilCanvas.style.width = "100%";
      pupilCanvas.style.marginTop = "12px";
      pupilCanvas.style.borderRadius = "6px";
      pupilCanvas.style.background = "#0c111e";
      pupilCanvas.style.border = "1px solid rgba(255,255,255,0.08)";
      
      // 내 해상도 선명하게 보정
      pupilCanvas.width = readoutPanel.clientWidth || 320;
      pupilCanvas.height = 65;
      
      readoutPanel.appendChild(pupilCanvas);
    }
    if (pupilCanvas) pupilCanvas.style.display = "block";

    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "PUPIL LIGHT REFLEX";
    if (readoutMode) readoutMode.textContent = "66 fps NIR SCANNERS";
    if (readoutIndex) readoutIndex.textContent = "LATENCY 240 ± 15 ms";

  } else if (themeId === "myopia-rehab") {
    // 테마 3: 근시 제어 및 시각 재활 (2D 자오면 광선 스케치 루프)
    if (canvas2d) {
      canvas2d.style.display = "block";
      const container = document.getElementById("threejs-visual-panel");
      if (container) {
        const r = window.devicePixelRatio || 1;
        canvas2d.width = container.clientWidth * r;
        canvas2d.height = container.clientHeight * r;
      }
    }
    if (renderer) renderer.domElement.style.display = "none";

    myopiaAngleIndex = 0;
    drawMyopia2DSketch(); // 최초 렌더링

    // 0도 -> 15도 -> 30도 순환 루프 타이머 작동
    myopiaIntervalId = setInterval(() => {
      myopiaAngleIndex = (myopiaAngleIndex + 1) % 3;
      drawMyopia2DSketch();
    }, 1600);

    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "RAY-TRACING SKETCH";
    if (readoutMode) readoutMode.textContent = "DYNAMIC ECCENTRICITY";
    if (readoutIndex) readoutIndex.textContent = "CYCLE 0° -> 15° -> 30°";
  }
}

/**
 * 5. 네비게이션 동기화 및 스크롤 감지 이벤트 바인딩
 */
function initPublicationsNavigationV2() {
  const sidebarSubmenu = document.querySelector(".sidebar-submenu");
  if (!sidebarSubmenu) return;

  const submenuLinks = Array.from(sidebarSubmenu.querySelectorAll(".nav-item"));
  
  // 사이드바 서브메뉴 항목 클릭 시 스무스 스크롤 및 3D 업데이트 연동
  submenuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      
      if (targetSection) {
        // 1. 해당 섹션으로 부드러운 스크롤 이동
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
        
        // 2. 수동 선택 시 3D 렌더링 즉시 변경
        const themeKey = targetId.replace("theme-", "");
        update3DModelByTheme(themeKey);
        
        // 3. 서브메뉴 활성화 클래스 조절
        submenuLinks.forEach(l => l.classList.remove("active"));
        link.classList.add("active");
      }
    });
  });

  // 스크롤 감지용 Intersection Observer 설정 (실시간으로 읽고 있는 섹션에 맞춰 3D Eyeball 상태 자동 전환)
  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -55% 0px", // 화면 중앙 부분에 걸치면 트리거
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        const themeKey = sectionId.replace("theme-", "");
        
        // 3D 뷰 및 리드아웃 수치 업데이트
        update3DModelByTheme(themeKey);

        // 사이드바 메뉴 하이라이팅 연동
        submenuLinks.forEach((link) => {
          const href = link.getAttribute("href");
          if (href === `#${sectionId}`) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, observerOptions);

  // 감시할 섹션들 등록
  const sections = ["theme-metrology", "theme-biomarker", "theme-myopia-rehab", "theme-archive"];
  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
}

/**
 * 테마 2: 실시간 동공 크기 변화 그래프 그리기 (2D Canvas)
 */
function drawPupilSizeGraph() {
  const canvas = document.getElementById("pupil-graph-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  
  ctx.clearRect(0, 0, w, h);
  
  // Background
  ctx.fillStyle = "#0c111e";
  ctx.fillRect(0, 0, w, h);
  
  // 좌측 Y축 눈금 영역을 확보하기 위한 여백 (Margin) 설정
  const marginX = 40;
  const graphW = w - marginX - 15;
  
  // 1. x, y 좌표축 그리기
  ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  // Y축
  ctx.moveTo(marginX, 8);
  ctx.lineTo(marginX, h - 10);
  // X축
  ctx.moveTo(marginX, h - 10);
  ctx.lineTo(w - 10, h - 10);
  ctx.stroke();
  
  // 2. Y축 눈금 및 가이드선 그리기
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "9px monospace";
  ctx.textAlign = "right";
  ctx.textBaseline = "middle";
  
  const yTicks = [7.5, 5.5, 3.5];
  const yCoords = [12, (h - 18)/2 + 6, h - 18]; // 각 수치의 y좌표 매핑
  
  yTicks.forEach((tick, idx) => {
    const y = yCoords[idx];
    ctx.fillText(`${tick.toFixed(1)}`, marginX - 6, y);
    
    // 점선 보조 가이드라인
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.beginPath();
    ctx.moveTo(marginX, y);
    ctx.lineTo(w - 10, y);
    ctx.stroke();
  });
  
  if (pupilHistory.length < 2) return;
  
  // 3. 실시간 동공 수치 곡선 그래프 그리기 (보라색 네온 라인 - 이차 베지어 곡선 보간법 적용)
  ctx.strokeStyle = "#a78bfa";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  
  const step = graphW / 80;
  
  // 첫 번째 시작 포인트 계산 후 이동
  const startY = (h - 18) - ((pupilHistory[0] - 3.5) / (7.5 - 3.5)) * ((h - 18) - 12);
  ctx.moveTo(marginX, startY);
  
  let i;
  for (i = 0; i < pupilHistory.length - 1; i++) {
    const valCur = pupilHistory[i];
    const valNext = pupilHistory[i + 1];
    
    const yCur = (h - 18) - ((valCur - 3.5) / (7.5 - 3.5)) * ((h - 18) - 12);
    const yNext = (h - 18) - ((valNext - 3.5) / (7.5 - 3.5)) * ((h - 18) - 12);
    
    const xCur = marginX + i * step;
    const xNext = marginX + (i + 1) * step;
    
    // 현재 포인트와 다음 포인트의 가로/세로 중간값 계산 (제어점)
    const xc = (xCur + xNext) / 2;
    const yc = (yCur + yNext) / 2;
    
    // 중간 제어점 방향으로 곡선을 그리며 연결
    ctx.quadraticCurveTo(xCur, yCur, xc, yc);
  }
  
  // 마지막 포인트까지 연결 마무리
  const lastIdx = pupilHistory.length - 1;
  const lastY = (h - 18) - ((pupilHistory[lastIdx] - 3.5) / (7.5 - 3.5)) * ((h - 18) - 12);
  ctx.lineTo(marginX + lastIdx * step, lastY);
  
  ctx.stroke();
  
  // 4. 현재 동공 지름 수치 오버레이 출력
  const curVal = pupilHistory[pupilHistory.length - 1];
  ctx.fillStyle = "#a78bfa";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`DIA: ${curVal.toFixed(2)} mm`, marginX + 12, 18);
}

/**
 * 테마 3: 자오면 광선 스케치 그리기 (2D Canvas)
 * D.sketches와 동일하게 0도, 15도, 30도의 편심 광선 추적 단면을 자동 순환 루프로 렌더링
 */
function drawMyopia2DSketch() {
  const canvas = document.getElementById("myopia-2d-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  // 디바이스 픽셀 비율에 따른 보정
  const r = window.devicePixelRatio || 1;
  const w = canvas.width / r;
  const h = canvas.height / r;
  
  ctx.setTransform(r, 0, 0, r, 0, 0);
  ctx.clearRect(0, 0, w, h);
  
  // Background
  ctx.fillStyle = "#090d16";
  ctx.fillRect(0, 0, w, h);
  
  // Draw Optical Axis (광축)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
  ctx.lineWidth = 1;
  ctx.setLineDash([5, 5]);
  ctx.beginPath();
  ctx.moveTo(10, h / 2);
  ctx.lineTo(w - 10, h / 2);
  ctx.stroke();
  ctx.setLineDash([]);
  
  // 안구 기하학 기준점
  const cx = w * 0.45;
  const cy = h / 2;
  
  // 1. Sclera (공막 외곽선)
  ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 95, -Math.PI / 1.6, Math.PI / 1.6);
  ctx.stroke();

  // 2. Cornea (각막 전벽 - 하늘색)
  ctx.strokeStyle = "#38bdf8";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx - 70, cy, 55, -Math.PI / 3, Math.PI / 3, true);
  ctx.stroke();
  
  // 3. Iris (홍채 - 어두운 세로 벽)
  ctx.strokeStyle = "#1e293b";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(cx - 42, cy - 45);
  ctx.lineTo(cx - 42, cy - 15);
  ctx.moveTo(cx - 42, cy + 15);
  ctx.lineTo(cx - 42, cy + 45);
  ctx.stroke();
  
  // 4. Pupil (동공 - 붉은 조리개 가이드)
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cx - 42, cy - 15);
  ctx.lineTo(cx - 42, cy - 8);
  ctx.moveTo(cx - 42, cy + 8);
  ctx.lineTo(cx - 42, cy + 15);
  ctx.stroke();
  
  // 5. Crystalline Lens (수정체 - 초록색 볼록 렌즈)
  ctx.strokeStyle = "#10b981";
  ctx.lineWidth = 2;
  ctx.fillStyle = "rgba(16, 185, 129, 0.12)";
  ctx.beginPath();
  ctx.moveTo(cx - 32, cy - 30);
  ctx.quadraticCurveTo(cx - 18, cy, cx - 32, cy + 30);
  ctx.quadraticCurveTo(cx - 46, cy, cx - 32, cy - 30);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // 6. Retina (망막 곡선 - 스크린 역할)
  ctx.strokeStyle = "#64748b";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx + 8, cy, 95, -Math.PI / 2.2, Math.PI / 2.2);
  ctx.stroke();
  
  // 기본 부위 명칭 라벨링
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "10px Inter, sans-serif";
  ctx.fillText("각막 (Cornea)", cx - 110, cy - 60);
  ctx.fillText("수정체 (Lens)", cx - 20, cy - 38);
  ctx.fillText("망막 (Retina)", cx + 70, cy - 85);
  ctx.fillText("동공", cx - 62, cy - 20);
  
  // 현재 각도 선택
  const angles = [0, 15, 30];
  const angle = angles[myopiaAngleIndex];
  
  // 광선 투사 변수 설정
  let startX = 15;
  let focusX, focusY;
  let retinaHitX, retinaHitY;
  let gapVal, defocusVal;
  
  if (angle === 0) {
    focusX = cx + 65; // 망막보다 앞에 초점
    focusY = cy;
    retinaHitX = cx + 103; // 망막 닿는 곳
    retinaHitY = cy;
    gapVal = -1.25;
    defocusVal = -0.75;
  } else if (angle === 15) {
    focusX = cx + 60;
    focusY = cy + 24;
    retinaHitX = cx + 96;
    retinaHitY = cy + 38;
    gapVal = -1.18;
    defocusVal = -0.71;
  } else { // 30
    focusX = cx + 48;
    focusY = cy + 48;
    retinaHitX = cx + 76;
    retinaHitY = cy + 65;
    gapVal = -0.95;
    defocusVal = -0.58;
  }
  
  // 광선 다발 그리기
  const colors = ["#ef4444", "#10b981", "#a78bfa", "#f59e0b"]; // 맨위 파란색 선을 빨간색으로 변경
  const rayOffsets = [-25, 0, 25];
  
  rayOffsets.forEach((offset, idx) => {
    ctx.strokeStyle = colors[idx % colors.length];
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    
    // 각막 교점 계산 (각막 곡률에 따른 x 편차 추가)
    const corneaX_ray = cx - 70 + (Math.abs(offset) * Math.abs(offset) * 0.005);
    const corneaY_ray = cy + offset;
    
    // 입사각 rad 계산
    const rad = (angle * Math.PI) / 180;
    
    // 각막 외부에서의 입사 광선 (눈 기준 평행하지 않고 각도 angle만큼 기울어진 Oblique Ray)
    const rayStartX = startX;
    const rayStartY = corneaY_ray - (corneaX_ray - startX) * Math.tan(rad);
    
    // 1. 입사광 (각막 외부에서 각막 표면까지)
    ctx.moveTo(rayStartX, rayStartY);
    ctx.lineTo(corneaX_ray, corneaY_ray);
    
    // 2. 각막 내부 굴절 (각막 표면에서 수정체 표면까지)
    const lensX_ray = cx - 32;
    // 입사각에 따른 수정체 도달 높이 계산 (굴절률 반영하여 각도가 약간 꺾임)
    const lensY_ray = cy + (offset * 0.4) - (angle * 0.35);
    ctx.lineTo(lensX_ray, lensY_ray);
    
    // 3. 수정체 굴절 및 수렴 (수정체에서 초점까지)
    ctx.lineTo(focusX, focusY);
    
    // 4. 초점 이후 망막 도달 (초점에서 망막 표면까지)
    ctx.lineTo(retinaHitX, retinaHitY);
    
    ctx.stroke();
  });
  
  // 초점 스팟 그리기 (Orange glowing focus spot)
  ctx.fillStyle = "#f97316";
  ctx.shadowColor = "#f97316";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.arc(focusX, focusY, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0; // 그림자 초기화
  
  // 망막 닿는점 그리기 (White ring)
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(retinaHitX, retinaHitY, 4, 0, Math.PI * 2);
  ctx.stroke();
  
  // 초점과 망막 사이 갭 표시 (Defocus Gap)
  ctx.strokeStyle = "#ef4444";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(focusX, focusY);
  ctx.lineTo(retinaHitX, retinaHitY);
  ctx.stroke();
  
  // 텍스트 정보 오버레이 (둥근 테두리 클리핑 방지를 위해 중앙 정렬 배치)
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 12px Inter, 'Noto Sans KR', sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`입사각 (Field Angle): ${angle}°`, w / 2, h - 38);
  ctx.fillStyle = "#38bdf8";
  ctx.font = "11px Inter, 'Noto Sans KR', sans-serif";
  ctx.fillText(`초점-망막 갭 (Shell Gap): ${gapVal.toFixed(2)} mm (${defocusVal.toFixed(2)} D)`, w / 2, h - 20);
  ctx.textAlign = "left"; // 다른 그리기 작업 영향 방지용 리셋
  
  ctx.fillStyle = "#ef4444";
  ctx.font = "bold 9px Inter, 'Noto Sans KR', sans-serif";
  ctx.fillText("Myopic Defocus (망막 전방 초점 형성)", focusX - 75, focusY - 12);
}
