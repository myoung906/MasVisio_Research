# CLAUDE.md - 시각재활 연구 웹페이지

## 핵심 지침
**언어**: 모든 답변과 작업은 반드시 한국어로 진행 (KOREAN ONLY)
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

## Playwright MCP 브라우저 테스트 가이드

### ✅ 개발 환경 테스트 워크플로우
```bash
# 1. XAMPP 상태 확인
ps aux | grep httpd | grep -v grep
curl -I http://localhost/mvr/

# 2. 대체 웹서버 (필요시)
python3 -m http.server 8080 &
curl -I http://localhost:8080/

# 3. 기본 브라우저로 테스트
open http://localhost/mvr/ko/
```

### ⚠️ macOS 10.15 환경 제한사항
- **Playwright MCP**: Chromium 브라우저 
- **브라우저 설치 실패**: "ERROR: Playwright does not support chromium-headless-shell on mac10.15"
- **해결책**: 수동 브라우저 테스트 또는 최신 macOS 사용 권장

### 🔧 웹사이트 테스트 체크리스트
- [ ] 한국어 페이지 접속: `http://localhost/mvr/ko/`
- [ ] 모바일 메뉴 동작: `toggleMobileMenu()` 함수 확인
- [ ] 반응형 디자인: 768px 이하에서 햄버거 메뉴 표시
- [ ] 언어 토글 기능 작동

### 📱 모바일 메뉴 디버깅
```javascript
// 콘솔에서 직접 테스트
toggleMobileMenu(); // 메뉴 토글
document.querySelector('.mobile-menu-toggle'); // 버튼 요소 확인
document.getElementById('mobile-nav-menu'); // 메뉴 요소 확인
```

## 품질 보증
- **테스트**: 각 커밋 후 모바일/데스크톱 확인
- **캐시**: 강제 새로고침으로 변경사항 확인
- **링크**: 모든 내부 링크 작동 확인

## Git 커밋 및 푸시 규칙

**필수**: 모든 프로젝트에서 파일 수정이 발생하면 다음 절차를 반드시 수행해야 합니다.

### 자동 커밋/푸시 워크플로우

1. **파일 수정 후 즉시 커밋**
   - 모든 변경사항은 의미 있는 커밋 메시지와 함께 커밋할 것
   - 커밋 메시지는 변경 내용을 명확히 설명할 것 (한국어 또는 영어)

2. **GitHub 푸시 자동화**
   - 커밋 후 즉시 `git push origin master` (또는 현재 브랜치) 실행
   - GitHub MCP는 전역 설정되어 있으며 API 키가 자동으로 사용됨
   - 모든 프로젝트에서 푸시 시 별도의 인증 없이 작동함

3. **필수 명령어 순서**
   ```bash
   git add .
   git commit -m "커밋 메시지"
   git push origin master
   ```

4. **예외 상황**
   - 사용자가 명시적으로 "커밋하지 마" 또는 "푸시하지 마"라고 요청한 경우에만 건너뜀
   - 실험적 변경이나 임시 작업의 경우 사용자에게 커밋 여부 확인

### GitHub 인증 정보

- **GitHub Personal Access Token**: 전역 MCP 설정에 저장됨 (`~/.claude.json`)
- **환경변수**: `GITHUB_PERSONAL_ACCESS_TOKEN`
- **유효 범위**: 모든 워크스페이스에서 자동 적용
- **토큰 갱신**: 토큰 만료 시 사용자에게 알림

### 주의사항

- 민감한 정보(API 키, 비밀번호 등)가 포함된 파일은 커밋 전 `.gitignore` 확인
- 대용량 파일(>100MB)은 Git LFS 사용 권장
- 충돌(conflict) 발생 시 사용자에게 즉시 알림