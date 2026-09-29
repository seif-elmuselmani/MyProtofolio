import os
import urllib.request
from PIL import Image, ImageDraw, ImageFilter, ImageFont

output_dir = r"f:\My-project\mine\personal-portfolio\public\assets\projects\portfolio\screens"
poster_path = os.path.join(output_dir, "COVER_POSTER.jpg")

# 1. Download a professional font
font_path = r"C:\Windows\Fonts\segoeuib.ttf"

def create_gradient(width, height, color1, color2):
    base = Image.new('RGB', (width, height), color1)
    top = Image.new('RGB', (width, height), color2)
    mask = Image.new('L', (width, height))
    mask_data = []
    for y in range(height):
        for x in range(width):
            mask_data.append(int(255 * (y / height)))
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

def create_mac_window(img_path, width):
    screenshot = Image.open(img_path).convert("RGBA")
    ratio = width / screenshot.width
    height = int(screenshot.height * ratio)
    if height > 800: height = 800
    
    screenshot = screenshot.resize((width, int(screenshot.height * ratio)), Image.Resampling.LANCZOS)
    screenshot = screenshot.crop((0, 0, width, height))
    
    header_h = 45
    window = Image.new("RGBA", (width, height + header_h), (0,0,0,0))
    draw = ImageDraw.Draw(window)
    draw.rounded_rectangle([0, 0, width, height + header_h], radius=15, fill=(30, 41, 59, 255))
    draw.ellipse([20, 15, 35, 30], fill=(239, 68, 68, 255))
    draw.ellipse([45, 15, 60, 30], fill=(234, 179, 8, 255))
    draw.ellipse([70, 15, 85, 30], fill=(34, 197, 94, 255))
    
    window.paste(screenshot, (0, header_h))
    
    # Drop shadow
    shadow = Image.new("RGBA", (width, height + header_h), (0, 0, 0, 180))
    shadow_canvas = Image.new("RGBA", (width+100, height+header_h+100), (0,0,0,0))
    shadow_canvas.paste(shadow, (50, 70))
    shadow_canvas = shadow_canvas.filter(ImageFilter.GaussianBlur(25))
    
    final_window = Image.new("RGBA", (width+100, height+header_h+100), (0,0,0,0))
    final_window.paste(shadow_canvas, (0,0), shadow_canvas)
    final_window.paste(window, (50, 30), window)
    return final_window

print("Compositing Poster Canvas...")
# Create a massive 1920x1080 canvas
canvas_w, canvas_h = 1920, 1080
canvas = create_gradient(canvas_w, canvas_h, (15, 23, 42), (13, 148, 136)).convert("RGBA")

# Draw Typography
draw = ImageDraw.Draw(canvas)
font_huge = ImageFont.truetype(font_path, 90)
font_sub = ImageFont.truetype(font_path, 40)
draw.text((120, 150), "SEIF ELMUSELMANI", font=font_huge, fill=(255, 255, 255, 255))
draw.text((125, 260), "SYSTEM ARCHITECT & BACKEND ENGINEER", font=font_sub, fill=(167, 243, 208, 255))
draw.text((125, 320), "Personal Portfolio Showcase", font=font_sub, fill=(148, 163, 184, 255))

print("Processing mockups...")
# Make 3 overlapping floating mockups
w1 = create_mac_window(os.path.join(output_dir, "3_about.png"), 900)
w2 = create_mac_window(os.path.join(output_dir, "2_projects.png"), 1000)
w3 = create_mac_window(os.path.join(output_dir, "1_home.png"), 1100)

# Rotate for dynamic Behance look
w1 = w1.rotate(15, resample=Image.Resampling.BICUBIC, expand=True)
w2 = w2.rotate(8, resample=Image.Resampling.BICUBIC, expand=True)
w3 = w3.rotate(0, resample=Image.Resampling.BICUBIC, expand=True)

print("Pasting into layout...")
# Paste from back to front
canvas.paste(w1, (900, -50), w1)
canvas.paste(w2, (600, 150), w2)
canvas.paste(w3, (200, 350), w3)

# Save
canvas.convert("RGB").save(poster_path, "JPEG", quality=100)
print(f"BAM! Poster generated at: {poster_path}")
