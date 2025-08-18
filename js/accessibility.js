// ===== ACCESSIBILITY ENHANCEMENTS FOR VISUAL REHABILITATION RESEARCH WEBSITE =====

// 접근성 관리 클래스
class AccessibilityManager {
    constructor() {
        this.settings = {
            highContrast: false,
            reducedMotion: false,
            fontSize: 'normal',
            screenReader: false,
            focusVisible: true,
            keyboardNavigation: true,
            audioDescriptions: false,
            colorBlindSupport: false
        };
        
        this.init();
    }

    // 접근성 시스템 초기화
    init() {
        this.loadUserPreferences();
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupFocusManagement();
        this.setupSkipLinks();
        this.createAccessibilityPanel();
        this.setupColorBlindSupport();
        this.setupMotionControls();
        this.setupAudioDescriptions();
        this.announcePageLoad();
        
        console.log('Accessibility system initialized');
    }

    // 사용자 설정 불러오기
    loadUserPreferences() {
        const saved = localStorage.getItem('accessibility-settings');
        if (saved) {
            this.settings = { ...this.settings, ...JSON.parse(saved) };
            this.applySettings();
        }

        // 시스템 설정 감지
        this.detectSystemPreferences();
    }

    // 시스템 접근성 설정 감지
    detectSystemPreferences() {
        // 고대비 모드 감지
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.settings.highContrast = true;
        }

        // 움직임 감소 설정 감지
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.settings.reducedMotion = true;
        }

        // 색상 테마 감지
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark-theme');
        }

        this.applySettings();
    }

    // 키보드 네비게이션 설정
    setupKeyboardNavigation() {
        let currentFocusIndex = -1;
        const focusableElements = this.getFocusableElements();

        // Tab 키 네비게이션 개선
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e, focusableElements);
            }
            
            // ESC 키로 모달/메뉴 닫기
            if (e.key === 'Escape') {
                this.closeAllModals();
            }

            // 숫자 키로 빠른 네비게이션
            if (e.altKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                this.navigateToSection(parseInt(e.key) - 1);
            }

            // 접근성 패널 토글 (Ctrl + Alt + A)
            if (e.ctrlKey && e.altKey && e.key === 'a') {
                e.preventDefault();
                this.toggleAccessibilityPanel();
            }
        });

        // 포커스 표시 개선
        document.addEventListener('focusin', (e) => {
            if (this.settings.focusVisible) {
                e.target.classList.add('keyboard-focused');
            }
        });

        document.addEventListener('focusout', (e) => {
            e.target.classList.remove('keyboard-focused');
        });
    }

    // 포커스 가능한 요소들 가져오기
    getFocusableElements() {
        const selector = 'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])';
        return Array.from(document.querySelectorAll(selector))
            .filter(element => !element.disabled && element.offsetParent !== null);
    }

    // Tab 네비게이션 처리
    handleTabNavigation(e, focusableElements) {
        const currentIndex = focusableElements.indexOf(document.activeElement);
        
        if (e.shiftKey) {
            // Shift + Tab (역방향)
            const prevIndex = currentIndex === 0 ? focusableElements.length - 1 : currentIndex - 1;
            focusableElements[prevIndex].focus();
        } else {
            // Tab (순방향)
            const nextIndex = currentIndex === focusableElements.length - 1 ? 0 : currentIndex + 1;
            focusableElements[nextIndex].focus();
        }
        
        e.preventDefault();
    }

    // 섹션별 빠른 네비게이션
    navigateToSection(index) {
        const sections = document.querySelectorAll('section[id]');
        if (sections[index]) {
            sections[index].scrollIntoView({ behavior: 'smooth' });
            
            // 해당 섹션의 첫 번째 포커스 가능한 요소로 이동
            const firstFocusable = sections[index].querySelector('a, button, input, select, textarea');
            if (firstFocusable) {
                firstFocusable.focus();
            }
            
            this.announceNavigation(`${sections[index].getAttribute('aria-label') || '섹션'} ${index + 1}로 이동했습니다`);
        }
    }

    // 스크린 리더 지원 설정
    setupScreenReaderSupport() {
        // ARIA 라벨 동적 업데이트
        this.updateAriaLabels();
        
        // 라이브 리전 설정
        this.createLiveRegion();
        
        // 스크린 리더용 추가 정보 제공
        this.addScreenReaderContext();
    }

    // ARIA 라벨 업데이트
    updateAriaLabels() {
        // 네비게이션 메뉴
        const nav = document.querySelector('.navbar');
        if (nav) {
            nav.setAttribute('aria-label', '주요 네비게이션');
        }

        // 섹션들
        const sections = {
            'home': '홈 섹션',
            'research': '연구 개요 섹션',
            'technology': '기술 사양 섹션',
            'results': '연구 결과 섹션',
            'team': '연구팀 소개 섹션',
            'partnership': '파트너십 기회 섹션',
            'contact': '연락처 섹션'
        };

        Object.entries(sections).forEach(([id, label]) => {
            const section = document.getElementById(id);
            if (section) {
                section.setAttribute('aria-label', label);
            }
        });

        // 버튼들
        document.querySelectorAll('.btn').forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent.trim());
            }
        });

        // 이미지들
        document.querySelectorAll('img').forEach(img => {
            if (!img.getAttribute('alt')) {
                img.setAttribute('alt', '시각재활 연구 관련 이미지');
            }
        });
    }

    // 라이브 리전 생성
    createLiveRegion() {
        const liveRegion = document.createElement('div');
        liveRegion.id = 'aria-live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        document.body.appendChild(liveRegion);
    }

    // 라이브 리전에 메시지 전달
    announceMessage(message) {
        const liveRegion = document.getElementById('aria-live-region');
        if (liveRegion) {
            liveRegion.textContent = message;
            
            // 중복 메시지 방지를 위해 잠시 후 초기화
            setTimeout(() => {
                liveRegion.textContent = '';
            }, 1000);
        }
    }

    // 네비게이션 알림
    announceNavigation(message) {
        this.announceMessage(message);
    }

    // 페이지 로드 알림
    announcePageLoad() {
        setTimeout(() => {
            this.announceMessage('시각재활 연구센터 웹사이트가 로드되었습니다. Alt + 1부터 7까지 숫자키로 각 섹션으로 빠르게 이동할 수 있습니다.');
        }, 1000);
    }

    // 건너뛰기 링크 설정
    setupSkipLinks() {
        const skipLinksContainer = document.createElement('div');
        skipLinksContainer.className = 'skip-links';
        skipLinksContainer.innerHTML = `
            <a href="#main-content" class="skip-link">메인 콘텐츠로 건너뛰기</a>
            <a href="#nav-menu" class="skip-link">네비게이션으로 건너뛰기</a>
            <a href="#contact" class="skip-link">연락처로 건너뛰기</a>
        `;
        
        document.body.insertBefore(skipLinksContainer, document.body.firstChild);

        // 메인 콘텐츠 영역 표시
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.id = 'main-content';
            hero.setAttribute('role', 'main');
        }
    }

    // 포커스 관리
    setupFocusManagement() {
        // 모달 포커스 트랩
        document.addEventListener('keydown', (e) => {
            const modal = document.querySelector('.modal.active');
            if (modal && e.key === 'Tab') {
                this.trapFocus(e, modal);
            }
        });

        // 메뉴 포커스 관리
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                const isActive = navMenu.classList.contains('active');
                if (isActive) {
                    // 메뉴가 열릴 때 첫 번째 링크에 포커스
                    const firstLink = navMenu.querySelector('a');
                    if (firstLink) {
                        setTimeout(() => firstLink.focus(), 100);
                    }
                }
            });
        }
    }

    // 포커스 트랩 (모달용)
    trapFocus(e, container) {
        const focusableElements = container.querySelectorAll(
            'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }

    // 접근성 제어 패널 생성
    createAccessibilityPanel() {
        const panel = document.createElement('div');
        panel.id = 'accessibility-panel';
        panel.className = 'accessibility-panel';
        panel.setAttribute('role', 'dialog');
        panel.setAttribute('aria-label', '접근성 설정 패널');
        panel.innerHTML = `
            <div class="panel-header">
                <h3>접근성 설정</h3>
                <button class="panel-close" aria-label="접근성 패널 닫기">&times;</button>
            </div>
            <div class="panel-content">
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="high-contrast-toggle"> 고대비 모드
                    </label>
                </div>
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="reduced-motion-toggle"> 애니메이션 감소
                    </label>
                </div>
                <div class="setting-group">
                    <label for="font-size-select">글자 크기:</label>
                    <select id="font-size-select">
                        <option value="small">작게</option>
                        <option value="normal" selected>보통</option>
                        <option value="large">크게</option>
                        <option value="extra-large">매우 크게</option>
                    </select>
                </div>
                <div class="setting-group">
                    <label>
                        <input type="checkbox" id="color-blind-toggle"> 색맹 지원 모드
                    </label>
                </div>
                <div class="setting-group">
                    <button id="reset-settings" class="btn-secondary">설정 초기화</button>
                </div>
            </div>
        `;

        document.body.appendChild(panel);
        this.setupPanelEvents();
        this.updatePanelSettings();
    }

    // 패널 이벤트 설정
    setupPanelEvents() {
        const panel = document.getElementById('accessibility-panel');
        
        // 패널 닫기
        panel.querySelector('.panel-close').addEventListener('click', () => {
            this.toggleAccessibilityPanel();
        });

        // 고대비 모드
        document.getElementById('high-contrast-toggle').addEventListener('change', (e) => {
            this.settings.highContrast = e.target.checked;
            this.applyHighContrast();
            this.saveSettings();
        });

        // 애니메이션 감소
        document.getElementById('reduced-motion-toggle').addEventListener('change', (e) => {
            this.settings.reducedMotion = e.target.checked;
            this.applyReducedMotion();
            this.saveSettings();
        });

        // 글자 크기
        document.getElementById('font-size-select').addEventListener('change', (e) => {
            this.settings.fontSize = e.target.value;
            this.applyFontSize();
            this.saveSettings();
        });

        // 색맹 지원
        document.getElementById('color-blind-toggle').addEventListener('change', (e) => {
            this.settings.colorBlindSupport = e.target.checked;
            this.applyColorBlindSupport();
            this.saveSettings();
        });

        // 설정 초기화
        document.getElementById('reset-settings').addEventListener('click', () => {
            this.resetSettings();
        });
    }

    // 접근성 패널 토글
    toggleAccessibilityPanel() {
        const panel = document.getElementById('accessibility-panel');
        const isVisible = panel.classList.contains('active');
        
        if (isVisible) {
            panel.classList.remove('active');
            panel.setAttribute('aria-hidden', 'true');
        } else {
            panel.classList.add('active');
            panel.setAttribute('aria-hidden', 'false');
            panel.querySelector('.panel-close').focus();
        }
    }

    // 패널 설정 업데이트
    updatePanelSettings() {
        document.getElementById('high-contrast-toggle').checked = this.settings.highContrast;
        document.getElementById('reduced-motion-toggle').checked = this.settings.reducedMotion;
        document.getElementById('font-size-select').value = this.settings.fontSize;
        document.getElementById('color-blind-toggle').checked = this.settings.colorBlindSupport;
    }

    // 설정 적용
    applySettings() {
        this.applyHighContrast();
        this.applyReducedMotion();
        this.applyFontSize();
        this.applyColorBlindSupport();
    }

    // 고대비 모드 적용
    applyHighContrast() {
        document.body.classList.toggle('high-contrast', this.settings.highContrast);
        
        if (this.settings.highContrast) {
            this.announceMessage('고대비 모드가 활성화되었습니다');
        }
    }

    // 애니메이션 감소 적용
    applyReducedMotion() {
        document.body.classList.toggle('reduced-motion', this.settings.reducedMotion);
        
        if (this.settings.reducedMotion) {
            // 모든 애니메이션 중지
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
            
            this.announceMessage('애니메이션이 감소되었습니다');
        }
    }

    // 글자 크기 적용
    applyFontSize() {
        document.body.classList.remove('font-small', 'font-normal', 'font-large', 'font-extra-large');
        document.body.classList.add(`font-${this.settings.fontSize}`);
        
        this.announceMessage(`글자 크기가 ${this.getFontSizeLabel()}로 변경되었습니다`);
    }

    // 글자 크기 라벨 반환
    getFontSizeLabel() {
        const labels = {
            'small': '작게',
            'normal': '보통',
            'large': '크게',
            'extra-large': '매우 크게'
        };
        return labels[this.settings.fontSize] || '보통';
    }

    // 색맹 지원 적용
    applyColorBlindSupport() {
        document.body.classList.toggle('color-blind-support', this.settings.colorBlindSupport);
        
        if (this.settings.colorBlindSupport) {
            this.announceMessage('색맹 지원 모드가 활성화되었습니다');
        }
    }

    // 색맹 지원 설정
    setupColorBlindSupport() {
        // 색상 정보를 텍스트로도 제공
        const colorElements = document.querySelectorAll('.stat-number, .result-percentage');
        colorElements.forEach(element => {
            const value = element.textContent.trim();
            if (value.includes('%')) {
                const percentage = parseInt(value);
                let description = '';
                if (percentage >= 90) description = '매우 높음';
                else if (percentage >= 80) description = '높음';
                else if (percentage >= 70) description = '보통';
                else description = '낮음';
                
                element.setAttribute('aria-label', `${value} (${description})`);
            }
        });
    }

    // 움직임 제어 설정
    setupMotionControls() {
        // 시차 스크롤 비활성화 옵션
        if (this.settings.reducedMotion) {
            const parallaxElements = document.querySelectorAll('.parallax-layer');
            parallaxElements.forEach(element => {
                element.style.transform = 'none';
            });
        }
    }

    // 오디오 설명 설정
    setupAudioDescriptions() {
        // 중요한 시각적 요소에 대한 오디오 설명 제공
        if (this.settings.audioDescriptions) {
            this.createAudioDescriptions();
        }
    }

    // 오디오 설명 생성
    createAudioDescriptions() {
        // Web Speech API를 사용한 텍스트 음성 변환
        if ('speechSynthesis' in window) {
            const charts = document.querySelectorAll('.result-chart');
            charts.forEach(chart => {
                const button = document.createElement('button');
                button.textContent = '차트 설명 듣기';
                button.className = 'audio-description-btn';
                button.addEventListener('click', () => {
                    const description = this.getChartDescription(chart);
                    this.speak(description);
                });
                chart.parentElement.appendChild(button);
            });
        }
    }

    // 차트 설명 생성
    getChartDescription(chart) {
        const parentCard = chart.closest('.result-card');
        const title = parentCard.querySelector('h3').textContent;
        const percentage = parentCard.querySelector('.result-percentage').textContent;
        const description = parentCard.querySelector('.result-description').textContent;
        
        return `${title}: ${percentage}. ${description}`;
    }

    // 텍스트 음성 변환
    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
    }

    // 모든 모달 닫기
    closeAllModals() {
        const modals = document.querySelectorAll('.modal.active, .accessibility-panel.active');
        modals.forEach(modal => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        });

        // 모바일 메뉴 닫기
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    }

    // 설정 저장
    saveSettings() {
        localStorage.setItem('accessibility-settings', JSON.stringify(this.settings));
    }

    // 설정 초기화
    resetSettings() {
        this.settings = {
            highContrast: false,
            reducedMotion: false,
            fontSize: 'normal',
            screenReader: false,
            focusVisible: true,
            keyboardNavigation: true,
            audioDescriptions: false,
            colorBlindSupport: false
        };
        
        this.applySettings();
        this.updatePanelSettings();
        this.saveSettings();
        
        this.announceMessage('접근성 설정이 초기화되었습니다');
    }

    // 스크린 리더용 추가 컨텍스트 제공
    addScreenReaderContext() {
        // 통계 수치에 컨텍스트 추가
        document.querySelectorAll('.stat-number').forEach(stat => {
            const label = stat.nextElementSibling;
            if (label) {
                stat.setAttribute('aria-describedby', label.id || '');
            }
        });

        // 폼 필드에 도움말 추가
        document.querySelectorAll('input, select, textarea').forEach(field => {
            const label = document.querySelector(`label[for="${field.id}"]`);
            if (label && !field.getAttribute('aria-describedby')) {
                const helpText = field.getAttribute('placeholder') || field.getAttribute('title');
                if (helpText) {
                    field.setAttribute('aria-description', helpText);
                }
            }
        });
    }
}

// 접근성 패널 CSS 추가
const accessibilityCSS = `
    .skip-links {
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        z-index: 10000;
    }

    .skip-link {
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 4px;
        font-weight: 500;
        transition: top 0.3s ease;
    }

    .skip-link:focus {
        top: 6px;
    }

    .accessibility-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        border: 2px solid var(--primary-color);
        border-radius: 8px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        width: 90%;
        max-height: 80vh;
        overflow-y: auto;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
    }

    .accessibility-panel.active {
        opacity: 1;
        visibility: visible;
    }

    .panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 1px solid #e5e7eb;
    }

    .panel-header h3 {
        margin: 0;
        color: var(--primary-color);
    }

    .panel-close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: var(--neutral-medium);
        padding: 4px;
        border-radius: 4px;
    }

    .panel-close:hover {
        background: var(--neutral-light);
        color: var(--primary-color);
    }

    .setting-group {
        margin-bottom: 16px;
    }

    .setting-group label {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 500;
        cursor: pointer;
    }

    .setting-group input[type="checkbox"] {
        width: 18px;
        height: 18px;
        accent-color: var(--primary-color);
    }

    .setting-group select {
        width: 100%;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 4px;
        background: white;
        margin-top: 4px;
    }

    .btn-secondary {
        background: var(--secondary-color);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
    }

    .keyboard-focused {
        outline: 3px solid var(--primary-color) !important;
        outline-offset: 2px !important;
    }

    /* 고대비 모드 스타일 */
    .high-contrast {
        filter: contrast(150%);
    }

    .high-contrast .btn-primary {
        background: #000 !important;
        color: #fff !important;
        border: 2px solid #fff !important;
    }

    .high-contrast .btn-secondary {
        background: #fff !important;
        color: #000 !important;
        border: 2px solid #000 !important;
    }

    /* 글자 크기 스타일 */
    .font-small { font-size: 14px; }
    .font-normal { font-size: 16px; }
    .font-large { font-size: 18px; }
    .font-extra-large { font-size: 20px; }

    /* 색맹 지원 스타일 */
    .color-blind-support .stat-number::after,
    .color-blind-support .result-percentage::after {
        content: attr(aria-label);
        display: block;
        font-size: 0.8em;
        color: var(--neutral-medium);
        font-weight: normal;
    }

    .audio-description-btn {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 12px;
        cursor: pointer;
        margin-top: 8px;
    }

    @media (max-width: 768px) {
        .accessibility-panel {
            width: 95%;
            max-height: 90vh;
        }
    }
`;

// CSS 스타일 추가
const styleSheet = document.createElement('style');
styleSheet.textContent = accessibilityCSS;
document.head.appendChild(styleSheet);

// 접근성 관리자 인스턴스 생성
window.accessibilityManager = new AccessibilityManager();

// 접근성 토글 버튼 추가 (헤더의 언어 토글 옆에)
document.addEventListener('DOMContentLoaded', function() {
    const langToggle = document.querySelector('.lang-toggle');
    if (langToggle) {
        const accessibilityToggle = document.createElement('button');
        accessibilityToggle.className = 'nav-link accessibility-toggle';
        accessibilityToggle.innerHTML = '<i class="fas fa-universal-access"></i>';
        accessibilityToggle.setAttribute('aria-label', '접근성 설정 열기');
        accessibilityToggle.setAttribute('title', '접근성 설정 (Ctrl+Alt+A)');
        
        accessibilityToggle.addEventListener('click', (e) => {
            e.preventDefault();
            window.accessibilityManager.toggleAccessibilityPanel();
        });
        
        langToggle.parentElement.appendChild(accessibilityToggle);
    }
});