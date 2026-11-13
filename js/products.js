/**
 * MOD SHOES - Product Catalog Database
 * High-fashion footwear catalog with realistic pricing (LKR), specs, images and metadata.
 */

const PRODUCTS = [
    {
        id: "mod-01",
        name: "MOD VELOCITY ZERO",
        subtitle: "High-Performance Streetwear Sneaker",
        category: "Sneakers",
        price: 24500,
        originalPrice: 28000,
        badge: "SALE",
        isNew: true,
        isFeatured: true,
        rating: 4.9,
        reviewsCount: 128,
        inStock: true,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Crimson Blaze", hex: "#E03E3E" },
            { name: "Stealth Black", hex: "#111111" },
            { name: "Triple White", hex: "#F5F5F5" }
        ],
        description: "The MOD Velocity Zero represents the pinnacle of urban street performance. Engineered with a sculpted aerodynamic silhouette, breathable technical mesh, and an energy-returning dual-density EVA midsole, this sneaker merges cutting-edge runway aesthetics with all-day rebound.",
        highlights: [
            "Sculpted aerodynamic lightweight chassis",
            "Dual-density high-rebound responsive midsole",
            "Multi-directional traction rubber lug outsole",
            "Custom engineered heel stabilizer clip"
        ],
        specs: {
            "Upper Material": "Technical Breathable Microfiber & Ripstop",
            "Sole Material": "Vibram-Grade Rubber Compound",
            "Closure Type": "Integrated Fast-Lacing System",
            "Weight": "320g (Size UK 9)",
            "Style Code": "MOD-VZ-2026-RD"
        }
    },
    {
        id: "mod-02",
        name: "MOD KINETIC X",
        subtitle: "Aerodynamic Responsive Urban Runner",
        category: "Sports Shoes",
        price: 21900,
        originalPrice: null,
        badge: "BESTSELLER",
        isNew: false,
        isFeatured: true,
        rating: 4.8,
        reviewsCount: 94,
        inStock: true,
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Neon Volt", hex: "#D4FF00" },
            { name: "Phantom Black", hex: "#1A1A1A" },
            { name: "Glacier Grey", hex: "#D6D9DC" }
        ],
        description: "Built for speed and relentless city pavements. The Kinetic X combines an anatomical carbon-infused plate with responsive cushion pods that deliver effortless propulsion whether hitting your morning split or conquering your daily commute.",
        highlights: [
            "Carbon-composite propulsion plate for snapback rebound",
            "Breathable thermo-welded knit upper",
            "Zero-friction collar lining protects the Achilles",
            "Water-repellent protective toe bumper"
        ],
        specs: {
            "Upper Material": "Knit Matrix & Welded TPU",
            "Sole Material": "Nitrogen-Infused Cushioned EVA",
            "Closure Type": "Reflective Weave Lace-up",
            "Weight": "275g (Size UK 9)",
            "Style Code": "MOD-KX-2026-VT"
        }
    },
    {
        id: "mod-03",
        name: "MOD MONOLITH HIGH",
        subtitle: "Architectural Heavyweight High-Top",
        category: "Sneakers",
        price: 28500,
        originalPrice: 32000,
        badge: "LIMITED",
        isNew: true,
        isFeatured: true,
        rating: 5.0,
        reviewsCount: 67,
        inStock: true,
        image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        colors: [
            { name: "Bone Beige", hex: "#C8B69A" },
            { name: "Onyx Black", hex: "#121212" },
            { name: "Pure Chalk", hex: "#F6F5F0" }
        ],
        description: "An architectural masterpiece designed for high-fashion statements. The Monolith High features exaggerated proportions, a reinforced padded ankle collar, and hand-burnished nubuck overlays over a chunky, geometric platform outsole.",
        highlights: [
            "Premium grade-A textured nubuck and calf leather",
            "Geometric sculpted vulcanized rubber cupsole",
            "Padded ankle support with embossed MOD emblem",
            "Includes secondary contrast waxed laces"
        ],
        specs: {
            "Upper Material": "Full-Grain Italian Nubuck Leather",
            "Sole Material": "Sculpted Platform Vulcanized Rubber",
            "Closure Type": "Double Eyelet High Lace-up",
            "Weight": "490g (Size UK 9)",
            "Style Code": "MOD-MH-2026-BN"
        }
    },
    {
        id: "mod-04",
        name: "MOD AURA RETRO '88",
        subtitle: "Minimalist Heritage Court Sneaker",
        category: "Sneakers",
        price: 19500,
        originalPrice: null,
        badge: "NEW",
        isNew: true,
        isFeatured: true,
        rating: 4.7,
        reviewsCount: 82,
        inStock: true,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Vintage Tan", hex: "#B8977E" },
            { name: "Cream White", hex: "#EDE8DC" },
            { name: "Bottle Green", hex: "#1C352D" }
        ],
        description: "A tribute to late-80s tennis elegance updated with modern ergonomic mastery. The Aura Retro '88 pairs supple full-grain tumbled leather with a low-profile gum outsole, delivering refined understatement suitable for tailored trousers or distressed denim.",
        highlights: [
            "Butter-soft tumbled calfskin leather construction",
            "Vintage-aged amber gum outsole",
            "Perforated toe vamp for superior ventilation",
            "Ortholite memory foam cushioned insole"
        ],
        specs: {
            "Upper Material": "Full-Grain Tumbled Cowhide",
            "Sole Material": "Non-Marking Natural Gum Rubber",
            "Closure Type": "Flat Cotton Heritage Lacing",
            "Weight": "340g (Size UK 9)",
            "Style Code": "MOD-AR-1988-VT"
        }
    },
    {
        id: "mod-05",
        name: "MOD APEX CARBON",
        subtitle: "Marathon-Grade Responsive Runner",
        category: "Running Shoes",
        price: 29900,
        originalPrice: 34000,
        badge: "SALE",
        isNew: true,
        isFeatured: false,
        rating: 4.9,
        reviewsCount: 110,
        inStock: true,
        image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        colors: [
            { name: "Solar Crimson", hex: "#FF334B" },
            { name: "Stealth Slate", hex: "#2C3038" }
        ],
        description: "Engineered without compromise for those who chase personal bests. Equipped with a 100% full-length curved carbon fiber propulsion plate suspended in supercritical PEBA foam, offering over 88% kinetic energy return per stride.",
        highlights: [
            "Full-length curved aerodynamic carbon plate",
            "Ultra-lightweight supercritical PEBA foam compound",
            "Featherweight mono-mesh single layer upper",
            "Strategic zoned high-abrasion rubber pods"
        ],
        specs: {
            "Upper Material": "Translucent Mono-filament Mesh",
            "Sole Material": "Supercritical Foam & Carbon Plate",
            "Closure Type": "Serrated Speed Laces",
            "Weight": "198g (Size UK 9)",
            "Style Code": "MOD-AC-2026-CR"
        }
    },
    {
        id: "mod-06",
        name: "MOD CHELSEA NOIR",
        subtitle: "Italian Suede Handcrafted Chelsea Boot",
        category: "Casual Shoes",
        price: 31500,
        originalPrice: null,
        badge: "PREMIUM",
        isNew: false,
        isFeatured: true,
        rating: 4.9,
        reviewsCount: 73,
        inStock: true,
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Pitch Black Suede", hex: "#161616" },
            { name: "Tobacco Brown", hex: "#5C3A21" },
            { name: "Smoked Olive", hex: "#3A3D30" }
        ],
        description: "The timeless silhouette of rock royalty, refined for modern metropolitan life. Handcrafted from velvety water-treated Tuscan suede with flexible elastic side gussets, stacked leather heel and Goodyear-welted construction.",
        highlights: [
            "Water-resistant treated Tuscan calf suede",
            "Goodyear-welted resoleable construction",
            "Durable elastic side gussets with branded pull tabs",
            "Hand-stained stacked leather bevel heel"
        ],
        specs: {
            "Upper Material": "Tuscan Calfskin Suede Leather",
            "Sole Material": "Dainite Rubber Inset Leather Outsole",
            "Closure Type": "Slip-on with Dual Elastic Gusset",
            "Weight": "510g (Size UK 9)",
            "Style Code": "MOD-CN-2026-BK"
        }
    },
    {
        id: "mod-07",
        name: "MOD DERBY SOVEREIGN",
        subtitle: "Polished Calfskin Leather Derby",
        category: "Formal Shoes",
        price: 26000,
        originalPrice: 30000,
        badge: "SALE",
        isNew: false,
        isFeatured: true,
        rating: 4.8,
        reviewsCount: 56,
        inStock: true,
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Polished Cognac", hex: "#7E4722" },
            { name: "Onyx Black", hex: "#151515" }
        ],
        description: "An open-lacing dress shoe with understated authority. Crafted from vegetable-tanned French calfskin that develops an irreplaceable patina with wear. Clean stitching, softened square toe, and cushioned footbed guarantee effortless boardroom presence.",
        highlights: [
            "Hand-finished vegetable-tanned calfskin leather",
            "Open-lacing blucher construction for flexible instep",
            "Full leather lining with arch-contour insole",
            "Brass nail-reinforced stacked heel"
        ],
        specs: {
            "Upper Material": "French Full-Grain Box Calf Leather",
            "Sole Material": "Vegetable-Tanned Italian Leather Sole",
            "Closure Type": "Waxed Cotton 4-Eyelet Lace-up",
            "Weight": "460g (Size UK 9)",
            "Style Code": "MOD-DS-2026-CG"
        }
    },
    {
        id: "mod-08",
        name: "MOD STRIDE SLIDE",
        subtitle: "Ergonomic Sculpted Recovery Slide",
        category: "Sandals",
        price: 9500,
        originalPrice: null,
        badge: "BESTSELLER",
        isNew: true,
        isFeatured: true,
        rating: 4.9,
        reviewsCount: 189,
        inStock: true,
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Bone Beige", hex: "#C8B69A" },
            { name: "Granite Grey", hex: "#3A3A3A" },
            { name: "Chalk Off-White", hex: "#F3EFE6" }
        ],
        description: "The ultimate recovery slip-on, redesigned through a futuristic brutalist lens. Injection-molded from specialized cloud-density EVA with an orthopedically curved footbed that relieves plantar pressure after training or extended standing.",
        highlights: [
            "One-piece injection molded high-grade EVA foam",
            "Orthopedic deep heel cup and anatomical arch cradle",
            "Hydrophobic water-resistant and washable structure",
            "Textured anti-slip diamond footbed pattern"
        ],
        specs: {
            "Upper Material": "Monolithic Bio-Based EVA Compound",
            "Sole Material": "Integrated Grooved High-Grip EVA Outsole",
            "Closure Type": "Slip-on Contoured Vamp",
            "Weight": "165g (Size UK 9)",
            "Style Code": "MOD-SS-2026-BN"
        }
    },
    {
        id: "mod-09",
        name: "MOD NOMAD TRAIL",
        subtitle: "All-Terrain Technical Sneaker",
        category: "Sports Shoes",
        price: 27200,
        originalPrice: null,
        badge: "NEW",
        isNew: true,
        isFeatured: false,
        rating: 4.8,
        reviewsCount: 42,
        inStock: true,
        image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10"],
        colors: [
            { name: "Tactical Olive", hex: "#4A5240" },
            { name: "Desert Sand", hex: "#BFA98B" },
            { name: "Carbon Black", hex: "#1C1C1C" }
        ],
        description: "Built at the intersection of gorpcore aesthetics and severe trail performance. Water-repellent ripstop shell, Cordura abrasion overlays, and an aggressive 5mm multi-terrain lug outsole transition seamlessly from misty mountain trails to wet city streets.",
        highlights: [
            "Weatherproof PFC-free DWR treated ripstop upper",
            "Rugged 5mm multi-directional aggressive traction lugs",
            "Quick-cinch toggle cord lacing with tongue stash pocket",
            "Reinforced 360-degree mudguard wrap"
        ],
        specs: {
            "Upper Material": "Cordura Ripstop & Rubberized Overlays",
            "Sole Material": "Dual-Compound Sticky Trail Rubber",
            "Closure Type": "Speed Cable Lock Toggle",
            "Weight": "385g (Size UK 9)",
            "Style Code": "MOD-NT-2026-OL"
        }
    },
    {
        id: "mod-10",
        name: "MOD BREEZE KNIT",
        subtitle: "Minimalist Seamless Loafer Slip-On",
        category: "Casual Shoes",
        price: 16800,
        originalPrice: 19500,
        badge: "SALE",
        isNew: false,
        isFeatured: true,
        rating: 4.7,
        reviewsCount: 88,
        inStock: true,
        image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Heather Slate", hex: "#7D828A" },
            { name: "Deep Navy", hex: "#1C2536" },
            { name: "Oatmeal Beige", hex: "#D8CDBA" }
        ],
        description: "Engineered for effortless everyday living. The Breeze Knit uses a seamless 3D circular knit upper that hugs the foot like a second skin, paired with a featherlight ultra-flexible segmented sole for barefoot-like freedom.",
        highlights: [
            "Zero-waste 3D engineered stretch circular knit",
            "Anti-microbial bamboo charcoal moisture-wicking sockliner",
            "Collapsible soft-step heel counter for mule mode",
            "Machine-washable design for long-lasting freshness"
        ],
        specs: {
            "Upper Material": "Recycled Poly-Knit Fiber",
            "Sole Material": "Flex-Grooved Injection Molded Phylon",
            "Closure Type": "Elasticized Slip-On Collar",
            "Weight": "210g (Size UK 9)",
            "Style Code": "MOD-BK-2026-SL"
        }
    },
    {
        id: "mod-11",
        name: "MOD OXFORD MAJESTY",
        subtitle: "Handcrafted Cap-Toe Dress Shoe",
        category: "Formal Shoes",
        price: 33500,
        originalPrice: null,
        badge: "PREMIUM",
        isNew: false,
        isFeatured: false,
        rating: 5.0,
        reviewsCount: 39,
        inStock: true,
        image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Espresso Brown", hex: "#3B2718" },
            { name: "High-Gloss Jet", hex: "#0E0E0E" }
        ],
        description: "The gold standard of sartorial excellence. Tailored with a sleek closed-channel lacing silhouette, sharp cap-toe detailing, and mirror-shined calfskin. Perfect for black-tie galas, weddings, and distinguished occasions.",
        highlights: [
            "Grade-1 full-grain mirror-burnished calfskin",
            "Traditional closed Oxford lacing construction",
            "Channeled Goodyear welt with oak-bark tanned leather sole",
            "Hand-cut beveled leather waist"
        ],
        specs: {
            "Upper Material": "Calfskin Leather with Mirror Gloss Finish",
            "Sole Material": "Oak Bark Tanned Sole with Rubber Inlay",
            "Closure Type": "5-Blind-Eyelet Closed Lace-up",
            "Weight": "475g (Size UK 9)",
            "Style Code": "MOD-OM-2026-ES"
        }
    },
    {
        id: "mod-12",
        name: "MOD DUNE STRAP",
        subtitle: "Tactical Buckle Streetwear Sandal",
        category: "Sandals",
        price: 12500,
        originalPrice: null,
        badge: "NEW",
        isNew: true,
        isFeatured: true,
        rating: 4.8,
        reviewsCount: 61,
        inStock: true,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Matte Black", hex: "#1A1A1A" },
            { name: "Dune Sand", hex: "#C2AFA0" }
        ],
        description: "Reimagining warm-weather footwear through industrial cybernetic style. Features military-grade nylon webbing straps with quick-release Fidlock magnetic buckles, resting on a thick contoured footbed and rugged rippled sole.",
        highlights: [
            "Quick-release magnetic buckle locking system",
            "High-tensile heavy-duty ballistic webbing straps",
            "Neoprene under-padding prevents strap rubbing",
            "Deep ripple shark-tooth grip tread"
        ],
        specs: {
            "Upper Material": "Ballistic Nylon Webbing & Neoprene",
            "Sole Material": "Dual-Density Contoured EVA & Rubber",
            "Closure Type": "Magnetic Buckle & Hook-and-Loop",
            "Weight": "310g (Size UK 9)",
            "Style Code": "MOD-DS-2026-MB"
        }
    },
    {
        id: "mod-13",
        name: "MOD MATRIX LOW",
        subtitle: "Deconstructed Raw Canvas Sneaker",
        category: "Sneakers",
        price: 17900,
        originalPrice: null,
        badge: "NEW",
        isNew: true,
        isFeatured: false,
        rating: 4.6,
        reviewsCount: 52,
        inStock: true,
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
        colors: [
            { name: "Ecru Raw Canvas", hex: "#E8E2D5" },
            { name: "Washed Carbon", hex: "#2E2E2E" }
        ],
        description: "Raw edge seams, exposed foam tongue, and industrial stamp typography give the Matrix Low a bold underground gallery vibe. Hand-distressed 16oz Japanese duck canvas upper that softens uniquely to your movement.",
        highlights: [
            "16oz unbleached Japanese cotton duck canvas",
            "Deconstructed raw-edge seam detailing",
            "Vulcanized double-wrapped textured foxing tape",
            "Cushioned vulcanized honeycomb latex insole"
        ],
        specs: {
            "Upper Material": "16oz Heavyweight Raw Cotton Canvas",
            "Sole Material": "Hand-Finished Vulcanized Rubber",
            "Closure Type": "Enamelled Eyelet Lace-up",
            "Weight": "360g (Size UK 9)",
            "Style Code": "MOD-ML-2026-EC"
        }
    },
    {
        id: "mod-14",
        name: "MOD HYPERDRIVE ELITE",
        subtitle: "High-Response Cross-Trainer",
        category: "Sports Shoes",
        price: 23400,
        originalPrice: 26000,
        badge: "SALE",
        isNew: false,
        isFeatured: false,
        rating: 4.8,
        reviewsCount: 79,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Cyan Spark", hex: "#00E5FF" },
            { name: "Dark Carbon", hex: "#181818" }
        ],
        description: "Engineered for high-intensity training, rapid lateral cuts, and explosive plyometrics. Lateral TPU stabilizer cage locks down your midfoot while multi-density foam absorbs high impact landing force.",
        highlights: [
            "Lateral TPU lockdown chassis cage",
            "Omni-directional court grip traction pattern",
            "Breathable heat-sealed seamless mesh upper",
            "Reinforced abrasion heel counter"
        ],
        specs: {
            "Upper Material": "Technical Engineered Mesh & TPU",
            "Sole Material": "High-Density Resilient Rubber",
            "Closure Type": "Webbing Lace Loop System",
            "Weight": "315g (Size UK 9)",
            "Style Code": "MOD-HE-2026-CY"
        }
    },
    {
        id: "mod-15",
        name: "MOD ARIA MULE",
        subtitle: "Contemporary Leather Slip-on Loafer",
        category: "Casual Shoes",
        price: 22000,
        originalPrice: null,
        badge: "TRENDING",
        isNew: true,
        isFeatured: false,
        rating: 4.9,
        reviewsCount: 34,
        inStock: true,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"],
        colors: [
            { name: "Chalk Off-White", hex: "#F3EFE6" },
            { name: "Caramel Tan", hex: "#9E6D38" },
            { name: "Onyx Black", hex: "#141414" }
        ],
        description: "Backless luxury crafted for effortless transition between studio, gallery, and evening dinner. Supple glove leather molds immediately to your foot, resting on a slim leather-wrapped sole with minimal hardware.",
        highlights: [
            "Supple glove-tanned Italian nappa leather",
            "Easy backless slip-on profile with deep instep scoop",
            "Contoured cushioned memory footbed",
            "Protective rubber island injection in leather sole"
        ],
        specs: {
            "Upper Material": "Soft Italian Nappa Calfskin",
            "Sole Material": "Italian Leather Sole with Rubber Inset",
            "Closure Type": "Slip-on Backless Mule",
            "Weight": "290g (Size UK 9)",
            "Style Code": "MOD-AM-2026-OW"
        }
    },
    {
        id: "mod-16",
        name: "MOD SHADOW GLIDE",
        subtitle: "Triple-Black Stealth Street Runner",
        category: "Running Shoes",
        price: 25500,
        originalPrice: null,
        badge: "BESTSELLER",
        isNew: false,
        isFeatured: true,
        rating: 4.9,
        reviewsCount: 145,
        inStock: true,
        image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1000&q=80",
        hoverImage: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80",
        gallery: [
            "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1200&q=85",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=85"
        ],
        sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11"],
        colors: [
            { name: "Total Stealth Black", hex: "#0A0A0A" },
            { name: "Gunmetal", hex: "#2B2B2B" }
        ],
        description: "Draped completely in pitch black with subtle matte-versus-gloss textures. The Shadow Glide conceals high-rebound nitrogen foam beneath a stealth aerodynamic silhouette that commands respect in every urban enclave.",
        highlights: [
            "Monochrome tonal triple-black multi-texture design",
            "Ultra-cushioned nitrogen-infused responsive midsole",
            "Micro-perforated thermal regulation panels",
            "Reflective hidden heel branding accents"
        ],
        specs: {
            "Upper Material": "Technical Microfiber & Matte TPU Film",
            "Sole Material": "Nitrogen-Charged Foam & High-Wear Carbon Rubber",
            "Closure Type": "Stealth Tonal Round Laces",
            "Weight": "285g (Size UK 9)",
            "Style Code": "MOD-SG-2026-TB"
        }
    }
];

// Categories definition with editorial banner metadata
const CATEGORIES = [
    {
        name: "Sneakers",
        slug: "Sneakers",
        count: 4,
        tagline: "Runway silhouettes crafted for everyday culture",
        image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Sports Shoes",
        slug: "Sports Shoes",
        count: 3,
        tagline: "Propulsive engineering and aerodynamic resilience",
        image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Casual Shoes",
        slug: "Casual Shoes",
        count: 3,
        tagline: "Effortless luxury boots, mules and knit slip-ons",
        image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Formal Shoes",
        slug: "Formal Shoes",
        count: 2,
        tagline: "Hand-burnished leather derbies and black-tie oxfords",
        image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Sandals",
        slug: "Sandals",
        count: 2,
        tagline: "Ergonomic recovery slides and technical tactical straps",
        image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&w=1000&q=80"
    },
    {
        name: "Running Shoes",
        slug: "Running Shoes",
        count: 2,
        tagline: "Carbon-plated performance for record breakers",
        image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&w=1000&q=80"
    }
];

// Helper functions
function formatPrice(amount) {
    return 'Rs. ' + amount.toLocaleString('en-LK');
}

function getProductById(id) {
    return PRODUCTS.find(p => p.id === id) || PRODUCTS[0];
}

function getFeaturedProducts() {
    return PRODUCTS.filter(p => p.isFeatured);
}

function getNewDrops(limit = 8) {
    return PRODUCTS.slice(0, limit);
}

function getRelatedProducts(currentId, category, limit = 4) {
    const sameCategory = PRODUCTS.filter(p => p.id !== currentId && p.category === category);
    if (sameCategory.length >= limit) return sameCategory.slice(0, limit);
    const others = PRODUCTS.filter(p => p.id !== currentId && p.category !== category);
    return [...sameCategory, ...others].slice(0, limit);
}

