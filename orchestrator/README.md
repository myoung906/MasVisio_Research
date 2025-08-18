# MVR 시각재활 웹페이지 오케스트레이터

Terminal.app 기반 AI 에이전트 오케스트레이션 시스템으로, tmux 대신 AppleScript를 사용하여 macOS Catalina 환경에서 작동합니다.

## 🎯 목적

시각재활 연구결과 웹페이지 개발 프로젝트에서 다중 AI 에이전트를 효율적으로 관리하고 협업시킵니다.

## 📁 파일 구조

```
orchestrator/
├── terminal-control.applescript      # 핵심 AppleScript 터미널 제어
├── send-claude-message-terminal.sh  # Claude 메시지 전송
├── schedule_with_note-terminal.sh    # 스케줄링 기능
├── terminal-session-manager.sh      # 세션 관리
├── README.md                        # 이 문서
└── schedule.log                     # 스케줄 로그 (자동 생성)
```

## 🚀 설치 및 설정

### 1. 시스템 요구사항
- macOS 10.15 (Catalina) 이상
- Terminal.app
- Claude Code 실행 환경

### 2. 권한 설정
```bash
chmod +x orchestrator/*.sh
chmod +x orchestrator/terminal-control.applescript
```

## 💡 사용법

### 기본 명령어

#### 새 세션 생성
```bash
./terminal-session-manager.sh new-session "MVR-Frontend"
./terminal-session-manager.sh new-session "MVR-Backend"
./terminal-session-manager.sh new-session "MVR-Orchestrator"
```

#### Claude 메시지 전송
```bash
./send-claude-message-terminal.sh "MVR-Frontend" "React 컴포넌트 상태를 확인해주세요"
./send-claude-message-terminal.sh "MVR-Backend" "API 엔드포인트를 검토해주세요"
```

#### 스케줄된 체크인 설정
```bash
./schedule_with_note-terminal.sh 30 "프론트엔드 진행상황 확인" "MVR-Frontend"
./schedule_with_note-terminal.sh 60 "전체 프로젝트 상태 점검" "MVR-Orchestrator"
```

#### 활성 탭 목록 확인
```bash
./terminal-session-manager.sh list-sessions
```

### 프로젝트별 워크플로우

#### 1. 오케스트레이터 시작
```bash
# 메인 오케스트레이터 세션 생성
./terminal-session-manager.sh new-session "MVR-Orchestrator"

# Claude 실행 (수동으로 탭에서)
claude

# 초기 설정 메시지
./send-claude-message-terminal.sh "MVR-Orchestrator" "시각재활 웹페이지 프로젝트의 오케스트레이터입니다. 프론트엔드, 백엔드, 콘텐츠 팀을 관리하겠습니다."
```

#### 2. 프론트엔드 에이전트 설정
```bash
# 프론트엔드 세션 생성
./terminal-session-manager.sh new-session "MVR-Frontend"

# 프론트엔드 에이전트에게 역할 부여
./send-claude-message-terminal.sh "MVR-Frontend" "React 기반 시각재활 웹사이트의 프론트엔드 개발을 담당합니다. 반응형 디자인과 접근성에 중점을 두세요."
```

#### 3. 백엔드 에이전트 설정
```bash
# 백엔드 세션 생성
./terminal-session-manager.sh new-session "MVR-Backend"

# 백엔드 에이전트에게 역할 부여
./send-claude-message-terminal.sh "MVR-Backend" "PHP 기반 백엔드 개발을 담당합니다. 연구 데이터 관리와 API 개발에 집중하세요."
```

## 🔄 자동화 패턴

### 정기 체크인 스케줄
```bash
# 30분마다 진행상황 확인
./schedule_with_note-terminal.sh 30 "프론트엔드 개발 진행상황 리포트" "MVR-Frontend"

# 1시간마다 백엔드 상태 확인
./schedule_with_note-terminal.sh 60 "백엔드 API 개발 상태 점검" "MVR-Backend"

# 2시간마다 전체 프로젝트 조율
./schedule_with_note-terminal.sh 120 "전체 팀 상태 점검 및 조율" "MVR-Orchestrator"
```

## 🎯 시각재활 프로젝트 특화 기능

### 연구 데이터 관리
```bash
./send-claude-message-terminal.sh "MVR-Backend" "docs/visual_rehabilitation_trends_2025.md 파일의 연구 데이터를 데이터베이스 스키마로 변환해주세요"
```

### 접근성 검증
```bash
./send-claude-message-terminal.sh "MVR-Frontend" "시각재활 사용자를 위한 웹 접근성 가이드라인을 확인하고 현재 페이지에 적용해주세요"
```

### 다국어 지원
```bash
./send-claude-message-terminal.sh "MVR-Frontend" "한국어와 영어 버전의 언어 전환 기능을 구현해주세요"
```

## 📊 모니터링

### 탭 상태 확인
```bash
./terminal-session-manager.sh capture "MVR-Frontend" 20
```

### 스케줄 로그 확인
```bash
tail -f orchestrator/schedule.log
```

## 🚨 문제 해결

### 탭을 찾을 수 없는 경우
1. 터미널 탭 이름이 정확한지 확인
2. `./terminal-session-manager.sh list-sessions`으로 활성 탭 확인

### AppleScript 권한 문제
1. 시스템 환경설정 > 보안 및 개인정보보호 > 접근성에서 터미널 권한 허용
2. AppleScript 에디터에서 터미널 제어 권한 허용

### 스케줄링 실패
1. `at` 명령어 설치 확인: `brew install at` (가능한 경우)
2. 백그라운드 프로세스로 대체 실행

## 📝 베스트 프랙티스

1. **명확한 탭 이름 사용**: "MVR-Frontend", "MVR-Backend" 등
2. **정기적인 체크인**: 30분-2시간 간격으로 스케줄 설정
3. **구체적인 메시지**: 에이전트에게 명확한 지시사항 전달
4. **로그 모니터링**: schedule.log 파일로 실행 상태 추적

## 🔗 관련 문서

- `/Users/workspace/mvr_webpage/CLAUDE.md`: 프로젝트 전체 지침
- `/Users/workspace/optom_research/tmux-installation-troubleshooting.md`: 설치 과정 기록