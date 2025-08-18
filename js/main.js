// Main JavaScript for Visual Rehabilitation Website

// 성능 최적화 유틸리티
class PerformanceManager {
    constructor() {
        this.isLowEndDevice = this.detectLowEndDevice();
        this.init();
    }

    detectLowEndDevice() {
        const navigator = window.navigator;
        const hardwareConcurrency = navigator.hardwareConcurrency || 4;
        const deviceMemory = navigator.deviceMemory || 4;
        const connection = navigator.connection?.effectiveType || '4g';
        
        // 저사양 디바이스 감지
        return hardwareConcurrency < 4 || deviceMemory < 4 || connection === '2g' || connection === 'slow-2g';
    }

    init() {
        this.optimizeAnimations();
        this.manageWillChange();
        this.setupPassiveListeners();
    }

    optimizeAnimations() {
        if (this.isLowEndDevice) {
            // 저사양 디바이스에서는 애니메이션 단순화
            document.body.classList.add('low-performance-mode');
            
            const style = document.createElement('style');
            style.textContent = `
                .low-performance-mode * {
                    animation-duration: 0.2s !important;
                    transition-duration: 0.2s !important;
                }
                .low-performance-mode .floating,
                .low-performance-mode .floating-delayed {
                    animation: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    manageWillChange() {
        // 애니메이션 시작 시 will-change 적용
        const animatedElements = document.querySelectorAll(
            '.btn, .benefit-card, .audience-card, .research-card'
        );

        animatedElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.willChange = 'transform';
            });

            element.addEventListener('mouseleave', () => {
                // 호버 애니메이션 완료 후 will-change 제거
                setTimeout(() => {
                    element.style.willChange = 'auto';
                }, 300);
            });

            element.addEventListener('animationend', () => {
                element.style.willChange = 'auto';
            });

            element.addEventListener('transitionend', () => {
                element.style.willChange = 'auto';
            });
        });
    }

    setupPassiveListeners() {
        // 스크롤 이벤트를 passive로 설정하여 성능 향상
        const options = { passive: true };
        
        window.addEventListener('scroll', this.debounce(this.handleScroll.bind(this), 16), options);
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250), options);
    }

    handleScroll() {
        // 스크롤 기반 성능 최적화
        const scrollY = window.pageYOffset;
        
        // 뷰포트에서 멀리 떨어진 요소들의 애니메이션 일시정지
        this.pauseOffscreenAnimations(scrollY);
    }

    handleResize() {
        // 리사이즈 시 성능 최적화
        this.optimizeForViewport();
    }

    pauseOffscreenAnimations(scrollY) {
        const viewportHeight = window.innerHeight;
        const buffer = viewportHeight * 0.5; // 50% 버퍼

        document.querySelectorAll('.floating, .floating-delayed').forEach(element => {
            const rect = element.getBoundingClientRect();
            const elementTop = rect.top + scrollY;
            
            if (elementTop < scrollY - buffer || elementTop > scrollY + viewportHeight + buffer) {
                element.style.animationPlayState = 'paused';
            } else {
                element.style.animationPlayState = 'running';
            }
        });
    }

    optimizeForViewport() {
        const isMobile = window.innerWidth < 768;
        
        if (isMobile && !document.body.classList.contains('mobile-optimized')) {
            document.body.classList.add('mobile-optimized');
            
            // 모바일에서 복잡한 애니메이션 비활성화
            const complexAnimations = document.querySelectorAll('.card-3d, .parallax-layer');
            complexAnimations.forEach(element => {
                element.style.transform = 'none';
                element.style.animation = 'none';
            });

            // 모바일 터치 최적화 활성화
            this.setupMobileTouchOptimizations();
        }
    }

    setupMobileTouchOptimizations() {
        // 터치 디바이스 감지
        if (!('ontouchstart' in window)) return;

        // 터치 인터랙션을 위한 요소들
        const touchElements = document.querySelectorAll(
            '.benefit-card, .audience-card, .research-card, .team-member, .partnership-card'
        );

        touchElements.forEach(element => {
            this.addTouchInteractions(element);
        });

        // 스와이프 제스처 추가
        this.setupSwipeGestures();
    }

    addTouchInteractions(element) {
        let startX, startY, startTime;
        let isLongPress = false;
        let longPressTimer;

        // 터치 시작
        element.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            startTime = Date.now();
            isLongPress = false;

            // will-change 적용
            element.style.willChange = 'transform';
            element.classList.add('touching');

            // 롱프레스 감지 (500ms)
            longPressTimer = setTimeout(() => {
                isLongPress = true;
                element.classList.add('long-press');
                // 햅틱 피드백 (지원하는 디바이스에서)
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 500);

            // 즉시 시각적 피드백
            element.style.transform = 'scale(0.98)';
            element.style.transition = 'transform 0.1s ease-out';
        }, { passive: true });

        // 터치 이동
        element.addEventListener('touchmove', (e) => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
                longPressTimer = null;
            }

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            // 이동 거리가 10px 이상이면 터치 상태 해제
            if (distance > 10) {
                element.classList.remove('touching');
                element.style.transform = 'scale(1)';
            }
        }, { passive: true });

        // 터치 종료
        element.addEventListener('touchend', (e) => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }

            const touchDuration = Date.now() - startTime;
            
            // 터치 피드백 제거
            element.classList.remove('touching', 'long-press');
            element.style.transform = 'scale(1)';
            element.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';

            // will-change 정리
            setTimeout(() => {
                element.style.willChange = 'auto';
            }, 300);

            // 탭 제스처 처리
            if (!isLongPress && touchDuration < 300) {
                this.handleTap(element, e);
            }
        }, { passive: true });

        // 터치 취소
        element.addEventListener('touchcancel', () => {
            if (longPressTimer) {
                clearTimeout(longPressTimer);
            }
            element.classList.remove('touching', 'long-press');
            element.style.transform = 'scale(1)';
            setTimeout(() => {
                element.style.willChange = 'auto';
            }, 300);
        }, { passive: true });
    }

    handleTap(element, event) {
        // 카드 탭 시 추가 정보 표시 또는 액션 실행
        element.classList.add('tapped');
        
        // 시각적 피드백
        element.style.transform = 'scale(1.02)';
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.classList.remove('tapped');
        }, 200);

        // 카드 내의 링크나 버튼 클릭 처리
        const link = element.querySelector('a, .btn');
        if (link && !event.defaultPrevented) {
            link.click();
        }
    }

    setupSwipeGestures() {
        let startX, startY;
        let isScrolling = false;

        document.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
            isScrolling = false;
        }, { passive: true });

        document.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const touch = e.touches[0];
            const deltaX = touch.clientX - startX;
            const deltaY = touch.clientY - startY;

            // 수직 스크롤 감지
            if (Math.abs(deltaY) > Math.abs(deltaX)) {
                isScrolling = true;
            }

            // 수평 스와이프 감지 (네비게이션용)
            if (!isScrolling && Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    // 오른쪽 스와이프
                    this.handleSwipeRight();
                } else {
                    // 왼쪽 스와이프
                    this.handleSwipeLeft();
                }
                startX = null;
                startY = null;
            }
        }, { passive: true });
    }

    handleSwipeRight() {
        // 이전 섹션으로 이동 또는 메뉴 열기
        const mobileMenu = document.querySelector('.nav-menu');
        if (mobileMenu && !mobileMenu.classList.contains('active')) {
            mobileMenu.classList.add('active');
        }
    }

    handleSwipeLeft() {
        // 다음 섹션으로 이동 또는 메뉴 닫기
        const mobileMenu = document.querySelector('.nav-menu');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
        }
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 성능 매니저 초기화
    window.performanceManager = new PerformanceManager();
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide header on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.benefit-card, .audience-card, .hero-content, .hero-visual');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form validation (for contact forms)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (field.value && !emailRegex.test(field.value)) {
                    isValid = false;
                    field.classList.add('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('필수 필드를 모두 올바르게 입력해주세요.');
            }
        });
    });
    
    // Statistics counter animation
    const counterElements = document.querySelectorAll('.stat-number');
    const counters = Array.from(counterElements).map(el => ({
        element: el,
        target: parseInt(el.textContent.replace(/[^\d]/g, '')),
        current: 0,
        suffix: el.textContent.replace(/[\d]/g, '')
    }));
    
    function animateCounters() {
        counters.forEach(counter => {
            if (counter.current < counter.target) {
                counter.current += Math.ceil(counter.target / 100);
                if (counter.current > counter.target) {
                    counter.current = counter.target;
                }
                counter.element.textContent = counter.current + counter.suffix;
            }
        });
        
        if (counters.some(c => c.current < c.target)) {
            requestAnimationFrame(animateCounters);
        }
    }
    
    // Start counter animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateCounters, 500);
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
});

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization
const debouncedScroll = debounce(function() {
    // Handle scroll events here if needed
}, 10);

window.addEventListener('scroll', debouncedScroll);