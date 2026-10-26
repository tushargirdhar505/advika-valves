import os
import json
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image as RLImage, PageBreak, KeepTogether, HRFlowable
)
from reportlab.pdfgen import canvas

PDF_OUT_PATH = "public/catalogs/Advika-Valves-Product-Catalog.pdf"
os.makedirs("public/catalogs", exist_ok=True)

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        if self._pageNumber == 1:
            return  # skip cover
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#475569"))
        
        # Header line
        self.drawString(36, 810, "ADVIKA VALVES — Authorised Dealer of Flowsid Valves")
        self.drawRightString(559, 810, "INDUSTRIAL PRODUCT CATALOG")
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(36, 804, 559, 804)
        
        # Footer line
        self.line(36, 40, 559, 40)
        self.drawString(36, 28, "Advika Valves | Chawri Bazar, Delhi – 110006 | Ph: +91 9811049614, +91 8447952332")
        self.drawRightString(559, 28, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_pdf():
    with open("src/data/products.json", "r") as f:
        products = json.load(f)

    doc = SimpleDocTemplate(
        PDF_OUT_PATH,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()
    
    # Custom Styles
    brand_dark = colors.HexColor("#0b1f38")
    brand_blue = colors.HexColor("#164e87")
    accent_blue = colors.HexColor("#2563eb")
    slate_border = colors.HexColor("#e2e8f0")
    
    title_style = ParagraphStyle(
        "CoverTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=28,
        leading=34,
        textColor=brand_dark,
        alignment=1
    )
    
    subtitle_style = ParagraphStyle(
        "CoverSubtitle",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=13,
        leading=18,
        textColor=brand_blue,
        alignment=1
    )
    
    prod_title_style = ParagraphStyle(
        "ProdTitle",
        parent=styles["Normal"],
        fontName="Helvetica-Bold",
        fontSize=10,
        leading=13,
        textColor=brand_dark
    )
    
    meta_style = ParagraphStyle(
        "ProdMeta",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#334155")
    )
    
    desc_style = ParagraphStyle(
        "ProdDesc",
        parent=styles["Normal"],
        fontName="Helvetica",
        fontSize=7.5,
        leading=10,
        textColor=colors.HexColor("#475569")
    )
    
    story = []

    # ================= COVER PAGE =================
    story.append(Spacer(1, 40))
    logo_path = "public/images/logo-light.png"
    if os.path.exists(logo_path):
        story.append(RLImage(logo_path, width=280, height=140))
        story.append(Spacer(1, 20))

    story.append(Paragraph("ADVIKA VALVES", title_style))
    story.append(Spacer(1, 8))
    story.append(Paragraph("<b>Authorised Dealer of Flowsid Valves</b>", subtitle_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Precision Industrial Flow Control & Valve Solutions", subtitle_style))
    story.append(Spacer(1, 25))

    story.append(HRFlowable(width="60%", thickness=2, color=accent_blue, spaceBefore=5, spaceAfter=20))
    
    cover_meta = ParagraphStyle(
        "CoverMeta", parent=styles["Normal"], fontName="Helvetica", fontSize=10, leading=15, textColor=colors.HexColor("#1e293b"), alignment=1
    )
    story.append(Paragraph("<b>COMPLETE PRODUCT CATALOG (TECHNICAL SPECIFICATIONS EDITION)</b>", cover_meta))
    story.append(Paragraph("Featuring 78 Authentically Documented Industrial Valve Products", cover_meta))
    story.append(Paragraph("Stainless Steel | Cast Iron | Cast Steel | Forged Steel | Polypropylene | Brass", cover_meta))
    story.append(Spacer(1, 50))

    # Business Card on Cover
    contact_data = [
        [Paragraph("<b>ADVIKA VALVES</b> — Authorized Business Details", ParagraphStyle("H", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=9, textColor=colors.white))],
        [Paragraph("<b>Legal Owner:</b> Alka Jain<br/><b>Managers:</b> Dinesh Jain (+91 9811049614) | Sidharth Jain (+91 8447952332)<br/><b>Email:</b> advikavalves@gmail.com<br/><b>Address:</b> 831, Kucha Pati Ram, Sita Ram Bazaar, Chawri Bazar, Delhi – 110006, India.", ParagraphStyle("B", parent=styles["Normal"], fontName="Helvetica", fontSize=8.5, leading=12, textColor=colors.HexColor("#0f172a")))]
    ]
    contact_table = Table(contact_data, colWidths=[480])
    contact_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), brand_dark),
        ('BACKGROUND', (0, 1), (-1, 1), colors.HexColor("#f8fafc")),
        ('BOX', (0, 0), (-1, -1), 1, brand_dark),
        ('PADDING', (0, 0), (-1, -1), 8),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ]))
    story.append(contact_table)

    story.append(PageBreak())

    # ================= CATALOG PRODUCTS (2 per row or clean structured cards) =================
    # We display 3 products per page with high detail and authentic cropped photos
    for i, p in enumerate(products):
        # Product Card
        img_rel = p["image"].lstrip("/")
        img_full = f"public/{img_rel}"
        if os.path.exists(img_full):
            prod_img = RLImage(img_full, width=95, height=90)
        else:
            prod_img = Paragraph("Image for Review", meta_style)

        # Specifications Summary
        sizes_str = ", ".join([f"{s['inch']}" for s in p["sizeVariants"]])
        apps_str = ", ".join(p["documentedApplications"])
        
        info_text = f"""
        <b>Item #{p['catalogItemNumber']}: {p['displayName']}</b><br/>
        <font color="#164e87"><b>Category:</b> {p['category']} | <b>Make:</b> {p['manufacturerOrMake']}</font><br/>
        <b>Design:</b> {p['design']}<br/>
        <b>Pressure Rating:</b> {p['pressureRatings']}<br/>
        <b>Available Sizes:</b> {sizes_str}<br/>
        <b>Connections:</b> {', '.join(p['connectionTypes'])}<br/>
        <b>Documented Applications:</b> {apps_str}<br/>
        <b>Description:</b> {p['descriptionShort']}
        """

        card_data = [
            [
                prod_img,
                Paragraph(info_text, meta_style)
            ]
        ]
        
        card_table = Table(card_data, colWidths=[105, 415])
        card_table.setStyle(TableStyle([
            ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor("#ffffff")),
            ('BOX', (0, 0), (-1, -1), 0.5, slate_border),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('PADDING', (0, 0), (-1, -1), 6),
            ('LINEBELOW', (0, -1), (-1, -1), 1, colors.HexColor("#e2e8f0")),
        ]))

        story.append(card_table)
        story.append(Spacer(1, 8))

        if (i + 1) % 4 == 0 and (i + 1) < len(products):
            story.append(PageBreak())

    # Build the document
    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated PDF catalog at {PDF_OUT_PATH}!")

if __name__ == "__main__":
    build_pdf()
