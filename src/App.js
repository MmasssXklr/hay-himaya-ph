import React, { useState, useEffect } from "react";
import "./App.css";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";
import { Helmet } from "react-helmet";

// Google Config
const SHEET_ID = process.env.REACT_APP_SHEET_ID;
const API_KEY = process.env.REACT_APP_API_KEY;
const APP_RANGE = process.env.REACT_APP_RANGE;
const GA_ID = process.env.REACT_APP_GA_ID;

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  // Fetch Google Sheets data
  useEffect(() => {
    const fetchSheetData = async () => {
      try {

        console.log("SHEET_ID:", SHEET_ID);
        console.log("API_KEY:", API_KEY);
        console.log("APP_RANGE:", APP_RANGE);


        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${APP_RANGE}?key=${API_KEY}`
        );
        const data = await response.json();
        const rows = data.values;

        const formatted = rows.map((row) => ({
          id: row[0],
          name: row[1],
          description: row[2],
          image: row[3],
          price: row[4],
          orderLink: row[5],
          visible: row[6] === "TRUE",
        }));

        setProducts(formatted.filter((p) => p.visible));
      } catch (error) {
        console.error("Error fetching sheet data:", error);
      }
    };

    fetchSheetData();
  }, []);

  return (
    <div className="App">
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "ShopName",
            priceRange: "₱₱",
            review: [
              {
                "@type": "Review",
                reviewRating: {
                  "@type": "Rating",
                  ratingValue: "5",
                },
                author: {
                  "@type": "Person",
                  name: "Verified Buyer",
                },
              },
            ],
          })}
        </script>

        <title>Crochet Glow Up | Handmade with Heart</title>
        <meta
          name="description"
          content="Explore custom crochet plushies made with love. Perfect gifts for your loved ones."
        />

        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content="Crochet Glow Up | Handmade with Heart"
        />
        <meta
          property="og:description"
          content="Explore custom crochet plushies made with love."
        />
        <meta property="og:image" content="/images/og-banner.webp" />
        <meta property="og:url" content="https://yourdomain.com" />

        {/* Twitter */}
        <meta name="twitter:title" content="Crochet Glow Up" />
        <meta
          name="twitter:description"
          content="Shop adorable handmade plushies and gifts."
        />
        <meta name="twitter:image" content="/images/og-banner.webp" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Responsive Navbar */}
      <nav className="navbar">
        <div className="logo">Logo</div>
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li>
            <a href="#shop-name" onClick={() => setMenuOpen(false)}>
              Shop Name
            </a>
          </li>
          <li>
            <a href="#your-crocheter" onClick={() => setMenuOpen(false)}>
              Your Crocheter
            </a>
          </li>
          <li>
            <a href="#shop" onClick={() => setMenuOpen(false)}>
              Shop
            </a>
          </li>
          <li>
            <a href="#testimony" onClick={() => setMenuOpen(false)}>
              Testimony
            </a>
          </li>
        </ul>
      </nav>

      {/* Page Sections */}
      <div className="page-content">
        <section id="shop-name" className="hero">
          <h1>
            Welcome to <i>Shop Name</i>
          </h1>
          <div className="hero-row">
            <p className="tagline">
              Crafted with care, made to love — each stitch tells your story.
            </p>
            <button
              onClick={() => {
                document
                  .getElementById("shop")
                  .scrollIntoView({ behavior: "smooth" });
              }}
              className="order-btn price-btn"
            >
              View Prices
            </button>
          </div>
        </section>

        <section id="your-crocheter" className="crocheter-section">
          <div className="crocheter-content">
            <div className="crocheter-photo-frame">
              <img
                src="/images/pocahontas-profile.webp"
                alt="Your Crocheter"
                className="crocheter-photo"
                loading="lazy"
              />
            </div>

            <div className="crocheter-bio">
              <h3>Name Here</h3>
              <p className="short-story">Story here</p>
              <p className="bio-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua...
              </p>
            </div>
          </div>

          <div className="crocheter-gallery">
            <div className="gallery-card">
              <img src="/personal1.jpg" alt="" loading="lazy" />
              <p>Personal pics niche related</p>
            </div>
            <div className="gallery-card">
              <img src="/personal2.jpg" alt="" loading="lazy" />
              <p>Personal pics niche related</p>
            </div>
            <div className="gallery-card">
              <img src="/personal3.jpg" alt="" loading="lazy" />
              <p>Personal pics niche related</p>
            </div>
          </div>
        </section>

        <section id="shop">
          <h2>Shop</h2>
          <div className="shop-grid">
            {products.map((item) => (
              <div className="product-card" key={item.id}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>
                  <strong>₱{item.price}</strong>
                </p>
                  <a 
                    href={`https://m.me/100063791350743?ref=${encodeURIComponent(
                      `Hi! I'm interested in ordering "${item.name}" for ₱${item.price}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="order-btn"
                  >
                    Order Now
                  </a>


              </div>
            ))}
          </div>
        </section>

        <section id="testimony">
          <h2 className="testimony-title">
            Reviews <span className="stars">★★★★★</span>
          </h2>

          <div className="testimony-list">
            <div className="bubble">
              "Super cute and soft! My niece loved the plushie!" — Ana B.
            </div>
            <div className="bubble">
              "Order came fast, and the quality is top-notch!" — Carlo M.
            </div>
            <div className="bubble">
              "I customized the color and it turned out perfect. 10/10!" — Jay
              C.
            </div>
          </div>

          <div className="socials">
            <a
              href="https://web.facebook.com/profile.php?id=100063791350743"
              aria-label="Instagram"
            >
              <FaInstagram size={24} />{" "}
            </a>

            <a
              href="https://web.facebook.com/profile.php?id=100063791350743"
              aria-label="Facebook"
            >
              <FaFacebook size={24} />{" "}
            </a>

            <a
              href="https://web.facebook.com/profile.php?id=100063791350743"
              aria-label="Tiktok"
            >
              <FaTiktok size={24} />{" "}
            </a>
          </div>
        </section>
        <footer>
          <p>© 2025 Lorem Lorem Lorem. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
