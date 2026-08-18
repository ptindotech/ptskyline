"""Create deterministic social-share composites from supplied logos/photos and locked brand colors.
These are layout derivatives, not synthetic project imagery.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "og"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 1200, 630
NAVY = (11, 30, 61)
BLUE = (47, 161, 219)
CYAN = (28, 171, 241)
WHITE = (255, 255, 255)
FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REGULAR = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
LOGO = ROOT / "assets" / "logos" / "mendozer-logo-full-1024w.png"

pages = {
    "home": ("One group.\nSix directions.", "Multi-sector solutions, built for Namibia.", ROOT / "public/images/projects/construction/road-works-2.jpg"),
    "about": ("A group built for\nthe whole picture.", "About Mendozer Investments", ROOT / "public/images/projects/logistics/crew-roadside.jpg"),
    "construction": ("Construction &\nInfrastructure", "Mendozer Investments", ROOT / "public/images/projects/construction/IMG-20260808-WA0033.jpg"),
    "technology": ("Technology &\nSystems", "Mendozer Investments", ROOT / "public/images/projects/technology/IMG-20260808-WA0061.jpg"),
    "cooling": ("Cooling &\nCold Chain", "Mendozer Investments", ROOT / "public/images/projects/cooling/IMG-20260808-WA0047.jpg"),
    "logistics": ("Logistics &\nSupport Services", "Mendozer Investments", ROOT / "public/images/projects/logistics/founder-site-visit.jpg"),
    "energy": ("Fuel & Energy\nDistribution", "Mendozer Investments", ROOT / "public/images/projects/fuel-energy/plant-piping.jpg"),
    "tourism": ("Tourism &\nAgriculture", "Mendozer Investments", ROOT / "public/images/projects/tourism/IMG-20260808-WA0055.jpg"),
    "community": ("Community &\nSponsorship", "Mendozer Investments", ROOT / "public/images/projects/community/IMG-20260808-WA0077.jpg"),
    "contact": ("Start with the right\nconversation.", "Contact Mendozer Investments", ROOT / "public/images/projects/technology/IMG-20260808-WA0061.jpg"),
}


def crop_cover(image: Image.Image, size=(W, H)) -> Image.Image:
    return ImageOps.fit(image.convert("RGB"), size, method=Image.Resampling.LANCZOS, centering=(0.5, 0.5))


def draw_multiline(draw, position, text, font, fill, spacing):
    draw.multiline_text(position, text, font=font, fill=fill, spacing=spacing)


def add_gradient_overlay(image: Image.Image):
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    px = overlay.load()
    for x in range(W):
        # navy is deliberately strongest behind type; photo remains present at the far right.
        alpha = int(238 - (x / (W - 1)) * 150)
        for y in range(H):
            vertical = int(max(0, (y - H * 0.72) / (H * 0.28)) * 30)
            px[x, y] = (*NAVY, min(250, alpha + vertical))
    return Image.alpha_composite(image.convert("RGBA"), overlay)


logo = Image.open(LOGO).convert("RGBA")
for slug, (title, subtitle, photo_path) in pages.items():
    background = crop_cover(Image.open(photo_path))
    canvas = add_gradient_overlay(background)
    draw = ImageDraw.Draw(canvas, "RGBA")

    # Exact client-supplied logo asset is placed intact on a quiet field.
    panel = (58, 54, 378, 164)
    draw.rounded_rectangle(panel, radius=12, fill=WHITE + (241,))
    logo_copy = logo.copy()
    logo_copy.thumbnail((255, 94), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo_copy, (90, 64 + (90 - logo_copy.height) // 2))

    draw.rectangle((58, 224, 106, 229), fill=BLUE + (255,))
    title_font = ImageFont.truetype(FONT_BOLD, 64)
    subtitle_font = ImageFont.truetype(FONT_REGULAR, 22)
    small_font = ImageFont.truetype(FONT_BOLD, 15)
    draw_multiline(draw, (58, 253), title, title_font, WHITE + (255,), spacing=4)
    draw.text((60, 494), subtitle, font=subtitle_font, fill=(199, 211, 227, 255))
    draw.text((60, 574), "MENDOZER INVESTMENTS", font=small_font, fill=BLUE + (255,))
    draw.text((1025, 574), "NAMIBIA", font=small_font, fill=WHITE + (190,), anchor="ra")
    canvas.convert("RGB").save(OUT / f"{slug}.png", "PNG", optimize=True)
    print(f"generated {OUT / f'{slug}.png'}")
