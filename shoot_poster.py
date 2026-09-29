import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        # Using 4K resolution for ultra-crisp typography
        page = await browser.new_page(viewport={"width": 1920, "height": 1080}, device_scale_factor=2)
        
        file_url = r"file:///f:/My-project/mine/personal-portfolio/public/assets/projects/portfolio/screens/poster.html"
        await page.goto(file_url, wait_until="networkidle")
        
        # Wait for google fonts to load
        await page.wait_for_timeout(3000)
        
        output_path = r"f:\My-project\mine\personal-portfolio\public\assets\projects\portfolio\screens\COVER_POSTER_ULTRA.jpg"
        await page.screenshot(path=output_path, type="jpeg", quality=100)
        
        await browser.close()
        print(f"Ultra HD 3D Poster saved to {output_path}")

if __name__ == "__main__":
    asyncio.run(main())
