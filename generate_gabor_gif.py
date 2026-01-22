#!/usr/bin/env python3
"""
가보 패치 GIF 생성 스크립트
1 cpd부터 30 cpd까지 공간주파수가 변화하는 가보 패치 이미지 30개를 생성하고 GIF로 합성합니다.
"""

import math
from PIL import Image, ImageDraw, ImageFont
import os

def generate_gabor_patch(spatial_freq, size=200, contrast=0.8, sigma=None):
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
        sigma = size / 4
    
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
            
            # 정현파 격자 (수평 방향)
            grating = math.sin(2 * math.pi * dx / wavelength)
            
            # 가보 패치 = 가우시안 포락선 × 정현파 격자
            gabor_value = gaussian * grating
            
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

def create_gabor_with_text(spatial_freq, patch_size=200, canvas_padding_bottom=40):
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
    # 가보 패치(사각틀) 생성
    patch = generate_gabor_patch(spatial_freq, size=patch_size).convert('RGB')

    # 전체 캔버스(사각틀 + 아래 텍스트 영역) 생성
    canvas_w = patch_size
    canvas_h = patch_size + canvas_padding_bottom
    img = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
    img.paste(patch, (0, 0))
    
    # 텍스트 추가
    draw = ImageDraw.Draw(img)
    
    # 텍스트 내용: '*' 제거, 표기 통일
    text = f"{int(spatial_freq)} spatial frequency (cpd)"
    
    # 폰트 크기 설정
    # 사각틀이 작아졌으니 폰트도 축소
    font_size = max(14, patch_size // 12)
    
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

    # 텍스트 그리기 (검은색)
    draw.text((x, y), text, fill=(0, 0, 0), font=font)
    
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
        img = create_gabor_with_text(freq, patch_size=patch_size)
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

