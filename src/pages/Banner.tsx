import { Button } from "@mui/material";
import { ArrowRightAlt } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const current = tasks[index];
    const typing = setTimeout(() => {
      setText(current.slice(0, char + 1));
      setChar((c) => c + 1);
    }, 45); // slightly slower for production feel

    if (char === current.length) {
      setTimeout(() => {
        setChar(0);
        setText("");
        setIndex((i) => (i + 1) % tasks.length);
      }, 1400);
    }
    return () => clearTimeout(typing);
  }, [char, index]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="banner"
    >
      {/* Background Blobs */}
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

          {/* Notion-style animated input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="task_input"
          >
            <span className="plus">＋</span>
            <span className="typing">{text}</span>
            <span className="cursor" />
          </motion.div>

          {/* CTA Button */}
          <Link to="/dashboard">
            <Button
              startIcon={<ArrowRightAlt />}
              className="start_btn"
              sx={{ color: "#fff" }}
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
