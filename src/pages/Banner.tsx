import { Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const tasks = [
  "Create a new task...",
  "Plan today's goals...",
  "Write project notes...",
  "Start deep focus session..."
];

const Banner = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [char, setChar] = useState(0);

  const bannerRef = useRef<HTMLDivElement>(null);

  /* ================= Typing ================= */
  useEffect(() => {
    const current = tasks[index];
    const typing = setTimeout(() => {
      setText(current.slice(0, char + 1));
      setChar((c) => c + 1);
    }, 45);

    if (char === current.length) {
      setTimeout(() => {
        setChar(0);
        setText("");
        setIndex((i) => (i + 1) % tasks.length);
      }, 1400);
    }
    return () => clearTimeout(typing);
  }, [char, index]);

  /* ================= 3D GSAP ================= */
  useEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(".left h2", {
        y: 40,
        rotateX: 15,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".left p", {
        y: 30,
        rotateX: 12,
        opacity: 0,
        delay: 0.2,
        duration: 0.9,
      });

      gsap.from(".left ul li", {
        y: 20,
        rotateX: 10,
        opacity: 0,
        stagger: 0.12,
        delay: 0.35,
      });

      gsap.from(".task_input", {
        y: 20,
        rotateX: 12,
        opacity: 0,
        delay: 0.6,
      });

      gsap.from(".start_btn", {
        y: 20,
        rotateX: 15,
        opacity: 0,
        delay: 0.8,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  /* ================= Mouse Parallax ================= */
  useEffect(() => {
    const el = bannerRef.current;
    if (!el) return;

    const move = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;

      gsap.to(".left", {
        rotateY: x,
        rotateX: -y,
        transformPerspective: 800,
        duration: 0.6,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.section
      ref={bannerRef}
      className="banner"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="bg_blob blob1" />
      <div className="bg_blob blob2" />
      <div className="bg_blob blob3" />

      <div className="container">
        <div className="left">
          <h2>Organize Everything in One Place</h2>
          <p>
            Write, plan, track. NextThink gives you a distraction-free workspace
            to manage tasks, notes, and projects efficiently.
          </p>

          <ul>
            <li>✨ Clean task management</li>
            <li>✨ Smart scheduling</li>
            <li>✨ Timer for focus sessions</li>
            <li>✨ Efficient project tracking</li>
          </ul>

          <div className="task_input">
            <span className="plus">＋</span>
            <span className="typing">{text}</span>
            <span className="cursor" />
          </div>

          <Link to="/dashboard">
            <Button
              startIcon={<ArrowRightAlt />}
              className="start_btn"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default Banner;
