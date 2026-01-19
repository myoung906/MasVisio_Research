# 🔬 MasVisio Research - 시각재활 연구결과 웹페이지

[![Website](https://img.shields.io/website?url=https%3A//myoung906.github.io/MasVisio_Research/)](https://myoung906.github.io/MasVisio_Research/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://myoung906.github.io/MasVisio_Research/)
[![License](https://img.shields.io/badge/License-Research-blue)](#)

> **시각재활 연구의 혁신적 성과를 세계에 공유하는 전문 웹사이트**  
> 바이어와 스폰서를 위한 연구 결과, 투자 기회, 상업적 가치를 효과적으로 전달

## 🌐 라이브 웹사이트

**👉 [MasVisio Research 웹사이트 방문](https://myoung906.github.io/MasVisio_Research/)**

### 🌍 다국어 지원
- **🇰🇷 한국어**: [Korean Version](https://myoung906.github.io/MasVisio_Research/ko/)
- **🇺🇸 영어**: [English Version](https://myoung906.github.io/MasVisio_Research/en/)

## 📊 프로젝트 개요

### 🎯 목적
- **연구 성과 공유**: 시각재활 분야의 혁신적 연구 결과 전 세계 공개
- **상업적 파트너십**: 잠재적 바이어 및 스폰서와의 협력 기회 창출
- **투자 유치**: 연구의 상업적 가치와 ROI 제시를 통한 투자 유치

### 🏥 연구 분야
- **4D 근시 제어 생태계** 개발
- **AI 기반 시각 진단 시스템** 구축
- **개인 맞춤형 시각재활 솔루션** 연구
- **차세대 의료기기** 프로토타입 개발

## 🎯 대상 고객

### 💼 바이어 (Buyers)
- 의료기기 제조업체
- 안과 클리닉 및 병원
- 시각재활 센터
- 의료기술 유통업체

### 💰 스폰서 (Sponsors)  
- 연구기관 및 대학
- 정부 연구지원기관
- 민간 투자자
- 의료기술 벤처캐피털

## 🚀 주요 특징

### ✨ 웹사이트 기능
- **🌐 다국어 지원**: 한국어/영어 완전 지원
- **📱 반응형 디자인**: 모든 디바이스 최적화
- **🎨 3D 시각화**: 연구 결과의 직관적 표현
- **♿ 접근성 최적화**: 시각재활 특성 고려한 UI/UX
- **⚡ 자동 리다이렉트**: 브라우저 언어 감지 기능

### 📈 핵심 연구 성과
- **95.2%** 임상 성공률
- **47개** AI 진단 바이오마커
- **$5B** 글로벌 시장 잠재력
- **300%+** 예상 투자 수익률

## 🏗️ 기술 스택

### 🖥️ 프론트엔드
- **HTML5/CSS3/JavaScript (ES6+)**
- **반응형 웹 디자인**
- **Chart.js** - 데이터 시각화
- **Three.js** - 3D 렌더링 (선택적)
- **Font Awesome** - 아이콘

### 🔧 개발 도구
- **XAMPP** - 로컬 개발 환경
- **Git** - 버전 관리
- **GitHub Pages** - 웹사이트 호스팅
- **Claude Code** - AI 기반 개발 도구

### 🚀 배포
- **GitHub Pages** - 자동 배포
- **CDN** - 글로벌 접근성 최적화
- **SSL/HTTPS** - 보안 연결

## 📁 프로젝트 구조

```
/Users/workspace/mvr_webpage/          # 🎯 Git 저장소 (GitHub 연결)
├── 📄 README.md                       # 프로젝트 소개 (이 파일)
├── 📋 CLAUDE.md                       # 개발 가이드 및 워크플로우
├── 🔧 .gitignore                      # Git 무시 파일
├── 🌐 index.html                      # 언어 선택 페이지
├── 📂 ko/                            # 한국어 버전
│   ├── index.html                    # 메인 페이지
│   ├── 📁 assets/                    # CSS, JS, 이미지
│   └── ...                           # 기타 페이지들
├── 📂 en/                            # 영어 버전  
│   ├── index.html                    # 메인 페이지
│   ├── 📁 assets/                    # CSS, JS, 이미지
│   └── ...                           # 기타 페이지들
└── 📂 docs/                          # 개발 문서

/Applications/XAMPP/xamppfiles/htdocs/mvr/  # 🛠️ 개발 환경
├── 📋 project_plan.md                # 프로젝트 계획서
├── 🌐 index.html                     # 개발 중인 웹파일들
└── ...                               # 모든 웹사이트 파일들
```

## 🔄 개발 워크플로우

### 🛠️ 웹페이지 수정 및 실행 프로세스

#### 1단계: 프로젝트 폴더로 이동 (필수)
터미널을 열고 프로젝트가 있는 폴더로 이동해야 합니다.
```bash
cd workspace/mvr
# 또는 저장해둔 경로로 이동
```

#### 2단계: 로컬 서버 실행 (미리보기)
```bash
# 로컬 개발 서버 시작
npm run dev
```
- 실행 후 브라우저에서 `http://localhost:8080` 으로 접속하여 확인합니다.
- 서버를 끄려면 터미널에서 `Ctrl + C`를 누릅니다.

#### 3단계: 새 컴퓨터에서 처음 설정할 때
새로운 컴퓨터에서 작업을 시작할 때는 먼저 필요한 도구들을 설치해야 합니다.
1. `git clone [저장소 주소]` 로 프로젝트 내려받기
2. 프로젝트 폴더로 이동 (`cd [폴더명]`)
3. 의존성 설치:
```bash
npm install
```

#### 4단계: 변경사항 GitHub 배포
```bash
# 변경사항 확인
git status

# 모든 변경사항 커밋
git add .
git commit -m "웹사이트 업데이트: [수정 내용 요약]"

# GitHub Pages에 배포 (자동)
git push origin master
```

### ⚡ 자동 업데이트 시스템

웹페이지 수정 시 다음 파일들이 자동으로 업데이트됩니다:

1. **📋 CLAUDE.md**: 개발 가이드 및 기술 문서
2. **📄 README.md**: 프로젝트 소개 및 최신 정보  
3. **📝 project_plan.md**: 프로젝트 진행 상황
4. **🌐 웹사이트 파일들**: 모든 HTML, CSS, JS 파일

## 🎯 사용 방법

### 👥 방문자용
1. **웹사이트 접속**: https://myoung906.github.io/MasVisio_Research/
2. **언어 선택**: 한국어 또는 영어 선택
3. **연구 탐색**: 다양한 섹션에서 연구 성과 확인
4. **문의하기**: 연락처 정보를 통한 파트너십 문의

### 👨‍💻 개발자용
1. **저장소 클론**:
   ```bash
   git clone https://github.com/myoung906/MasVisio_Research.git
   cd MasVisio_Research
   ```

2. **개발 환경 설정**:
   ```bash
   # XAMPP 설치 및 실행
   # /Applications/XAMPP/xamppfiles/htdocs/mvr에 파일 복사
   ```

3. **개발 시작**:
   ```bash
   # CLAUDE.md 가이드 참조
   # 웹페이지 수정 후 워크플로우 따라 배포
   ```

## 📈 성과 지표

### 🎯 웹사이트 성능
- **⚡ 로딩 속도**: < 3초 (최적화 완료)
- **📱 모바일 호환**: 100% 반응형
- **♿ 접근성**: WCAG 2.1 AA 준수
- **🌐 다국어**: 한국어/영어 완전 지원



## 🤝 기여 방법

### 💡 개선 제안
1. **Issue 생성**: 버그 리포트 또는 기능 제안
2. **Pull Request**: 코드 개선 사항 제출
3. **피드백**: 사용자 경험 개선을 위한 의견

### 📞 연락처
- **🔬 연구 문의**: [연구팀 이메일]
- **💼 비즈니스 문의**: [비즈니스 팀 이메일]  
- **🛠️ 기술 지원**: [GitHub Issues](https://github.com/myoung906/MasVisio_Research/issues)

## 📜 라이선스

이 프로젝트는 연구 목적으로 개발되었으며, 상업적 이용에 대해서는 별도 문의 바랍니다.

---

