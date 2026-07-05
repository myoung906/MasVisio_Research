# 시각재활 연구결과 웹사이트 이미지 가이드

## 디렉토리 구조

```
assets/images/
├── hero/                  # 히어로 섹션 이미지
├── team/                  # 팀 멤버 프로필 이미지
├── research/              # 연구 장비 및 데이터 이미지
└── partners/              # 파트너사 로고 (향후 추가)
```

## 필요한 이미지 목록

### 1. 히어로 섹션 (hero/)
- **파일명**: `hero-research-lab.jpg`
- **크기**: 1792x1024px
- **용도**: 메인 배경 이미지
- **설명**: 현대적인 시각재활 연구실, 연구원들의 전문적인 작업 모습

### 2. 팀 프로필 (team/)
- **kim-researcher.jpg** - 연구 책임자 (김연구 박사)
- **park-technical.jpg** - 선임 연구원 (박기술 박사)  
- **lee-data.jpg** - 데이터 분석 책임자 (이데이터 박사)
- **choi-developer.jpg** - 기술 개발 책임자 (최개발 박사)
- **크기**: 400x400px (정사각형)
- **스타일**: 전문적인 프로필 사진

### 3. 연구 장비 (research/)
- **pupil-tracking-system.jpg** - 동공 추적 시스템
- **biometric-equipment.jpg** - 바이오메트릭 측정 장비
- **advanced-medical-devices.jpg** - 고급 의료기기
- **research-data.jpg** - 연구 데이터 시각화
- **clinical-testing.jpg** - 임상 테스트 환경
- **크기**: 800x600px
- **스타일**: 첨단 의료기기의 전문적인 제품 사진

## DALL-E 이미지 생성 가이드

상세한 프롬프트와 생성 지침은 `/image_requirements.md` 파일을 참조하세요.

### API 키 설정 후 생성 명령어 예시:
```javascript
// DALL-E API를 사용하여 이미지 생성
mcp__dalle-mcp__generate_image({
  prompt: "A modern, state-of-the-art visual rehabilitation research laboratory...",
  size: "1792x1024",
  quality: "hd",
  style: "natural",
  saveDir: "/Users/workspace/mvr_webpage/assets/images/hero",
  fileName: "hero-research-lab"
});
```

## 임시 플레이스홀더

이미지가 생성되기 전까지는 다음과 같은 플레이스홀더를 사용할 수 있습니다:

- **Unsplash**: 의료/연구 관련 무료 이미지
- **Pexels**: 연구실/기술 관련 이미지
- **Placeholder 서비스**: https://picsum.photos/ 등

## 이미지 최적화 권장사항

### 웹 성능을 위한 최적화:
1. **포맷**: WebP > JPEG > PNG 순으로 우선 사용
2. **압축**: 품질 80-90% 수준으로 압축
3. **반응형**: 다양한 크기 버전 생성
4. **지연 로딩**: `loading="lazy"` 속성 활용

### 파일 명명 규칙:
- 소문자 사용
- 하이픈(-) 구분자 사용  
- 의미있는 파일명
- 예: `hero-research-lab.jpg`, `team-leader-profile.jpg`

## 라이선스 및 저작권

- 모든 이미지는 상업적 사용이 가능한 라이선스여야 함
- DALL-E로 생성된 이미지는 OpenAI 사용 정책 준수
- 외부 이미지 사용 시 출처 명시 필요

## 접근성 고려사항

- 모든 이미지에 적절한 alt 텍스트 제공
- 시각재활 분야 특성상 접근성이 특히 중요
- 고대비 및 색상 대비 고려
- 스크린 리더 친화적 설명 포함