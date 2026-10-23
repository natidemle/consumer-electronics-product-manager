"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BatteryCharging,
  Check,
  CircleUserRound,
  Headphones,
  Mail,
  MapPin,
  Minus,
  Moon,
  PackageCheck,
  Plus,
  Search,
  Send,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Sun,
  Trash2,
  Truck,
  Watch,
  Wifi,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";

type Language = "am" | "en";
type StoreTab = "shop" | "combo" | "about";
type CategoryId =
  | "all"
  | "wearables"
  | "audio"
  | "power"
  | "smarthome"
  | "mobile";

type Product = {
  id: string;
  category: Exclude<CategoryId, "all">;
  nameEn: string;
  nameAm: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  badge: string;
  image: string;
  descriptionEn: string;
  descriptionAm: string;
  featuresEn: string[];
  featuresAm: string[];
};

type CartItem = {
  id: string;
  nameEn: string;
  nameAm: string;
  price: number;
  originalPrice: number;
  image: string;
  quantity: number;
};

const USER_CONTACT = {
  name: "Natnael Demle",
  role: "Consumer Electronics Product Manager",
  phone: "09613240",
  email: "natidemle123@gmail.com",
  telegram: "@natigi21",
  telegramUrl: "https://t.me/natigi21",
  location: "Addis Ababa, Ethiopia",
};

const PRODUCTS: Product[] = [
  {
    id: "prod-1",
    category: "wearables",
    nameEn: "Smartwatch Series 9 AMOLED",
    nameAm: "ስማርት ዋች Series 9 AMOLED",
    price: 2400,
    originalPrice: 2800,
    rating: 4.9,
    reviews: 42,
    badge: "Best seller",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=85&w=900",
    descriptionEn:
      "A crisp AMOLED display, Bluetooth calling, heart-rate monitoring, and up to seven days of battery life.",
    descriptionAm:
      "ጥራት ያለው AMOLED ስክሪን፣ ብሉቱዝ ጥሪ፣ የልብ ምት መከታተያ እና እስከ 7 ቀን የሚቆይ ባትሪ።",
    featuresEn: [
      "AMOLED touch display",
      "Bluetooth voice calling",
      "Heart rate & blood oxygen",
      "IP68 water resistant",
    ],
    featuresAm: [
      "AMOLED ንክኪ ስክሪን",
      "በብሉቱዝ የመደወል እድል",
      "የደም ኦክስጅንና የልብ ምት",
      "ውሃና ላብ የማይጎዳው",
    ],
  },
  {
    id: "prod-2",
    category: "audio",
    nameEn: "Premium Wireless ANC Earbuds",
    nameAm: "ፕሪሚየም ዋየርለስ ANC ኢርበድስ",
    price: 1850,
    originalPrice: 2200,
    rating: 4.8,
    reviews: 58,
    badge: "Customer favorite",
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=85&w=900",
    descriptionEn:
      "Active noise cancellation, rich bass, intuitive touch controls, and up to 30 hours of total playtime.",
    descriptionAm:
      "የውጪ ድምፅ መቀነሻ፣ ጥልቅ ቤዝ፣ ቀላል የንክኪ መቆጣጠሪያ እና እስከ 30 ሰዓት የባትሪ ቆይታ።",
    featuresEn: [
      "Active noise cancellation",
      "30 hours with charging case",
      "IPX5 sweat resistant",
      "Easy touch controls",
    ],
    featuresAm: [
      "የውጪ ድምፅ መቀነሻ",
      "30 ሰዓት የባትሪ ቆይታ",
      "ለስፖርት ምቹ",
      "በጣት ንክኪ የሚሰራ",
    ],
  },
  {
    id: "prod-3",
    category: "power",
    nameEn: "20,000mAh Fast Power Bank",
    nameAm: "20,000mAh 22.5W ፈጣን ፓወር ባንክ",
    price: 1950,
    originalPrice: 2300,
    rating: 4.9,
    reviews: 31,
    badge: "Everyday essential",
    image:
      "https://images.pexels.com/photos/3921704/pexels-photo-3921704.jpeg?auto=compress&cs=tinysrgb&w=900",
    descriptionEn:
      "A high-capacity portable charger with a digital battery display and fast charging for everyday carry.",
    descriptionAm:
      "ከፍተኛ የባትሪ አቅም፣ ቀሪ ባትሪ የሚያሳይ ዲጂታል ማሳያ እና ፈጣን ቻርጅ ያለው ፓወር ባንክ።",
    featuresEn: [
      "22.5W fast charge",
      "Digital battery display",
      "Charge multiple devices",
      "Slim portable design",
    ],
    featuresAm: [
      "22.5W ፈጣን ቻርጅ",
      "ዲጂታል የባትሪ ማሳያ",
      "ብዙ ስልኮችን በአንድ ጊዜ",
      "ቀላልና ዘመናዊ",
    ],
  },
  {
    id: "prod-4",
    category: "smarthome",
    nameEn: "Smart 360° Wi-Fi Camera",
    nameAm: "ስማርት 360° ዋይፋይ የደህንነት ካሜራ",
    price: 2800,
    originalPrice: 3200,
    rating: 4.7,
    reviews: 19,
    badge: "Smart living",
    image:
      "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=85&w=900",
    descriptionEn:
      "A 1080p indoor camera with motion alerts, two-way audio, and infrared night vision.",
    descriptionAm:
      "በስልክ ቀጥታ ምስል የሚያሳይ፣ እንቅስቃሴ ሲኖር መልዕክት የሚልክና 360 ዲግሪ የሚዞር ካሜራ።",
    featuresEn: [
      "1080p full HD video",
      "360° phone-controlled view",
      "Motion detection alerts",
      "Two-way audio",
    ],
    featuresAm: [
      "1080p ጥራት ያለው ምስል",
      "በስልክ 360 ዲግሪ ማዞሪያ",
      "የእንቅስቃሴ መከታተያ",
      "ድምፅ የሚያስተላልፍ",
    ],
  },
  {
    id: "prod-5",
    category: "smarthome",
    nameEn: "Portable Android Mini Projector",
    nameAm: "4K ተንቀሳቃሽ ሚኒ ፕሮጀክተር",
    price: 6500,
    originalPrice: 7500,
    rating: 5,
    reviews: 24,
    badge: "Premium pick",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=85&w=900",
    descriptionEn:
      "A compact home-theater projector with built-in Android, Wi-Fi screen mirroring, and a large-screen experience.",
    descriptionAm:
      "ለቤት ሲኒማና ለስራ የሚሆን፣ ከስልክ ጋር የሚገናኝና ትልቅ ምስል የሚያሳይ ፕሮጀክተር።",
    featuresEn: [
      "Up to 130-inch projection",
      "Built-in Wi-Fi & Android",
      "Integrated speaker",
      "Automatic keystone correction",
    ],
    featuresAm: [
      "እስከ 130 ኢንች ትልቅ ስክሪን",
      "የተገጠመ ዋይፋይና አንድሮይድ",
      "የራሱ ስፒከር ያለው",
      "በማንኛውም ቦታ ምቹ",
    ],
  },
  {
    id: "prod-6",
    category: "mobile",
    nameEn: "Magnetic Wireless Charging Dock",
    nameAm: "ማግኔቲክ ዋየርለስ ፈጣን ቻርጀር",
    price: 1450,
    originalPrice: 1700,
    rating: 4.6,
    reviews: 15,
    badge: "New arrival",
    image:
      "https://images.pexels.com/photos/5083490/pexels-photo-5083490.jpeg?auto=compress&cs=tinysrgb&w=900",
    descriptionEn:
      "A tidy 3-in-1 charging stand for your phone, smartwatch, and wireless earbuds, with LED status indicators.",
    descriptionAm:
      "ስልክን፣ ስማርት ዋችንና ኢርበድስን በአንድ ጊዜ የሚያስሞላ ዘመናዊ የጠረጴዛ ቻርጀር።",
    featuresEn: [
      "3-in-1 simultaneous charging",
      "Strong magnetic connection",
      "Overcharge protection",
      "Clean desktop design",
    ],
    featuresAm: [
      "3 እቃዎችን በአንድ ጊዜ",
      "ጠንካራ የማግኔት ንክኪ",
      "ከቮልቴጅ መለዋወጥ የሚጠብቅ",
      "ለቢሮና ለቤት ውበት",
    ],
  },
];

const CATEGORIES: {
  id: CategoryId;
  labelEn: string;
  labelAm: string;
  icon: typeof ShoppingBag;
}[] = [
  { id: "all", labelEn: "Everything", labelAm: "ሁሉም", icon: ShoppingBag },
  { id: "wearables", labelEn: "Wearables", labelAm: "ስማርት ዋች", icon: Watch },
  { id: "audio", labelEn: "Audio", labelAm: "ኦዲዮ", icon: Headphones },
  { id: "power", labelEn: "Power", labelAm: "ፓወር", icon: BatteryCharging },
  { id: "smarthome", labelEn: "Smart home", labelAm: "ስማርት ሆም", icon: Wifi },
  { id: "mobile", labelEn: "Accessories", labelAm: "መለዋወጫ", icon: Smartphone },
];

function formatPrice(value: number) {
  return `${value.toLocaleString()} ETB`;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("am");
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState<StoreTab>("shop");
  const [activeCategory, setActiveCategory] = useState<CategoryId>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [comboWatch, setComboWatch] = useState(PRODUCTS[0]);
  const [comboEarbuds, setComboEarbuds] = useState(PRODUCTS[1]);

  const isAmharic = language === "am";
  const filteredProducts = useMemo(
    () =>
      PRODUCTS.filter((product) => {
        const matchesCategory =
          activeCategory === "all" || product.category === activeCategory;
        const searchableText = isAmharic
          ? `${product.nameAm} ${product.descriptionAm}`
          : `${product.nameEn} ${product.descriptionEn}`;
        return (
          matchesCategory &&
          searchableText.toLowerCase().includes(searchQuery.trim().toLowerCase())
        );
      }),
    [activeCategory, isAmharic, searchQuery],
  );
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const comboOriginal = comboWatch.price + comboEarbuds.price;
  const comboPrice = Math.round(comboOriginal * 0.88);

  function addToCart(product: Product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  }

  function addComboToCart() {
    const combo: CartItem = {
      id: `combo-${comboWatch.id}-${comboEarbuds.id}`,
      nameEn: `${comboWatch.nameEn} + ${comboEarbuds.nameEn} bundle`,
      nameAm: `ኮምቦ፡ ${comboWatch.nameAm} + ${comboEarbuds.nameAm}`,
      price: comboPrice,
      originalPrice: comboOriginal,
      image: comboWatch.image,
      quantity: 1,
    };
    setCart((current) => {
      const existing = current.find((item) => item.id === combo.id);
      if (existing) {
        return current.map((item) =>
          item.id === combo.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, combo];
    });
    setCartOpen(true);
  }

  function updateQuantity(id: string, delta: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function createOrderLink() {
    const orderLines = cart
      .map(
        (item, index) =>
          `${index + 1}. ${isAmharic ? item.nameAm : item.nameEn} x${item.quantity} — ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n");
    const message = `Hello! I'd like to place an order:\n\n${orderLines}\n\nTotal: ${formatPrice(cartTotal)}\nDelivery: Addis Ababa`;
    return `${USER_CONTACT.telegramUrl}?text=${encodeURIComponent(message)}`;
  }

  return (
    <div className={`storefront ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="announcement">
        <Sparkles size={15} aria-hidden="true" />
        <span>
          {isAmharic
            ? "የጥምር ቅናሽ፡ ስማርት ዋች + ኢርበድስ ሲገዙ 12% ይቆጥቡ"
            : "The perfect pairing: save 12% when you bundle a smartwatch and earbuds."}
        </span>
        <button onClick={() => setActiveTab("combo")}>
          {isAmharic ? "ቅናሹን ይመልከቱ" : "Explore the offer"}
          <ArrowRight size={14} aria-hidden="true" />
        </button>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <button className="brand" onClick={() => setActiveTab("shop")} aria-label="TechPulse home">
            <span className="brand-mark">
              <Zap size={21} fill="currentColor" aria-hidden="true" />
            </span>
            <span className="brand-copy">
              <strong>techpulse<span>.</span></strong>
              <small>CURATED EVERYDAY TECH</small>
            </span>
          </button>

          <nav className="desktop-nav" aria-label="Main navigation">
            <button
              className={activeTab === "shop" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("shop")}
            >
              {isAmharic ? "ሱቅ" : "Shop"}
            </button>
            <button
              className={activeTab === "combo" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("combo")}
            >
              {isAmharic ? "የኮምቦ ቅናሽ" : "Bundle & save"}
            </button>
            <button
              className={activeTab === "about" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("about")}
            >
              {isAmharic ? "ስለ እኛ" : "About"}
            </button>
          </nav>

          <div className="header-actions">
            <button
              className="icon-action language-button"
              onClick={() => setLanguage(isAmharic ? "en" : "am")}
              aria-label={isAmharic ? "Switch to English" : "ወደ አማርኛ ቀይር"}
            >
              <span className="language-globe">◎</span>
              {isAmharic ? "EN" : "አማ"}
            </button>
            <button
              className="icon-action theme-button"
              onClick={() => setDarkMode((current) => !current)}
              aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className="cart-button"
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart, ${cartItemCount} items`}
            >
              <ShoppingBag size={18} />
              <span className="cart-button-label">{isAmharic ? "ካርት" : "Cart"}</span>
              <span className="cart-count">{cartItemCount}</span>
            </button>
          </div>
        </div>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          <button className={activeTab === "shop" ? "active" : ""} onClick={() => setActiveTab("shop")}>
            {isAmharic ? "ሱቅ" : "Shop"}
          </button>
          <button className={activeTab === "combo" ? "active" : ""} onClick={() => setActiveTab("combo")}>
            {isAmharic ? "ቅናሽ" : "Bundle"}
          </button>
          <button className={activeTab === "about" ? "active" : ""} onClick={() => setActiveTab("about")}>
            {isAmharic ? "ስለ እኛ" : "About"}
          </button>
        </nav>
      </header>

      <main className="page-shell">
        {activeTab === "shop" && (
          <>
            <section className="hero">
              <div className="hero-copy">
                <div className="eyebrow">
                  <span className="eyebrow-dot" />
                  {isAmharic ? "ለዕለት ተዕለት ሕይወት ዘመናዊ ቴክኖሎጂ" : "GOOD TECH. GOOD EVERYDAY."}
                </div>
                <h1>
                  {isAmharic ? (
                    <>
                      ቀንዎን የሚያቀልሉ
                      <span> ብልህ ምርጫዎች።</span>
                    </>
                  ) : (
                    <>
                      A little smarter.
                      <span> A lot more you.</span>
                    </>
                  )}
                </h1>
                <p className="hero-description">
                  {isAmharic
                    ? "የምንወዳቸው ጋጄቶች፣ በጥንቃቄ ተመርጠው። ጥራት ያለው ቴክኖሎጂ እና በቀላሉ የሚደረግ ግዢ።"
                    : "Thoughtfully picked gadgets that make everyday life feel a little more effortless."}
                </p>
                <div className="hero-actions">
                  <button
                    className="button button-primary"
                    onClick={() =>
                      document.getElementById("catalog")?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    {isAmharic ? "ምርቶችን ይመልከቱ" : "Explore the collection"}
                    <ArrowDown size={16} />
                  </button>
                  <button className="text-link" onClick={() => setActiveTab("combo")}>
                    {isAmharic ? "የኮምቦ ቅናሹን ይመልከቱ" : "Discover bundle deals"}
                    <ArrowUpRight size={15} />
                  </button>
                </div>
                <div className="hero-trust">
                  <span><ShieldCheck size={16} /> {isAmharic ? "በጥንቃቄ የተመረጠ" : "Quality, considered"}</span>
                  <span><Truck size={16} /> {isAmharic ? "በአዲስ አበባ ማድረሻ" : "Addis Ababa delivery"}</span>
                </div>
              </div>
              <div className="hero-visual">
                <div className="hero-image-wrap">
                  <Image
                    src={PRODUCTS[0].image}
                    alt="Smartwatch from the TechPulse collection"
                    fill
                    priority
                    sizes="(max-width: 800px) 100vw, 48vw"
                    className="hero-image"
                  />
                </div>
                <div className="hero-orbit orbit-one" />
                <div className="hero-orbit orbit-two" />
                <div className="floating-note">
                  <span className="floating-note-icon"><Star size={14} fill="currentColor" /></span>
                  <span><strong>Thoughtfully chosen</strong><small>Tech you’ll love using</small></span>
                </div>
                <div className="hero-index"><span>01</span> / 06</div>
              </div>
              <div className="hero-side-label">MADE FOR YOUR EVERYDAY</div>
            </section>

            <section className="benefit-strip" aria-label="Store benefits">
              <div><span className="benefit-icon"><PackageCheck size={18} /></span><span><strong>{isAmharic ? "ጥራት ያለው ምርጫ" : "Quality picks"}</strong><small>{isAmharic ? "የታመኑ ጋጄቶች" : "Products we stand by"}</small></span></div>
              <div><span className="benefit-icon"><Truck size={18} /></span><span><strong>{isAmharic ? "ፈጣን ማድረሻ" : "Local delivery"}</strong><small>{isAmharic ? "በአዲስ አበባ" : "Across Addis Ababa"}</small></span></div>
              <div><span className="benefit-icon"><ShieldCheck size={18} /></span><span><strong>{isAmharic ? "በቀጥታ ያዝዙ" : "Order direct"}</strong><small>{isAmharic ? "በቴሌግራም በቀላሉ" : "A real person, right here"}</small></span></div>
            </section>

            <section className="catalog-section" id="catalog">
              <div className="section-heading">
                <div>
                  <p className="section-kicker">{isAmharic ? "የእኛ ስብስብ" : "THE GOOD STUFF"}</p>
                  <h2>{isAmharic ? "በጥንቃቄ የተመረጡ ጋጄቶች" : "Find your next favorite."}</h2>
                  <p className="section-subtitle">
                    {isAmharic ? "ጠቃሚ፣ ዘመናዊ እና ለዕለት ተዕለት የተዘጋጁ።" : "Useful little upgrades, selected with you in mind."}
                  </p>
                </div>
                <span className="product-total">{filteredProducts.length.toString().padStart(2, "0")} {isAmharic ? "ምርቶች" : "PRODUCTS"}</span>
              </div>

              <div className="catalog-tools">
                <div className="category-list" aria-label="Product categories">
                  {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        className={activeCategory === category.id ? "category-chip selected" : "category-chip"}
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                      >
                        <Icon size={15} />
                        {isAmharic ? category.labelAm : category.labelEn}
                      </button>
                    );
                  })}
                </div>
                <label className="search-box">
                  <Search size={17} aria-hidden="true" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder={isAmharic ? "ምርት ይፈልጉ..." : "Search products"}
                  />
                  <span className="search-shortcut">⌕</span>
                </label>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="product-grid">
                  {filteredProducts.map((product, index) => (
                    <article className="product-card" key={product.id}>
                      <button
                        className="product-image-button"
                        onClick={() => setSelectedProduct(product)}
                        aria-label={`View ${product.nameEn}`}
                      >
                        <Image
                          src={product.image}
                          alt={product.nameEn}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 33vw"
                          className="product-image"
                        />
                        <span className={`product-badge ${index === 1 ? "badge-lilac" : ""}`}>
                          {product.badge}
                        </span>
                        <span className="product-quick-view">
                          {isAmharic ? "ዝርዝር" : "Quick view"} <ArrowUpRight size={14} />
                        </span>
                      </button>
                      <div className="product-details">
                        <div className="product-rating">
                          <span><Star size={13} fill="currentColor" /> {product.rating}</span>
                          <span>{product.reviews} {isAmharic ? "ግምገማዎች" : "reviews"}</span>
                        </div>
                        <button className="product-name" onClick={() => setSelectedProduct(product)}>
                          {isAmharic ? product.nameAm : product.nameEn}
                        </button>
                        <p className="product-description">
                          {isAmharic ? product.descriptionAm : product.descriptionEn}
                        </p>
                        <div className="product-card-bottom">
                          <div className="price-stack">
                            <strong>{formatPrice(product.price)}</strong>
                            <del>{formatPrice(product.originalPrice)}</del>
                          </div>
                          <button
                            className="add-button"
                            onClick={() => addToCart(product)}
                            aria-label={`Add ${product.nameEn} to cart`}
                          >
                            <Plus size={19} />
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="empty-results">
                  <Search size={24} />
                  <strong>{isAmharic ? "ምንም ምርት አልተገኘም" : "No products found"}</strong>
                  <span>{isAmharic ? "ሌላ ቃል ይሞክሩ ወይም ምድቡን ይቀይሩ።" : "Try another search or choose a different category."}</span>
                </div>
              )}
            </section>

            <section className="bundle-banner">
              <div className="bundle-art" aria-hidden="true">
                <span className="bundle-disc disc-one"><Watch size={32} /></span>
                <span className="bundle-plus">+</span>
                <span className="bundle-disc disc-two"><Headphones size={32} /></span>
              </div>
              <div className="bundle-copy">
                <span className="bundle-kicker"><Sparkles size={14} /> A BETTER TOGETHER KIND OF DEAL</span>
                <h2>{isAmharic ? "በጥምር ይግዙ፣ የበለጠ ይቆጥቡ።" : "Your new favorite duo."}</h2>
                <p>{isAmharic ? "ስማርት ዋችን ከኢርበድስ ጋር በመግዛት 12% ይቆጥቡ።" : "Pair a smartwatch with earbuds and get 12% off your bundle."}</p>
              </div>
              <button className="button button-light" onClick={() => setActiveTab("combo")}>
                {isAmharic ? "ኮምቦዎን ይፍጠሩ" : "Build your bundle"} <ArrowRight size={16} />
              </button>
              <span className="bundle-percent">−12%</span>
            </section>
          </>
        )}

        {activeTab === "combo" && (
          <section className="combo-page">
            <div className="combo-intro">
              <span className="section-kicker"><Sparkles size={14} /> {isAmharic ? "ልዩ ቅናሽ" : "THE BUNDLE EDIT"}</span>
              <h1>{isAmharic ? "የራስዎን የጋጄት ኮምቦ ይፍጠሩ።" : "Two favorites. One lovely deal."}</h1>
              <p>{isAmharic ? "የሚወዱትን ስማርት ዋች እና ኢርበድስ ይምረጡ። በጥምር ሲገዙ 12% ቅናሽ ያግኙ።" : "Choose your smartwatch and earbuds, and enjoy 12% off when you bring them home together."}</p>
            </div>
            <div className="combo-selections">
              <ComboPicker
                title={isAmharic ? "ስማርት ዋች ይምረጡ" : "01 / Pick your watch"}
                products={PRODUCTS.filter((product) => product.category === "wearables")}
                selected={comboWatch}
                language={language}
                onSelect={setComboWatch}
                icon={<Watch size={18} />}
              />
              <ComboPicker
                title={isAmharic ? "ኢርበድስ ይምረጡ" : "02 / Pick your earbuds"}
                products={PRODUCTS.filter((product) => product.category === "audio")}
                selected={comboEarbuds}
                language={language}
                onSelect={setComboEarbuds}
                icon={<Headphones size={18} />}
              />
            </div>
            <div className="combo-summary">
              <div className="combo-summary-copy">
                <span className="section-kicker">{isAmharic ? "የእርስዎ ኮምቦ" : "YOUR PERSONAL PAIRING"}</span>
                <h2>{isAmharic ? "ዝግጁ ነው።" : "Good choice."}</h2>
                <p>{isAmharic ? "የተቀነሰው ዋጋ በካርትዎ ውስጥ ይታያል።" : "Your bundle discount is already included in the price."}</p>
              </div>
              <div className="combo-price">
                <del>{formatPrice(comboOriginal)}</del>
                <strong>{formatPrice(comboPrice)}</strong>
                <span>YOU SAVE {formatPrice(comboOriginal - comboPrice)}</span>
              </div>
              <button className="button button-primary" onClick={addComboToCart}>
                <ShoppingBag size={17} /> {isAmharic ? "ኮምቦውን ወደ ካርት ጨምር" : "Add bundle to cart"}
              </button>
            </div>
          </section>
        )}

        {activeTab === "about" && (
          <section className="about-page">
            <div className="about-hero">
              <span className="section-kicker"><CircleUserRound size={14} /> {isAmharic ? "ከሰው ጋር ያገናኝዎታል" : "A PERSON, NOT A BOT"}</span>
              <h1>{isAmharic ? "የሚወዱትን ቴክኖሎጂ ለማግኘት እንረዳዎታለን።" : "Good tech should feel easy."}</h1>
              <p>{isAmharic ? "TechPulse በጥንቃቄ የተመረጡ ጋጄቶችን ለማቅረብና የግዢ ሂደቱን ቀላል ለማድረግ የተፈጠረ ነው።" : "TechPulse is a small, thoughtfully curated electronics shop based in Addis Ababa. We believe finding a useful, well-loved gadget should be simple."}</p>
            </div>
            <div className="about-grid">
              <article className="about-card about-profile">
                <div className="profile-avatar"><Zap size={27} fill="currentColor" /></div>
                <span className="section-kicker">{isAmharic ? "የሱቁ አስተዳዳሪ" : "YOUR PRODUCT PERSON"}</span>
                <h2>{USER_CONTACT.name}</h2>
                <p>{USER_CONTACT.role}</p>
                <span className="location-line"><MapPin size={15} /> {USER_CONTACT.location}</span>
              </article>
              <article className="about-card">
                <ShieldCheck size={23} className="about-card-icon" />
                <h3>{isAmharic ? "ጥራት ከቁጥር ይልቅ" : "A little less, a lot better."}</h3>
                <p>{isAmharic ? "የምናቀርባቸውን ምርቶች በጥንቃቄ እንመርጣለን፣ ግልጽ መረጃና ቀላል የትዕዛዝ ሂደት እናቀርባለን።" : "We focus on a considered range, clear product information, and a straightforward way to order."}</p>
              </article>
              <article className="about-card">
                <Send size={22} className="about-card-icon" />
                <h3>{isAmharic ? "በቀጥታ ያግኙን" : "Let's talk tech."}</h3>
                <p>{isAmharic ? "ስለ ምርት ጥያቄ ካለዎት በቴሌግራም ወይም በስልክ ያግኙን።" : "Questions about a product or your order? Reach out directly and we’ll be happy to help."}</p>
                <a className="contact-link" href={USER_CONTACT.telegramUrl} target="_blank" rel="noreferrer">
                  <Send size={15} /> <span>{USER_CONTACT.telegram}</span> <ArrowUpRight size={14} />
                </a>
                <a className="contact-link contact-email" href={`mailto:${USER_CONTACT.email}`}>
                  <Mail size={15} /> <span>{USER_CONTACT.email}</span> <ArrowUpRight size={14} />
                </a>
              </article>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-top">
          <button className="brand footer-brand" onClick={() => setActiveTab("shop")}>
            <span className="brand-mark"><Zap size={19} fill="currentColor" /></span>
            <span className="brand-copy"><strong>techpulse<span>.</span></strong><small>GOOD TECH. GOOD EVERYDAY.</small></span>
          </button>
          <p>{isAmharic ? "በጥንቃቄ የተመረጡ የዕለት ተዕለት ጋጄቶች።" : "Thoughtfully picked tech for the everyday."}</p>
          <div className="footer-contacts">
            <a className="footer-contact footer-email" href={`mailto:${USER_CONTACT.email}`} aria-label={`Email ${USER_CONTACT.email}`}>
              <Mail size={17} />
              <span><small>Email us</small><strong>{USER_CONTACT.email}</strong></span>
            </a>
            <a className="footer-contact footer-chat" href={USER_CONTACT.telegramUrl} target="_blank" rel="noreferrer">
              <Send size={15} /> Chat with us <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 TechPulse · Addis Ababa, Ethiopia</span>
          <span>Curated with care by {USER_CONTACT.name}</span>
        </div>
      </footer>

      {cartOpen && (
        <div className="overlay" onMouseDown={() => setCartOpen(false)}>
          <aside
            className="cart-drawer"
            onMouseDown={(event) => event.stopPropagation()}
            aria-label={isAmharic ? "የግዢ ካርት" : "Shopping cart"}
          >
            <div className="drawer-heading">
              <div><span className="section-kicker">{isAmharic ? "የእርስዎ ምርጫ" : "YOUR GOOD FINDS"}</span><h2>{isAmharic ? "የግዢ ካርት" : "Your cart"} <span>{cartItemCount}</span></h2></div>
              <button className="close-button" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={20} /></button>
            </div>
            {cart.length === 0 ? (
              <div className="cart-empty">
                <span className="empty-bag"><ShoppingBag size={27} /></span>
                <h3>{isAmharic ? "ካርትዎ ባዶ ነው" : "Nothing in here just yet."}</h3>
                <p>{isAmharic ? "የሚወዱትን ጋጄት ይምረጡና ወደ ካርት ይጨምሩ።" : "Your next favorite gadget is only a browse away."}</p>
                <button className="button button-primary" onClick={() => setCartOpen(false)}>{isAmharic ? "ምርቶችን ይመልከቱ" : "Explore products"} <ArrowRight size={16} /></button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <div className="cart-item-image">
                        <Image src={item.image} alt={item.nameEn} fill sizes="80px" />
                      </div>
                      <div className="cart-item-info">
                        <strong>{isAmharic ? item.nameAm : item.nameEn}</strong>
                        <span>{formatPrice(item.price)}</span>
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, -1)} aria-label="Decrease quantity"><Minus size={13} /></button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} aria-label="Increase quantity"><Plus size={13} /></button>
                        </div>
                      </div>
                      <button className="remove-item" onClick={() => setCart((current) => current.filter((entry) => entry.id !== item.id))} aria-label="Remove item">
                        <Trash2 size={16} />
                      </button>
                    </article>
                  ))}
                </div>
                <div className="cart-summary">
                  <div className="shipping-note"><Truck size={16} /> {isAmharic ? "በአዲስ አበባ ማድረሻ" : "Local delivery in Addis Ababa"}</div>
                  <div className="cart-total"><span>{isAmharic ? "ጠቅላላ" : "Subtotal"}</span><strong>{formatPrice(cartTotal)}</strong></div>
                  <a className="button button-primary checkout-button" href={createOrderLink()} target="_blank" rel="noreferrer">
                    <Send size={17} /> {isAmharic ? "በቴሌግራም ያዝዙ" : "Continue on Telegram"}
                  </a>
                  <a className="call-link" href={`tel:${USER_CONTACT.phone}`}>{isAmharic ? "ወይም ይደውሉ" : "Rather call?"} {USER_CONTACT.phone}</a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {selectedProduct && (
        <div className="overlay modal-overlay" onMouseDown={() => setSelectedProduct(null)}>
          <section
            className="product-modal"
            onMouseDown={(event) => event.stopPropagation()}
            aria-label={isAmharic ? selectedProduct.nameAm : selectedProduct.nameEn}
          >
            <button className="close-button modal-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details"><X size={20} /></button>
            <div className="modal-image">
              <Image src={selectedProduct.image} alt={selectedProduct.nameEn} fill sizes="(max-width: 700px) 100vw, 50vw" />
              <span className="product-badge">{selectedProduct.badge}</span>
            </div>
            <div className="modal-info">
              <span className="section-kicker"><Star size={13} fill="currentColor" /> {selectedProduct.rating} · {selectedProduct.reviews} {isAmharic ? "ግምገማዎች" : "reviews"}</span>
              <h2>{isAmharic ? selectedProduct.nameAm : selectedProduct.nameEn}</h2>
              <p>{isAmharic ? selectedProduct.descriptionAm : selectedProduct.descriptionEn}</p>
              <ul>{(isAmharic ? selectedProduct.featuresAm : selectedProduct.featuresEn).map((feature) => <li key={feature}><Check size={15} /> {feature}</li>)}</ul>
              <div className="modal-buy-row">
                <div className="price-stack"><strong>{formatPrice(selectedProduct.price)}</strong><del>{formatPrice(selectedProduct.originalPrice)}</del></div>
                <button className="button button-primary" onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>
                  <ShoppingBag size={17} /> {isAmharic ? "ወደ ካርት ጨምር" : "Add to cart"}
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function ComboPicker({
  title,
  products,
  selected,
  language,
  onSelect,
  icon,
}: {
  title: string;
  products: Product[];
  selected: Product;
  language: Language;
  onSelect: (product: Product) => void;
  icon: ReactNode;
}) {
  return (
    <div className="combo-picker">
      <h2>{icon}{title}</h2>
      {products.map((product) => (
        <button
          className={selected.id === product.id ? "combo-option chosen" : "combo-option"}
          key={product.id}
          onClick={() => onSelect(product)}
        >
          <span className="combo-option-image">
            <Image src={product.image} alt="" fill sizes="58px" />
          </span>
          <span className="combo-option-copy">
            <strong>{language === "am" ? product.nameAm : product.nameEn}</strong>
            <small>{formatPrice(product.price)}</small>
          </span>
          <span className="combo-radio">{selected.id === product.id && <Check size={13} />}</span>
        </button>
      ))}
    </div>
  );
}
