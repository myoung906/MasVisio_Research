# CLAUDE.md - 시각재활 연구결과 웹페이지 개발 프로젝트
이 파일은 시각재활 연구결과 실험 결과를 공유하고 잠재적인 바이어와 스폰서를 위한 웹페이지 개발 시 Claude Code에게 지침을 제공합니다.

## 언어 설정
**중요**: 모든 답변과 상호작용은 반드시 한국어로 진행해야 합니다. Claude Code는 이 워크스페이스에서 항상 한국어로 응답해야 합니다.

## 프로젝트 개요
### 목적
- 시각재활 연구결과 및 실험 데이터를 효과적으로 공유
- 잠재적 바이어 및 스폰서에게 연구 성과를 어필
- 연구의 상업적 가치와 임상적 의미를 명확하게 전달

### 대상 고객
1. **바이어 (Buyers)**
   - 의료기기 제조업체
   - 안과 클리닉 및 병원
   - 시각재활 센터
   - 의료기술 유통업체
2. **스폰서 (Sponsors)**
   - 연구기관 및 대학
   - 정부 연구지원기관
   - 민간 투자자
   - 의료기술 벤처캐피털

## 개발 원칙

### 0. GitHub 기반 효율적 개발 워크플로우 (🚀 토큰 90% 절약)
**중요**: 모든 작업 시작 전 GitHub 저장소를 먼저 확인하여 최소한의 토큰으로 최대 효율 달성

#### 필수 워크플로우
1. **작업 시작 전 Git 상태 확인** (필수 - 20토큰)
   ```bash
   git log --oneline -10          # 최근 10개 커밋만 = 50토큰  
   git show --name-only HEAD      # 마지막 변경 파일들 = 20토큰
   git status --short             # 현재 변경사항 = 10토큰
   ```

2. **변경사항만 확인** (기존 대비 90% 절약)
   ```bash
   git diff HEAD~1 파일명         # 특정 파일 변경사항만 = 100토큰
   git diff --stat HEAD~5         # 최근 5커밋 통계 = 30토큰
   ```

3. **전체 파일 읽기 금지** ❌ (수천 토큰 낭비)
   - Read index.html (2,000줄) = 수천 토큰 ❌
   - Read main.css (1,000줄) = 수천 토큰 ❌

#### GitHub 저장소 정보
- **저장소**: https://github.com/myoung906/MasVisio_Research
- **동기화**: `/Users/workspace/mvr_webpage` ↔ GitHub ↔ `/Applications/XAMPP/xamppfiles/htdocs/mvr`
- **커밋 규칙**: 매 작업 완료 시 즉시 커밋 & 푸시

#### 작업 패턴
1. `git log --oneline -5` → 최근 변경사항 파악
2. `git diff HEAD~1 특정파일` → 필요한 변경사항만 확인  
3. 수정 작업 진행
4. `git add . && git commit -m "작업내용"` 
5. `git push origin master`
### 1. 프로젝트 계획 및 관리
- mcp, agents, 프로젝트의 시작 가이드 등은 /Users/workspace/mvr_webpage 여기에서 시작하지만 생성되는 모든 파일은 /Applications/XAMPP/xamppfiles/htdocs/mvr에서만 생성함
- 모든 작업 시작 전 /Applications/XAMPP/xamppfiles/htdocs/mvr에 `project_plan.md` 파일을 먼저 작성
- 각 파일 생성/수정 시마다 `project_plan.md` 업데이트
- 작업 진행상황을 체계적으로 관리
### 2. 연구 및 콘텐츠 개발
- 연구결과는 추후 업데이트 예정
- 각 웹사이트 정보의 검증 및 분석 수행
- 수집된 정보를 바탕으로 추가 연구 주제 발굴
- 심층적 분석을 통한 고품질 콘텐츠 개발
### 3. 파일 관리 규칙
- **파일 크기 제한**: 각 파일 최대 18KB 이내
- 긴 콘텐츠는 2-3개 파일로 분할하여 작성
- 논리적 구조에 따른 파일 분할 계획 수립
### 4. 웹페이지 구성 요소

#### 필수 섹션
1. **연구 개요 (Research Overview)**
   - 시각재활 연구의 배경 및 목적
   - 핵심 연구 질문과 가설
2. **실험 결과 (Experimental Results)**
   - 주요 실험 데이터 및 통계
   - 시각적 데이터 표현 (차트, 그래프)
   - 임상적 의미와 효과성 증명
3. **기술적 사양 (Technical Specifications)**
   - 연구에 사용된 기술 및 장비
   - 프로토콜 및 방법론
   - 재현 가능성 정보
4. **상업적 가치 (Commercial Value)**
   - 시장 잠재력 분석
   - 경쟁 우위 요소
   - ROI 예측 및 비즈니스 모델
5. **파트너십 기회 (Partnership Opportunities)**
   - 바이어를 위한 라이선싱 옵션
   - 스폰서를 위한 투자 기회
   - 협력 연구 제안

#### 부가 섹션
- 연구팀 소개
- 발표 논문 및 특허
- 미디어 커버리지
- 연락처 및 문의 양식

### 5. 기술 스택 권장사항
#### 프론트엔드
- HTML5, CSS3, JavaScript (ES6+)
- 반응형 웹 디자인
- 접근성 고려 (시각재활 특성상 중요)
#### 콘텐츠 관리
- Markdown 기반 콘텐츠 작성
- 이미지 최적화 및 압축
- SEO 최적화
- 15초 내외 저해상도 영상 재생 루프
#### 배포 및 호스팅
- 정적 사이트 생성기 활용 고려
- CDN을 통한 글로벌 접근성 확보

### 6. 품질 보증
#### 콘텐츠 검증
- 과학적 정확성 확인
- 의학적 용어의 정확한 사용
- 다국어 지원 고려 (한국어 우선, 영어 보조)
#### 사용자 경험
- 직관적인 네비게이션
- 빠른 로딩 속도
- 모바일 최적화

### 7. 컴플라이언스 및 규정
#### 의료 데이터 보호
- 개인정보보호법 준수
- 의료법 관련 규정 준수
- 연구윤리 가이드라인 준수
#### 지적재산권
- 연구 결과의 지적재산권 명시
- 라이선싱 조건 명확화
- 인용 및 참조 표준 준수

## 작업 디렉토리

**중요**: 모든 작업은 `/Applications/XAMPP/xamppfiles/htdocs/mvr` 디렉토리에서 진행해야 합니다.

## MCP (Model Context Protocol) 활용

### 설치 및 설정 지침
- mcp-installer를 활용한 필요 MCP 설치
- User 스코프로 설치 및 적용
- 설치 전 공식 사이트 확인 필수
- Context7을 통한 재확인
- 디버그 모드를 통한 작동 여부 검증

### 개발 도구 활용
- Node.js & npm 패키지 관리
- Python 개발 도구 (필요시)
- 성능 및 부하 테스트 도구
- Git을 통한 버전 관리

## 프로젝트 성공 지표

### 단기 목표
- 연구 결과의 명확한 시각화
- 사용자 친화적 인터페이스 구현
- 모바일 호환성 확보

### 장기 목표
- 바이어 및 스폰서로부터의 실질적 문의 증가
- 연구 결과의 상업화 성공
- 시각재활 분야에서의 영향력 확대

## 지속적 개선

### 피드백 수집
- 사용자 행동 분석
- 바이어/스폰서 피드백 수집
- 전문가 리뷰 반영

### 콘텐츠 업데이트
- 최신 연구 결과 반영
- 시장 동향 분석 업데이트
- 기술 발전에 따른 사양 개선










** 프로젝트 지침 **


너는 MCP를 사용할 수 있어.
다음 예시들을 살펴보고 적절히 활용해줘.

Node.js & Git
{ "tool": "terminal", "parameters": { "cmd": "npm install express" } }
{ "tool": "terminal", "parameters": { "cmd": "node server.js" } }
{ "tool": "terminal", "parameters": { "cmd": "git clone https://github.com/user/repo.git" } }

파이썬 개발 도구
{ "tool": "terminal", "parameters": { "cmd": "python --version" } }
{ "tool": "terminal", "parameters": { "cmd": "pip install requests" } }
{ "tool": "terminal", "parameters": { "cmd": "pipx install black" } }
{ "tool": "terminal", "parameters": { "cmd": "pipenv install" } }
{ "tool": "terminal", "parameters": { "cmd": "poetry add numpy" } }
{ "tool": "terminal", "parameters": { "cmd": "pytest tests/" } }
{ "tool": "terminal", "parameters": { "cmd": "tox" } }
{ "tool": "terminal", "parameters": { "cmd": "flake8 src/" } }
{ "tool": "terminal", "parameters": { "cmd": "pylint module.py" } }
{ "tool": "terminal", "parameters": { "cmd": "black ." } }
{ "tool": "terminal", "parameters": { "cmd": "isort ." } }
{ "tool": "terminal", "parameters": { "cmd": "mypy app.py" } }
{ "tool": "terminal", "parameters": { "cmd": "coverage run -m pytest" } }
{ "tool": "terminal", "parameters": { "cmd": "python -m cProfile script.py" } }
{ "tool": "terminal", "parameters": { "cmd": "pyinstrument script.py" } }

성능·부하 테스트 도구
{ "tool": "terminal", "parameters": { "cmd": "ab -n 1000 -c 10 http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "wrk -t2 -c100 -d30s http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "siege -c25 -t1M http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "locust -f locustfile.py" } }
{ "tool": "terminal", "parameters": { "cmd": "k6 run script.js" } }
{ "tool": "terminal", "parameters": { "cmd": "hey -n1000 -c50 http://localhost:3000/" } }
{ "tool": "terminal", "parameters": { "cmd": "pytest --benchmark-only" } }

 기타 유틸리티
 { "tool": "terminal", "parameters": { "cmd": "curl https://api.example.com/data" } }
{ "tool": "terminal", "parameters": { "cmd": "http GET https://api.example.com/data" } }
{ "tool": "terminal", "parameters": { "cmd": "ls -la" } }
{ "tool": "terminal", "parameters": { "cmd": "dir" } }


// MySQL 예시 (terminal tool 사용)
[
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"SHOW TABLES;\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"SELECT id, title FROM videos LIMIT 5;\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"INSERT INTO videos (title, description) VALUES ('샘플','테스트');\" shorts_generator"
    }
  },
  { "tool": "terminal",
    "parameters": {
      "cmd": "mysql -uroot -p -e \"BEGIN; UPDATE videos SET view_count = view_count + 1 WHERE id = 42; COMMIT;\" shorts_generator"
    }
  }
]



Playwright 사용 예시
페이지 열기
{ "tool":"playwright-stealth","parameters":{"action":"playwright_navigate","url":"https://example.com"}} ,
로그인 버튼 클릭
{ "tool":"playwright-stealth","parameters":{"action":"playwright_click","selector":"#login-button"}} ,
검색어 입력 후 엔터
{ "tool":"playwright-stealth","parameters":{"action":"playwright_fill","selector":"input[name='q']","text":"MCP Server"}} ,
{ "tool":"playwright-stealth","parameters":{"action":"press","selector":"input[name='q']","key":"Enter"}} ,
페이지 스크린샷 저장
{ "tool":"playwright-stealth","parameters":{"action":"playwright_screenshot","path":"search-results.png"}} ,
콘솔 에러 로그 수집
{ "tool":"playwright-stealth","parameters":{"action":"playwright_console_logs"}} ,
네트워크 요청 내역 수집
{ "tool":"playwright-stealth","parameters":{"action":"getNetworkRequests"}} ,
JS 평가(페이지 타이틀 가져오기)
{ "tool":"playwright-stealth","parameters":{"action":"evaluate","expression":"document.title"}} ,
접근성 스냅샷(구조화된 DOM)
{ "tool":"playwright-stealth","parameters":{"action":"accessibilitySnapshot"}}
라이브러리 버전 조회
{ "tool": "context7", "parameters": {"query": "axios 최신 버전 알려줘"}}
패키지 목록 검색
{ "tool": "context7", "parameters": {"query": "lodash 사용법 예시"}}



그리고 mvr_webpage 폴더에서 작업해줘.

그리고 다음 지침을 지켜줘.

**🚀 GitHub 우선 워크플로우 (필수)**
0. **모든 작업 시작 전 GitHub 확인** (토큰 절약 필수)
   - `git log --oneline -5` → 최근 변경사항 파악 (50토큰)
   - `git status --short` → 현재 상태 확인 (10토큰)  
   - `git diff HEAD~1 파일명` → 필요한 변경사항만 확인 (100토큰)
   - ❌ 전체 파일 읽기 금지 (수천 토큰 낭비)
1. 먼저 project_plan.md 작성할 것. 폴더 및 파일 생성 & 수정은 /Applications/XAMPP/xamppfiles/htdocs/mvr 폴더에 대해 진행해줘.2. 작업이 진행될 때마다, 그에 맞게 /Applications/XAMPP/xamppfiles/htdocs/mvr/project_plan.md 파일을 업데이트해줘.
3. 소스들이 많아 꼭 필요한 파일들만 읽은 후, 편집 또는 추가로 진행해줘. 
4.  파일을 write할 때에는 3개~5개의 섹션으로 나누어 먼저 하나 write하고 나머지는 edit로 추가해줘. 파일을 edit 할때에는 3개~5개의 섹션으로 나누어 순차적으로 하나씩 진행해줘.
5. docs 폴더에 파일을 업데이트하거나 생성할 때, 꼭 필요한 내용만 넣어서 용량을 줄여줘.
6. 먼저 project_plan.md를 작성하고 작업 진행될때마다 업데이트해줘.
7. playwright로 접속해 사이트 조사할 때에는 DOM 구조를 먼저 확인한 후, 그에 맞게 클릭, 내용 보기를 진행해줘. 그리고 특정 웹페이지가 나오면 먼저 텍스트 박스와 버튼이나 링크가 있는지 살펴보고 필요하면 이것저것 눌러서 진행해봐.
8. filesystem의 edit_file과 write_file은 사용 금지야. edit하거나 write할때에는 text-editor를 써야 해.
9. 웹 자료 검색 시, google search를 한 후, 이에 기반해 playwright 브라우징을 해줘.
10. 확장자 html 파일에서도 PHP 사용 가능하게 세팅되어 있어. 그래서 html 파일에서 PHP 코드 사용하면 돼.
11. text-editer로 str_replace를 진행할 때는 old_str를 고유한 문자열이 되도록 충분히 길게 해줘.
---

이 지침서는 시각재활 연구결과 웹페이지 개발의 모든 단계에서 참조되어야 하며, 프로젝트의 성공적 완료를 위한 핵심 가이드라인입니다.








## Playwright MCP 설치 지침

### 문제 상황
macOS 10.15.7 (Catalina) 환경에서 Playwright MCP 사용 시 다음과 같은 오류가 발생할 수 있습니다:
- `Executable doesn't exist at /Users/[username]/Library/Caches/ms-playwright/[browser]-[version]/...`
- 브라우저 버전 불일치 문제
- NVM 환경에서 경로 문제

### 해결된 설치 방법 (검증 완료)

#### 1단계: 기존 Playwright 캐시 정리
```bash
# 기존 브라우저 캐시 완전 삭제
rm -rf /Users/[username]/Library/Caches/ms-playwright
```

#### 2단계: Playwright MCP 글로벌 설치
```bash
# MCP 패키지 글로벌 설치
npm install -g @playwright/mcp

# 필요한 브라우저 설치
npx playwright install
npx playwright install chromium
npx playwright install firefox
```

#### 3단계: MCP 설정 파일 구성
프로젝트의 `.mcp.json` 파일에 다음과 같이 설정:

```json
{
  "mcpServers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@playwright/mcp",
        "--browser",
        "chromium"
      ]
    }
  }
}
```

#### 4단계: 버전 불일치 문제 해결 (필요시)
만약 여전히 버전 불일치 오류가 발생한다면 심볼릭 링크로 해결:

```bash
# Firefox 버전 불일치 해결 예시
ln -sf /Users/[username]/Library/Caches/ms-playwright/firefox-[설치된버전] \
       /Users/[username]/Library/Caches/ms-playwright/firefox-[요구버전]

# Chromium 버전 불일치 해결 예시  
ln -sf /Users/[username]/Library/Caches/ms-playwright/chromium-[설치된버전] \
       /Users/[username]/Library/Caches/ms-playwright/chromium-[요구버전]

# WebKit 버전 불일치 해결 예시
ln -sf /Users/[username]/Library/Caches/ms-playwright/webkit-[설치된버전] \
       /Users/[username]/Library/Caches/ms-playwright/webkit_mac10.15_special-[요구버전]
```

#### 5단계: 연결 상태 확인
```bash
# MCP 서버 목록 및 연결 상태 확인
claude mcp list
```

#### 6단계: 테스트 실행
브라우저별 테스트 명령어:
- **Chromium (가장 안정적)**: `browserType="chromium", headless=false`
- **Firefox**: `browserType="firefox", headless=true`  
- **WebKit**: `browserType="webkit", headless=true`

### 브라우저별 호환성 (macOS Catalina 기준)

| 브라우저 | 호환성 | 권장도 | 비고 |
|---------|--------|--------|------|
| **Chromium** | ✅ 우수 | ⭐⭐⭐ | 가장 안정적, headless=false 권장 |
| **Firefox** | ⚠️ 보통 | ⭐⭐ | 프로토콜 오류 가능성, headless=true 권장 |  
| **WebKit** | ⚠️ 보통 | ⭐ | 프로토콜 오류 가능성, 테스트 필요 |

### 주요 해결 포인트
1. **브라우저 선택**: Chromium이 macOS Catalina에서 가장 안정적
2. **버전 동기화**: 심볼릭 링크를 활용한 버전 불일치 해결
3. **헤드리스 모드**: 브라우저별로 적절한 headless 설정 적용
4. **캐시 관리**: 정기적인 캐시 정리로 버전 충돌 방지

### 검증된 작동 환경
- **OS**: macOS 10.15.7 (Catalina)
- **Node.js**: v20.19.3 (NVM 관리)
- **성공 브라우저**: Chromium (headless=false)
- **MCP 버전**: @playwright/mcp 최신 버전

### 실제 성공 사례
2025-07-29에 다음 환경에서 성공적으로 작동 확인:
- KAIST Brain Lab 웹사이트 접속 성공
- 스크린샷 촬영 완료
- 모든 브라우저 자동화 기능 정상 작동