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

// 전역 변수 (3D Eyeball 관련)
let scene, camera, renderer;
let eyeballMesh, corneaShell, rayLines = [];
let animationFrameId;
let currentTheme = "metrology";
let pupilPulseDirection = -1;
let pupilScale = 1.0;

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

  // 연구성과(Publications) 루트 링크 탐색
  const topLevelLinks = Array.from(nav.querySelectorAll(":scope > .nav-item"));
  const rootLink = topLevelLinks.find((link) => {
    const href = link.getAttribute("href") || "";
    return href.includes("v2.html") || link.classList.contains("active");
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

  // 1. Eyeball Sphere (전체 공막/안구 형태 - 와이어프레임)
  const eyeballGeo = new THREE.SphereGeometry(1.6, 32, 32);
  const eyeballMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.15,
    shininess: 80,
    wireframe: true
  });
  eyeballMesh = new THREE.Mesh(eyeballGeo, eyeballMat);
  scene.add(eyeballMesh);

  // 2. Cornea Curvature Shell (각막 곡률 전면부 셸)
  const corneaGeo = new THREE.SphereGeometry(1.5, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2.5);
  const corneaMat = new THREE.MeshPhongMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true,
    flatShading: true
  });
  corneaShell = new THREE.Mesh(corneaGeo, corneaMat);
  corneaShell.rotation.x = Math.PI / 2; // 정면을 보게 회전
  scene.add(corneaShell);

  // 3. Lights
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
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
  });

  // 애니메이션 루프 실행
  animate3DEyeball();
}

/**
 * 3D 안구 애니메이션 루프
 */
function animate3DEyeball() {
  animationFrameId = requestAnimationFrame(animate3DEyeball);

  // 공통 회전
  if (eyeballMesh) eyeballMesh.rotation.y += 0.003;
  if (corneaShell) corneaShell.rotation.y += 0.003;

  // 테마별 실시간 특화 애니메이션 제어
  if (currentTheme === "biomarker") {
    // 동공 크기 수축/이완 맥박 애니메이션 (PLR 모사)
    pupilScale += pupilPulseDirection * 0.01;
    if (pupilScale <= 0.45) {
      pupilPulseDirection = 1; // 팽창으로 전환
    } else if (pupilScale >= 1.0) {
      pupilPulseDirection = -0.008; // 수축으로 전환 (수축 속도가 더 빠름 - 생리적 반응 모사)
    }
    if (corneaShell) {
      // 셸의 z 스케일을 수축하여 동공 조리개 움직임 시각화
      corneaShell.scale.set(pupilScale, pupilScale, 1.0);
    }
  } else if (currentTheme === "metrology") {
    // 원복 및 각막 정밀 Topography 표면 고유 맥동 애니메이션
    pupilScale = 1.0;
    if (corneaShell) {
      corneaShell.scale.set(1.0, 1.0, 1.0 + Math.sin(Date.now() * 0.003) * 0.04);
    }
  } else if (currentTheme === "myopia-rehab") {
    // 근시 제어 광선 다이내믹 웨이브 애니메이션
    pupilScale = 0.85;
    if (corneaShell) {
      corneaShell.scale.set(0.85, 0.85, 1.0);
    }
    
    // 광선들의 투사 깊이 동적 요동
    rayLines.forEach((line, index) => {
      const scaleOffset = Math.sin(Date.now() * 0.005 + index * 0.8) * 0.1;
      line.scale.set(1, 1, 1.0 + scaleOffset);
    });
  }

  renderer.render(scene, camera);
}

/**
 * 4. 테마 선택에 따른 3D 안구 상태 업데이트
 */
function update3DModelByTheme(themeId) {
  currentTheme = themeId;
  const readoutStatus = document.getElementById("readout-status-val");
  const readoutMode = document.getElementById("readout-mode-val");
  const readoutIndex = document.getElementById("readout-index-val");

  // 1. 기존 광선 객체들 제거
  rayLines.forEach(line => scene.remove(line));
  rayLines = [];

  if (themeId === "metrology") {
    // 테마 1: 각막 토포그래피 강조
    if (eyeballMesh && corneaShell) {
      eyeballMesh.material.color.setHex(0x38bdf8);
      eyeballMesh.material.opacity = 0.15;
      corneaShell.material.color.setHex(0x38bdf8);
      corneaShell.material.opacity = 0.6;
      corneaShell.material.wireframe = false;
    }
    camera.position.set(0, 0, 5.2);
    
    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "CURVATURE MAPPING";
    if (readoutMode) readoutMode.textContent = "IR TOPOGRAPHY";
    if (readoutIndex) readoutIndex.textContent = "ROC 7.82 ± 0.02 mm";

  } else if (themeId === "biomarker") {
    // 테마 2: 동공 바이오마커 (홍채 및 동공 조리개 수축 형태)
    if (eyeballMesh && corneaShell) {
      eyeballMesh.material.color.setHex(0xa78bfa); // 퍼플 테마
      eyeballMesh.material.opacity = 0.1;
      corneaShell.material.color.setHex(0xa78bfa);
      corneaShell.material.opacity = 0.7;
    }
    camera.position.set(0, 0, 4.8);
    pupilScale = 1.0;
    pupilPulseDirection = -0.015; // 즉각 수축 시작

    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "PUPIL LIGHT REFLEX";
    if (readoutMode) readoutMode.textContent = "66 fps NIR SCANNERS";
    if (readoutIndex) readoutIndex.textContent = "LATENCY 240 ± 15 ms";

  } else if (themeId === "myopia-rehab") {
    // 테마 3: 근시 제어 및 광선 빔 추적 시각화
    if (eyeballMesh && corneaShell) {
      eyeballMesh.material.color.setHex(0x10b981); // 그린/시안 테마
      eyeballMesh.material.opacity = 0.05;
      corneaShell.material.color.setHex(0x10b981);
      corneaShell.material.opacity = 0.45;
    }
    camera.position.set(0, 0, 5.0);

    // 광선 라인 렌더링 (동축 실린더/라인 빔 여러개 생성)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.8 });
    
    // 주변부 광선 4개 추가 (망막 앞에 모이도록 초점 이탈 제어 시각화)
    const rayAngles = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];
    rayAngles.forEach(angle => {
      const points = [];
      // 광원 원거리(z=2.5)에서 동공을 지나 망막 전방(z=-1.2)으로 입사하는 선
      const startX = Math.cos(angle) * 1.2;
      const startY = Math.sin(angle) * 1.2;
      points.push(new THREE.Vector3(startX, startY, 2.5)); // 입사 시작점
      points.push(new THREE.Vector3(startX * 0.3, startY * 0.3, 0.4)); // 각막 굴절 지점
      points.push(new THREE.Vector3(0, 0, -1.1)); // 망막 전방 초점 지점 (Myopic Defocus)
      points.push(new THREE.Vector3(-startX * 0.2, -startY * 0.2, -1.6)); // 망막 도달점

      const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
      const line = new THREE.Line(lineGeo, lineMat);
      scene.add(line);
      rayLines.push(line);
    });

    // 리드아웃 텍스트 업데이트
    if (readoutStatus) readoutStatus.textContent = "MYOPIC DEFOCUS ON";
    if (readoutMode) readoutMode.textContent = "RAY-TRACING SOLVER";
    if (readoutIndex) readoutIndex.textContent = "FS' DEFOCUS -0.75 D";
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
