// ===== 로딩 성능 최적화 시스템 =====

class LoadingOptimizer {
    constructor() {
        this.loadStartTime = performance.now();
        this.criticalResources = new Set();
        this.lazyImages = new Set();
        this.preloadedResources = new Map();
        this.connectionSpeed = this.detectConnectionSpeed();
        
        this.init();
    }

    init() {
        // 크리티컬 리소스 우선 로딩
        this.preloadCriticalResources();
        
        // 이미지 지연 로딩 설정
        this.setupLazyLoading();
        
        // 폰트 최적화
        this.optimizeFonts();
        
        // 코드 스플리팅
        this.setupCodeSplitting();
        
        // 로딩 진행률 표시
        this.showLoadingProgress();
        
        // 성능 메트릭 수집
        this.collectPerformanceMetrics();
    }

    detectConnectionSpeed() {
        if (!navigator.connection) return 'unknown';
        
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;
        
        const speedMap = {
            'slow-2g': 1,
            '2g': 2,
            '3g': 3,
            '4g': 4
        };
        
        return {
            type: effectiveType,
            speed: speedMap[effectiveType] || 3,
            saveData: connection.saveData || false
        };
    }

    preloadCriticalResources() {
        const criticalResources = [
            // 폰트 파일 우선 로딩
            'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap',
            // 히어로 섹션 배경 이미지
            'assets/images/hero-bg.jpg',
            // 주요 아이콘들
            'assets/images/logo.svg'
        ];

        criticalResources.forEach(resource => {
            this.preloadResource(resource);
        });
    }

    preloadResource(url, type = 'auto') {
        if (this.preloadedResources.has(url)) return;

        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        
        // 리소스 타입 자동 감지
        if (type === 'auto') {
            if (url.includes('.css') || url.includes('fonts.googleapis.com')) {
                link.as = 'style';
                link.onload = () => {
                    // CSS를 실제로 적용
                    const styleLink = document.createElement('link');
                    styleLink.rel = 'stylesheet';
                    styleLink.href = url;
                    document.head.appendChild(styleLink);
                };
            } else if (url.match(/\.(jpg|jpeg|png|webp|svg)$/i)) {
                link.as = 'image';
            } else if (url.match(/\.(woff|woff2|ttf|otf)$/i)) {
                link.as = 'font';
                link.crossOrigin = 'anonymous';
            }
        } else {
            link.as = type;
        }

        document.head.appendChild(link);
        this.preloadedResources.set(url, true);
    }

    setupLazyLoading() {
        // Intersection Observer를 사용한 이미지 지연 로딩
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // data-src 속성을 가진 이미지들을 관찰
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
            this.lazyImages.add(img);
        });

        // 배경 이미지 지연 로딩
        document.querySelectorAll('[data-bg-src]').forEach(element => {
            imageObserver.observe(element);
        });
    }

    loadImage(img) {
        // 로딩 스피너 표시
        img.classList.add('loading');
        
        const actualSrc = img.dataset.src || img.dataset.bgSrc;
        
        // WebP 지원 확인 및 최적 포맷 선택
        this.getOptimalImageFormat(actualSrc).then(optimizedSrc => {
            if (img.dataset.bgSrc) {
                // 배경 이미지 로딩
                const tempImg = new Image();
                tempImg.onload = () => {
                    img.style.backgroundImage = `url('${optimizedSrc}')`;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                tempImg.src = optimizedSrc;
            } else {
                // 일반 이미지 로딩
                img.onload = () => {
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                };
                img.onerror = () => {
                    img.classList.remove('loading');
                    img.classList.add('error');
                    // 폴백 이미지 설정
                    img.src = 'assets/images/placeholder.svg';
                };
                img.src = optimizedSrc;
            }
        });
    }

    async getOptimalImageFormat(src) {
        // WebP 지원 확인
        const supportsWebP = await this.checkWebPSupport();
        
        // 연결 속도에 따른 이미지 품질 조정
        if (this.connectionSpeed.saveData || this.connectionSpeed.speed <= 2) {
            // 저속 연결: 압축된 이미지 사용
            if (supportsWebP) {
                return src.replace(/\.(jpg|jpeg|png)$/i, '.webp').replace(/\.webp\.webp$/, '.webp');
            }
            return src.replace(/\.(jpg|jpeg|png)$/i, '_compressed.$1');
        }
        
        // 고속 연결: 고품질 이미지
        if (supportsWebP) {
            return src.replace(/\.(jpg|jpeg|png)$/i, '.webp').replace(/\.webp\.webp$/, '.webp');
        }
        
        return src;
    }

    checkWebPSupport() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==';
        });
    }

    optimizeFonts() {
        // 폰트 디스플레이 최적화
        const fontDisplayCSS = `
            @font-face {
                font-family: 'Noto Sans KR';
                font-display: swap;
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = fontDisplayCSS;
        document.head.appendChild(style);

        // 시스템 폰트 폴백
        document.documentElement.style.setProperty(
            '--font-system-fallback',
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        );
    }

    setupCodeSplitting() {
        // 필요에 따라 스크립트 동적 로딩
        const loadScriptOnDemand = (src, condition) => {
            if (condition()) {
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                document.head.appendChild(script);
            }
        };

        // 3D 기능이 필요한 경우에만 Three.js 로딩
        const needs3D = document.querySelector('.data-cube, .research-cylinder, .chart-bar-3d');
        if (needs3D) {
            loadScriptOnDemand('js/3d-visualization.js', () => true);
        }

        // 접근성 기능이 필요한 경우에만 로딩
        const needsA11y = document.querySelector('[data-a11y="true"]') || 
                         window.location.search.includes('a11y=true');
        if (needsA11y) {
            loadScriptOnDemand('js/accessibility.js', () => true);
        }
    }

    showLoadingProgress() {
        const loadingOverlay = this.createLoadingOverlay();
        document.body.appendChild(loadingOverlay);

        let loadedResources = 0;
        const totalResources = this.estimateTotalResources();

        // 리소스 로딩 진행률 추적
        const updateProgress = () => {
            loadedResources++;
            const progress = Math.min((loadedResources / totalResources) * 100, 95);
            
            const progressBar = loadingOverlay.querySelector('.loading-progress-fill');
            const progressText = loadingOverlay.querySelector('.loading-percentage');
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${Math.round(progress)}%`;

            if (progress >= 95) {
                this.hideLoadingOverlay(loadingOverlay);
            }
        };

        // 다양한 로딩 이벤트 리스너
        document.addEventListener('DOMContentLoaded', updateProgress);
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hideLoadingOverlay(loadingOverlay);
            }, 500);
        });

        // 이미지 로딩 완료 추적
        this.lazyImages.forEach(img => {
            img.addEventListener('load', updateProgress);
        });

        // 스타일시트 로딩 완료 추적
        document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            link.addEventListener('load', updateProgress);
        });
    }

    createLoadingOverlay() {
        const overlay = document.createElement('div');
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-container">
                <div class="loading-logo">
                    <div class="loading-spinner"></div>
                    <h2>시각재활 연구소</h2>
                </div>
                <div class="loading-progress">
                    <div class="loading-progress-bar">
                        <div class="loading-progress-fill"></div>
                    </div>
                    <div class="loading-text">
                        <span class="loading-percentage">0%</span>
                        <span class="loading-message">로딩 중...</span>
                    </div>
                </div>
                <div class="loading-tips">
                    <p>💡 팁: 더 나은 경험을 위해 최신 브라우저를 사용해주세요</p>
                </div>
            </div>
        `;

        // 로딩 오버레이 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #2563eb, #059669);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                transition: opacity 0.5s ease-out;
            }
            
            .loading-container {
                text-align: center;
                color: white;
                max-width: 400px;
                padding: 2rem;
            }
            
            .loading-logo {
                margin-bottom: 2rem;
            }
            
            .loading-spinner {
                width: 60px;
                height: 60px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-top: 3px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 1rem;
            }
            
            .loading-logo h2 {
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0;
            }
            
            .loading-progress {
                margin-bottom: 1.5rem;
            }
            
            .loading-progress-bar {
                width: 100%;
                height: 6px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                overflow: hidden;
                margin-bottom: 0.5rem;
            }
            
            .loading-progress-fill {
                height: 100%;
                background: white;
                border-radius: 3px;
                transition: width 0.3s ease;
                width: 0%;
            }
            
            .loading-text {
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 0.9rem;
            }
            
            .loading-tips {
                font-size: 0.8rem;
                opacity: 0.8;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        return overlay;
    }

    hideLoadingOverlay(overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
        }, 500);
    }

    estimateTotalResources() {
        // DOM에서 리소스 수 추정
        const images = document.querySelectorAll('img, [data-src], [data-bg-src]').length;
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]').length;
        const scripts = document.querySelectorAll('script[src]').length;
        
        return Math.max(images + stylesheets + scripts + 5, 10); // 최소 10개
    }

    collectPerformanceMetrics() {
        // Core Web Vitals 수집
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadTime = performance.now() - this.loadStartTime;
                
                // Performance Observer로 상세 메트릭 수집
                if ('PerformanceObserver' in window) {
                    this.setupPerformanceObserver();
                }

                // 성능 데이터 로깅 (개발 모드에서만)
                if (window.location.search.includes('debug=true')) {
                    console.log('🚀 Loading Performance Metrics:', {
                        loadTime: `${loadTime.toFixed(2)}ms`,
                        connectionSpeed: this.connectionSpeed,
                        resourcesLoaded: this.preloadedResources.size,
                        lazyImagesCount: this.lazyImages.size
                    });
                }
            }, 1000);
        });
    }

    setupPerformanceObserver() {
        // Largest Contentful Paint (LCP)
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                
                if (window.location.search.includes('debug=true')) {
                    console.log('LCP:', lastEntry.startTime.toFixed(2), 'ms');
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            console.warn('LCP measurement not supported');
        }

        // Cumulative Layout Shift (CLS)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                
                if (window.location.search.includes('debug=true')) {
                    console.log('CLS:', clsValue.toFixed(4));
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            console.warn('CLS measurement not supported');
        }
    }

    // 공개 메서드: 추가 리소스 지연 로딩
    loadAdditionalResources() {
        // 사용자 인터랙션 후 추가 리소스 로딩
        const additionalResources = [
            'js/charts.js',
            'js/animations-extended.js'
        ];

        additionalResources.forEach(resource => {
            this.preloadResource(resource);
        });
    }

    // 공개 메서드: 성능 모드 전환
    setPerformanceMode(mode) {
        switch (mode) {
            case 'high':
                this.loadAdditionalResources();
                break;
            case 'low':
                // 불필요한 리소스 로딩 중단
                this.lazyImages.forEach(img => {
                    img.loading = 'lazy';
                });
                break;
        }
    }
}

// 페이지 로딩 시작과 동시에 초기화
window.loadingOptimizer = new LoadingOptimizer();

// 사용자 인터랙션 감지 후 추가 최적화
let userInteracted = false;
const handleFirstInteraction = () => {
    if (!userInteracted) {
        userInteracted = true;
        window.loadingOptimizer.loadAdditionalResources();
        
        // 이벤트 리스너 제거
        document.removeEventListener('click', handleFirstInteraction);
        document.removeEventListener('scroll', handleFirstInteraction);
        document.removeEventListener('keydown', handleFirstInteraction);
    }
};

document.addEventListener('click', handleFirstInteraction, { passive: true });
document.addEventListener('scroll', handleFirstInteraction, { passive: true });
document.addEventListener('keydown', handleFirstInteraction, { passive: true });