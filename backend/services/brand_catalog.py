"""
Wearlytics Brand Catalog
All 29 requested brands with high-fidelity brand metadata, styling aesthetics, and catalog garments.
Brands:
Zara, Nike, Adidas, Uniqlo, Levi’s, H&M, Tommy Hilfiger, Ralph Lauren, Calvin Klein, Lacoste,
Louis Vuitton, Gucci, Prada, Armani, Hugo Boss, Burberry, Versace, Diesel, Superdry, Jack & Jones,
Gap, Mango, Puma, Reebok, Under Armour, Allen Solly, Louis Philippe, Van Heusen, FabIndia
"""

BRANDS_DATA = [
    {
        "id": "zara",
        "name": "Zara",
        "origin": "Spain",
        "tier": "Contemporary Fast Fashion",
        "accent_color": "#000000",
        "category": "High Street & Contemporary",
        "logo_text": "Z A R A",
        "domain": "zara.com",
        "items": [
            {
                "id": "zara-01",
                "name": "Textured Relaxed Fit Overshirt",
                "category": "Jacket / Overshirt",
                "price": "$69.90",
                "fabric": "100% Spun Viscose with linen-look twill weave",
                "color": "Ecru / Stone White",
                "fit_type": "Relaxed / Boxy",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "aspect": "overshirt"
            },
            {
                "id": "zara-02",
                "name": "Minimalist Fluid Wool-Blend Blazer",
                "category": "Blazer",
                "price": "$129.00",
                "fabric": "70% Wool, 30% Lyocell with cupro interior lining",
                "color": "Charcoal Black",
                "fit_type": "Tailored Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "blazer"
            },
            {
                "id": "zara-03",
                "name": "Ribbed Cotton Minimalist Crewneck",
                "category": "T-Shirt",
                "price": "$35.90",
                "fabric": "Heavyweight 240 GSM Mercerized Cotton",
                "color": "Sage Olive",
                "fit_type": "Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "nike",
        "name": "Nike",
        "origin": "USA",
        "tier": "Sportswear & Performance",
        "accent_color": "#F05A28",
        "category": "Athletic & Performance",
        "logo_text": "NIKE",
        "domain": "nike.com",
        "items": [
            {
                "id": "nike-01",
                "name": "Nike Tech Fleece Windrunner Full-Zip Hoodie",
                "category": "Hoodie",
                "price": "$145.00",
                "fabric": "Smooth double-sided spacer Tech Fleece (66% cotton / 34% polyester)",
                "color": "Black / Anthracite",
                "fit_type": "Athletic Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
                "aspect": "hoodie"
            },
            {
                "id": "nike-02",
                "name": "Nike Sportswear Club Fleece Crewneck",
                "category": "Sweatshirt",
                "price": "$65.00",
                "fabric": "Brushed-back fleece for ultra-soft warmth",
                "color": "Dark Heather Grey",
                "fit_type": "Standard Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
                "aspect": "sweatshirt"
            },
            {
                "id": "nike-03",
                "name": "Nike Dri-FIT UV Active Training Tee",
                "category": "T-Shirt",
                "price": "$40.00",
                "fabric": "Moisture-wicking Dri-FIT Micro-Mesh",
                "color": "Royal Crimson Blue",
                "fit_type": "Athletic Slim",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "adidas",
        "name": "Adidas",
        "origin": "Germany",
        "tier": "Sportswear & Streetwear",
        "accent_color": "#000000",
        "category": "Athletic & Streetwear",
        "logo_text": "adidas",
        "domain": "adidas.com",
        "items": [
            {
                "id": "adidas-01",
                "name": "Adidas Originals Beckenbauer Track Top",
                "category": "Jacket",
                "price": "$90.00",
                "fabric": "52% Cotton, 48% Recycled Polyester Pique with 3-Stripes signature",
                "color": "Night Indigo / Chalk White",
                "fit_type": "Slim Heritage Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            },
            {
                "id": "adidas-02",
                "name": "Adicolor Classics Trefoil Heavyweight Tee",
                "category": "T-Shirt",
                "price": "$38.00",
                "fabric": "100% Better Cotton Single Jersey",
                "color": "Core White / Black Trefoil",
                "fit_type": "Regular Boxy",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "uniqlo",
        "name": "Uniqlo",
        "origin": "Japan",
        "tier": "LifeWear Essentials",
        "accent_color": "#E50012",
        "category": "Minimalist Essentials",
        "logo_text": "UNIQLO",
        "domain": "uniqlo.com",
        "items": [
            {
                "id": "uniqlo-01",
                "name": "Uniqlo U AIRism Cotton Oversized Crewneck Tee",
                "category": "T-Shirt",
                "price": "$24.90",
                "fabric": "AIRism cotton blend: smooth silky interior with matte cotton exterior",
                "color": "Dusky Beige 31",
                "fit_type": "Oversized Drop Shoulder",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            },
            {
                "id": "uniqlo-02",
                "name": "Extra Fine Merino Wool Crew Neck Sweater",
                "category": "Sweater",
                "price": "$49.90",
                "fabric": "100% 19.5-micron ultra-fine Merino Wool, machine washable",
                "color": "Midnight Navy",
                "fit_type": "Standard Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80",
                "aspect": "sweater"
            }
        ]
    },
    {
        "id": "levis",
        "name": "Levi’s",
        "origin": "USA",
        "tier": "Heritage Denim",
        "accent_color": "#C41230",
        "category": "Denim & Heritage",
        "logo_text": "Levi's",
        "domain": "levi.com",
        "items": [
            {
                "id": "levis-01",
                "name": "Levi's Original Denim Trucker Jacket",
                "category": "Jacket",
                "price": "$98.00",
                "fabric": "100% Non-stretch heavyweight Denim with Red Tab branding",
                "color": "Colusa Medium Wash",
                "fit_type": "Straight Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            },
            {
                "id": "levis-02",
                "name": "Levi's Barstow Western Denim Snap Shirt",
                "category": "Shirt",
                "price": "$69.50",
                "fabric": "Soft lightweight indigo-dyed cotton twill",
                "color": "Stonewash Blue",
                "fit_type": "Classic Slim",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "hm",
        "name": "H&M",
        "origin": "Sweden",
        "tier": "Fast Fashion & Trends",
        "accent_color": "#CD142B",
        "category": "High Street & Trends",
        "logo_text": "H&M",
        "domain": "hm.com",
        "items": [
            {
                "id": "hm-01",
                "name": "Relaxed Fit Poplin Resort Shirt",
                "category": "Shirt",
                "price": "$29.99",
                "fabric": "100% Crisp Organic Cotton Poplin with camp collar",
                "color": "Abstract Terracotta Print",
                "fit_type": "Relaxed Camp Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            },
            {
                "id": "hm-02",
                "name": "Heavyweight French Terry Street Hoodie",
                "category": "Hoodie",
                "price": "$44.99",
                "fabric": "420 GSM 80% Cotton 20% Polyester fleece",
                "color": "Warm Sand",
                "fit_type": "Oversized Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
                "aspect": "hoodie"
            }
        ]
    },
    {
        "id": "tommy-hilfiger",
        "name": "Tommy Hilfiger",
        "origin": "USA",
        "tier": "Classic American Cool",
        "accent_color": "#00174F",
        "category": "Preppy & Heritage",
        "logo_text": "TOMMY HILFIGER",
        "domain": "tommy.com",
        "items": [
            {
                "id": "th-01",
                "name": "Signature Flag Classic Pique Polo",
                "category": "Polo",
                "price": "$79.50",
                "fabric": "100% Regenerative Organic Cotton Pique",
                "color": "Tommy Navy with Tri-color Placket",
                "fit_type": "Custom Slim Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1625910513413-562a1c0d5162?auto=format&fit=crop&w=800&q=80",
                "aspect": "polo"
            },
            {
                "id": "th-02",
                "name": "Colorblock 90s Sailing Windbreaker",
                "category": "Jacket",
                "price": "$159.00",
                "fabric": "Water-resistant recycled nylon shell with breathable mesh lining",
                "color": "Navy / Red / Pure White",
                "fit_type": "Vintage Relaxed",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            }
        ]
    },
    {
        "id": "ralph-lauren",
        "name": "Ralph Lauren",
        "origin": "USA",
        "tier": "Luxury Heritage Preppy",
        "accent_color": "#0C2340",
        "category": "Luxury & Heritage",
        "logo_text": "POLO RALPH LAUREN",
        "domain": "ralphlauren.com",
        "items": [
            {
                "id": "rl-01",
                "name": "Custom Slim Fit Cable-Knit Cotton Sweater",
                "category": "Sweater",
                "price": "$148.00",
                "fabric": "100% Combed Long-Staple Cotton with pony embroidery",
                "color": "Hunter Green",
                "fit_type": "Custom Slim",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
                "aspect": "sweater"
            },
            {
                "id": "rl-02",
                "name": "Classic Fit Garment-Dyed Oxford Shirt",
                "category": "Shirt",
                "price": "$115.00",
                "fabric": "100% Breathable cotton Oxford cloth",
                "color": "Harbor Pink",
                "fit_type": "Classic Roomy Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "calvin-klein",
        "name": "Calvin Klein",
        "origin": "USA",
        "tier": "Minimalist Modernist",
        "accent_color": "#111111",
        "category": "Contemporary Minimalist",
        "logo_text": "Calvin Klein",
        "domain": "calvinklein.com",
        "items": [
            {
                "id": "ck-01",
                "name": "Monogram Logo Heavyweight Crewneck",
                "category": "Sweatshirt",
                "price": "$89.50",
                "fabric": "Plush French Terry (85% cotton / 15% polyester)",
                "color": "Optic White with CK Monogram",
                "fit_type": "Relaxed Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
                "aspect": "sweatshirt"
            },
            {
                "id": "ck-02",
                "name": "Slim Fit Stretch Cotton Chino Shirt",
                "category": "Shirt",
                "price": "$79.50",
                "fabric": "98% Cotton 2% Elastane poplin with subtle stretch",
                "color": "Matte Jet Black",
                "fit_type": "Slim Tailored",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "lacoste",
        "name": "Lacoste",
        "origin": "France",
        "tier": "Sport Luxe & Tennis Heritage",
        "accent_color": "#004526",
        "category": "Sport Luxe",
        "logo_text": "LACOSTE",
        "domain": "lacoste.com",
        "items": [
            {
                "id": "lacoste-01",
                "name": "L.12.12 Classic Petit Piqué Polo",
                "category": "Polo",
                "price": "$110.00",
                "fabric": "Original 100% Petit Piqué cotton with embroidered green crocodile",
                "color": "Tennis White",
                "fit_type": "Classic Straight",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=800&q=80",
                "aspect": "polo"
            }
        ]
    },
    {
        "id": "louis-vuitton",
        "name": "Louis Vuitton",
        "origin": "France",
        "tier": "High Luxury Couture",
        "accent_color": "#88540B",
        "category": "Haute Horlogerie & Luxury",
        "logo_text": "LOUIS VUITTON",
        "domain": "louisvuitton.com",
        "items": [
            {
                "id": "lv-01",
                "name": "Monogram Jacquard Silk-Blend Blouson",
                "category": "Jacket",
                "price": "$2,850.00",
                "fabric": "Technical silk jacquard with tonal Monogram embossed motif",
                "color": "Deep Monogram Caramel / Noir",
                "fit_type": "Couture Boxy",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            },
            {
                "id": "lv-02",
                "name": "Damier Motif Embroidered T-Shirt",
                "category": "T-Shirt",
                "price": "$950.00",
                "fabric": "100% Mercerized Egyptian cotton with micro-chainstitch embroidery",
                "color": "Midnight Eclipse",
                "fit_type": "Tailored High-Fashion",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "gucci",
        "name": "Gucci",
        "origin": "Italy",
        "tier": "Eccentric Luxury",
        "accent_color": "#005F41",
        "category": "Haute Couture & Luxury",
        "logo_text": "GUCCI",
        "domain": "gucci.com",
        "items": [
            {
                "id": "gucci-01",
                "name": "GG Supreme Web Track Jacket",
                "category": "Jacket",
                "price": "$1,980.00",
                "fabric": "Vintage-wash GG technical jersey with iconic green and red Web stripe",
                "color": "Beige / Ebony GG Supreme",
                "fit_type": "Retro Relaxed",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            },
            {
                "id": "gucci-02",
                "name": "Oversize Washed Cotton Blade Logo Tee",
                "category": "T-Shirt",
                "price": "$650.00",
                "fabric": "Distressed vintage jersey cotton with Gucci Blade retro print",
                "color": "Off-White Chalk",
                "fit_type": "Oversized Dropped Shoulder",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "prada",
        "name": "Prada",
        "origin": "Italy",
        "tier": "Avant-Garde Luxury",
        "accent_color": "#000000",
        "category": "Haute Couture & Luxury",
        "logo_text": "PRADA",
        "domain": "prada.com",
        "items": [
            {
                "id": "prada-01",
                "name": "Re-Nylon Gabardine Shirt with Triangle Logo",
                "category": "Shirt / Overshirt",
                "price": "$1,650.00",
                "fabric": "Regenerated nylon gabardine with enameled metal triangle logo",
                "color": "Nero Jet Black",
                "fit_type": "Architectural Boxy",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "armani",
        "name": "Armani",
        "origin": "Italy",
        "tier": "Sartorial Italian Elegance",
        "accent_color": "#1C1F2A",
        "category": "Sartorial Luxury",
        "logo_text": "GIORGIO ARMANI",
        "domain": "armani.com",
        "items": [
            {
                "id": "armani-01",
                "name": "Unstructured Virgin Wool Deconstructed Jacket",
                "category": "Blazer",
                "price": "$2,295.00",
                "fabric": "100% Virgin Super 150s Wool with fluid Italian drape",
                "color": "Slate Anthracite",
                "fit_type": "Tailored Relaxed",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "blazer"
            }
        ]
    },
    {
        "id": "hugo-boss",
        "name": "Hugo Boss",
        "origin": "Germany",
        "tier": "Executive Tailoring & Modern Smart",
        "accent_color": "#C49A45",
        "category": "Smart Tailored",
        "logo_text": "BOSS",
        "domain": "hugoboss.com",
        "items": [
            {
                "id": "boss-01",
                "name": "BOSS Pallas Regular-Fit Cotton Pique Polo",
                "category": "Polo",
                "price": "$118.00",
                "fabric": "100% Mercerized cotton pique with contrast collar tipping",
                "color": "Deep Khaki / Gold Accent",
                "fit_type": "Modern Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1625910513413-562a1c0d5162?auto=format&fit=crop&w=800&q=80",
                "aspect": "polo"
            }
        ]
    },
    {
        "id": "burberry",
        "name": "Burberry",
        "origin": "UK",
        "tier": "British Luxury Heritage",
        "accent_color": "#A07C50",
        "category": "Heritage Luxury",
        "logo_text": "BURBERRY",
        "domain": "burberry.com",
        "items": [
            {
                "id": "burberry-01",
                "name": "Vintage Check Cotton Poplin Shirt",
                "category": "Shirt",
                "price": "$520.00",
                "fabric": "100% Breathable poplin cotton woven with archive iconic check",
                "color": "Archive Beige Check",
                "fit_type": "Tailored Slim",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "versace",
        "name": "Versace",
        "origin": "Italy",
        "tier": "Baroque High Glamour",
        "accent_color": "#D4AF37",
        "category": "Glamour & Couture",
        "logo_text": "VERSACE",
        "domain": "versace.com",
        "items": [
            {
                "id": "versace-01",
                "name": "Barocco Print Silk Twill Short-Sleeve Shirt",
                "category": "Shirt",
                "price": "$1,125.00",
                "fabric": "100% Mulberry Silk Twill with heritage gilded acanthus leaves",
                "color": "Gold / Black Barocco",
                "fit_type": "Fluid Relaxed",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "diesel",
        "name": "Diesel",
        "origin": "Italy",
        "tier": "Edgy Denim & Y2K Streetwear",
        "accent_color": "#E30613",
        "category": "Denim & Streetwear",
        "logo_text": "DIESEL",
        "domain": "diesel.com",
        "items": [
            {
                "id": "diesel-01",
                "name": "T-Just Oval D Cutout Fitted Tee",
                "category": "T-Shirt",
                "price": "$125.00",
                "fabric": "Stretch rib-knit cotton with silver-finish metal Oval D plaque",
                "color": "Acid Washed Steel",
                "fit_type": "Body-Hugging Fitted",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
                "aspect": "tshirt"
            }
        ]
    },
    {
        "id": "superdry",
        "name": "Superdry",
        "origin": "UK",
        "tier": "Urban Americana & Japanese Graphics",
        "accent_color": "#FF6B00",
        "category": "Urban Casual",
        "logo_text": "Superdry 極度乾燥(しなさい)",
        "domain": "superdry.com",
        "items": [
            {
                "id": "sd-01",
                "name": "Vintage Logo Tri-Colour Hoodie",
                "category": "Hoodie",
                "price": "$89.95",
                "fabric": "Thick brushed fleece with crackle print Japanese typography",
                "color": "Rich Maroon / Navy",
                "fit_type": "Comfort Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=800&q=80",
                "aspect": "hoodie"
            }
        ]
    },
    {
        "id": "jack-jones",
        "name": "Jack & Jones",
        "origin": "Denmark",
        "tier": "Nordic Street & Denim",
        "accent_color": "#1C355E",
        "category": "Casual & Denim",
        "logo_text": "JACK & JONES",
        "domain": "jackjones.com",
        "items": [
            {
                "id": "jj-01",
                "name": "Premium Herringbone Wool Blend Overcoat",
                "category": "Coat",
                "price": "$160.00",
                "fabric": "Heavy textured herringbone wool-poly blend with satin lining",
                "color": "Camel Beige",
                "fit_type": "Structured Slim",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80",
                "aspect": "coat"
            }
        ]
    },
    {
        "id": "gap",
        "name": "Gap",
        "origin": "USA",
        "tier": "All-American Casual Classics",
        "accent_color": "#002B66",
        "category": "Casual Classics",
        "logo_text": "GAP",
        "domain": "gap.com",
        "items": [
            {
                "id": "gap-01",
                "name": "Gap Vintage Soft Arch Logo Pullover",
                "category": "Hoodie",
                "price": "$59.99",
                "fabric": "Special garment wash cotton blend for lived-in feel",
                "color": "Heritage Heather Grey with Navy Arch",
                "fit_type": "Classic Relaxed",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
                "aspect": "hoodie"
            }
        ]
    },
    {
        "id": "mango",
        "name": "Mango",
        "origin": "Spain",
        "tier": "Mediterranean Chic",
        "accent_color": "#000000",
        "category": "Contemporary Chic",
        "logo_text": "MANGO",
        "domain": "mango.com",
        "items": [
            {
                "id": "mango-01",
                "name": "100% Linen Resort Collar Shirt",
                "category": "Shirt",
                "price": "$69.99",
                "fabric": "100% Washed European Flax Linen",
                "color": "Olive Moss Green",
                "fit_type": "Breezy Regular",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "puma",
        "name": "Puma",
        "origin": "Germany",
        "tier": "Athletic Speed & Lifestyle",
        "accent_color": "#BA0C2F",
        "category": "Athletic & Lifestyle",
        "logo_text": "PUMA",
        "domain": "puma.com",
        "items": [
            {
                "id": "puma-01",
                "name": "T7 Iconic Track Jacket",
                "category": "Jacket",
                "price": "$85.00",
                "fabric": "French terry cotton blend with 7cm heritage contrast shoulder stripes",
                "color": "Puma Black / High Risk Red",
                "fit_type": "Athletic Track Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
                "aspect": "jacket"
            }
        ]
    },
    {
        "id": "reebok",
        "name": "Reebok",
        "origin": "USA",
        "tier": "Fitness & Retro Basketball",
        "accent_color": "#002D62",
        "category": "Retro Sportswear",
        "logo_text": "Reebok",
        "domain": "reebok.com",
        "items": [
            {
                "id": "reebok-01",
                "name": "Classics Vector Crew Sweatshirt",
                "category": "Sweatshirt",
                "price": "$65.00",
                "fabric": "Plush organic cotton fleece with retro Vector chevron chest panel",
                "color": "Vector Navy / Chalk",
                "fit_type": "Boxy Retro Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80",
                "aspect": "sweatshirt"
            }
        ]
    },
    {
        "id": "under-armour",
        "name": "Under Armour",
        "origin": "USA",
        "tier": "Elite Sports Performance",
        "accent_color": "#1D1D1D",
        "category": "Performance Athletics",
        "logo_text": "UNDER ARMOUR",
        "domain": "underarmour.com",
        "items": [
            {
                "id": "ua-01",
                "name": "HeatGear Armour Compression Short Sleeve",
                "category": "Compression Top",
                "price": "$35.00",
                "fabric": "Super-light HeatGear fabric delivers superior coverage without weighing down",
                "color": "Stealth Grey / Black Accent",
                "fit_type": "Second-Skin Compression",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80",
                "aspect": "compression"
            }
        ]
    },
    {
        "id": "allen-solly",
        "name": "Allen Solly",
        "origin": "India / UK Heritage",
        "tier": "Smart Casual & Friday Dressing",
        "accent_color": "#D32F2F",
        "category": "Smart Casuals",
        "logo_text": "ALLEN SOLLY",
        "domain": "allensolly.com",
        "items": [
            {
                "id": "as-01",
                "name": "Smart Casual Checked Textured Oxford Shirt",
                "category": "Shirt",
                "price": "$48.00",
                "fabric": "100% Premium compact spun cotton with stag embroidery",
                "color": "Cobalt Blue & Crimson Windowpane Check",
                "fit_type": "Modern Slim Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "louis-philippe",
        "name": "Louis Philippe",
        "origin": "India / International",
        "tier": "Luxury Menswear & Formal Grandeur",
        "accent_color": "#B8860B",
        "category": "Executive Luxury",
        "logo_text": "LOUIS PHILIPPE",
        "domain": "louisphilippe.com",
        "items": [
            {
                "id": "lp-01",
                "name": "PermaPress Wrinkle-Free Formal Dress Shirt",
                "category": "Dress Shirt",
                "price": "$75.00",
                "fabric": "2-ply 100s Giza cotton with liquid ammonia finish and crest embroidery",
                "color": "Crisp French White",
                "fit_type": "Executive Custom Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=800&q=80",
                "aspect": "shirt"
            }
        ]
    },
    {
        "id": "van-heusen",
        "name": "Van Heusen",
        "origin": "USA / Global",
        "tier": "Power Dressing & Corporate Formal",
        "accent_color": "#1F3A60",
        "category": "Corporate & Formal",
        "logo_text": "VAN HEUSEN",
        "domain": "vanheusen.com",
        "items": [
            {
                "id": "vh-01",
                "name": "MoveLabs 4-Way Stretch Performance Blazer",
                "category": "Blazer",
                "price": "$140.00",
                "fabric": "High-resilience wrinkle-resistant stretch blend tailored with notched lapels",
                "color": "Midnight Blue Melange",
                "fit_type": "Tailored Ultra-Flex Fit",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
                "aspect": "blazer"
            }
        ]
    },
    {
        "id": "fabindia",
        "name": "FabIndia",
        "origin": "India",
        "tier": "Authentic Handloom & Ethnic Artisan",
        "accent_color": "#9C27B0",
        "category": "Handloom & Ethnic",
        "logo_text": "fabindia",
        "domain": "fabindia.com",
        "items": [
            {
                "id": "fab-01",
                "name": "Hand-Spun Khadi Cotton Long Kurta with Mandarin Collar",
                "category": "Ethnic Kurta",
                "price": "$45.00",
                "fabric": "100% Handloom Khadi Cotton with intricate wooden button placket",
                "color": "Royal Saffron Ochre",
                "fit_type": "Comfort Ethnic Straight",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
                "aspect": "kurta"
            },
            {
                "id": "fab-02",
                "name": "Chanderi Silk Embroidered Nehru Jacket",
                "category": "Nehru Jacket / Vest",
                "price": "$85.00",
                "fabric": "Pure Chanderi Silk with tonal thread Kantha embroidery",
                "color": "Teal Peacock Blue",
                "fit_type": "Structured Slim Vest",
                "sizes": ["S", "M", "L", "XL"],
                "image_url": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=800&q=80",
                "aspect": "vest"
            }
        ]
    }
]

def get_all_brands():
    return BRANDS_DATA

def get_brand_by_id(brand_id: str):
    brand_id_norm = brand_id.lower().replace(" ", "-").replace("’", "").replace("'", "")
    for b in BRANDS_DATA:
        if b["id"] == brand_id_norm or b["name"].lower() == brand_id.lower():
            return b
    return None

def find_item_by_id(item_id: str):
    for b in BRANDS_DATA:
        for it in b["items"]:
            if it["id"] == item_id:
                return {**it, "brand_name": b["name"], "brand_id": b["id"]}
    return None
