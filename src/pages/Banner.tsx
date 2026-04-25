import { ArrowRightAlt, ChevronLeft, ChevronRight } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import axios from "axios";
import { api } from "../api/api";
import toast from "react-hot-toast";
import ApiError from "../components/ApiError";
import Loading from "../components/Loading";
import img from "../assets/Gemini_Generated_Image_yslo0fyslo0fyslo.png";

/* ── Injected global styles ── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    :root {
      --bg:       #070a12;
      --surface:  #0d1220;
      --border:   rgba(255,255,255,0.06);
      --accent:   #4fffb0;
      --accent2:  #7c6fff;
      --text-hi:  #f0f4ff;
      --text-lo:  #6b7594;
      --radius:   20px;
    }

    /* ── Orbs ── */
    @keyframes orbFloat1 {
      0%,100% { transform: translate(0,0) scale(1); }
      33%      { transform: translate(40px,-30px) scale(1.05); }
      66%      { transform: translate(-20px,20px) scale(0.97); }
    }
    @keyframes orbFloat2 {
      0%,100% { transform: translate(0,0) scale(1); }
      40%      { transform: translate(-50px,40px) scale(1.08); }
      70%      { transform: translate(30px,-20px) scale(0.95); }
    }
    @keyframes orbFloat3 {
      0%,100% { transform: translate(0,0) scale(1); }
      50%      { transform: translate(20px,50px) scale(1.06); }
    }

    /* ── Grid shimmer ── */
    @keyframes gridShimmer {
      0%   { opacity: 0.18; }
      50%  { opacity: 0.28; }
      100% { opacity: 0.18; }
    }

    /* ── CTA pulse ring ── */
    @keyframes ringPulse {
      0%   { transform: scale(1);   opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0;   }
    }

    /* ── Dot progress ── */
    @keyframes dotGrow {
      from { width: 6px; }
      to   { width: 28px; }
    }

    /* ── Noise overlay (subtle grain) ── */
    .banner-noise::after {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.03;
      pointer-events: none;
      z-index: 1;
    }

    /* ── Carousel image glow frame ── */
    .carousel-frame {
      border-radius: var(--radius);
      overflow: hidden;
      box-shadow:
        0 0 0 1px var(--border),
        0 32px 80px rgba(0,0,0,0.6),
        0 0 60px rgba(78,255,176,0.06);
      position: relative;
      aspect-ratio: 16/9;
    }
    .carousel-frame::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(78,255,176,0.04) 0%, transparent 60%);
      z-index: 2;
      pointer-events: none;
    }

    /* ── Nav arrow button ── */
    .nav-btn {
      background: rgba(255,255,255,0.05);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border);
      border-radius: 10px;
      width: 40px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
      color: var(--text-hi);
    }
    .nav-btn:hover {
      background: rgba(78,255,176,0.12);
      border-color: rgba(78,255,176,0.3);
      transform: scale(1.08);
    }

    /* ── CTA Button ── */
    .cta-btn {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 36px;
      border-radius: 50px;
      font-family: 'DM Sans', sans-serif;
      font-size: 16px;
      font-weight: 500;
      color: #070a12;
      background: var(--accent);
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 0 30px rgba(78,255,176,0.4), 0 4px 16px rgba(0,0,0,0.3);
    }
    .cta-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 48px rgba(78,255,176,0.55), 0 8px 24px rgba(0,0,0,0.4);
    }
    .cta-btn .ring {
      position: absolute;
      inset: 0;
      border-radius: 50px;
      border: 1px solid var(--accent);
      animation: ringPulse 1.8s ease-out infinite;
    }

    /* ── Avatar ring ── */
    .av {
      border: 2px solid #0d1220;
      box-shadow: 0 0 0 1px rgba(78,255,176,0.2);
      transition: transform 0.2s;
    }
    .av:hover { transform: translateY(-4px) scale(1.1); z-index: 10; }

    /* ── Badge chip ── */
    .badge-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      border-radius: 50px;
      border: 1px solid rgba(78,255,176,0.25);
      background: rgba(78,255,176,0.06);
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      color: var(--accent);
      letter-spacing: 0.02em;
      margin-bottom: 24px;
    }
    .badge-chip .dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--accent);
      animation: ringPulse 1.4s ease-out infinite;
    }

    /* ── Responsive ── */
    @media (max-width: 768px) {
      .banner-title-text { font-size: 38px !important; }
      .banner-sub-text   { font-size: 16px !important; }
      .banner-inner      { padding: 100px 20px 60px !important; }
    }
    @media (max-width: 480px) {
      .banner-title-text { font-size: 30px !important; }
    }
  `}</style>
);

/* ── Animated background orb ── */
const Orb = ({
  size, top, left, color, animation, delay = "0s",
}: {
  size: number; top: string; left: string;
  color: string; animation: string; delay?: string;
}) => (
  <div
    style={{
      position: "absolute",
      width: size,
      height: size,
      top,
      left,
      borderRadius: "50%",
      background: color,
      filter: `blur(${size * 0.42}px)`,
      animation: `${animation} ${7 + size * 0.02}s ease-in-out infinite`,
      animationDelay: delay,
      opacity: 0.55,
      pointerEvents: "none",
    }}
  />
);

/* ─────────────────────────────────── Banner ─────────────────────────────── */
const Banner = () => {
  const [allUser, setAllUser] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  const carouselData = [
    { id: 1, image: img, title: "Task Management", description: "Organize your daily tasks with ease" },
    { id: 2, image: img, title: "Team Collaboration", description: "Work together seamlessly" },
    { id: 3, image: img, title: "Smart Notes", description: "Capture ideas instantly" },
    { id: 4, image: img, title: "Project Tracking", description: "Monitor progress in real-time" },
  ];

  const nextSlide = useCallback(() =>
    setCurrentSlide((p) => (p + 1) % carouselData.length), [carouselData.length]);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + carouselData.length) % carouselData.length);

  /* Auto-play */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(nextSlide, 5000);
    return () => clearInterval(id);
  }, [isPaused, nextSlide]);

  /* GSAP entrance */
  useEffect(() => {
    if (!bannerRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".banner-badge", { y: 20, opacity: 0, duration: 0.6 })
        .from(".banner-title", { y: 50, opacity: 0, duration: 0.9 }, "-=0.3")
        .from(".banner-subtitle", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".user-avatars", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".cta-section", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".carousel-container", { y: 40, opacity: 0, duration: 0.9, ease: "power2.out" }, "-=0.3");
    }, bannerRef);
    return () => ctx.revert();
  }, []);

  /* Fetch users */
  const fetchAllUser = async () => {
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
  };
  useEffect(() => { fetchAllUser(); }, []);

  if (error) return <ApiError error={error} />;
  if (loader) return <Loading />;

  return (
    <>
      <GlobalStyles />
      <motion.section
        ref={bannerRef}
        className="banner-noise"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          minHeight: "100vh",
          background: "var(--bg)",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {/* ── Animated orbs ── */}
        <Orb size={520} top="-10%" left="-8%" color="radial-gradient(circle, rgba(78,255,176,0.35) 0%, transparent 70%)" animation="orbFloat1" />
        <Orb size={420} top="40%" left="70%" color="radial-gradient(circle, rgba(124,111,255,0.3) 0%, transparent 70%)" animation="orbFloat2" delay="2s" />
        <Orb size={300} top="70%" left="20%" color="radial-gradient(circle, rgba(78,255,176,0.2) 0%, transparent 70%)" animation="orbFloat3" delay="4s" />

        {/* ── Dot grid overlay ── */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            animation: "gridShimmer 6s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* ── Top edge line ── */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(78,255,176,0.4) 50%, transparent 100%)",
          zIndex: 3,
        }} />

        {/* ── Main content ── */}
        <div
          className="banner-inner"
          style={{
            width: "100%",
            maxWidth: "900px",
            margin: "0 auto",
            padding: "120px 40px 80px",
            position: "relative",
            zIndex: 2,
            textAlign: "center",
          }}
        >
          {/* Badge */}
          <div className="banner-badge" style={{ display: "flex", justifyContent: "center" }}>
            <span className="badge-chip">
              <span className="dot" />
              Now in Public Beta — Free Forever
            </span>
          </div>

          {/* Title */}
          <h1
            className="banner-title banner-title-text"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(36px, 6vw, 72px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--text-hi)",
              marginBottom: "24px",
            }}
          >
            Organize Everything{" "}
            <span
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              in One Place
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="banner-subtitle banner-sub-text"
            style={{
              fontSize: "clamp(15px, 2vw, 19px)",
              color: "var(--text-lo)",
              lineHeight: 1.7,
              maxWidth: "560px",
              margin: "0 auto 40px",
            }}
          >
            Write, plan, track.{" "}
            <strong style={{ color: "var(--text-hi)", fontWeight: 500 }}>NextThink</strong>{" "}
            gives you a distraction-free workspace to manage tasks, notes, and projects efficiently.
          </p>

          {/* Avatars */}
          <div
            className="user-avatars"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "14px",
              marginBottom: "36px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              {allUser.slice(0, 7).map((user, index) => (
                <div
                  key={user._id || index}
                  className="av"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundImage: `url(${user?.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    marginLeft: index !== 0 ? "-10px" : "0",
                    position: "relative",
                    zIndex: 7 - index,
                  }}
                />
              ))}
              {allUser.length > 4 && (
                <div
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "var(--surface)",
                    border: "2px solid #0d1220",
                    boxShadow: "0 0 0 1px rgba(78,255,176,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "var(--accent)",
                    marginLeft: "-10px",
                    zIndex: 0,
                  }}
                >
                  +{allUser.length - 4}
                </div>
              )}
            </div>
            <span style={{ fontSize: "14px", color: "var(--text-lo)" }}>
              Join{" "}
              <strong style={{ color: "var(--text-hi)" }}>{allUser.length}+ users</strong>{" "}
              already organized
            </span>
          </div>

          {/* CTA */}
          <div className="cta-section" style={{ marginBottom: "72px" }}>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <button className="cta-btn">
                <span className="ring" />
                Get Started Free
                <ArrowRightAlt style={{ fontSize: 20 }} />
              </button>
            </Link>
          </div>

          {/* ── Carousel ── */}
          <div
            className="carousel-container"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Section label */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "16px",
              paddingInline: "4px",
            }}>
              <span style={{ fontSize: "13px", color: "var(--text-lo)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {carouselData[currentSlide].title}
              </span>
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
            <div className="carousel-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.03, filter: "blur(6px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
                  style={{ position: "relative", width: "100%", height: "100%" }}
                >
                  <img
                    src={carouselData[currentSlide].image}
                    alt={carouselData[currentSlide].title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />

                  {/* Bottom caption gradient */}
                  <div style={{
                    position: "absolute",
                    bottom: 0, left: 0, right: 0,
                    padding: "40px 24px 24px",
                    background: "linear-gradient(to top, rgba(7,10,18,0.85) 0%, transparent 100%)",
                    zIndex: 3,
                    textAlign: "left",
                  }}>
                    <p style={{
                      margin: "0 0 4px",
                      fontFamily: "'Syne', sans-serif",
                      fontSize: "clamp(16px, 2vw, 20px)",
                      fontWeight: 700,
                      color: "var(--text-hi)",
                    }}>
                      {carouselData[currentSlide].title}
                    </p>
                    <p style={{ margin: 0, fontSize: "14px", color: "rgba(255,255,255,0.65)" }}>
                      {carouselData[currentSlide].description}
                    </p>
                  </div>

                  {/* Top-right slide counter */}
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    right: "16px",
                    background: "rgba(7,10,18,0.6)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid var(--border)",
                    borderRadius: "50px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    color: "var(--text-lo)",
                    zIndex: 4,
                    fontFamily: "'DM Sans', sans-serif",
                    fontVariantNumeric: "tabular-nums",
                  }}>
                    {currentSlide + 1} / {carouselData.length}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar at bottom of image */}
              <div style={{
                position: "absolute",
                bottom: 0, left: 0, right: 0,
                height: "3px",
                background: "rgba(255,255,255,0.08)",
                zIndex: 5,
              }}>
                <motion.div
                  key={currentSlide}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: isPaused ? 0 : 5, ease: "linear" }}
                  style={{
                    height: "100%",
                    background: "linear-gradient(90deg, var(--accent), var(--accent2))",
                    borderRadius: "0 2px 2px 0",
                  }}
                />
              </div>
            </div>

            {/* Dot indicators */}
            <div style={{
              display: "flex",
              justifyContent: "center",
              gap: "6px",
              marginTop: "20px",
            }}>
              {carouselData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  style={{
                    width: currentSlide === i ? "28px" : "6px",
                    height: "6px",
                    borderRadius: "3px",
                    background: currentSlide === i
                      ? "var(--accent)"
                      : "rgba(255,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.4,0,0.2,1)",
                    padding: 0,
                    boxShadow: currentSlide === i ? "0 0 10px rgba(78,255,176,0.5)" : "none",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom fade ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: "120px",
          background: "linear-gradient(to top, var(--bg), transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }} />
      </motion.section>
    </>
  );
};

export default Banner;