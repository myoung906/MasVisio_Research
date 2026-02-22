# Login Planning Document

> **Summary**: 사용자 로그인 및 인증 기능 구현
>
> **Project**: MasVisio Research
> **Version**: 1.0.0
> **Author**: jaemyoungseo
> **Date**: 2026-02-01
> **Status**: Draft

---

## 1. Overview

### 1.1 Purpose

시각재활 연구결과 웹사이트에 관리자/바이어 로그인 기능을 추가하여 인증된 사용자만 특정 콘텐츠에 접근할 수 있도록 합니다.

### 1.2 Background

현재 MasVisio Research 웹사이트는 정적 사이트로 운영 중이며, GitHub Pages에 배포되어 있습니다. 바이어/스폰서에게 비공개 연구자료를 제공하기 위해 인증 시스템이 필요합니다.

### 1.3 Related Documents

- Requirements: (추후 작성)
- References: bkend.ai BaaS 문서

---

## 2. Scope

### 2.1 In Scope

- [ ] 이메일/비밀번호 기반 로그인
- [ ] 로그인 상태 유지 (세션/토큰)
- [ ] 로그아웃 기능
- [ ] 인증된 사용자 전용 페이지 접근 제어

### 2.2 Out of Scope

- 회원가입 (관리자가 직접 계정 생성)
- 소셜 로그인 (OAuth)
- 비밀번호 재설정

---

## 3. Requirements

### 3.1 Functional Requirements

| ID | Requirement | Priority | Status |
|----|-------------|----------|--------|
| FR-01 | 이메일/비밀번호로 로그인 | High | Pending |
| FR-02 | 로그인 상태 유지 (브라우저 종료 시까지) | High | Pending |
| FR-03 | 로그아웃 기능 | High | Pending |
| FR-04 | 비공개 페이지 접근 제어 | High | Pending |
| FR-05 | 로그인 실패 시 에러 메시지 표시 | Medium | Pending |

### 3.2 Non-Functional Requirements

| Category | Criteria | Measurement Method |
|----------|----------|-------------------|
| Performance | 로그인 응답시간 < 2초 | 브라우저 네트워크 탭 |
| Security | HTTPS 통신, 토큰 기반 인증 | 코드 리뷰 |
| UX | 모바일 반응형 로그인 폼 | 수동 테스트 |

---

## 4. Success Criteria

### 4.1 Definition of Done

- [ ] 로그인/로그아웃 기능 구현 완료
- [ ] 인증 상태에 따른 페이지 접근 제어 동작
- [ ] 모바일/데스크톱 반응형 UI 완성
- [ ] 테스트 완료

### 4.2 Quality Criteria

- [ ] 주요 기능 수동 테스트 통과
- [ ] 크로스 브라우저 테스트 (Chrome, Safari)
- [ ] 보안 검토 완료

---

## 5. Risks and Mitigation

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| GitHub Pages 정적 호스팅 제한 | High | High | bkend.ai BaaS 또는 별도 백엔드 사용 |
| 토큰 노출 위험 | High | Medium | HttpOnly 쿠키 또는 안전한 스토리지 사용 |
| 세션 만료 UX | Medium | Medium | 명확한 만료 메시지 및 재로그인 안내 |

---

## 6. Architecture Considerations

### 6.1 Project Level Selection

| Level | Characteristics | Recommended For | Selected |
|-------|-----------------|-----------------|:--------:|
| **Starter** | Simple structure (`components/`, `lib/`, `types/`) | Static sites, portfolios, landing pages | ☐ |
| **Dynamic** | Feature-based modules, services layer | Web apps with backend, SaaS MVPs | ☑ |
| **Enterprise** | Strict layer separation, DI, microservices | High-traffic systems, complex architectures | ☐ |

### 6.2 Key Architectural Decisions

| Decision | Options | Selected | Rationale |
|----------|---------|----------|-----------|
| Framework | 순수 HTML/JS (현재) / Next.js | 순수 HTML/JS | GitHub Pages 호환, 기존 구조 유지 |
| 인증 백엔드 | bkend.ai / Firebase / Supabase | bkend.ai | bkit 권장, 간편한 설정 |
| 토큰 저장 | localStorage / sessionStorage | sessionStorage | 브라우저 종료 시 자동 로그아웃 |
| API 통신 | fetch / axios | fetch | 의존성 최소화 |

### 6.3 Clean Architecture Approach

```
Selected Level: Dynamic

Folder Structure Preview:
┌─────────────────────────────────────────────────────┐
│ /ko/login.html          - 한국어 로그인 페이지       │
│ /en/login.html          - 영어 로그인 페이지         │
│ /js/auth.js             - 인증 관련 JavaScript       │
│ /css/auth.css           - 로그인 폼 스타일           │
│ /ko/private/            - 인증 필요 한국어 페이지     │
│ /en/private/            - 인증 필요 영어 페이지       │
└─────────────────────────────────────────────────────┘
```

---

## 7. Convention Prerequisites

### 7.1 Existing Project Conventions

Check which conventions already exist in the project:

- [x] `CLAUDE.md` has coding conventions section
- [ ] `docs/01-plan/conventions.md` exists (Phase 2 output)
- [ ] `CONVENTIONS.md` exists at project root
- [ ] ESLint configuration (`.eslintrc.*`)
- [ ] Prettier configuration (`.prettierrc`)
- [ ] TypeScript configuration (`tsconfig.json`)

### 7.2 Conventions to Define/Verify

| Category | Current State | To Define | Priority |
|----------|---------------|-----------|:--------:|
| **Naming** | exists | 파일명: kebab-case, 함수명: camelCase | High |
| **Folder structure** | exists | ko/, en/ 다국어 구조 | High |
| **Import order** | missing | N/A (순수 JS) | Low |
| **Environment variables** | missing | API URL 등 | Medium |
| **Error handling** | missing | 에러 메시지 표준화 | Medium |

### 7.3 Environment Variables Needed

| Variable | Purpose | Scope | To Be Created |
|----------|---------|-------|:-------------:|
| `BKEND_API_URL` | bkend.ai API 엔드포인트 | Client | ☑ |
| `BKEND_PROJECT_ID` | bkend.ai 프로젝트 ID | Client | ☑ |

### 7.4 Pipeline Integration

현재 정적 HTML 프로젝트이므로 9-phase Pipeline 일부만 적용:

| Phase | Status | Document Location | Command |
|-------|:------:|-------------------|---------|
| Phase 1 (Schema) | ☐ | `docs/01-plan/schema.md` | N/A |
| Phase 2 (Convention) | ☐ | `docs/01-plan/conventions.md` | N/A |

---

## 8. Next Steps

1. [ ] Design 문서 작성 (`login.design.md`)
2. [ ] bkend.ai 프로젝트 설정
3. [ ] 로그인 페이지 UI 구현
4. [ ] 인증 로직 구현

---

## Version History

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1 | 2026-02-01 | Initial draft | jaemyoungseo |
