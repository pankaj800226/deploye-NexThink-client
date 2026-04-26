import { ArrowRightAlt, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import ApiError from "../components/ApiError";
import Loading from "../components/Loading";
import one from "../assets/one.png";
import two from "../assets/two.png";
import three from "../assets/three.png";
import four from "../assets/four.png";
import five from "../assets/five.png";




/* ─── All animations are pure CSS — zero JS overhead ─── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Entrance animations ── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(26px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }

    /* ── Underline slide-in ── */
    @keyframes slideRight {
      from { width: 0%; }
      to   { width: 100%; }
    }

    /* ── Gradient text shimmer ── */
    @keyframes shimmerText {
      0%   { background-position: -200% center; }
      100% { background-position:  200% center; }
    }

    /* ── CTA shine sweep ── */
    @keyframes btnShine {
      0%       { left: -80%;  }
      60%,100% { left: 120%;  }
    }

    /* ── Progress bar fill ── */
    @keyframes progressFill {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }

    /* ── Stagger helpers ── */
    .anim-badge    { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.05s; }
    .anim-title    { opacity:0; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.15s; }
    .anim-sub      { opacity:0; animation: fadeUp 0.65s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.28s; }
    .anim-avs      { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.38s; }
    .anim-cta      { opacity:0; animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) forwards; animation-delay:.48s; }
    .anim-carousel { opacity:0; animation: fadeIn 0.7s  ease                      forwards; animation-delay:.58s; }

    /* ── Shimmer gradient text ── */
    .shimmer-text {
      background: linear-gradient(
        90deg,
        #1e1b4b 0%,
        #4f46e5 30%,
        #7c3aed 50%,
        #4f46e5 70%,
        #1e1b4b 100%
      );
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmerText 4s linear infinite;
    }

    /* ── Animated underline under gradient text ── */
    .title-underline { position: relative; }
    .title-underline::after {
      content: '';
      position: absolute;
      bottom: -5px; left: 0;
      height: 3px; width: 0;
      border-radius: 2px;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: slideRight 0.7s cubic-bezier(.22,1,.36,1) forwards;
      animation-delay: .75s;
    }

    /* ── Badge pill ── */
    .badge-pill {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 6px 16px;
      border-radius: 50px;
      background: #eef2ff;
      border: 1px solid #c7d2fe;
      font-size: 13px;
      font-weight: 500;
      color: #4338ca;
      letter-spacing: .01em;
    }
    .badge-pill .live-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      background: #4f46e5;
    }

    /* ── Primary CTA ── */
    .cta-btn {
      position: relative;
      overflow: hidden;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 34px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border: none;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 4px 18px rgba(79,70,229,.32);
      transition: transform .18s ease, box-shadow .18s ease;
    }
    .cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 28px rgba(79,70,229,.40);
    }
    /* shine sweep */
    .cta-btn::after {
      content: '';
      position: absolute;
      top: 0; left: -80%;
      width: 60%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.22), transparent);
      animation: btnShine 2.8s ease-in-out infinite;
      animation-delay: 1.2s;
    }

    /* ── Outline CTA ── */
    .cta-outline {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 13px 28px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px;
      font-weight: 500;
      color: #4f46e5;
      background: #fff;
      border: 1.5px solid #c7d2fe;
      cursor: pointer;
      text-decoration: none;
      transition: border-color .18s, background .18s;
    }
    .cta-outline:hover { border-color: #4f46e5; background: #f5f3ff; }

    /* ── Avatar ── */
    .av-img {
      border: 2.5px solid #fff;
      box-shadow: 0 2px 6px rgba(0,0,0,.10);
      transition: transform .18s;
    }
    .av-img:hover { transform: translateY(-4px); z-index: 10 !important; }

    /* ── Carousel nav btn ── */
    .nav-btn {
      width: 38px; height: 38px;
      border-radius: 10px;
      border: 1.5px solid #e5e7eb;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #374151;
      box-shadow: 0 1px 4px rgba(0,0,0,.05);
      transition: border-color .18s, background .18s, color .18s, transform .18s;
    }
    .nav-btn:hover {
      border-color: #4f46e5;
      background: #eef2ff;
      color: #4f46e5;
      transform: scale(1.07);
    }

    /* ── Dot indicators ── */
    .dot-btn {
      height: 6px;
      border-radius: 3px;
      border: none;
      cursor: pointer;
      padding: 0;
      transition: width .32s ease, background .22s ease;
    }

    /* ── Progress bar ── */
    .progress-bar {
      height: 100%;
      width: 100%;
      transform-origin: left;
      background: linear-gradient(90deg, #4f46e5, #7c3aed);
      animation: progressFill 5s linear forwards;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .banner-inner  { padding: 90px 20px 60px !important; }
      .cta-row       { flex-direction: column !important; align-items: center !important; }
    }
  `}</style>
);

/* ═══════════════════════════════ Banner ═══════════════════════════════════ */
const Banner = () => {
  const [allUser, setAllUser] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const carouselData = [
    { id: 1, image: one, title: "Banner one", },
    { id: 2, image: two, title: "Feature" },
    { id: 3, image: three, title: "Daily Planner" },
    { id: 4, image: four, title: "Habbit Tracker" },
    { id: 5, image: five, title: "Focus Mode" },

  ];

  const nextSlide = useCallback(
    () => setCurrentSlide((p) => (p + 1) % carouselData.length),
    [carouselData.length]
  );
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + carouselData.length) % carouselData.length);

  /* auto-play */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [isPaused, nextSlide]);

  /* fetch users */
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);
        const res = await axios.get(`${api}/api/user/allUser`);
        setAllUser(res.data);
      } catch {
        toast.error("Something went wrong");
        setError("Something went wrong");
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  if (error) return <ApiError error={error} />;
  if (loader) return <Loading />;

  return (
    <>
      <GlobalStyles />

      <section
        style={{
          minHeight: "100vh",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* ── Static soft blobs (no JS animation) ── */}
        <div style={{
          position: "absolute", top: "-140px", left: "-140px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(79,70,229,.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-100px", right: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Content ── */}
        <div
          className="banner-inner"
          style={{
            width: "100%",
            maxWidth: "860px",
            margin: "0 auto",
            padding: "110px 40px 80px",
            textAlign: "center",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Badge */}
          <div className="anim-badge" style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
            <span className="badge-pill">
              <span className="live-dot" />
              Now in Public Beta — Free Forever
            </span>
          </div>

          {/* Headline */}
          <h1
            className="anim-title"
            style={{
              fontSize: "clamp(32px, 5.5vw, 64px)",
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              color: "#111827",
              marginBottom: "20px",
            }}
          >
            Organize everything{" "}
            <span className="shimmer-text title-underline">in one place</span>
          </h1>

          {/* Subtitle */}
          <p
            className="anim-sub"
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "#6b7280",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 32px",
              fontWeight: 400,
            }}
          >
            Write, plan, and track — all in one distraction-free workspace.{" "}
            <strong style={{ color: "#111827", fontWeight: 600 }}>NextThink</strong>{" "}
            keeps your tasks, notes, and projects in perfect order.
          </p>

          {/* Avatars + social proof */}
          <div
            className="anim-avs"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              gap: "12px", marginBottom: "32px", flexWrap: "wrap",
            }}
          >
            {/* Stacked avatars */}
            <div style={{ display: "flex", alignItems: "center" }}>
              {allUser.slice(0, 7).map((user, index) => (
                <div
                  key={user._id || index}
                  className="av-img"
                  style={{
                    width: "38px", height: "38px", borderRadius: "50%",
                    backgroundImage: `url(${user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"})`,
                    backgroundSize: "cover", backgroundPosition: "center",
                    marginLeft: index !== 0 ? "-10px" : "0",
                    position: "relative", zIndex: 8 - index,
                  }}
                />
              ))}
              {allUser.length > 4 && (
                <div style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "#f3f4f6",
                  border: "2.5px solid #fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: 700, color: "#4f46e5",
                  marginLeft: "-10px",
                }}>
                  +{allUser.length - 4}
                </div>
              )}
            </div>

            {/* Stars + text */}
            <div style={{ textAlign: "left" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "2px" }}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: "#f59e0b", fontSize: "13px" }}>★</span>
                ))}
              </div>
              <span style={{ fontSize: "13px", color: "#9ca3af" }}>
                Trusted by{" "}
                <strong style={{ color: "#374151" }}>{allUser.length}+ users</strong>
              </span>
            </div>
          </div>

          {/* CTA row */}
          <div
            className="anim-cta cta-row"
            style={{
              display: "flex", gap: "12px", justifyContent: "center",
              marginBottom: "64px", flexWrap: "wrap",
            }}
          >
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <button className="cta-btn">
                Get Started Free
                <ArrowRightAlt style={{ fontSize: 20 }} />
              </button>
            </Link>
            <Link to="/about" style={{ textDecoration: "none" }}>
              <button className="cta-outline">See how it works</button>
            </Link>
          </div>

          {/* ── Carousel ── */}
          <div
            className="anim-carousel"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Top row */}
            <div style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              marginBottom: "14px", paddingInline: "2px",
            }}>
              <div style={{ textAlign: "left" }}>
                <span style={{ fontSize: "11px", color: "#9ca3af", textTransform: "uppercase", letterSpacing: ".07em" }}>
                  Feature preview
                </span>
                <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#374151" }}>
                  {carouselData[currentSlide].title}
                </p>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button className="nav-btn" onClick={prevSlide} aria-label="Previous">
                  <ChevronLeft style={{ fontSize: 20 }} />
                </button>
                <button className="nav-btn" onClick={nextSlide} aria-label="Next">
                  <ChevronRight style={{ fontSize: 20 }} />
                </button>
              </div>
            </div>

            {/* Image frame */}
            <div style={{
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 4px 6px rgba(0,0,0,.04), 0 20px 50px rgba(0,0,0,.09), 0 0 0 1px rgba(0,0,0,.05)",
              position: "relative",
              aspectRatio: "16/9",
              background: "#f9fafb",
            }}>
              <img
                key={currentSlide}
                src={carouselData[currentSlide].image}
                alt={carouselData[currentSlide].title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                  transition: "opacity .35s ease",
                }}
              />

              {/* Caption */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "40px 20px 20px",
                background: "linear-gradient(to top, rgba(17,24,39,.78) 0%, transparent 100%)",
                textAlign: "left",
              }}>
                <p style={{ margin: "0 0 3px", fontSize: "17px", fontWeight: 700, color: "#fff" }}>
                  {carouselData[currentSlide].title}
                </p>
              
              </div>

              {/* Counter badge */}
              <div style={{
                position: "absolute", top: "14px", right: "14px",
                background: "rgba(255,255,255,.88)",
                backdropFilter: "blur(6px)",
                border: "1px solid rgba(0,0,0,.06)",
                borderRadius: "50px",
                padding: "3px 12px",
                fontSize: "12px", fontWeight: 600, color: "#374151",
              }}>
                {currentSlide + 1} / {carouselData.length}
              </div>

              {/* Progress bar */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                height: "3px", background: "rgba(255,255,255,.18)",
              }}>
                <div
                  key={`prog-${currentSlide}`}
                  className="progress-bar"
                  style={{ animationDuration: isPaused ? "0s" : "5s" }}
                />
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "18px" }}>
              {carouselData.map((_, i) => (
                <button
                  key={i}
                  className="dot-btn"
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: currentSlide === i ? "28px" : "6px",
                    background: currentSlide === i ? "#4f46e5" : "#e5e7eb",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;