// ===== 3D VISUALIZATION FOR VISUAL REHABILITATION RESEARCH WEBSITE =====

// Three.js 3D 시각화 모듈
class ThreeDVisualization {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animationId = null;
        this.objects = [];
        this.isInitialized = false;
    }

    // 3D 환경 초기화
    init(containerId) {
        try {
            // Three.js가 로드되었는지 확인
            if (typeof THREE === 'undefined') {
                console.warn('Three.js not loaded, falling back to CSS 3D');
                this.initCSS3DFallback();
                return;
            }

            const container = document.getElementById(containerId);
            if (!container) return;

            // Scene 설정
            this.scene = new THREE.Scene();
            this.scene.background = new THREE.Color(0x000000);
            this.scene.background.setHex(0x000000);
            
            // Camera 설정
            const width = container.offsetWidth;
            const height = container.offsetHeight;
            this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
            this.camera.position.z = 5;

            // Renderer 설정
            this.renderer = new THREE.WebGLRenderer({ 
                antialias: true, 
                alpha: true,
                powerPreference: "high-performance"
            });
            this.renderer.setSize(width, height);
            this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            this.renderer.shadowMap.enabled = true;
            this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            
            container.appendChild(this.renderer.domElement);

            // 조명 설정
            this.setupLighting();

            // 3D 객체 생성
            this.createObjects();

            // 애니메이션 시작
            this.animate();

            // 리사이즈 이벤트 리스너
            window.addEventListener('resize', () => this.onWindowResize());

            this.isInitialized = true;
            console.log('3D Visualization initialized successfully');

        } catch (error) {
            console.error('3D Visualization initialization failed:', error);
            this.initCSS3DFallback();
        }
    }

    // 조명 설정
    setupLighting() {
        // 환경광
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        this.scene.add(ambientLight);

        // 방향광
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // 점광원
        const pointLight = new THREE.PointLight(0x2563eb, 0.5, 100);
        pointLight.position.set(0, 0, 10);
        this.scene.add(pointLight);
    }

    // 3D 객체 생성
    createObjects() {
        // DNA 나선 구조 (시각재활 연구 상징)
        this.createDNAHelix();
        
        // 동공 추적 시각화
        this.createEyeTracking();
        
        // 데이터 시각화 큐브들
        this.createDataCubes();
        
        // 파티클 시스템
        this.createParticleSystem();
    }

    // DNA 나선 구조 생성
    createDNAHelix() {
        const helixGroup = new THREE.Group();
        const radius = 1.5;
        const height = 4;
        const turns = 3;

        for (let i = 0; i < 100; i++) {
            const theta = (i / 100) * turns * Math.PI * 2;
            const y = (i / 100) * height - height / 2;

            // 첫 번째 나선
            const sphere1 = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 8, 8),
                new THREE.MeshPhongMaterial({ color: 0x2563eb })
            );
            sphere1.position.set(
                Math.cos(theta) * radius,
                y,
                Math.sin(theta) * radius
            );
            helixGroup.add(sphere1);

            // 두 번째 나선 (반대편)
            const sphere2 = new THREE.Mesh(
                new THREE.SphereGeometry(0.05, 8, 8),
                new THREE.MeshPhongMaterial({ color: 0x059669 })
            );
            sphere2.position.set(
                Math.cos(theta + Math.PI) * radius,
                y,
                Math.sin(theta + Math.PI) * radius
            );
            helixGroup.add(sphere2);

            // 연결선
            if (i % 10 === 0) {
                const lineGeometry = new THREE.BufferGeometry().setFromPoints([
                    sphere1.position.clone(),
                    sphere2.position.clone()
                ]);
                const line = new THREE.Line(
                    lineGeometry,
                    new THREE.LineBasicMaterial({ color: 0xffffff, opacity: 0.3, transparent: true })
                );
                helixGroup.add(line);
            }
        }

        helixGroup.position.set(-3, 0, 0);
        this.scene.add(helixGroup);
        this.objects.push(helixGroup);
    }

    // 동공 추적 시각화
    createEyeTracking() {
        const eyeGroup = new THREE.Group();

        // 눈동자
        const eyeGeometry = new THREE.SphereGeometry(0.8, 32, 32);
        const eyeMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xffffff,
            transparent: true,
            opacity: 0.8
        });
        const eye = new THREE.Mesh(eyeGeometry, eyeMaterial);
        eyeGroup.add(eye);

        // 동공
        const pupilGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
        const pupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
        pupil.position.z = 0.5;
        eyeGroup.add(pupil);

        // 추적 포인트들
        for (let i = 0; i < 20; i++) {
            const pointGeometry = new THREE.SphereGeometry(0.02, 8, 8);
            const pointMaterial = new THREE.MeshPhongMaterial({ 
                color: 0xff4444,
                emissive: 0x220000
            });
            const point = new THREE.Mesh(pointGeometry, pointMaterial);
            
            const angle = (i / 20) * Math.PI * 2;
            point.position.set(
                Math.cos(angle) * 1.2,
                Math.sin(angle) * 1.2,
                Math.sin(i * 0.5) * 0.2
            );
            eyeGroup.add(point);
        }

        eyeGroup.position.set(3, 0, 0);
        this.scene.add(eyeGroup);
        this.objects.push(eyeGroup);
    }

    // 데이터 시각화 큐브들
    createDataCubes() {
        const cubeGroup = new THREE.Group();
        const data = [0.95, 0.87, 0.93, 0.82, 0.76]; // 성과 데이터

        data.forEach((value, index) => {
            const height = value * 2;
            const cubeGeometry = new THREE.BoxGeometry(0.3, height, 0.3);
            const cubeMaterial = new THREE.MeshPhongMaterial({ 
                color: new THREE.Color().setHSL((value * 0.3), 0.8, 0.5)
            });
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
            
            cube.position.set(
                (index - 2) * 0.5,
                height / 2 - 1,
                2
            );
            cube.castShadow = true;
            cubeGroup.add(cube);
        });

        this.scene.add(cubeGroup);
        this.objects.push(cubeGroup);
    }

    // 파티클 시스템
    createParticleSystem() {
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;

            colors[i] = Math.random();
            colors[i + 1] = Math.random();
            colors[i + 2] = Math.random();
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6
        });

        const particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(particles);
        this.objects.push(particles);
    }

    // 애니메이션 루프
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (!this.isInitialized) return;

        const time = Date.now() * 0.001;

        // 객체들 회전
        this.objects.forEach((object, index) => {
            if (object.rotation) {
                object.rotation.x = Math.sin(time + index) * 0.2;
                object.rotation.y = time * (0.5 + index * 0.1);
                object.rotation.z = Math.cos(time + index) * 0.1;
            }
        });

        this.renderer.render(this.scene, this.camera);
    }

    // 윈도우 리사이즈 처리
    onWindowResize() {
        if (!this.isInitialized) return;

        const container = this.renderer.domElement.parentElement;
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    // CSS 3D 폴백
    initCSS3DFallback() {
        console.log('Initializing CSS 3D fallback');
        this.createCSS3DElements();
    }

    // CSS 3D 요소 생성
    createCSS3DElements() {
        const containers = document.querySelectorAll('.hero, .research-overview');
        
        containers.forEach(container => {
            // 3D 카드 효과 추가
            const cards = container.querySelectorAll('.research-card, .stat-item');
            cards.forEach((card, index) => {
                card.classList.add('card-3d', 'enhanced-hover');
                card.style.animationDelay = `${index * 0.1}s`;
                
                // 마우스 따라다니는 효과
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    
                    const rotateX = (y / rect.height) * 20;
                    const rotateY = (x / rect.width) * -20;
                    
                    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
                });
            });
        });

        // 배경 파티클 효과
        this.createCSSParticles();
    }

    // CSS 파티클 생성
    createCSSParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'css-particles';
        particleContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'css-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.8 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: cssParticleFloat ${Math.random() * 10 + 10}s infinite linear;
                animation-delay: ${Math.random() * 5}s;
            `;
            particleContainer.appendChild(particle);
        }

        hero.appendChild(particleContainer);

        // CSS 애니메이션 추가
        if (!document.getElementById('css-particle-animation')) {
            const style = document.createElement('style');
            style.id = 'css-particle-animation';
            style.textContent = `
                @keyframes cssParticleFloat {
                    0% { transform: translateY(100vh) translateX(0px); }
                    100% { transform: translateY(-100px) translateX(${Math.random() * 200 - 100}px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // 정리
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        
        if (this.renderer) {
            this.renderer.dispose();
        }

        this.objects.forEach(object => {
            if (object.geometry) object.geometry.dispose();
            if (object.material) {
                if (Array.isArray(object.material)) {
                    object.material.forEach(material => material.dispose());
                } else {
                    object.material.dispose();
                }
            }
        });

        this.isInitialized = false;
    }
}

// 전역 3D 시각화 인스턴스
window.threeDViz = new ThreeDVisualization();

// DOM 로드 후 초기화
document.addEventListener('DOMContentLoaded', function() {
    // Three.js 라이브러리 동적 로드
    loadThreeJS().then(() => {
        // 3D 컨테이너가 있으면 3D 시각화 시작
        const container = document.getElementById('3d-visualization-container');
        if (container) {
            window.threeDViz.init('3d-visualization-container');
        } else {
            // 컨테이너가 없으면 CSS 3D 폴백 사용
            window.threeDViz.initCSS3DFallback();
        }
    }).catch(error => {
        console.warn('Three.js loading failed, using CSS 3D fallback:', error);
        window.threeDViz.initCSS3DFallback();
    });
});

// Three.js 라이브러리 동적 로드
function loadThreeJS() {
    return new Promise((resolve, reject) => {
        if (typeof THREE !== 'undefined') {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 성능 모니터링
function monitor3DPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();

    function measureFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            frameCount = 0;
            lastTime = currentTime;
            
            // FPS가 30 이하면 품질 저하
            if (fps < 30 && window.threeDViz.isInitialized) {
                console.warn('Low FPS detected, switching to performance mode');
                // 파티클 수 감소, 그림자 비활성화 등
            }
        }
        
        requestAnimationFrame(measureFPS);
    }
    
    measureFPS();
}

// 성능 모니터링 시작
monitor3DPerformance();