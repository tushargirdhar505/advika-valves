import urllib.request
import urllib.error
import re
import json

BASE_URL = "http://localhost:3008"

test_routes = [
    ("/", "Homepage"),
    ("/about", "About Us"),
    ("/products", "Full Catalog"),
    ("/products/flowsid-001-ss-ball-valve-screwed-medium", "Product Detail Item #1"),
    ("/products/flowsid-010-ic-butterfly-valve-silicon-kit", "Product Detail Item #10"),
    ("/products/flowsid-042-ci-foot-valve-royal-make", "Product Detail Item #42"),
    ("/products/flowsid-072-pp-three-piece-ball-valve-cpi", "Product Detail Item #72"),
    ("/categories", "Categories Index"),
    ("/categories/stainless-steel-ball-valves", "Category SS Ball Valves"),
    ("/contact", "Contact Page"),
    ("/download-catalog", "Download Catalog Page"),
    ("/audit", "Extraction Audit Page"),
    ("/sitemap.xml", "Sitemap XML"),
    ("/robots.txt", "Robots TXT"),
    ("/images/logo-light.png", "Logo Image"),
    ("/images/products/flowsid-001.png", "Product Image #1"),
    ("/catalogs/Advika-Valves-Product-Catalog.pdf", "Sanitized PDF Catalog"),
]

passed = 0
failed = 0

print("==================================================")
print("     ADVIKA VALVES QA FUNCTIONAL AUDIT TEST       ")
print("==================================================")

price_pattern = re.compile(r'(₹|\bRs\.?\s*\d+|\bINR\s*\d+|\bper pc\b)', re.IGNORECASE)

for route, label in test_routes:
    url = f"{BASE_URL}{route}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'AdvikaValvesQA/1.0'})
        with urllib.request.urlopen(req) as resp:
            status = resp.status
            content = resp.read()
            
            # If html, check for leaked prices
            if "text/html" in resp.headers.get("Content-Type", ""):
                html_text = content.decode("utf-8", errors="ignore")
                matches = price_pattern.findall(html_text)
                if matches:
                    print(f"FAILED [PRICE LEAK]: {label} ({url}) -> Matches: {matches}")
                    failed += 1
                    continue
            
            print(f"PASSED [{status}]: {label} ({route}) - {len(content)} bytes")
            passed += 1
    except Exception as e:
        print(f"FAILED: {label} ({url}) -> {e}")
        failed += 1

# Test 404 handling
try:
    url_404 = f"{BASE_URL}/products/non-existent-product-12345"
    urllib.request.urlopen(url_404)
    print("FAILED: 404 test expected error status, got success")
    failed += 1
except urllib.error.HTTPError as e:
    if e.code == 404:
        print(f"PASSED [404 Not Found]: Handled gracefully for invalid product URL ({e.code})")
        passed += 1
    else:
        print(f"FAILED: Unexpected status for invalid URL: {e.code}")
        failed += 1

print("==================================================")
print(f"TOTAL TESTS: {passed + failed} | PASSED: {passed} | FAILED: {failed}")
print("==================================================")
