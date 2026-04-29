# 📋 Wiki Activity Log (활동 로그)

**주의**: 이 파일은 추가 전용(append-only)입니다. 이전 기록은 수정하지 않습니다.

---

## [2026-04-29] init | LLM Wiki 초기화

**목적**: LLM Wiki 시스템 구축

**작업 항목**:
- ✅ wiki/ 디렉토리 구조 생성
  - raw/ (원본 소스)
  - sources/ (소스 요약)
  - entities/ (개념/주제)
  - concepts/ (영역 개념)
  - logs/ (로그)
- ✅ CLAUDE.md 에 wiki 스키마 추가
- ✅ _index.md 초기화
- ✅ _log.md 생성

**상태**: ✅ 완료

---

## [2026-04-29] ingest | README.md - 프로젝트 개요

**입력**: raw/2026-04-29_project-overview.md (README.md 복사)

**핵심 내용**:
- 시각재활 연구 결과 공유 웹사이트
- B2B 모델 (바이어·스폰서 대상)
- 다국어 지원 (한국어, 영어)
- AI 진단 시스템 (47개 바이오마커)
- 4D 근시 제어 생태계
- GitHub Pages 배포

**생성된 페이지**:
- ✅ **Sources**: project-overview.md (프로젝트 요약)
- ✅ **Entities** (4개):
  - 시각재활.md
  - AI-진단-시스템.md
  - 4D-근시-제어.md
  - 의료-웹사이트.md
- ✅ **Concepts** (2개):
  - 의료기기-개발.md
  - B2B-비즈니스-모델.md

**교차 참조 추가**:
- Entities 간 상호 링크 (4개 간선)
- Concepts에서 Entities로 연결 (4개 간선)
- 원본 소스 추적 완료

**통계**:
- 페이지 수: 8개 (Entities 4 + Concepts 2 + Sources 1 + Index 1)
- 링크: 12개 (평균 3.2개/페이지)

**상태**: ✅ 완료

---

## 다음 단계

1. **추가 소스**: CLAUDE.md, 기술 문서 등 추가 ingest
2. **더 많은 Entity**: 기술, 팀, 기관 등 확장
3. **Lint 실행**: 위키 건강 검진 (모순, 고아 페이지 검사)
4. **쿼리 활용**: 위키 기반 질문 답변 시작

---

## 진행 상황 추적

```
Started: 2026-04-29
First ingest: ✅ 2026-04-29 (README.md)
  - 8개 페이지 생성
  - 12개 교차 참조 생성
Lint pass 1: -
```
