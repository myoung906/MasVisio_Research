/**
 * 시각재활 연구센터 메인 JavaScript
 * 모바일 네비게이션, 폼 처리, 애니메이션 등
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // 모바일 네비게이션 토글
    // ===========================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // 접근성: aria 속성 업데이트
            const isExpanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', isExpanded);
        });
        
        // 메뉴 외부 클릭 시 닫기
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // ===========================
    // 헤더 스크롤 효과
    // ===========================
    const header = document.querySelector('.header');
    
    function updateHeader() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    
    // ===========================
    // 부드러운 스크롤 네비게이션
    // ===========================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // 모바일 메뉴 닫기
                if (navMenu.classList.contains('active')) {
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // ===========================
    // 문의 폼 처리
    // ===========================
    const inquiryForm = document.getElementById('inquiry-form');
    
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 폼 데이터 수집
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // 기본 유효성 검사
            if (!validateForm(data)) {
                return;
            }
            
            // 폼 제출 상태 표시
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            // 실제 환경에서는 서버로 데이터 전송
            // 현재는 시뮬레이션
            setTimeout(() => {
                showNotification('문의가 성공적으로 전송되었습니다!', 'success');
                inquiryForm.reset();
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // ===========================
    // 폼 유효성 검사
    // ===========================
    function validateForm(data) {
        const errors = [];
        
        // 이름 검사
        if (!data.name || data.name.trim().length < 2) {
            errors.push('성명을 올바르게 입력해주세요.');
        }
        
        // 이메일 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            errors.push('올바른 이메일 주소를 입력해주세요.');
        }
        
        // 문의 유형 검사
        if (!data.inquiry_type) {
            errors.push('문의 유형을 선택해주세요.');
        }
        
        // 메시지 검사
        if (!data.message || data.message.trim().length < 10) {
            errors.push('문의 내용을 10자 이상 입력해주세요.');
        }
        
        // 오류가 있으면 표시
        if (errors.length > 0) {
            showNotification(errors.join('\n'), 'error');
            return false;
        }
        
        return true;
    }
    
    // ===========================
    // 알림 표시 함수
    // ===========================
    function showNotification(message, type = 'info') {
        // 기존 알림 제거
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // 새 알림 생성
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message.replace(/\n/g, '<br>')}</span>
                <button class="notification-close" aria-label="알림 닫기">&times;</button>
            </div>
        `;
        
        // 스타일 추가
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${type === 'success' ? 'background-color: #48bb78; color: white;' : ''}
            ${type === 'error' ? 'background-color: #f56565; color: white;' : ''}
            ${type === 'info' ? 'background-color: #4299e1; color: white;' : ''}
        `;
        
        // DOM에 추가
        document.body.appendChild(notification);
        
        // 애니메이션으로 표시
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // 닫기 버튼 이벤트
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            hideNotification(notification);
        });
        
        // 자동 숨김 (5초 후)
        setTimeout(() => {
            hideNotification(notification);
        }, 5000);
    }
    
    function hideNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
    
    // ===========================
    // 스크롤 애니메이션 (Intersection Observer)
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 애니메이션 대상 요소들
    const animateElements = document.querySelectorAll(`
        .highlight-item,
        .trend-item,
        .partnership-type,
        .about-text,
        .about-image
    `);
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // ===========================
    // 히어로 이미지 교체 (이미지 생성 후 활성화)
    // ===========================
    function rotateHeroImages() {
        const heroImage = document.getElementById('hero-image');
        if (!heroImage) return;
        
        const images = [
            'assets/images/hero/research-lab-1.jpg',
            'assets/images/hero/research-lab-2.jpg',
            'assets/images/hero/research-lab-3.jpg'
        ];
        
        let currentIndex = 0;
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            // 이미지가 실제로 존재할 때 활성화
            // heroImage.style.backgroundImage = `url('${images[currentIndex]}')`;
        }, 5000);
    }
    
    // rotateHeroImages(); // 이미지 준비 후 활성화
    
    // ===========================
    // 키보드 네비게이션 향상
    // ===========================
    
    // Escape 키로 모바일 메뉴 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Tab 키 네비게이션 트랩 (모바일 메뉴)
    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    
    navMenu.addEventListener('keydown', function(e) {
        if (e.key === 'Tab' && navMenu.classList.contains('active')) {
            const focusableContent = navMenu.querySelectorAll(focusableElements);
            const firstFocusable = focusableContent[0];
            const lastFocusable = focusableContent[focusableContent.length - 1];
            
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    e.preventDefault();
                }
            }
        }
    });
    
    // ===========================
    // 통계 카운터 애니메이션
    // ===========================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            const suffix = counter.textContent.replace(/\d/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + suffix;
                }
            };
            
            // 요소가 뷰포트에 들어올 때 애니메이션 시작
            const counterObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }
    
    animateCounters();
    
    // ===========================
    // 페이지 로드 완료 후 초기화
    // ===========================
    console.log('시각재활 연구센터 웹사이트가 로드되었습니다.');
    
    // 접근성 향상을 위한 포커스 관리
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.className = 'sr-only skip-link';
    skipLink.textContent = '본문으로 바로가기';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1000;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
});

// ===========================
// CSS 애니메이션 클래스 추가
// ===========================
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skip-link:focus {
        position: absolute !important;
        top: 6px !important;
    }
    
    .notification-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 12px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;

document.head.appendChild(style);