//===== 3D 시각화 및 성능 최적화 시스템 =====

class PerformanceOptimizer {
  constructor() {
    this.performanceMode = "auto"; // auto, high, low
    this.deviceCapabilities = this.detectDeviceCapabilities();
    this.animationFrameId = null;
    this.intersection3DObserver = null;
    this.init();
  }

  // 디바이스 성능 감지
  detectDeviceCapabilities() {
    const capabilities = {
      isMobile:
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent,
        ),
      hasTouch: "ontouchstart" in window,
      pixelRatio: window.devicePixelRatio || 1,
      cores: navigator.hardwareConcurrency || 4,
      memory: navigator.deviceMemory || 4,
      connection: navigator.connection?.effectiveType || "4g",
    };

    // 성능 점수 계산 (0-100)
    let score = 50; // 기본 점수

    if (capabilities.cores >= 8) score += 20;
    else if (capabilities.cores >= 4) score += 10;

    if (capabilities.memory >= 8) score += 15;
    else if (capabilities.memory >= 4) score += 10;

    if (capabilities.connection === "4g") score += 15;
    else if (capabilities.connection === "3g") score -= 10;

    if (capabilities.isMobile) score -= 20;
    if (capabilities.pixelRatio > 2) score -= 10;

    capabilities.performanceScore = Math.max(0, Math.min(100, score));
    return capabilities;
  }

  // 초기화
  init() {
    this.setPerformanceMode();
    this.optimize3DElements();
    this.setupIntersectionObserver();
    this.optimizeAnimations();
    this.addPerformanceMonitoring();
    this.setupTouchOptimizations();

    console.log(
      `🚀 Performance Optimizer initialized - Mode: ${this.performanceMode}, Score: ${this.deviceCapabilities.performanceScore}`,
    );
  }

  // 성능 모드 설정
  setPerformanceMode() {
    const score = this.deviceCapabilities.performanceScore;

    if (score >= 70) {
      this.performanceMode = "high";
    } else if (score >= 40) {
      this.performanceMode = "medium";
    } else {
      this.performanceMode = "low";
    }

    document.body.setAttribute("data-performance-mode", this.performanceMode);
  }

  // 3D 요소 최적화
  optimize3DElements() {
    const cubes = document.querySelectorAll(".data-cube");
    const cylinders = document.querySelectorAll(".research-cylinder");
    const bars = document.querySelectorAll(".chart-bar-3d");

    // 기본 will-change 속성 적용
    [...cubes, ...cylinders, ...bars].forEach((element) => {
      this.applyPerformanceOptimizations(element);
    });

    // 성능 모드별 3D 최적화
    if (this.performanceMode === "low") {
      this.disable3DEffects();
    } else if (this.performanceMode === "medium") {
      this.reduce3DComplexity();
    }
  }

  // 성능 최적화 속성 적용
  applyPerformanceOptimizations(element) {
    const style = element.style;

    // GPU 가속 활성화
    style.willChange = "transform";
    style.backfaceVisibility = "hidden";
    style.perspective = "1000px";
    style.transformStyle = "preserve-3d";

    // 하드웨어 가속 강제
    if (!style.transform.includes("translateZ")) {
      style.transform += " translateZ(0)";
    }

    // 레이어 생성 최적화
    element.classList.add("gpu-optimized");
  }

  // 저성능 모드: 3D 효과 비활성화
  disable3DEffects() {
    const style = document.createElement("style");
    style.textContent = `
            .data-cube { animation: none !important; transform: none !important; }
            .research-cylinder { transform: rotateX(0deg) rotateY(0deg) !important; }
            .chart-bar-3d { transform: rotateY(0deg) scale(1) !important; }
            .cube-face { display: none; }
            .cube-face.front { display: block; }
        `;
    document.head.appendChild(style);
  }

  // 중간 성능 모드: 3D 복잡도 감소
  reduce3DComplexity() {
    const cubes = document.querySelectorAll(".data-cube");
    cubes.forEach((cube) => {
      // 애니메이션 속도 감소
      cube.style.animationDuration = "30s"; // 기본 20s에서 증가

      // 일부 면 숨기기 (성능 향상)
      const faces = cube.querySelectorAll(".cube-face");
      faces.forEach((face, index) => {
        if (index > 3) face.style.display = "none"; // 뒷면과 윗면, 아랫면 숨김
      });
    });
  }

  // Intersection Observer 설정 (뷰포트 내에서만 애니메이션)
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    this.intersection3DObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const element = entry.target;

        if (entry.isIntersecting) {
          this.start3DAnimation(element);
        } else {
          this.pause3DAnimation(element);
        }
      });
    }, options);

    // 3D 요소들 관찰 시작
    document
      .querySelectorAll(".data-cube, .research-cylinder, .chart-bar-3d")
      .forEach((element) => {
        this.intersection3DObserver.observe(element);
      });
  }

  // 3D 애니메이션 시작
  start3DAnimation(element) {
    element.style.animationPlayState = "running";
    element.classList.add("animate-active");

    // 추가 최적화: RequestAnimationFrame 사용
    if (element.classList.contains("data-cube")) {
      this.startCubeRotation(element);
    }
  }

  // 3D 애니메이션 일시정지
  pause3DAnimation(element) {
    element.style.animationPlayState = "paused";
    element.classList.remove("animate-active");

    if (element.dataset.animationFrame) {
      cancelAnimationFrame(parseInt(element.dataset.animationFrame));
    }
  }

  // 큐브 회전 최적화 (RequestAnimationFrame 사용)
  startCubeRotation(cube) {
    let startTime = null;
    const duration = 20000; // 20초

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = (elapsed % duration) / duration;

      const rotationX = progress * 360;
      const rotationY = progress * 360;

      cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;

      const frameId = requestAnimationFrame(animate);
      cube.dataset.animationFrame = frameId;
    };

    if (cube.classList.contains("animate-active")) {
      requestAnimationFrame(animate);
    }
  }

  // 애니메이션 최적화
  optimizeAnimations() {
    // 기존 CSS 애니메이션에 will-change 적용
    const animatedElements = document.querySelectorAll(
      '[class*="animate"], [style*="animation"]',
    );

    animatedElements.forEach((element) => {
      element.style.willChange = "transform, opacity";

      // 애니메이션 완료 후 will-change 제거 (메모리 최적화)
      element.addEventListener("animationend", () => {
        element.style.willChange = "auto";
      });
    });

    // 스크롤 애니메이션 최적화
    this.optimizeScrollAnimations();
  }

  // 스크롤 애니메이션 최적화
  optimizeScrollAnimations() {
    let ticking = false;

    const optimizedScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollAnimations();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScrollHandler, {
      passive: true,
    });
  }

  // 스크롤 애니메이션 업데이트
  updateScrollAnimations() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;

    // 패럴랙스 효과 최적화
    const parallaxElements = document.querySelectorAll(".parallax-element");
    parallaxElements.forEach((element) => {
      element.style.transform = `translate3d(0, ${rate}px, 0)`;
    });
  }

  // 터치 최적화 설정
  setupTouchOptimizations() {
    if (!this.deviceCapabilities.hasTouch) return;

    // 터치 이벤트 최적화
    const touchElements = document.querySelectorAll(
      ".data-cube, .research-cylinder, .chart-bar-3d",
    );

    touchElements.forEach((element) => {
      this.addTouchInteractions(element);
    });
  }

  // 터치 인터랙션 추가
  addTouchInteractions(element) {
    let startX,
      startY,
      currentX = 0,
      currentY = 0;
    let isDragging = false;

    // 터치 시작
    element.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        isDragging = true;

        element.style.transition = "none";
        element.style.willChange = "transform";
      },
      { passive: true },
    );

    // 터치 이동
    element.addEventListener(
      "touchmove",
      (e) => {
        if (!isDragging) return;

        const touch = e.touches[0];
        currentX = touch.clientX - startX;
        currentY = touch.clientY - startY;

        // 회전 적용 (모바일 친화적)
        const rotateY = currentX * 0.5;
        const rotateX = -currentY * 0.5;

        element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
      },
      { passive: true },
    );

    // 터치 종료
    element.addEventListener(
      "touchend",
      () => {
        isDragging = false;
        element.style.transition = "transform 0.5s ease-out";
        element.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0)";

        // will-change 정리
        setTimeout(() => {
          element.style.willChange = "auto";
        }, 500);
      },
      { passive: true },
    );
  }

  // 성능 모니터링
  addPerformanceMonitoring() {
    let frameCount = 0;
    let lastTime = performance.now();
    let fpsArray = [];

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount;
        fpsArray.push(fps);

        // 최근 5초 평균 FPS 계산
        if (fpsArray.length > 5) fpsArray.shift();
        const avgFPS = fpsArray.reduce((a, b) => a + b) / fpsArray.length;

        // FPS가 30 이하면 성능 모드 하향 조정
        if (avgFPS < 30 && this.performanceMode !== "low") {
          this.degradePerformance();
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }

  // 성능 저하 시 자동 최적화
  degradePerformance() {
    console.warn("🐌 Low FPS detected, switching to performance mode");

    if (this.performanceMode === "high") {
      this.performanceMode = "medium";
      this.reduce3DComplexity();
    } else if (this.performanceMode === "medium") {
      this.performanceMode = "low";
      this.disable3DEffects();
    }

    document.body.setAttribute("data-performance-mode", this.performanceMode);
  }

  // 수동 성능 모드 전환
  setManualPerformanceMode(mode) {
    this.performanceMode = mode;
    document.body.setAttribute("data-performance-mode", mode);

    switch (mode) {
      case "high":
        this.optimize3DElements();
        break;
      case "medium":
        this.reduce3DComplexity();
        break;
      case "low":
        this.disable3DEffects();
        break;
    }
  }

  // 리소스 정리
  destroy() {
    if (this.intersection3DObserver) {
      this.intersection3DObserver.disconnect();
    }

    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

// GPU 최적화 CSS 추가
const performanceCSS = `
    .gpu-optimized {
        will-change: transform;
        backface-visibility: hidden;
        transform: translateZ(0);
    }

    /* 성능 모드별 스타일 */
    [data-performance-mode="low"] .data-cube {
        animation: none !important;
        transform: none !important;
    }
    
    [data-performance-mode="low"] .research-cylinder {
        transform: rotateX(0deg) rotateY(0deg) !important;
    }
    
    [data-performance-mode="low"] .chart-bar-3d {
        transform: rotateY(0deg) scale(1) !important;
    }

    [data-performance-mode="medium"] .data-cube {
        animation-duration: 30s !important;
    }

    /* 터치 디바이스 최적화 */
    @media (hover: none) and (pointer: coarse) {
        .data-cube, .research-cylinder, .chart-bar-3d {
            touch-action: manipulation;
            user-select: none;
        }
    }

    /* 고대비 모드 감지 */
    @media (prefers-contrast: high) {
        .data-cube, .research-cylinder, .chart-bar-3d {
            border: 2px solid currentColor;
        }
    }

    /* 움직임 감소 모드 */
    @media (prefers-reduced-motion: reduce) {
        .data-cube, .research-cylinder, .chart-bar-3d {
            animation: none !important;
            transition: none !important;
        }
    }
`;

// CSS 스타일 추가
const styleSheet = document.createElement("style");
styleSheet.textContent = performanceCSS;
document.head.appendChild(styleSheet);

// 전역 인스턴스 생성
window.performanceOptimizer = new PerformanceOptimizer();

// 성능 제어 UI 추가 (개발/테스트용)
if (window.location.search.includes("debug=true")) {
  const controlPanel = document.createElement("div");
  controlPanel.style.cssText = `
        position: fixed;
        top: 10px;
        right: 10px;
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 10000;
        font-size: 12px;
    `;
  controlPanel.innerHTML = `
        <div>Performance Mode: <span id="current-mode">${window.performanceOptimizer.performanceMode}</span></div>
        <div>Device Score: ${window.performanceOptimizer.deviceCapabilities.performanceScore}</div>
        <button onclick="window.performanceOptimizer.setManualPerformanceMode('high')">High</button>
        <button onclick="window.performanceOptimizer.setManualPerformanceMode('medium')">Medium</button>
        <button onclick="window.performanceOptimizer.setManualPerformanceMode('low')">Low</button>
    `;
  document.body.appendChild(controlPanel);
}
