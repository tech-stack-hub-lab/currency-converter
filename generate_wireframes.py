from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

OUT_DIR = Path('assets/images/wireframes')
OUT_DIR.mkdir(parents=True, exist_ok=True)

try:
    font_bold = ImageFont.truetype('/Library/Fonts/Arial Bold.ttf', 24)
    font_regular = ImageFont.truetype('/Library/Fonts/Arial.ttf', 14)
except Exception:
    font_bold = ImageFont.load_default()
    font_regular = ImageFont.load_default()


def text_size(draw, text, font):
    try:
        bbox = draw.textbbox((0, 0), text, font=font)
        return bbox[2] - bbox[0], bbox[3] - bbox[1]
    except Exception:
        return draw.textsize(text, font=font)


def safe_round_rect(draw, box, radius, **kwargs):
    x0, y0, x1, y1 = box
    if x1 < x0:
        x0, x1 = x1, x0
    if y1 < y0:
        y0, y1 = y1, y0
    draw.rounded_rectangle([x0, y0, x1, y1], radius, **kwargs)


def draw_circle_icon(draw, cx, cy, r, fill=None, outline='#475569'):
    draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=fill, outline=outline, width=2)
    if fill is None:
        draw.line([cx, cy - r / 2, cx, cy + r / 2], fill=outline, width=2)
        draw.line([cx - r / 3, cy, cx + r / 3, cy], fill=outline, width=2)


def draw_chevron(draw, x, y, size, outline='#475569'):
    draw.line([x, y, x + size / 2, y + size / 2, x, y + size], fill=outline, width=3)


def draw_background(draw, width, height):
    draw.rectangle([0, 0, width, height], fill='#f8fafc')
    draw.ellipse([-180, 40, 280, 420], fill='#e2e8f0')
    draw.ellipse([width - 260, height - 280, width + 80, height + 160], fill='#eef2ff')
    for offset in range(0, width, 220):
        draw.rectangle([offset, height - 40, offset + 140, height - 10], fill='#e5e7eb')


def draw_navbar(draw, width):
    draw.rectangle([0, 0, width, 88], fill='#ffffff')
    safe_round_rect(draw, [28, 24, 172, 66], 16, outline='#475569', width=2)
    draw.rectangle([32, 30, 112, 46], fill='#475569')
    draw.rectangle([192, 32, 254, 44], fill='#e2e8f0')
    draw.rectangle([270, 32, 332, 44], fill='#e2e8f0')
    draw.rectangle([width - 180, 28, width - 108, 60], outline='#475569', width=2)
    draw_circle_icon(draw, width - 140, 44, 14, fill='#ffffff', outline='#475569')


def draw_hero(draw, x0, y0, x1, y1, width):
    safe_round_rect(draw, [x0, y0, x1, y1], 30, fill='#ffffff', outline='#cbd5e1', width=2)
    draw.rectangle([x0 + 36, y0 + 36, x1 - 36, y0 + 84], fill='#e5e7eb')
    draw.rectangle([x0 + 36, y0 + 110, x1 - 36, y0 + 162], outline='#cbd5e1', width=2)
    draw.rectangle([x0 + 36, y0 + 176, x1 - 36, y0 + 226], outline='#cbd5e1', width=2)
    draw.rectangle([x0 + 36, y0 + 244, x0 + 170, y0 + 288], outline='#475569', width=2)
    draw.rectangle([x0 + 190, y0 + 244, x1 - 36, y0 + 288], fill='#475569')
    draw_chevron(draw, x1 - 66, y0 + 266, 18)
    draw.rectangle([x0 + 36, y0 + 304, x1 - 36, y0 + 344], outline='#cbd5e1', width=2)
    draw_circle_icon(draw, x0 + 64, y0 + 134, 16, fill='#e2e8f0')
    draw_circle_icon(draw, x0 + 64, y0 + 200, 16, fill='#e2e8f0')


def draw_weather_panel(draw, x0, y0, x1, y1):
    safe_round_rect(draw, [x0, y0, x1, y1], 24, fill='#ffffff', outline='#cbd5e1', width=2)
    draw.rectangle([x0 + 22, y0 + 22, x0 + 100, y0 + 60], fill='#e2e8f0')
    draw_circle_icon(draw, x0 + 60, y0 + 48, 14, fill='#ffffff', outline='#475569')
    draw.rectangle([x0 + 130, y0 + 26, x1 - 22, y0 + 46], outline='#cbd5e1', width=2)
    for i in range(3):
        draw.rectangle([x0 + 22, y0 + 82 + i * 32, x0 + 94, y0 + 100 + i * 32], outline='#cbd5e1', width=2)
        draw.rectangle([x0 + 112, y0 + 82 + i * 32, x1 - 22, y0 + 100 + i * 32], outline='#cbd5e1', width=2)


def draw_chart(draw, x0, y0, x1, y1):
    safe_round_rect(draw, [x0, y0, x1, y1], 24, fill='#ffffff', outline='#cbd5e1', width=2)
    draw.rectangle([x0 + 24, y0 + 24, x0 + 120, y0 + 52], fill='#e2e8f0')
    draw.line([x0 + 32, y1 - 52, x0 + 92, y1 - 92, x0 + 152, y1 - 70, x0 + 212, y1 - 108, x0 + 272, y1 - 82], fill='#475569', width=4)
    for x in range(x0 + 40, x1 - 24, int((x1 - x0 - 64) / 5)):
        draw.rectangle([x, y1 - 28, x + 24, y1 - 16], fill='#e2e8f0')


def draw_cards(draw, x0, y0, width, count, columns):
    gutter = 20
    card_w = (width - (columns + 1) * gutter) / columns
    for i in range(count):
        row = i // columns
        col = i % columns
        left = x0 + gutter + col * (card_w + gutter)
        top = y0 + row * 148
        safe_round_rect(draw, [left, top, left + card_w, top + 120], 20, fill='#ffffff', outline='#cbd5e1', width=2)
        draw_circle_icon(draw, left + 32, top + 40, 14, fill='#e2e8f0')
        draw.rectangle([left + 68, top + 34, left + 132, top + 48], fill='#e2e8f0')
        draw.rectangle([left + 68, top + 60, left + 132, top + 72], fill='#e2e8f0')


def draw_about_faq(draw, x0, y0, width, layout):
    if layout == 'desktop':
        about_box = [x0, y0, x0 + width * 0.55 - 16, y0 + 160]
        faq_box = [x0 + width * 0.55 + 16, y0, x0 + width, y0 + 160]
    else:
        about_box = [x0, y0, x0 + width, y0 + 140]
        faq_box = [x0, y0 + 164, x0 + width, y0 + 304]
    safe_round_rect(draw, about_box, 24, fill='#ffffff', outline='#cbd5e1', width=2)
    safe_round_rect(draw, faq_box, 24, fill='#ffffff', outline='#cbd5e1', width=2)
    draw.rectangle([about_box[0] + 24, about_box[1] + 24, about_box[0] + 140, about_box[1] + 56], fill='#e2e8f0')
    draw.rectangle([about_box[0] + 24, about_box[1] + 76, about_box[2] - 24, about_box[1] + 98], fill='#e2e8f0')
    if layout == 'desktop':
        for idx in range(3):
            top = faq_box[1] + 24 + idx * 40
            draw.rectangle([faq_box[0] + 24, top, faq_box[2] - 24, top + 30], outline='#cbd5e1', width=2)
            draw_chevron(draw, faq_box[2] - 46, top + 14, 18)
    else:
        for idx in range(3):
            top = faq_box[1] + 24 + idx * 42
            draw.rectangle([faq_box[0] + 24, top, faq_box[2] - 24, top + 32], outline='#cbd5e1', width=2)
            draw_chevron(draw, faq_box[2] - 46, top + 16, 18)


def draw_footer(draw, width, y0):
    draw.rectangle([0, y0, width, y0 + 72], fill='#ffffff')
    for idx in range(4):
        left = 30 + idx * 170
        draw.rectangle([left, y0 + 20, left + 110, y0 + 28], fill='#e2e8f0')
        draw.rectangle([left, y0 + 38, left + 22, y0 + 54], fill='#e2e8f0')


def draw_wireframe(canvas_size, file_name, layout='desktop'):
    width, height = canvas_size
    img = Image.new('RGB', canvas_size, '#f8fafc')
    draw = ImageDraw.Draw(img)
    draw_background(draw, width, height)
    draw_navbar(draw, width)

    if layout == 'desktop':
        draw_hero(draw, 30, 120, width - 340, 320, width)
        draw_weather_panel(draw, width - 300, 120, width - 40, 220)
        draw_chart(draw, 30, 360, width - 340, 560)
        draw_cards(draw, 30, 600, width - 340, 4, 4)
        draw_about_faq(draw, 30, 780, width - 340, 'desktop')
        draw_footer(draw, width, 980)
    elif layout == 'tablet':
        draw_hero(draw, 24, 120, width - 24, 320, width)
        draw_weather_panel(draw, 24, 340, width - 24, 420)
        draw_chart(draw, 24, 450, width - 24, 610)
        draw_cards(draw, 0, 690, width, 4, 2)
        draw_about_faq(draw, 24, 980, width - 48, 'tablet')
        draw_footer(draw, width, 1140)
    else:
        draw_hero(draw, 18, 120, width - 18, 300, width)
        draw_weather_panel(draw, 18, 320, width - 18, 400)
        draw_chart(draw, 18, 430, width - 18, 560)
        draw_cards(draw, 0, 610, width, 4, 1)
        draw_about_faq(draw, 18, 920, width - 36, 'mobile')
        draw_footer(draw, width, 1160)

    img.save(OUT_DIR / file_name)
    print(f'Created {file_name}')


draw_wireframe((1440, 1200), 'wireframe-desktop.png', layout='desktop')
draw_wireframe((768, 1340), 'wireframe-tablet.png', layout='tablet')
draw_wireframe((375, 1680), 'wireframe-mobile.png', layout='mobile')
