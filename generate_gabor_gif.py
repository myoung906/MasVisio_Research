#!/usr/bin/env python3
"""
가보 패치 GIF 생성 스크립트
1 cpd부터 30 cpd까지 공간주파수가 변화하는 가보 패치 이미지 30개를 생성하고 GIF로 합성합니다.
"""

import math
from PIL import Image, ImageDraw, ImageFont
import os

def _smoothstep(edge0: float, edge1: float, x: float) -> float:
    """0~1 사이에서 부드럽게 전이되는 함수."""
    if edge0 == edge1:
        return 1.0 if x >= edge1 else 0.0
    t = (x - edge0) / (edge1 - edge0)
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def generate_gabor_patch(spatial_freq, size=200, contrast=0.8, sigma=None, phase=0.0, x_shift_px=0.0):
    """
    가보 패치 생성 (numpy 없이 순수 Python으로)
    
    Parameters:
    -----------
    spatial_freq : float
        공간주파수 (cpd - cycles per degree)
    size : int
        이미지 크기 (픽셀)
    contrast : float
        대비 (0-1)
    sigma : float
        가우시안 표준편차 (None이면 자동 계산)
    
    Returns:
    --------
    PIL.Image
        가보 패치 이미지
    """
    # 가우시안 표준편차 설정
    # - 요구사항: 공간주파수별로 구경(가우시안 포락선)이 작아지지 않도록 sigma는 고정
    if sigma is None:
        # 원형 구경을 사각틀 내에서 최대한 크게 보이도록 완만한 가우시안
        sigma = size / 2.2
    
    # 공간주파수를 픽셀 단위로 변환
    # 1 cpd ≈ 60 pixels/cycle (시야각 1도 ≈ 60픽셀 가정)
    cycles_per_image = spatial_freq * (size / 60.0)
    wavelength = size / cycles_per_image if cycles_per_image > 0 else size
    
    # 이미지 생성
    img = Image.new('L', (size, size), 128)  # 회색 배경
    pixels = []
    
    center = size / 2
    
    for y in range(size):
        row = []
        for x in range(size):
            # 중심으로부터의 거리
            dx = x - center
            dy = y - center
            dist_sq = dx * dx + dy * dy
            
            # 가우시안 포락선
            gaussian = math.exp(-dist_sq / (2 * sigma * sigma))

            # 원형 구경(사각틀 내 최대한 큰 원) + 부드러운 가장자리
            r = math.sqrt(dist_sq)
            aperture_r = size * 0.48
            feather = size * 0.04
            aperture = 1.0 - _smoothstep(aperture_r - feather, aperture_r, r)
            
            # 정현파 격자 (수평 방향)
            # - x_shift_px > 0 이면 줄무늬가 좌→우로 이동하는 드리프트 느낌이 명확해짐
            grating = math.sin(2 * math.pi * (dx - x_shift_px) / wavelength + phase)
            
            # 가보 패치 = (가우시안 × 원형 구경) × 정현파
            gabor_value = (gaussian * aperture) * grating
            
            # 대비 조정 및 0-255 범위로 변환
            pixel_value = int((gabor_value * contrast + 1) / 2 * 255)
            pixel_value = max(0, min(255, pixel_value))  # 클리핑
            
            row.append(pixel_value)
        pixels.append(row)
    
    # 픽셀 데이터를 이미지에 적용
    for y in range(size):
        for x in range(size):
            img.putpixel((x, y), pixels[y][x])
    
    return img

def create_gabor_with_text(spatial_freq, patch_size=200, canvas_padding_bottom=40, label="spatial"):
    """
    텍스트가 포함된 가보 패치 이미지 생성
    
    Parameters:
    -----------
    spatial_freq : float
        공간주파수 (cpd)
    patch_size : int
        가보 패치 사각틀 크기(픽셀)
    canvas_padding_bottom : int
        텍스트를 사각틀 밖(아래)에 표시하기 위한 여백 높이(픽셀)
    
    Returns:
    --------
    PIL.Image
        텍스트가 포함된 가보 패치 이미지
    """
    # (이 함수는 더 이상 기본 경로에서 사용하지 않음: 캡션은 HTML에서 박스 밖으로 표시)
    # 필요시 디버깅용으로만 유지
    patch = generate_gabor_patch(spatial_freq, size=patch_size).convert('RGB')
    canvas_w = patch_size
    canvas_h = patch_size + canvas_padding_bottom
    img = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
    img.paste(patch, (0, 0))
    
    # 텍스트 추가
    draw = ImageDraw.Draw(img)
    
    # 텍스트 내용(HTML figcaption 스타일에 맞춰 통일)
    if label == "temporal":
        text = f"{int(spatial_freq)} temporal frequency (Hz)"
    else:
        text = f"{int(spatial_freq)} spatial frequency (cpd)"
    
    # figcaption(0.9rem) 수준으로 맞춤: 14~15px 정도
    font_size = 15
    
    try:
        # 시스템 폰트 사용 시도
        font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", font_size)
    except:
        try:
            font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", font_size)
        except:
            # 기본 폰트 사용
            font = ImageFont.load_default()
    
    # 텍스트 크기 측정
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # 텍스트 위치: 사각틀 밖(아래), 가운데 정렬
    x = (canvas_w - text_width) // 2
    y = patch_size + (canvas_padding_bottom - text_height) // 2

    # figcaption 색상(#94a3b8)으로 맞춤
    draw.text((x, y), text, fill=(148, 163, 184), font=font)
    
    return img

def create_gabor_gif(output_path="gabor_spatial_frequency.gif", patch_size=200, duration=100):
    """
    가보 패치 GIF 생성
    
    Parameters:
    -----------
    output_path : str
        출력 GIF 파일 경로
    patch_size : int
        가보 패치 사각틀 크기(픽셀)
    duration : int
        각 프레임 지속 시간 (밀리초)
    """
    print("가보 패치 GIF 생성 중...")
    
    # 1부터 30 cpd까지 이미지 생성
    images = []
    spatial_freqs = range(1, 31)  # 1부터 30까지
    
    for i, freq in enumerate(spatial_freqs):
        print(f"생성 중: {freq} cpd ({i+1}/30)")
        # 캡션은 HTML에서 처리: GIF는 순수 패치(200x200)만 생성
        img = generate_gabor_patch(freq, size=patch_size).convert("RGB")
        images.append(img)
    
    # GIF로 저장
    print(f"GIF 저장 중: {output_path}")
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=duration,
        loop=0  # 무한 반복
    )
    
    # 파일 크기 확인
    file_size = os.path.getsize(output_path) / (1024 * 1024)  # MB
    print(f"완료! 파일 크기: {file_size:.2f} MB")
    
    return output_path


def create_temporal_frequency_gif(output_path="temporal_frequency.gif", patch_size=200, duration=100):
    """
    시간주파수(1~30Hz) 변화 GIF 생성
    - 좌측(공간주파수)와 동일한 크기/레이아웃(사각틀 + 아래 텍스트)
    - 내부 패턴은 위상(phase)을 주파수에 비례해 변화시켜 시간 변화를 시각화
    """
    print("시간주파수 GIF 생성 중...")
    images = []

    fixed_spatial_cpd = 4  # 시간주파수 표현용: 공간주파수는 고정
    drift_px_per_hz = 2.0  # 1Hz 증가마다 2px씩 우측으로 이동(프레임 간 드리프트가 직관적)

    for i, hz in enumerate(range(1, 31)):
        print(f"생성 중: {hz} Hz ({i+1}/30)")
        # 프레임 번호가 증가할수록 줄무늬가 좌→우로 일관되게 이동하도록 x_shift를 사용
        x_shift = hz * drift_px_per_hz
        patch = generate_gabor_patch(
            spatial_freq=fixed_spatial_cpd,
            size=patch_size,
            x_shift_px=x_shift,
        ).convert("RGB")
        images.append(patch)

    print(f"GIF 저장 중: {output_path}")
    images[0].save(
        output_path,
        save_all=True,
        append_images=images[1:],
        duration=duration,
        loop=0,
    )
    file_size = os.path.getsize(output_path) / (1024 * 1024)
    print(f"완료! 파일 크기: {file_size:.2f} MB")
    return output_path

if __name__ == "__main__":
    # 필요한 라이브러리 확인
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("=" * 60)
        print("Pillow 라이브러리가 필요합니다.")
        print("설치 방법: pip3 install Pillow")
        print("또는: python3 -m pip install Pillow")
        print("=" * 60)
        exit(1)
    
    # 출력 디렉토리 확인
    output_dir = "assets/images"
    os.makedirs(output_dir, exist_ok=True)
    
    # GIF 생성
    output_path = os.path.join(output_dir, "gabor_spatial_frequency.gif")
    print(f"가보 패치 GIF 생성 시작...")
    print(f"출력 경로: {output_path}")
    print(f"사각틀 크기: 200x200 픽셀 (기존 대비 50% 축소)")
    print(f"프레임 수: 30개 (1-30 cpd)")
    print(f"프레임 지속 시간: 150ms\n")
    
    create_gabor_gif(output_path, patch_size=200, duration=150)  # 150ms per frame
    
    print(f"\n✅ 생성 완료: {output_path}")

    temporal_output_path = os.path.join(output_dir, "temporal_frequency.gif")
    create_temporal_frequency_gif(temporal_output_path, patch_size=200, duration=150)
    print(f"\n✅ 생성 완료: {temporal_output_path}")

