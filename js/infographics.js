// MasVisio 시각재활 연구결과 인포그래픽 JavaScript
// 접근성과 사용자 경험을 고려한 인터랙티브 요소

document.addEventListener('DOMContentLoaded', function() {
    // 페이지 로드 시 애니메이션 초기화
    initializeAnimations();
    
    // 차트 애니메이션 트리거
    initializeChartAnimations();
    
    // 접근성 향상을 위한 키보드 네비게이션
    initializeKeyboardNavigation();
    
    // 카운트업 애니메이션
    initializeCounterAnimations();
    
    // 반응형 차트 조정
    initializeResponsiveCharts();
});

// 페이지 로드 애니메이션
function initializeAnimations() {
    const cards = document.querySelectorAll('.metric-card, .investment-card, .tech-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// 차트 바 애니메이션
function initializeChartAnimations() {
    const chartBars = document.querySelectorAll('.bar-fill');
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const targetWidth = bar.style.width || getComputedStyle(bar).width;
                
                // 바 애니메이션 시작
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    bar.style.width = targetWidth;
                }, 200);
            }
        });
    }, {
        threshold: 0.5
    });
    
    chartBars.forEach(bar => {
        chartObserver.observe(bar);
    });
}

// 카운트업 애니메이션
function initializeCounterAnimations() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                animateCounter(entry.target);
                entry.target.classList.add('animated');
            }
        });
    }, {
        threshold: 0.7
    });
    
    metricNumbers.forEach(number => {
        counterObserver.observe(number);
    });
}

// 숫자 카운트업 애니메이션 함수
function animateCounter(element) {
    const text = element.textContent.trim();
    const isPercentage = text.includes('%');
    const isDollar = text.includes('$');
    const isCount = text.includes('개');
    
    let targetValue = 0;
    let suffix = '';
    
    if (isPercentage) {
        targetValue = parseFloat(text.replace('%', ''));
        suffix = '%';
    } else if (isDollar) {
        targetValue = parseFloat(text.replace(/[억$]/g, ''));
        suffix = '억$';
    } else if (isCount) {
        targetValue = parseInt(text.replace('개', ''));
        suffix = '개';
    } else {
        targetValue = parseFloat(text.replace(/[^\d.]/g, ''));
        suffix = text.replace(/[\d.]/g, '');
    }
    
    const duration = 2000; // 2초
    const steps = 60;
    const stepValue = targetValue / steps;
    const stepDuration = duration / steps;
    
    let currentValue = 0;
    let currentStep = 0;
    
    const timer = setInterval(() => {
        currentStep++;
        currentValue = Math.min(targetValue, stepValue * currentStep);
        
        let displayValue;
        if (isPercentage || isDollar) {
            displayValue = currentValue.toFixed(1);
        } else if (isCount) {
            displayValue = Math.round(currentValue);
        } else {
            displayValue = Math.round(currentValue);
        }
        
        element.textContent = displayValue + suffix;
        
        if (currentStep >= steps) {
            clearInterval(timer);
            element.textContent = text; // 원래 값으로 복원
        }
    }, stepDuration);
}

// 키보드 네비게이션 지원
function initializeKeyboardNavigation() {
    const focusableElements = document.querySelectorAll('.metric-card, .investment-card, .tech-card');
    
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                element.click();
            }
        });
        
        // 포커스 스타일 향상
        element.addEventListener('focus', function() {
            this.style.outline = '3px solid var(--accent-green)';
            this.style.outlineOffset = '3px';
            this.style.transform = 'translateY(-5px)';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
            this.style.transform = '';
        });
    });
}

// 반응형 차트 조정
function initializeResponsiveCharts() {
    function adjustChartSize() {
        const charts = document.querySelectorAll('.diagnosis-chart, .comparison-section');
        const isMobile = window.innerWidth < 768;
        
        charts.forEach(chart => {
            if (isMobile) {
                chart.style.padding = '30px 20px';
                chart.style.fontSize = '0.9rem';
            } else {
                chart.style.padding = '40px';
                chart.style.fontSize = '1rem';
            }
        });
        
        // 비교 다이어그램 모바일 조정
        const comparisonContainer = document.querySelector('.comparison-container');
        if (comparisonContainer && isMobile) {
            comparisonContainer.style.gridTemplateColumns = '1fr';
            
            const vsDivider = document.querySelector('.vs-divider');
            if (vsDivider) {
                vsDivider.style.transform = 'rotate(90deg)';
                vsDivider.style.margin = '20px 0';
            }
        }
    }
    
    // 초기 실행 및 리사이즈 이벤트 리스너
    adjustChartSize();
    window.addEventListener('resize', adjustChartSize);
}

// 데이터 시각화 향상 함수
function enhanceDataVisualization() {
    // 호버 효과로 추가 정보 표시
    const metricCards = document.querySelectorAll('.metric-card');
    
    metricCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const description = this.querySelector('.metric-description');
            if (description) {
                description.style.opacity = '1';
                description.style.transform = 'translateY(0)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const description = this.querySelector('.metric-description');
            if (description) {
                description.style.opacity = '0.7';
                description.style.transform = 'translateY(5px)';
            }
        });
    });
}

// 접근성 향상을 위한 ARIA 라벨 동적 업데이트
function updateAriaLabels() {
    const progressBars = document.querySelectorAll('.bar-fill');
    
    progressBars.forEach(bar => {
        const percentage = bar.getAttribute('aria-valuenow');
        const parentLabel = bar.closest('.chart-bar').querySelector('.bar-label span:first-child').textContent;
        
        bar.setAttribute('aria-label', `${parentLabel} 진단 성능: ${percentage}%`);
    });
}

// 인쇄 최적화
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        // 인쇄 시 애니메이션 비활성화
        document.body.style.animation = 'none';
        document.body.style.transition = 'none';
        
        const animatedElements = document.querySelectorAll('*');
        animatedElements.forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
        });
    });
    
    window.addEventListener('afterprint', function() {
        // 인쇄 후 애니메이션 복원
        location.reload(); // 간단한 방법으로 애니메이션 복원
    });
}

// 성능 최적화를 위한 Intersection Observer 정리
function cleanupObservers() {
    window.addEventListener('beforeunload', function() {
        // 메모리 누수 방지를 위한 Observer 정리
        if (typeof observer !== 'undefined') observer.disconnect();
        if (typeof chartObserver !== 'undefined') chartObserver.disconnect();
        if (typeof counterObserver !== 'undefined') counterObserver.disconnect();
    });
}

// 다크 모드 지원 (시각재활 특성 고려)
function initializeDarkModeSupport() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    function adjustForDarkMode(e) {
        if (e.matches) {
            document.documentElement.style.setProperty('--primary-blue', '#4a90e2');
            document.documentElement.style.setProperty('--text-dark', '#e2e8f0');
            document.documentElement.style.setProperty('--text-light', '#a0aec0');
            document.documentElement.style.setProperty('--white', '#1a202c');
            document.documentElement.style.setProperty('--light-blue', '#2d3748');
        }
    }
    
    prefersDark.addListener(adjustForDarkMode);
    adjustForDarkMode(prefersDark);
}

// 모든 초기화 함수 실행
document.addEventListener('DOMContentLoaded', function() {
    enhanceDataVisualization();
    updateAriaLabels();
    optimizeForPrint();
    cleanupObservers();
    initializeDarkModeSupport();
});

// 전역 함수로 내보내기 (필요시)
window.MasVisioInfographics = {
    initializeAnimations,
    initializeChartAnimations,
    animateCounter,
    enhanceDataVisualization
};