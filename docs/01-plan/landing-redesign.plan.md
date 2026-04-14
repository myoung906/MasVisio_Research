# Landing Page Cards Redesign Plan

## 1. Objective (목표)
랜딩페이지 핵심 연구 3개 섹션 카드 이미지를 "전통적인 연구소/지식 기반" 스타일로 교체하여 학술적 신뢰도를 높입니다.

## 2. Key Files & Context
- `index.html`, `ko/index.html`: 이미지 경로 및 preload 수정
- `assets/css/components.css`: 이미지 렌더링 스타일 수정
- 이미지 교체 목록:
  1. 4D Myopia Control: `assets/images/research/phase2/optical_simulation.png`
  2. AI Disease Prediction: `assets/images/research/phase4_study2_correlation_matrix.jpg`
  3. Precision 3D Reconstruction: `assets/images/research/phase3/corneo_scleral_analysis_ui.png`

## 3. Implementation Steps (구현 단계)
1. HTML 내 `<img>` 태그의 `src` 경로를 위 목록대로 수정합니다.
2. 영문/국문 메인 페이지 상단의 `preload` 이미지 경로를 `optical_simulation.png`로 업데이트합니다.
3. `components.css`에서 `.features-grid .feature-card img` 스타일을 `object-fit: contain;`으로 변경하고 배경색을 `#f8fafc`로 설정하여 데이터 이미지가 잘리지 않게 조정합니다.

## 4. Verification & Testing
- 이미지들이 카드 영역 내에서 적절히 표시되는지 확인합니다.
- 전문적인 연구 데이터 이미지가 사용자 의도에 맞게 배치되었는지 검증합니다.
