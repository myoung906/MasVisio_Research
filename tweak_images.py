import os
from PIL import Image, ImageSequence

def resize_image(path, scale=None, target_height=None, crop_bottom=False, crop_vertical=False):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return

    try:
        img = Image.open(path)
        
        # 1. Crop Bottom (for UI caption)
        if crop_bottom:
            w, h = img.size
            # Assuming caption is at the bottom. Crop bottom 15% roughly or fixed amount if known.
            # Looking at previous screenshot, caption is separate text but user said "caption embedded in image"
            # Let's crop bottom 60 pixels (heuristic) or 15%
            crop_h = int(h * 0.85) 
            img = img.crop((0, 0, w, crop_h))
            print(f"Cropped bottom for {os.path.basename(path)}")
        
        # 2. Crop Vertical (for retinoscopy) - reduce height
        if crop_vertical:
            w, h = img.size
            # Crop top and bottom 10%
            trim_h = int(h * 0.15)
            img = img.crop((0, trim_h, w, h - trim_h))
            print(f"Cropped vertical for {os.path.basename(path)}")

        # 3. Resize by Scale
        if scale:
            w, h = img.size
            new_w = int(w * scale)
            new_h = int(h * scale)
            img = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # 4. Resize by Target Height (maintaining aspect ratio)
        if target_height:
            w, h = img.size
            ratio = target_height / float(h)
            new_w = int(w * ratio)
            img = img.resize((new_w, target_height), Image.Resampling.LANCZOS)

        img.save(path)
        print(f"Processed: {path}")
        
    except Exception as e:
        print(f"Error processing {path}: {e}")

def process_gif(path, target_height):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
        
    try:
        img = Image.open(path)
        frames = []
        for frame in ImageSequence.Iterator(img):
            frame = frame.convert("RGBA")
            w, h = frame.size
            ratio = target_height / float(h)
            new_w = int(w * ratio)
            
            frame = frame.resize((new_w, target_height), Image.Resampling.LANCZOS)
            frames.append(frame)
            
        # Save
        frames[0].save(
            path,
            save_all=True,
            append_images=frames[1:],
            duration=img.info.get('duration', 100),
            loop=0,
            optimize=True
        )
        print(f"Processed GIF: {path}")
    except Exception as e:
        print(f"Error processing GIF {path}: {e}")

# Paths
base_dir = "assets/images/research"
p2_gif = os.path.join(base_dir, "phase2/led_flicker.gif")

p3_retino = os.path.join(base_dir, "phase3/retinoscopy_view.png")
p3_ai = os.path.join(base_dir, "phase3/ai_process_flow.png")
p3_ui = os.path.join(base_dir, "phase3/corneo_scleral_analysis_ui.png")
p3_struct = os.path.join(base_dir, "phase3/structured_light_process.png")

# Execution
# 1. Phase 2 GIF: Target Height 560px (Slightly taller than oct_analysis 506px)
process_gif(p2_gif, 560)

# 2. Phase 3 Retinoscopy: Vertical Crop (Slimmer)
resize_image(p3_retino, crop_vertical=True)

# 3. Phase 3 AI: Scale 70%
resize_image(p3_ai, scale=0.7)

# 4. Phase 3 UI: Crop bottom (caption) + Scale 70%
resize_image(p3_ui, crop_bottom=True, scale=0.7)

# 5. Phase 3 Structured Light: Scale 50%
resize_image(p3_struct, scale=0.5)
