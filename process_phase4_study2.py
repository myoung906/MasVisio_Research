
from PIL import Image
import os

base_dir = "/Users/jaemyoungseo/workspace/mvr/assets/images/research"

# Input paths
img_setup_path = os.path.join(base_dir, "phase4_study2_experiment_setup.png")
img_risk_path = os.path.join(base_dir, "phase4_study2_risk_distribution.png")
img_corr_path = os.path.join(base_dir, "phase4_study2_correlation_matrix.png")

# Goal: Resize to keep consistency with Study 1 images.
# Study 1:
# Scene: ~356x350 (then reduced to 249x245)
# Monitor: ~442x350 (then reduced height to 245, width 247)
# Graph: height 506 (but display size is flex)
#
# User requested: "Maintain consistency with Study 1 image size and capacity".
# Since Study 1 images were reduced to height ~245px (70% of 350px),
# I should probably target a similar height for these new images to look consistent in a row,
# OR if they are detailed graphs, they might need more resolution but displayed smaller.
# Let's target a consistent height of 350px first (which was the intermediate step) and then scale down if needed,
# or just go straight to the optimized height I used last time: 245px.
# However, graphs might become unreadable at 245px height if they are wide.
# Let's check aspect ratios.

def process_image(path, target_height):
    try:
        with Image.open(path) as img:
            # Convert to RGB
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
                
            w, h = img.size
            ratio = target_height / float(h)
            new_w = int(w * ratio)
            
            # Resize
            img_resized = img.resize((new_w, target_height), Image.Resampling.LANCZOS)
            
            # Save as JPG
            out_path = os.path.splitext(path)[0] + ".jpg"
            img_resized.save(out_path, quality=90, optimize=True)
            print(f"Processed {os.path.basename(path)} -> {os.path.basename(out_path)} ({new_w}x{target_height})")
            
            # Remove PNG
            if out_path != path:
                os.remove(path)
                
    except Exception as e:
        print(f"Error processing {path}: {e}")

# Let's choose a height that balances visibility and consistency.
# The 'Risk Distribution' graph is wide. If height is too small, text is unreadable.
# The 'Correlation Matrix' is square-ish.
# The 'Setup' is vertical/square.
# Strategy: Resize graphs to a slightly larger height (e.g., 506px) so they are legible when zoomed/viewed,
# but control their display size with CSS to match Study 1's visual weight.
# BUT the user said "refer to Study 1 image size and capacity".
# Study 1 final height was ~245px.
# Let's try 350px as a safe middle ground for legibility, allowing CSS to shrink them if needed.
# Or better, keep them at 506px (like Phase 2 standard) but display small.
# Wait, user explicitly asked for "consistency".
# Study 1 images are physically 249x245 and 247x245.
# If I make these graphs 245px high, the text on the risk distribution plot might be illegible.
# I will generate them at 506px height (standard) but set CSS to match visual weight.
# Actually, let's stick to the prompt "refer to Study 1... size and capacity".
# I'll resize them to be relatively small files. Let's go with 350px height.

TARGET_HEIGHT = 350

process_image(img_setup_path, TARGET_HEIGHT)
process_image(img_risk_path, TARGET_HEIGHT)
process_image(img_corr_path, TARGET_HEIGHT)
