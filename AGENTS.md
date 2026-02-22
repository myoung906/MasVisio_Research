# User Preferences & Rules

1. **Language Requirement**:
   - 모든 답변과 설명은 반드시 **한국어(Korean)**로 작성해야 한다.
   - 코드는 영문을 유지하되, 주석이나 설명은 한국어를 사용한다.

2. **Git 자동 커밋/푸시 워크플로우**:
   - **파일 수정 후 즉시 커밋**: 모든 변경사항은 의미 있는 커밋 메시지와 함께 즉시 커밋해야 한다.
   - **GitHub 푸시 자동화**: 커밋 후 즉시 `git push origin master` (또는 현재 브랜치)를 실행한다.
   - **필수 명령어 순서**:
     ```bash
     git add .
     git commit -m "커밋 메시지"
     git push origin master
     ```
   - **GitHub 인증**: `~/.claude.json` 등의 전역 MCP 설정에 저장된 토큰을 사용하므로 별도 인증 없이 작동한다.
   - **예외**: 사용자가 명시적으로 거부하거나 실험적 작업인 경우에만 자동 푸시를 생략한다.

3. **스킬 (Skills)**:
   이 프로젝트는 `skills/` 디렉토리에 정의된 스킬들을 활용하여 효율적인라 작업을 수행한다.

   > **[필수 지침]**: 프로젝트 점검 및 개선 작업 시에는 항상 **bkit** (PDCA 방법론)과 **SkillsMP** (외부 스킬 탐색)를 적극 활용하여 체계적인 분석과 문제 해결을 수행해야 한다.

   > **[설정 정보]**: `SKILLSMP_API_KEY`는 전역(`.zshrc`)에 설정되어 있다.

   - **SkillsMP Search**: `skills/skillsmp_search/` - 외부 스킬 검색 및 탐색
   - **Git Workflow**: `skills/git_workflow/` - 자동 커밋 및 푸시 지원
   - **Quality Check**: `skills/quality_check/` - 코드 품질 및 타입 안정성 검사
   - **bkit**: `bkit_setup.md` 참조 - PDCA 워크플로우 지원 도구 (설치 필요 시 참조)
