# 가보 패치 GIF 생성 가이드

## 개요
1 cpd부터 30 cpd까지 공간주파수가 변화하는 가보 패치 GIF 이미지를 생성합니다.

## 사전 요구사항
Python 3와 Pillow 라이브러리가 필요합니다.

### Pillow 설치
```bash
pip3 install Pillow
# 또는
python3 -m pip install Pillow
```

## 사용 방법

### 1. 스크립트 실행
```bash
python3 generate_gabor_gif.py
```

### 2. 생성되는 파일
- `assets/images/gabor_spatial_frequency.gif`
  - 크기: 400x400 픽셀
  - 프레임 수: 30개 (1-30 cpd)
  - 각 프레임 지속 시간: 150ms
  - 무한 반복 애니메이션

### 3. 특징
- 각 프레임에 우측 하단에 "*{숫자} Spatial frequency(cpd)" 텍스트 표시
- 공간주파수가 1 cpd부터 30 cpd까지 1 cpd 단위로 증가
- 가우시안 포락선으로 변조된 정현파 격자 패턴
- 파일 크기 최적화를 위해 GIF 형식 사용

## 웹사이트 적용
생성된 GIF 파일은 다음 페이지에서 자동으로 표시됩니다:
- `ko/research/overview.html` (한국어)
- `research/overview.html` (영어)

## 문제 해결

### Pillow 설치 오류
```bash
# macOS의 경우
brew install python3
pip3 install Pillow

# 또는 시스템 Python 사용
python3 -m pip install --user Pillow
```

### 권한 오류
```bash
# 사용자 디렉토리에 설치
python3 -m pip install --user Pillow
```

## 참고
- 카이스트 대학 연구실 웹페이지 참고: http://brain.kaist.ac.kr/brain/1_1.php
- 가보 패치는 시각 연구에서 널리 사용되는 표준 자극입니다.

