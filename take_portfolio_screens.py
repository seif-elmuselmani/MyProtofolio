import asyncio
from playwright.async_api import async_playwright
import os

routes = [
    ("", "1_home.png"),
    ("projects", "2_projects.png"),
    ("about", "3_about.png"),
    ("credentials", "4_credentials.png"),
    ("teaching", "5_teaching.png"),
    ("presentations", "6_presentations.png"),
    ("testimonials", "7_testimonials.png"),
    ("contact", "8_contact.png")
]

base_url = "http://localhost:5173/"
output_dir = r"f:\My-project\mine\personal-portfolio\public\assets\projects\portfolio\screens"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1920, "height": 1080})
        
        print("Taking screenshots of the portfolio...")
        for route, filename in routes:
            url = base_url + route
            print(f"Navigating to {url} ...")
            try:
                await page.goto(url, wait_until="networkidle")
                # Wait a little extra for animations/images to load fully
                await page.wait_for_timeout(2000)
                
                output_path = os.path.join(output_dir, filename)
                # Take full page screenshot
                await page.screenshot(path=output_path, full_page=True)
                print(f"Saved {filename}")
            except Exception as e:
                print(f"Failed on {url}: {e}")
                
        await browser.close()
        print("All screenshots done!")

if __name__ == "__main__":
    asyncio.run(main())
