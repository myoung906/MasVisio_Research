# CLAUDE.md - 시각재활 연구 웹페이지

## 핵심 지침
**언어**: 모든 작업은 한국어로 진행
**작업 위치**: `/Applications/XAMPP/xamppfiles/htdocs/mvr`에서만 파일 생성/수정
**배포**: GitHub Pages (https://myoung906.github.io/MasVisio_Research/)

## 프로젝트 정보
- **목적**: 시각재활 연구결과를 바이어/스폰서에게 효과적으로 전달
- **구조**: 한국어(ko/), 영어(en/) 다국어 지원
- **특징**: 모바일 반응형, 햄버거 메뉴, 언어 토글

## 🚀 토큰 절약 워크플로우 
### 작업 시작 전 필수
```bash
git log --oneline -5        # 최근 변경사항 파악 (50토큰)
git status --short          # 현재 상태 (10토큰)
git diff --stat HEAD~1      # 변경사항만 확인 (30토큰)
```

### ❌ 금지사항
- 전체 HTML 파일 읽기 (수천 토큰 낭비)
- 불필요한 파일 탐색

## 개발 워크플로우
1. **개발**: `/Applications/XAMPP/xamppfiles/htdocs/mvr`에서 작업
2. **동기화**: `cp -r /Applications/XAMPP/xamppfiles/htdocs/mvr/* .`
3. **배포**: `git add . && git commit -m "..." && git push origin master`

## 파일 관리 규칙
- **크기 제한**: 각 파일 최대 18KB
- **섹션 분할**: 큰 파일은 3-5개 섹션으로 나누어 edit
- **CSS 변경**: 모바일 메뉴는 publications 페이지 스타일 기준

## 모바일 메뉴 표준
- 햄버거 토글: `toggleMobileMenu()` 함수 필수
- CSS: `.mobile-nav-menu`, `.mobile-menu-toggle` 클래스
- 반응형: `@media (max-width: 768px)` 기준

## GitHub 정보
- **저장소**: https://github.com/myoung906/MasVisio_Research  
- **브랜치**: master
- **배포 URL**: https://myoung906.github.io/MasVisio_Research/

## MCP 도구 활용
- **검색**: WebSearch, WebFetch로 최신 정보 수집
- **텍스트 편집**: text-editor 사용 (filesystem edit_file 금지)
- **파일 관리**: Glob, Grep으로 효율적 탐색

## 품질 보증
- **테스트**: 각 커밋 후 모바일/데스크톱 확인
- **캐시**: 강제 새로고침으로 변경사항 확인
- **링크**: 모든 내부 링크 작동 확인