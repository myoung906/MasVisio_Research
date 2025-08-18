#!/bin/bash

# MVR 시각재활 웹페이지 오케스트레이터 빠른 시작 스크립트

echo "🚀 MVR 시각재활 웹페이지 오케스트레이터 시작 중..."
echo ""

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 현재 터미널 탭 목록 확인
echo "📋 현재 활성 탭 목록:"
./terminal-session-manager.sh list-sessions
echo ""

# 필요한 세션들 생성
echo "🏗️ 프로젝트 세션들 생성 중..."

# 오케스트레이터 세션은 이미 존재하므로 다른 세션들만 생성
echo "   📝 프론트엔드 세션 생성..."
./terminal-session-manager.sh new-session "MVR-Frontend"
sleep 1

echo "   🔧 백엔드 세션 생성..."
./terminal-session-manager.sh new-session "MVR-Backend"
sleep 1

echo "   📄 콘텐츠 세션 생성..."
./terminal-session-manager.sh new-session "MVR-Content"
sleep 1

echo ""
echo "✅ 모든 세션 생성 완료!"
echo ""

# 각 세션에 Claude 실행 안내
echo "📋 다음 단계:"
echo "   1. 각 탭에서 수동으로 'claude' 명령어를 실행하세요:"
echo "      - MVR-Frontend 탭: claude"
echo "      - MVR-Backend 탭: claude"  
echo "      - MVR-Content 탭: claude"
echo ""
echo "   2. 각 에이전트에게 역할을 부여하세요:"
echo "      ./send-claude-message-terminal.sh \"MVR-Frontend\" \"React 기반 시각재활 웹사이트의 프론트엔드 개발을 담당합니다. 접근성과 반응형 디자인에 중점을 두세요.\""
echo "      ./send-claude-message-terminal.sh \"MVR-Backend\" \"PHP 기반 백엔드 개발을 담당합니다. 연구 데이터 관리와 API 개발에 집중하세요.\""
echo "      ./send-claude-message-terminal.sh \"MVR-Content\" \"연구 콘텐츠 및 마케팅 자료 관리를 담당합니다. SEO 최적화와 다국어 지원에 집중하세요.\""
echo ""
echo "   3. 정기 체크인을 설정하세요:"
echo "      ./schedule_with_note-terminal.sh 30 \"프론트엔드 개발 진행상황 체크\" \"MVR-Frontend\""
echo "      ./schedule_with_note-terminal.sh 60 \"백엔드 API 개발 상태 점검\" \"MVR-Backend\""
echo "      ./schedule_with_note-terminal.sh 120 \"전체 프로젝트 조율 및 상태 점검\" \"MVR-Orchestrator\""
echo ""

# 현재 상태 재확인
echo "📊 업데이트된 탭 목록:"
./terminal-session-manager.sh list-sessions
echo ""

echo "🎯 오케스트레이터 설치 및 설정 완료!"
echo "📖 자세한 사용법은 README.md와 CLAUDE.md를 참조하세요."