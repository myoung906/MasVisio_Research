#!/usr/bin/env python3
"""
시각재활 연구센터 웹사이트 이미지 리사이저
원하는 사이즈로 이미지를 자르고 크기를 조정하는 도구
"""

import os
import sys
from PIL import Image, ImageEnhance, ImageFilter
import argparse
from pathlib import Path

class ImageResizer:
    def __init__(self):
        self.supported_formats = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.webp']
        
    def resize_image(self, input_path, output_path, width, height, crop_mode='center', quality=95):
        """
        이미지 크기 조정 및 자르기
        
        Args:
            input_path (str): 입력 이미지 경로
            output_path (str): 출력 이미지 경로
            width (int): 출력 너비
            height (int): 출력 높이
            crop_mode (str): 자르기 모드 ('center', 'top', 'bottom', 'left', 'right')
            quality (int): JPEG 품질 (1-100)
        """
        try:
            # 이미지 열기
            with Image.open(input_path) as img:
                # EXIF 정보 기반 자동 회전
                if hasattr(img, '_getexif'):
                    exif = img._getexif()
                    if exif is not None:
                        orientation = exif.get(274)  # 274 is the orientation tag
                        if orientation == 3:
                            img = img.rotate(180, expand=True)
                        elif orientation == 6:
                            img = img.rotate(270, expand=True)
                        elif orientation == 8:
                            img = img.rotate(90, expand=True)
                
                # 원본 크기
                orig_width, orig_height = img.size
                target_ratio = width / height
                orig_ratio = orig_width / orig_height
                
                # 비율에 따른 리사이징
                if orig_ratio > target_ratio:
                    # 원본이 더 넓음 - 높이 기준으로 리사이즈
                    new_height = height
                    new_width = int(orig_width * height / orig_height)
                else:
                    # 원본이 더 높음 - 너비 기준으로 리사이즈
                    new_width = width
                    new_height = int(orig_height * width / orig_width)
                
                # 리사이즈
                resized_img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                
                # 자르기 위치 계산
                if crop_mode == 'center':
                    left = (new_width - width) // 2
                    top = (new_height - height) // 2
                elif crop_mode == 'top':
                    left = (new_width - width) // 2
                    top = 0
                elif crop_mode == 'bottom':
                    left = (new_width - width) // 2
                    top = new_height - height
                elif crop_mode == 'left':
                    left = 0
                    top = (new_height - height) // 2
                elif crop_mode == 'right':
                    left = new_width - width
                    top = (new_height - height) // 2
                else:
                    left = (new_width - width) // 2
                    top = (new_height - height) // 2
                
                # 자르기
                cropped_img = resized_img.crop((left, top, left + width, top + height))
                
                # 출력 디렉토리 생성
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                
                # 저장
                if output_path.lower().endswith('.jpg') or output_path.lower().endswith('.jpeg'):
                    # RGB로 변환 (JPEG는 투명도 지원 안함)
                    if cropped_img.mode in ('RGBA', 'LA'):
                        background = Image.new('RGB', cropped_img.size, (255, 255, 255))
                        background.paste(cropped_img, mask=cropped_img.split()[-1] if cropped_img.mode == 'RGBA' else None)
                        cropped_img = background
                    cropped_img.save(output_path, 'JPEG', quality=quality, optimize=True)
                else:
                    cropped_img.save(output_path, optimize=True)
                
                print(f"✅ 이미지 처리 완료: {input_path} -> {output_path}")
                print(f"   원본 크기: {orig_width}x{orig_height}")
                print(f"   출력 크기: {width}x{height}")
                
        except Exception as e:
            print(f"❌ 이미지 처리 실패: {input_path}")
            print(f"   오류: {str(e)}")
            return False
        
        return True
    
    def batch_resize(self, input_dir, output_dir, width, height, crop_mode='center', quality=95):
        """
        디렉토리 내 모든 이미지 일괄 처리
        """
        input_path = Path(input_dir)
        output_path = Path(output_dir)
        
        if not input_path.exists():
            print(f"❌ 입력 디렉토리가 존재하지 않습니다: {input_dir}")
            return
        
        # 지원되는 이미지 파일 찾기
        image_files = []
        for ext in self.supported_formats:
            image_files.extend(input_path.glob(f"*{ext}"))
            image_files.extend(input_path.glob(f"*{ext.upper()}"))
        
        if not image_files:
            print(f"❌ 지원되는 이미지 파일을 찾을 수 없습니다: {input_dir}")
            return
        
        print(f"📁 {len(image_files)}개의 이미지 파일을 처리합니다...")
        
        success_count = 0
        for img_file in image_files:
            output_file = output_path / img_file.name
            if self.resize_image(str(img_file), str(output_file), width, height, crop_mode, quality):
                success_count += 1
        
        print(f"\n🎉 처리 완료: {success_count}/{len(image_files)} 파일 성공")
    
    def create_web_variants(self, input_path, output_dir):
        """
        웹사이트용 다양한 크기의 이미지 생성
        """
        variants = {
            'hero': (1920, 1080),      # 히어로 이미지
            'card': (400, 300),        # 카드 이미지
            'thumbnail': (150, 150),   # 썸네일
            'gallery': (800, 600),     # 갤러리 이미지
            'team': (300, 400),        # 팀 멤버 이미지 (세로)
        }
        
        filename = Path(input_path).stem
        ext = Path(input_path).suffix.lower()
        if ext not in ['.jpg', '.jpeg']:
            ext = '.jpg'
        
        print(f"🖼️  웹사이트용 이미지 생성: {filename}")
        
        for variant_name, (w, h) in variants.items():
            output_path = Path(output_dir) / f"{filename}_{variant_name}{ext}"
            self.resize_image(input_path, str(output_path), w, h, 'center', 85)
    
    def enhance_image(self, input_path, output_path, brightness=1.0, contrast=1.0, saturation=1.0, sharpness=1.0):
        """
        이미지 품질 향상
        """
        try:
            with Image.open(input_path) as img:
                # 밝기 조정
                if brightness != 1.0:
                    enhancer = ImageEnhance.Brightness(img)
                    img = enhancer.enhance(brightness)
                
                # 대비 조정
                if contrast != 1.0:
                    enhancer = ImageEnhance.Contrast(img)
                    img = enhancer.enhance(contrast)
                
                # 채도 조정
                if saturation != 1.0:
                    enhancer = ImageEnhance.Color(img)
                    img = enhancer.enhance(saturation)
                
                # 선명도 조정
                if sharpness != 1.0:
                    enhancer = ImageEnhance.Sharpness(img)
                    img = enhancer.enhance(sharpness)
                
                # 출력 디렉토리 생성
                os.makedirs(os.path.dirname(output_path), exist_ok=True)
                
                # 저장
                img.save(output_path, optimize=True, quality=95)
                print(f"✨ 이미지 품질 향상 완료: {output_path}")
                
        except Exception as e:
            print(f"❌ 이미지 품질 향상 실패: {str(e)}")
            return False
        
        return True

def main():
    parser = argparse.ArgumentParser(description='시각재활 연구센터 이미지 리사이저')
    parser.add_argument('input', help='입력 이미지 파일 또는 디렉토리')
    parser.add_argument('-o', '--output', help='출력 경로', required=True)
    parser.add_argument('-w', '--width', type=int, help='출력 너비', required=True)
    parser.add_argument('-h', '--height', type=int, help='출력 높이', required=True)
    parser.add_argument('-c', '--crop', choices=['center', 'top', 'bottom', 'left', 'right'], 
                       default='center', help='자르기 모드 (기본: center)')
    parser.add_argument('-q', '--quality', type=int, default=95, 
                       help='JPEG 품질 1-100 (기본: 95)')
    parser.add_argument('--batch', action='store_true', 
                       help='디렉토리 내 모든 이미지 일괄 처리')
    parser.add_argument('--web-variants', action='store_true',
                       help='웹사이트용 다양한 크기 생성')
    parser.add_argument('--enhance', action='store_true',
                       help='이미지 품질 향상')
    parser.add_argument('--brightness', type=float, default=1.0,
                       help='밝기 조정 (0.5-2.0, 기본: 1.0)')
    parser.add_argument('--contrast', type=float, default=1.0,
                       help='대비 조정 (0.5-2.0, 기본: 1.0)')
    parser.add_argument('--saturation', type=float, default=1.0,
                       help='채도 조정 (0.0-2.0, 기본: 1.0)')
    parser.add_argument('--sharpness', type=float, default=1.0,
                       help='선명도 조정 (0.0-2.0, 기본: 1.0)')
    
    args = parser.parse_args()
    
    resizer = ImageResizer()
    
    if args.web_variants:
        resizer.create_web_variants(args.input, args.output)
    elif args.batch:
        resizer.batch_resize(args.input, args.output, args.width, args.height, 
                           args.crop, args.quality)
    elif args.enhance:
        resizer.enhance_image(args.input, args.output, args.brightness, 
                            args.contrast, args.saturation, args.sharpness)
    else:
        resizer.resize_image(args.input, args.output, args.width, args.height, 
                           args.crop, args.quality)

if __name__ == '__main__':
    # PIL 설치 확인
    try:
        from PIL import Image
    except ImportError:
        print("❌ Pillow 라이브러리가 설치되지 않았습니다.")
        print("다음 명령으로 설치하세요: pip install Pillow")
        sys.exit(1)
    
    main()