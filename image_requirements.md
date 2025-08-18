# 시각재활 연구결과 웹사이트 이미지 요구사항

## DALL-E 이미지 생성 프롬프트

### 1. 히어로 섹션 이미지 (1792x1024)

#### 파일명: hero-research-lab.png
```
프롬프트: "A modern, state-of-the-art visual rehabilitation research laboratory with professional researchers in white lab coats working with advanced eye examination equipment. The scene shows sophisticated pupil tracking systems, biometric measurement devices, and high-end medical instruments. The laboratory has clean, bright lighting with modern glass and metal surfaces. Professional atmosphere with researchers analyzing data on computer screens showing eye movement patterns and visual assessment results. Ultra-realistic, professional photography style, representing cutting-edge medical research facility for visual rehabilitation."

설정:
- 크기: 1792x1024 (히어로 섹션용)
- 품질: HD
- 스타일: Natural
- 목적: 첫인상에서 전문성과 신뢰감 전달
```

### 2. 팀 프로필 이미지들 (400x400)

#### A. 연구 책임자 (team-leader.png)
```
프롬프트: "Professional portrait of a confident Asian research director in their 50s, wearing a white lab coat over business attire, standing in a modern medical research facility. Clean background with subtle medical equipment. Professional headshot style, conveying authority, expertise, and trustworthiness. High-quality portrait photography with natural lighting."

설정:
- 크기: 1024x1024 (정사각형으로 생성 후 400x400으로 리사이즈)
- 목적: 연구팀 리더십 표현
```

#### B. 선임 연구원 (senior-researcher.png)
```
프롬프트: "Professional portrait of a focused Asian senior researcher in their 40s, wearing glasses and a white lab coat, holding a tablet with eye examination data. Background shows blurred laboratory equipment. Intelligent and dedicated expression, representing expertise in visual rehabilitation research. Professional medical photography style."

설정:
- 크기: 1024x1024
- 목적: 연구 전문성 표현
```

#### C. 데이터 분석가 (data-analyst.png)
```
프롬프트: "Professional portrait of a young Asian data scientist in their 30s, wearing business casual attire with a lab coat, working with multiple computer monitors displaying eye tracking data and statistical analysis. Modern research environment with clean, tech-focused background. Professional and analytical appearance."

설정:
- 크기: 1024x1024
- 목적: 데이터 분석 역량 표현
```

#### D. 기술 개발자 (tech-developer.png)
```
프롬프트: "Professional portrait of an Asian biomedical engineer in their 30s, wearing a lab coat and safety glasses, working on calibrating advanced eye examination equipment. Technical background with precision instruments. Professional engineering photography style, conveying innovation and technical expertise."

설정:
- 크기: 1024x1024
- 목적: 기술 개발 능력 표현
```

### 3. 연구 장비 이미지들 (800x600)

#### A. 동공 추적 시스템 (pupil-tracking-system.png)
```
프롬프트: "High-end pupil tracking system in a professional laboratory setting. Modern device with multiple cameras and infrared sensors, mounted on a adjustable stand. Clean, clinical environment with professional lighting. The equipment shows advanced technology for eye movement analysis and visual rehabilitation research. Professional product photography style with detailed focus on the sophisticated instrument."

설정:
- 크기: 1024x1024 (정사각형으로 생성 후 800x600으로 크롭)
- 목적: 첨단 기술력 표현
```

#### B. 바이오메트릭 측정 장비 (biometric-equipment.png)
```
프롬프트: "Advanced biometric measurement equipment for visual rehabilitation research, including retinal scanners, corneal topographers, and optical coherence tomography devices. Professional medical laboratory setting with clean, sterile environment. Multiple high-tech instruments arranged in a clinical workspace, representing cutting-edge medical technology for eye examination and analysis."

설정:
- 크기: 1024x1024
- 목적: 측정 정밀성 표현
```

#### C. 고급 의료기기 (advanced-medical-devices.png)
```
프롬프트: "Collection of advanced medical devices for visual rehabilitation research including fundus cameras, visual field analyzers, and computerized vision testing equipment. Modern clinical setting with professional medical instruments arranged systematically. Clean, bright laboratory environment showcasing state-of-the-art technology for comprehensive eye examination and rehabilitation."

설정:
- 크기: 1024x1024
- 목적: 종합적 연구 능력 표현
```

## 추가 이미지 요구사항

### 4. 보조 이미지들

#### A. 연구 데이터 시각화 (research-data.png)
```
프롬프트: "Professional computer screen displaying complex eye movement tracking data, heat maps of visual attention, and statistical analysis charts for visual rehabilitation research. Clean, modern interface with colorful data visualizations, graphs, and medical imaging results. High-tech medical data analysis environment."

크기: 1024x1024
목적: 연구 성과 시각화
```

#### B. 임상 테스트 환경 (clinical-testing.png)
```
프롬프트: "Modern clinical testing room for visual rehabilitation with patient examination chair, advanced eye testing equipment, and computer monitors. Professional medical environment with a patient undergoing vision assessment while a researcher operates the equipment. Clean, clinical atmosphere representing patient care excellence."

크기: 1024x1024
목적: 임상 적용 가능성 표현
```

## API 키 설정 안내

DALL-E 이미지 생성을 위해서는 OpenAI API 키가 필요합니다:

1. https://platform.openai.com/account/api-keys 방문
2. API 키 생성
3. 환경 변수에 설정: `OPENAI_API_KEY=your_actual_api_key_here`

## 이미지 최적화 계획

생성된 이미지들은 다음과 같이 최적화됩니다:
- 웹 사용을 위한 압축
- 반응형 디자인을 위한 다양한 크기 버전 생성
- 로딩 속도 최적화를 위한 포맷 선택 (WebP, JPEG)
- SEO를 위한 alt 텍스트 및 파일명 최적화