import fitz
import json
import os
import re
from PIL import Image

PDF_PATH = '/Users/tushargirdhar/.gemini/antigravity/brain/a3914bfe-1761-4751-ba66-341743ef2056/.user_uploaded/media_1792974012196.pdf'
OUTPUT_IMG_DIR = 'public/images/products'
os.makedirs(OUTPUT_IMG_DIR, exist_ok=True)

# Item number to (page_number_1_indexed, y0, y1, x0, x1)
# Note: standard left column product photo box x is ~32 to 148
ITEM_BOXES = {
    # Page 3
    1: (3, 195, 305, 32, 148),
    2: (3, 415, 530, 32, 148),
    3: (3, 635, 735, 32, 148),
    # Page 4
    4: (4, 190, 300, 32, 148),
    5: (4, 430, 505, 32, 148),
    6: (4, 615, 725, 32, 148),
    # Page 5
    7: (5, 160, 315, 32, 148),
    8: (5, 420, 520, 32, 148),
    9: (5, 620, 725, 32, 148),
    # Page 6 (4 items)
    10: (6, 175, 268, 32, 148),
    11: (6, 305, 408, 32, 148),
    12: (6, 465, 570, 32, 148),
    13: (6, 625, 735, 32, 148),
    # Page 7
    14: (7, 195, 325, 32, 148),
    15: (7, 410, 510, 32, 148),
    16: (7, 615, 725, 32, 148),
    # Page 8 (4 items)
    17: (8, 195, 275, 32, 148),
    18: (8, 375, 475, 32, 148),
    19: (8, 510, 610, 32, 148),
    20: (8, 650, 740, 32, 148),
    # Page 9 (4 items)
    21: (9, 180, 270, 32, 148),
    22: (9, 325, 425, 32, 148),
    23: (9, 475, 575, 32, 148),
    24: (9, 625, 735, 32, 148),
    # Page 10
    25: (10, 205, 315, 32, 148),
    26: (10, 415, 525, 32, 148),
    27: (10, 600, 715, 32, 148),
    # Page 11 (5 items)
    28: (11, 200, 310, 32, 148),
    29: (11, 340, 448, 32, 148),
    30: (11, 485, 575, 32, 148),
    31: (11, 610, 675, 32, 148),
    32: (11, 685, 770, 32, 148),
    # Page 12
    33: (12, 200, 305, 32, 148),
    34: (12, 405, 510, 32, 148),
    35: (12, 615, 725, 32, 148),
    # Page 13
    36: (13, 200, 318, 32, 148),
    37: (13, 385, 538, 32, 148),
    38: (13, 630, 740, 32, 148),
    # Page 14
    39: (14, 195, 300, 32, 148),
    40: (14, 420, 535, 32, 148),
    41: (14, 620, 735, 32, 148),
    # Page 15
    42: (15, 180, 328, 32, 148),
    43: (15, 400, 535, 32, 148),
    44: (15, 645, 718, 32, 148),
    # Page 16
    45: (16, 190, 290, 32, 148),
    46: (16, 405, 530, 32, 148),
    47: (16, 580, 740, 32, 148),
    # Page 17
    48: (17, 210, 318, 32, 148),
    49: (17, 415, 550, 32, 148),
    50: (17, 620, 735, 32, 148),
    # Page 18
    51: (18, 205, 328, 32, 148),
    52: (18, 425, 532, 32, 148),
    53: (18, 615, 740, 32, 148),
    # Page 19
    54: (19, 190, 338, 32, 148),
    55: (19, 420, 535, 32, 148),
    56: (19, 605, 730, 32, 148),
    # Page 20
    57: (20, 205, 325, 32, 148),
    58: (20, 405, 535, 32, 148),
    59: (20, 610, 725, 32, 148),
    # Page 21
    60: (21, 215, 328, 32, 148),
    61: (21, 405, 528, 32, 148),
    62: (21, 600, 725, 32, 148),
    # Page 22
    63: (22, 195, 298, 32, 148),
    64: (22, 410, 525, 32, 148),
    65: (22, 615, 722, 32, 148),
    # Page 23
    66: (23, 210, 315, 32, 148),
    67: (23, 415, 538, 32, 148),
    68: (23, 625, 730, 32, 148),
    # Page 24
    69: (24, 220, 315, 32, 148),
    70: (24, 405, 540, 32, 148),
    71: (24, 620, 722, 32, 148),
    # Page 25
    72: (25, 180, 330, 32, 148),
    73: (25, 400, 505, 32, 148),
    74: (25, 585, 745, 32, 148),
    # Page 26 (4 items)
    75: (26, 185, 280, 32, 148),
    76: (26, 315, 455, 32, 148),
    77: (26, 490, 600, 32, 148),
    78: (26, 640, 750, 32, 148),
}

def extract_and_crop_images():
    doc = fitz.open(PDF_PATH)
    dpi = 216 # 3x scale for crisp rendering
    scale = dpi / 72.0
    
    saved_images = {}
    for item_no in range(1, 79):
        page_num, y0, y1, x0, x1 = ITEM_BOXES[item_no]
        page = doc[page_num - 1]
        
        pix = page.get_pixmap(dpi=dpi)
        img = Image.frombytes('RGB', [pix.width, pix.height], pix.samples)
        
        crop_box = (
            int(x0 * scale),
            int(y0 * scale),
            int(x1 * scale),
            int(y1 * scale)
        )
        cropped = img.crop(crop_box)
        
        # Save as PNG
        out_filename = f"flowsid-{item_no:03d}.png"
        out_path = os.path.join(OUTPUT_IMG_DIR, out_filename)
        cropped.save(out_path, format="PNG", optimize=True)
        
        saved_images[item_no] = {
            "image": f"/images/products/{out_filename}",
            "sourcePage": page_num,
            "cropBox": [x0, y0, x1, y1],
            "resolution": cropped.size
        }
        
    print(f"Extracted and saved all {len(saved_images)} product images!")
    return saved_images

if __name__ == '__main__':
    extract_and_crop_images()
