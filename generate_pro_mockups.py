import os
from PIL import Image, ImageDraw, ImageFilter

input_dir = r"f:\My-project\mine\personal-portfolio\public\assets\projects\portfolio\screens"
output_dir = r"f:\My-project\mine\personal-portfolio\public\assets\projects\portfolio\screens\pro_mockups"

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Gradient background generator
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

canvas_w, canvas_h = 1920, 1200
# Gradient colors (Deep Tech Blue to Slate)
bg_color1 = (15, 23, 42) # Slate 900
bg_color2 = (30, 58, 138) # Blue 900

print("Generating Professional UI Mockups...")

for filename in os.listdir(input_dir):
    if filename.endswith(".png"):
        img_path = os.path.join(input_dir, filename)
        screenshot = Image.open(img_path).convert("RGBA")
        
        # We want the browser window to be about 1300px wide
        browser_w = 1300
        # Calculate height based on aspect ratio, max 850px high to show the best part
        ratio = browser_w / screenshot.width
        browser_h = int(screenshot.height * ratio)
        if browser_h > 850:
            browser_h = 850
        
        # Resize screenshot and crop if it's too tall
        screenshot = screenshot.resize((browser_w, int(screenshot.height * ratio)), Image.Resampling.LANCZOS)
        screenshot = screenshot.crop((0, 0, browser_w, browser_h))
        
        # Create mac browser header
        header_h = 45
        window = Image.new("RGBA", (browser_w, browser_h + header_h), (0,0,0,0))
        draw = ImageDraw.Draw(window)
        # Draw rounded rectangle for header (grayish dark)
        draw.rounded_rectangle([0, 0, browser_w, browser_h + header_h], radius=12, fill=(30, 41, 59, 255))
        # Draw Mac buttons
        draw.ellipse([20, 15, 35, 30], fill=(239, 68, 68, 255)) # Red
        draw.ellipse([45, 15, 60, 30], fill=(234, 179, 8, 255)) # Yellow
        draw.ellipse([70, 15, 85, 30], fill=(34, 197, 94, 255)) # Green
        
        # Paste the screenshot under the header
        window.paste(screenshot, (0, header_h))
        
        # Create a massive, soft drop shadow for realism
        shadow = Image.new("RGBA", (browser_w, browser_h + header_h), (0, 0, 0, 160))
        shadow_canvas = Image.new("RGBA", (canvas_w, canvas_h), (0,0,0,0))
        paste_x = (canvas_w - browser_w) // 2
        paste_y = (canvas_h - (browser_h + header_h)) // 2
        
        # Paste shadow offset downwards
        shadow_canvas.paste(shadow, (paste_x, paste_y + 40))
        # Apply heavy blur to the shadow
        shadow_canvas = shadow_canvas.filter(ImageFilter.GaussianBlur(35))
        
        # Create final gradient canvas
        canvas = create_gradient(canvas_w, canvas_h, bg_color1, bg_color2).convert("RGBA")
        
        # Composite: Background -> Shadow -> Window
        canvas.paste(shadow_canvas, (0,0), shadow_canvas)
        canvas.paste(window, (paste_x, paste_y), window)
        
        # Save as high quality JPEG
        out_name = f"mockup_{filename.replace('.png', '.jpg')}"
        out_path = os.path.join(output_dir, out_name)
        canvas.convert("RGB").save(out_path, "JPEG", quality=95)
        print(f"Generated {out_name}")

print("All pro mockups generated successfully!")
