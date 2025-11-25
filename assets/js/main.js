        // 모바일 메뉴 토글 함수
        function toggleMobileMenu() {
            console.log('🔄 toggleMobileMenu 함수 호출됨');
            
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            const mobileMenu = document.getElementById('mobile-nav-menu');
            
            console.log('📱 mobileToggle 요소:', mobileToggle);
            console.log('📋 mobileMenu 요소:', mobileMenu);
            
            if (mobileToggle && mobileMenu) {
                console.log('🎯 요소들이 모두 존재함. 클래스 토글 시작...');
                
                mobileToggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
                
                console.log('✅ 토글 버튼 active 상태:', mobileToggle.classList.contains('active'));
                console.log('✅ 메뉴 active 상태:', mobileMenu.classList.contains('active'));
                
                // 배경 스크롤 방지
                if (mobileMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                    console.log('🔒 스크롤 차단 활성화');
                } else {
                    document.body.style.overflow = 'auto';
                    console.log('🔓 스크롤 차단 해제');
                }
            } else {
                console.error('❌ 모바일 메뉴 요소를 찾을 수 없습니다');
                console.log('Missing toggle:', !mobileToggle);
                console.log('Missing menu:', !mobileMenu);
            }
        }
        
        // DOM이 완전히 로드된 후 실행
        document.addEventListener('DOMContentLoaded', function() {
            console.log('DOM 로드 완료'); // 디버그용
            
            // 모바일 메뉴 토글 버튼에 이벤트 리스너 추가 (onclick 외에 추가 보험)
            const mobileToggleBtn = document.querySelector('.mobile-menu-toggle');
            if (mobileToggleBtn) {
                mobileToggleBtn.addEventListener('click', toggleMobileMenu);
                console.log('모바일 메뉴 토글 버튼에 이벤트 리스너 추가됨');
            }
        });
        
        // ESC 키로 메뉴 닫기
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const mobileMenu = document.getElementById('mobile-nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    mobileToggle.classList.remove('active');
                    document.body.style.overflow = 'auto';
                }
            }
        });
        
        // 모바일 메뉴 링크 클릭 시 메뉴 닫기
        document.querySelectorAll('.mobile-nav-menu .nav-link').forEach(link => {
            link.addEventListener('click', function() {
                const mobileMenu = document.getElementById('mobile-nav-menu');
                const mobileToggle = document.querySelector('.mobile-menu-toggle');
                mobileMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // 숫자 카운트업 애니메이션
        function animateCountUp(element, target, duration = 2000) {
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // 퍼센트나 특수 문자 처리
                let displayValue = Math.floor(current);
                if (element.dataset.suffix) {
                    displayValue += element.dataset.suffix;
                }
                
                element.textContent = displayValue;
                element.classList.add('counting');
                setTimeout(() => element.classList.remove('counting'), 100);
            }, 16);
        }

        // 스크롤 트리거
        function handleScrollAnimations() {
            // 데이터 카드 애니메이션
            const cards = document.querySelectorAll('.data-card');
            cards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !card.classList.contains('animated')) {
                    card.classList.add('animated');
                    const numberElement = card.querySelector('.data-number');
                    
                    if (numberElement && !numberElement.classList.contains('counted')) {
                        numberElement.classList.add('counted');
                        const text = numberElement.textContent;
                        
                        // 숫자 추출
                        const match = text.match(/[\d,]+/);
                        if (match) {
                            const number = parseInt(match[0].replace(/,/g, ''));
                            const suffix = text.replace(match[0], '');
                            numberElement.dataset.suffix = suffix;
                            animateCountUp(numberElement, number);
                        }
                    }
                }
            });

            // 하이라이트 카드 애니메이션
            const highlightCards = document.querySelectorAll('.highlight-card');
            highlightCards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                
                if (isVisible && !card.classList.contains('animated')) {
                    // 각 카드마다 약간씩 지연시켜 순차적으로 나타나도록
                    setTimeout(() => {
                        card.classList.add('animated');
                    }, index * 100);
                }
            });
        }

        // 데스크톱에서는 드롭다운 메뉴 호버 효과
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownItems = document.querySelectorAll('.nav-item:has(.dropdown-menu)');
            
            dropdownItems.forEach(item => {
                const dropdown = item.querySelector('.dropdown-menu');
                
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.display = 'block';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.display = 'none';
                    }
                });
            });

            // 스크롤 이벤트 리스너
            window.addEventListener('scroll', handleScrollAnimations);
            // 초기 로드시에도 체크
            handleScrollAnimations();

            // 인터랙티브 대시보드 초기화
            initializeDashboard();
            
            // 3D 시각화 초기화
            initialize3DVisualization();
        });

        // 인터랙티브 대시보드 기능
        function initializeDashboard() {
            // 진행률 바 애니메이션
            const progressBars = document.querySelectorAll('.progress-fill');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const progressBar = entry.target;
                        const targetProgress = progressBar.dataset.progress;
                        const percentLabel = progressBar.parentElement.querySelector('.progress-percent');
                        
                        // 애니메이션 실행
                        setTimeout(() => {
                            progressBar.style.width = targetProgress + '%';
                            animateProgressNumber(percentLabel, 0, targetProgress, 1500);
                        }, 300);
                        
                        observer.unobserve(progressBar);
                    }
                });
            }, { threshold: 0.3 });

            progressBars.forEach(bar => observer.observe(bar));

            // 실시간 통계 카운트업
            const statNumbers = document.querySelectorAll('.stat-number[data-target]');
            const statObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statElement = entry.target;
                        const target = parseInt(statElement.dataset.target);
                        
                        setTimeout(() => {
                            animateCountUp(statElement, target, 2000);
                        }, 500);
                        
                        statObserver.unobserve(statElement);
                    }
                });
            }, { threshold: 0.5 });

            statNumbers.forEach(stat => statObserver.observe(stat));

            // 투자 금액 카운트업
            const investmentNumbers = document.querySelectorAll('.funding-amount[data-target]');
            const investmentObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const target = parseInt(element.dataset.target);
                        
                        setTimeout(() => {
                            animateInvestmentAmount(element, target, 2500);
                        }, 800);
                        
                        investmentObserver.unobserve(element);
                    }
                });
            }, { threshold: 0.5 });

            investmentNumbers.forEach(investment => investmentObserver.observe(investment));
        }

        // 진행률 숫자 애니메이션
        function animateProgressNumber(element, start, end, duration) {
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(start + (end - start) * progress);
                element.textContent = currentValue + '%';
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }

        // 투자 금액 애니메이션 (억 단위)
        function animateInvestmentAmount(element, target, duration) {
            const startTime = performance.now();
            
            function update(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                const currentValue = Math.floor(target * progress);
                element.textContent = currentValue.toLocaleString() + '억원';
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    // 완료 후 반짝임 효과
                    element.style.animation = 'pulse 0.5s ease-out';
                    setTimeout(() => {
                        element.style.animation = '';
                    }, 500);
                }
            }
            
            requestAnimationFrame(update);
        }

        // 대시보드 실시간 업데이트 시뮬레이션
        function simulateRealTimeUpdates() {
            setInterval(() => {
                // 참여 환자 수 업데이트
                const patientStat = document.querySelector('.stat-number[data-target="1247"]');
                if (patientStat && !patientStat.classList.contains('updating')) {
                    const currentValue = parseInt(patientStat.textContent);
                    if (Math.random() > 0.7) { // 30% 확률로 업데이트
                        patientStat.classList.add('updating');
                        setTimeout(() => {
                            const newValue = currentValue + Math.floor(Math.random() * 3) + 1;
                            patientStat.textContent = newValue;
                            patientStat.dataset.target = newValue;
                            patientStat.classList.remove('updating');
                            
                            // 트렌드 업데이트
                            const trend = patientStat.parentElement.querySelector('.stat-trend');
                            if (trend) {
                                const increase = newValue - currentValue;
                                trend.textContent = `↗ +${increase} (실시간)`;
                                trend.style.animation = 'pulse 0.3s ease-out';
                                setTimeout(() => trend.style.animation = '', 300);
                            }
                        }, 300);
                    }
                }
            }, 10000); // 10초마다 체크
        }

        // 페이지 로드 완료 후 실시간 업데이트 시작
        window.addEventListener('load', () => {
            setTimeout(simulateRealTimeUpdates, 5000); // 5초 후 시작
            initializeAccessibility(); // 접근성 초기화
        });

        // 접근성 기능 초기화
        function initializeAccessibility() {
            // 저장된 접근성 설정 로드
            loadAccessibilitySettings();
            
            // 키보드 네비게이션 힌트
            const keyboardHint = createKeyboardHint();
            document.body.appendChild(keyboardHint);

            // 키보드 이벤트 리스너
            document.addEventListener('keydown', handleKeyboardNavigation);

            // 고대비 모드 감지 (시스템 설정)
            detectHighContrastMode();

            // 대형 텍스트 설정 확인
            checkLargeTextPreference();

            // 모션 감소 설정 확인
            checkReducedMotionPreference();

            // 스크린리더 지원
            enhanceScreenReaderSupport();

            // 음성 인식 로딩 대기
            if ('speechSynthesis' in window) {
                window.speechSynthesis.onvoiceschanged = () => {
                    // 음성이 로드되면 저장된 설정에 따라 음성 가이드 시작
                    if (localStorage.getItem('prefer-voice-guide') === 'true') {
                        setTimeout(startVoiceGuide, 500);
                    }
                };
            }
        }

        // 키보드 네비게이션 힌트 생성
        function createKeyboardHint() {
            const hint = document.createElement('div');
            hint.className = 'keyboard-hint';
            hint.innerHTML = '키보드 네비게이션: Tab으로 이동, Enter로 선택, ESC로 닫기';
            hint.setAttribute('aria-live', 'polite');
            return hint;
        }

        // 키보드 네비게이션 처리
        function handleKeyboardNavigation(event) {
            const keyboardHint = document.querySelector('.keyboard-hint');
            
            // Tab 키 사용 시 힌트 표시
            if (event.key === 'Tab') {
                keyboardHint.classList.add('show');
                setTimeout(() => keyboardHint.classList.remove('show'), 3000);
            }

            // Enter 키로 대시보드 카드 활성화
            if (event.key === 'Enter' && event.target.classList.contains('dashboard-card')) {
                event.target.click();
                announceToScreenReader(`${event.target.querySelector('h3').textContent} 섹션이 활성화되었습니다.`);
            }

            // ESC 키로 알림 닫기
            if (event.key === 'Escape') {
                const alert = document.querySelector('.live-update-alert.show');
                if (alert) {
                    closeAlert();
                }
            }
        }

        // 스크린리더 공지
        function announceToScreenReader(message) {
            const announcement = document.createElement('div');
            announcement.setAttribute('aria-live', 'assertive');
            announcement.setAttribute('aria-atomic', 'true');
            announcement.className = 'sr-only';
            announcement.textContent = message;
            
            document.body.appendChild(announcement);
            setTimeout(() => document.body.removeChild(announcement), 1000);
        }

        // 실시간 업데이트 알림 표시
        function showLiveUpdateAlert(message) {
            const alert = document.getElementById('live-alert');
            const alertText = alert.querySelector('.alert-text');
            
            alertText.textContent = message;
            alert.classList.add('show');
            
            // 스크린리더에 알림
            announceToScreenReader(message);
            
            // 5초 후 자동 닫기
            setTimeout(() => {
                if (alert.classList.contains('show')) {
                    closeAlert();
                }
            }, 5000);
        }

        // 알림 닫기
        function closeAlert() {
            const alert = document.getElementById('live-alert');
            alert.classList.remove('show');
        }

        // 고대비 모드 감지
        function detectHighContrastMode() {
            if (window.matchMedia('(prefers-contrast: high)').matches) {
                document.body.classList.add('high-contrast-mode');
                announceToScreenReader('고대비 모드가 감지되었습니다. 웹사이트가 최적화되었습니다.');
            }
        }

        // 대형 텍스트 설정 확인
        function checkLargeTextPreference() {
            // 사용자가 대형 텍스트를 선호하는지 확인
            const preferLargeText = localStorage.getItem('prefer-large-text') === 'true';
            if (preferLargeText) {
                document.body.classList.add('accessibility-large-text');
            }
        }

        // 모션 감소 설정 확인
        function checkReducedMotionPreference() {
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.body.classList.add('reduced-motion');
                announceToScreenReader('모션 감소 설정이 적용되었습니다.');
            }
        }

        // 스크린리더 지원 강화
        function enhanceScreenReaderSupport() {
            // 진행률 바 업데이트 시 스크린리더 지원
            const progressBars = document.querySelectorAll('.progress-item[role="progressbar"]');
            progressBars.forEach(bar => {
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-valuenow') {
                            const newValue = bar.getAttribute('aria-valuenow');
                            const label = bar.querySelector('.progress-label').textContent;
                            announceToScreenReader(`${label} 진행률이 ${newValue}%로 업데이트되었습니다.`);
                        }
                    });
                });
                
                observer.observe(bar, { attributes: true, attributeFilter: ['aria-valuenow'] });
            });
        }

        // 진행률 애니메이션 업데이트 (접근성 개선)
        function updateProgressBarAccessibility(progressBar, targetProgress) {
            const parentItem = progressBar.closest('.progress-item[role="progressbar"]');
            if (parentItem) {
                parentItem.setAttribute('aria-valuenow', targetProgress);
                
                // 스크린리더 전용 값 업데이트
                const srValue = parentItem.querySelector('.progress-value');
                if (srValue) {
                    srValue.textContent = targetProgress;
                }
            }
        }

        // 대형 텍스트 토글 기능
        function toggleLargeText() {
            const isLargeText = document.body.classList.toggle('accessibility-large-text');
            const button = document.querySelector('[onclick="toggleLargeText()"]');
            
            if (isLargeText) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
            
            localStorage.setItem('prefer-large-text', isLargeText);
            announceToScreenReader(isLargeText ? '대형 텍스트가 활성화되었습니다.' : '대형 텍스트가 비활성화되었습니다.');
        }

        // 고대비 모드 토글
        function toggleHighContrast() {
            const isHighContrast = document.body.classList.toggle('high-contrast-mode');
            const button = document.querySelector('[onclick="toggleHighContrast()"]');
            
            if (isHighContrast) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
            }
            
            localStorage.setItem('prefer-high-contrast', isHighContrast);
            announceToScreenReader(isHighContrast ? '고대비 모드가 활성화되었습니다.' : '고대비 모드가 비활성화되었습니다.');
        }

        // 음성 가이드 토글
        function toggleVoiceGuide() {
            const isVoiceGuide = !document.body.dataset.voiceGuide || document.body.dataset.voiceGuide === 'false';
            const button = document.querySelector('[onclick="toggleVoiceGuide()"]');
            
            document.body.dataset.voiceGuide = isVoiceGuide;
            
            if (isVoiceGuide) {
                button.classList.add('active');
                button.setAttribute('aria-pressed', 'true');
                startVoiceGuide();
            } else {
                button.classList.remove('active');
                button.setAttribute('aria-pressed', 'false');
                stopVoiceGuide();
            }
            
            localStorage.setItem('prefer-voice-guide', isVoiceGuide);
            announceToScreenReader(isVoiceGuide ? '음성 가이드가 활성화되었습니다.' : '음성 가이드가 비활성화되었습니다.');
        }

        // 음성 가이드 시작
        function startVoiceGuide() {
            // 페이지 진입 시 음성 안내
            if ('speechSynthesis' in window) {

                speakText(welcomeMessage);
                
                // 마우스 오버 시 음성 가이드
                document.addEventListener('mouseover', handleVoiceGuideFocus);
                document.addEventListener('focus', handleVoiceGuideFocus, true);
            } else {
                announceToScreenReader('음성 합성 기능이 지원되지 않는 브라우저입니다.');
            }
        }

        // 음성 가이드 중지
        function stopVoiceGuide() {
            if ('speechSynthesis' in window) {
                window.speechSynthesis.cancel();
                document.removeEventListener('mouseover', handleVoiceGuideFocus);
                document.removeEventListener('focus', handleVoiceGuideFocus, true);
            }
        }

        // 음성 가이드 포커스 처리
        function handleVoiceGuideFocus(event) {
            if (document.body.dataset.voiceGuide !== 'true') return;
            
            const target = event.target;
            let textToSpeak = '';
            
            // 버튼, 링크, 입력 요소
            if (target.tagName === 'BUTTON' || target.tagName === 'A') {
                textToSpeak = target.textContent || target.getAttribute('aria-label') || target.title;
            }
            // 헤딩 요소
            else if (target.tagName.match(/^H[1-6]$/)) {
                textToSpeak = `제목: ${target.textContent}`;
            }
            // 데이터 카드
            else if (target.classList.contains('data-card')) {
                const number = target.querySelector('.data-number')?.textContent || '';
                const label = target.querySelector('.data-label')?.textContent || '';
                textToSpeak = `데이터 카드: ${number} ${label}`;
            }
            // 진행률 바
            else if (target.classList.contains('progress-item')) {
                const label = target.querySelector('.progress-label')?.textContent || '';
                const percent = target.querySelector('.progress-percent')?.textContent || '';
                textToSpeak = `진행률: ${label} ${percent} 완료`;
            }
            
            if (textToSpeak && textToSpeak.trim()) {
                // 이전 음성 중지하고 새로운 음성 시작
                window.speechSynthesis.cancel();
                setTimeout(() => speakText(textToSpeak), 100);
            }
        }

        // 텍스트 음성 변환
        function speakText(text) {
            if ('speechSynthesis' in window && document.body.dataset.voiceGuide === 'true') {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.lang = 'ko-KR';
                utterance.rate = 0.9;
                utterance.pitch = 1.0;
                utterance.volume = 0.8;
                
                // 한국어 음성 선택
                const voices = window.speechSynthesis.getVoices();
                const koreanVoice = voices.find(voice => voice.lang.includes('ko'));
                if (koreanVoice) {
                    utterance.voice = koreanVoice;
                }
                
                window.speechSynthesis.speak(utterance);
            }
        }

        // 저장된 접근성 설정 로드
        function loadAccessibilitySettings() {
            // 대형 텍스트 설정
            if (localStorage.getItem('prefer-large-text') === 'true') {
                document.body.classList.add('accessibility-large-text');
                const button = document.querySelector('[onclick="toggleLargeText()"]');
                if (button) {
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                }
            }
            
            // 고대비 모드 설정
            if (localStorage.getItem('prefer-high-contrast') === 'true') {
                document.body.classList.add('high-contrast-mode');
                const button = document.querySelector('[onclick="toggleHighContrast()"]');
                if (button) {
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                }
            }
            
            // 음성 가이드 설정
            if (localStorage.getItem('prefer-voice-guide') === 'true') {
                document.body.dataset.voiceGuide = 'true';
                const button = document.querySelector('[onclick="toggleVoiceGuide()"]');
                if (button) {
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                }
                // 음성 로드 후 시작
                setTimeout(startVoiceGuide, 1000);
            }
        }

        // 실시간 업데이트 시뮬레이션 개선 (접근성)
        function simulateRealTimeUpdates() {
            setInterval(() => {
                const patientStat = document.querySelector('.stat-number[data-target="1247"]');
                if (patientStat && !patientStat.classList.contains('updating')) {
                    const currentValue = parseInt(patientStat.textContent);
                    if (Math.random() > 0.7) {
                        patientStat.classList.add('updating');
                        setTimeout(() => {
                            const newValue = currentValue + Math.floor(Math.random() * 3) + 1;
                            patientStat.textContent = newValue;
                            patientStat.dataset.target = newValue;
                            patientStat.classList.remove('updating');
                            
                            // 실시간 업데이트 알림
                            showLiveUpdateAlert(`참여 환자 수가 ${newValue}명으로 증가했습니다.`);
                            
                            // 트렌드 업데이트
                            const trend = patientStat.parentElement.querySelector('.stat-trend');
                            if (trend) {
                                const increase = newValue - currentValue;
                                trend.textContent = `↗ +${increase} (실시간)`;
                                trend.style.animation = 'pulse 0.3s ease-out';
                                setTimeout(() => trend.style.animation = '', 300);
                            }
                        }, 300);
                    }
                }
            }, 10000);
        }

        // 3D 시각화 기능 구현
        function initialize3DVisualization() {
            // 3D 요소들 초기화
            const dataCube = document.querySelector('.data-cube');
            const progressCylinder = document.querySelector('.progress-cylinder');
            const roiBars = document.querySelectorAll('.roi-bar-3d');

            // 3D 큐브 인터랙션
            if (dataCube) {
                let isRotating = true;
                
                dataCube.addEventListener('click', () => {
                    showCubeDetails();
                    playInteractionSound();
                });

                dataCube.addEventListener('mouseenter', () => {
                    if (isRotating) {
                        dataCube.style.animationPlayState = 'paused';
                    }
                });

                dataCube.addEventListener('mouseleave', () => {
                    if (isRotating) {
                        dataCube.style.animationPlayState = 'running';
                    }
                });
            }

            // 진행률 원통 인터랙션
            const cylinderSegments = document.querySelectorAll('.cylinder-segment');
            cylinderSegments.forEach((segment, index) => {
                segment.addEventListener('click', () => {
                    showProgressDetails(index);
                    playInteractionSound();
                });

                segment.addEventListener('mouseenter', () => {
                    if (document.body.dataset.voiceGuide === 'true') {
                        const label = segment.textContent;
                        speakText(`${label} 세부 정보를 확인하려면 클릭하세요`);
                    }
                });
            });

            // ROI 차트 인터랙션
            roiBars.forEach((bar, index) => {
                bar.addEventListener('click', () => {
                    showROIDetails(index);
                    playInteractionSound();
                    
                    // 3D 바 하이라이트 효과
                    bar.style.filter = 'brightness(1.3)';
                    setTimeout(() => {
                        bar.style.filter = 'brightness(1)';
                    }, 300);
                });

                bar.addEventListener('mouseenter', () => {
                    bar.style.transform = 'rotateY(15deg) scale(1.05) translateZ(20px)';
                });

                bar.addEventListener('mouseleave', () => {
                    bar.style.transform = 'rotateY(15deg) scale(1.05)';
                });
            });

            // 스크롤 시 3D 요소 시차 효과
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.5;
                
                if (dataCube) {
                    const baseTransform = `rotateX(${rate * 0.05}deg) rotateY(${rate * 0.05}deg)`;
                    if (dataCube.style.animationPlayState !== 'paused') {
                        dataCube.style.transform = baseTransform;
                    }
                }
            });
        }

        // 3D 회전 토글
        function toggle3DRotation() {
            const cube = document.querySelector('.data-cube');
            const button = document.querySelector('[onclick="toggle3DRotation()"]');
            
            if (cube) {
                const isRunning = cube.style.animationPlayState !== 'paused';
                cube.style.animationPlayState = isRunning ? 'paused' : 'running';
                
                button.classList.toggle('active', !isRunning);
                announceToScreenReader(isRunning ? '3D 회전이 일시정지되었습니다.' : '3D 회전이 재개되었습니다.');
                playInteractionSound();
            }
        }

        // 3D 시점 초기화
        function reset3DView() {
            const cube = document.querySelector('.data-cube');
            const cylinder = document.querySelector('.progress-cylinder');
            const bars = document.querySelectorAll('.roi-bar-3d');
            
            if (cube) {
                cube.style.transform = 'rotateX(0deg) rotateY(0deg)';
                cube.style.animationPlayState = 'running';
            }
            
            if (cylinder) {
                cylinder.style.transform = 'rotateX(-15deg) rotateY(25deg)';
            }
            
            bars.forEach(bar => {
                bar.style.transform = 'rotateY(0deg) scale(1)';
            });
            
            announceToScreenReader('3D 시각화 시점이 초기화되었습니다.');
            playInteractionSound();
        }

        // 3D 사운드 효과 토글
        function toggle3DSound() {
            const isSoundEnabled = localStorage.getItem('3d-sound-enabled') !== 'false';
            const button = document.querySelector('[onclick="toggle3DSound()"]');
            
            localStorage.setItem('3d-sound-enabled', !isSoundEnabled);
            button.classList.toggle('active', !isSoundEnabled);
            
            announceToScreenReader(isSoundEnabled ? '3D 사운드 효과가 비활성화되었습니다.' : '3D 사운드 효과가 활성화되었습니다.');
            playInteractionSound();
        }

        // 큐브 세부 정보 표시
        function showCubeDetails() {
            const modal = createDetailsModal('3D 데이터 큐브 상세 정보', `
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; padding: 20px;">

                </div>
            `);
            
            document.body.appendChild(modal);
        }

        // 진행률 세부 정보 표시
        function showProgressDetails(segmentIndex) {

            
            const data = progressData[segmentIndex];
            const modal = createDetailsModal(`${data.title} 상세 정보`, `
                <div style="padding: 20px;">
                    <div style="margin-bottom: 30px; ">
                        <div style="font-size: 4rem; font-weight: bold; color: #2c5282; margin-bottom: 10px;">${data.progress}%</div>
                        <div style="font-size: 1.2rem; color: #4a5568;">진행률</div>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <div style="width: 100%; height: 15px; background: #e2e8f0; border-radius: 8px; overflow: hidden;">
                            <div style="width: ${data.progress}%; height: 100%; background: linear-gradient(90deg, #2c5282, #38a169); border-radius: 8px; transition: width 1s ease;"></div>
                        </div>
                    </div>
                    <div style="background: rgba(44, 82, 130, 0.05); padding: 20px; border-radius: 10px; border: 1px solid rgba(44, 82, 130, 0.1);">
                        <p style="font-size: 1.1rem; line-height: 1.6; margin: 0;">${data.details}</p>
                    </div>
                </div>
            `);
            
            document.body.appendChild(modal);
        }

        // ROI 세부 정보 표시
        function showROIDetails(barIndex) {
            const roiData = [
                { year: '1년차', roi: '50%', details: '초기 시장 진입 및 파트너십 확보. 프로토타입 상용화 및 초기 매출 발생.' },
                { year: '2년차', roi: '150%', details: '본격적인 상용화 시작. 국내 시장 점유율 확보 및 해외 진출 준비.' },
                { year: '3년차', roi: '300%', details: '시장 점유율 대폭 확대. 아시아-태평양 지역 진출 및 글로벌 파트너십 체결.' },
                { year: '5년차', roi: '500%', details: '글로벌 시각재활 시장 리더십 확립. IPO 준비 및 차세대 기술 개발 착수.' }
            ];
            
            const data = roiData[barIndex];
            const modal = createDetailsModal(`투자 수익률 ${data.year} 분석`, `
                <div style="padding: 20px;">
                    <div style=" margin-bottom: 30px;">
                        <div style="font-size: 4rem; font-weight: bold; color: #2c5282; margin-bottom: 10px;">${data.roi}</div>
                        <div style="font-size: 1.3rem; color: #4a5568;">예상 투자 수익률</div>
                    </div>
                    <div style="background: linear-gradient(135deg, rgba(44, 82, 130, 0.1), rgba(56, 161, 105, 0.1)); padding: 25px; border-radius: 15px; border: 2px solid rgba(44, 82, 130, 0.2);">
                        <h4 style="margin: 0 0 15px 0; color: #2c5282; font-size: 1.3rem;">주요 성과 예측</h4>
                        <p style="font-size: 1.1rem; line-height: 1.6; margin: 0;">${data.details}</p>
                    </div>
                </div>
            `);
            
            document.body.appendChild(modal);
        }

        // 상세 정보 모달 생성
        function createDetailsModal(title, content) {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                background: rgba(0,0,0,0.8); z-index: 9999; display: flex; flex-direction: column; align-items: center; 
                justify-content: center; align-items: center; opacity: 0; 
                transition: opacity 0.3s ease;
            `;
            
            modal.innerHTML = `
                <div style=" border-radius: 15px; max-width: 900px; width: 90%; max-height: 80%; overflow-y: auto; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
                    <div style="padding: 25px; border-bottom: 2px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: space-between; align-items: center; background: linear-gradient(135deg, #2c5282, #38a169); color: white; border-radius: 15px 15px 0 0;">
                        <h3 style="margin: 0; font-size: 1.5rem; font-weight: 600;">${title}</h3>
                        <button onclick="closeModal(this)" style="background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; width: 40px; height: 40px; font-size: 1.5rem; cursor: pointer; color: white; display: flex; flex-direction: column; align-items: center; align-items: center; justify-content: center; transition: all 0.3s ease;" aria-label="모달 닫기" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.2)'">&times;</button>
                    </div>
                    <div>${content}</div>
                </div>
            `;
            
            // 접근성 속성 추가
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'modal-title');
            
            // 모달 표시 애니메이션
            setTimeout(() => modal.style.opacity = '1', 10);
            
            // ESC 키로 닫기
            modal.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') closeModal(modal.querySelector('button'));
            });
            
            // 배경 클릭으로 닫기
            modal.addEventListener('click', (e) => {
                if (e.target === modal) closeModal(modal.querySelector('button'));
            });
            
            return modal;
        }

        // 모달 닫기
        function closeModal(button) {
            const modal = button.closest('[role="dialog"]');
            modal.style.opacity = '0';
            setTimeout(() => {
                if (document.body.contains(modal)) {
                    document.body.removeChild(modal);
                }
            }, 300);
        }

        // 큐브 키보드 네비게이션
        function handleCubeKeyboard(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                showCubeDetails();
            }
        }

        // 3D 인터랙션 사운드 효과
        function playInteractionSound() {
            if (localStorage.getItem('3d-sound-enabled') === 'false') return;
            
            // Web Audio API를 사용한 간단한 사운드 효과
            try {
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const oscillator = audioContext.createOscillator();
                const gainNode = audioContext.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContext.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
                
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
            } catch (e) {
                console.log('Audio context not supported');
            }
        }

        // SPA 네비게이션 기능
        function initSPANavigation() {
            // 네비게이션 링크에 이벤트 리스너 추가
            document.querySelectorAll('.nav-link[id]').forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // 모든 네비게이션 링크에서 active 클래스 제거
                    document.querySelectorAll('.nav-link').forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    // 클릭된 링크에 active 클래스 추가
                    this.classList.add('active');
                    
                    // 해당 섹션으로 스크롤
                    const targetId = this.id.replace('nav-', '');
                    const targetSection = document.getElementById(targetId + '-section') || 
                                         document.querySelector(`[data-section="${targetId}"]`);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({ 
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
        }

        // 네비게이션 탭 기능
        function showSection(sectionId) {
            // 모든 섹션 숨기기
            const sections = document.querySelectorAll('.hero-section, .research-overview, .coming-soon-section');
            sections.forEach(section => {
                if (section.id) {
                    section.style.display = 'none';
                }
            });
            
            // 모든 네비게이션 링크 비활성화
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            // 선택된 섹션 표시
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
            
            // 선택된 링크 활성화
            const activeLink = document.querySelector(`[data-target="${sectionId}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
            
            // 스크롤을 맨 위로
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        // 페이지 로드 시 SPA 네비게이션 초기화
        document.addEventListener('DOMContentLoaded', function() {
            // 네비게이션 이벤트 리스너 추가
            const navLinks = document.querySelectorAll('.nav-link[data-target]');
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = this.getAttribute('data-target');
                    showSection(target);
                });
            });
            
            // 기본적으로 홈 섹션 표시
            showSection('home');
            
            initSPANavigation();
        });

        // 언어 전환 함수
        function switchLanguage(lang) {
            // 언어 버튼 상태 업데이트
            document.querySelectorAll('.lang-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');

            // 영어 버전으로 리다이렉트
            if (lang === 'en') {
                window.location.href = '../en/index.html';
            }
            // 한국어는 현재 페이지 유지
        }
