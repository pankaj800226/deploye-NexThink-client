import { Dashboard, TaskAlt, Timer, Work } from "@mui/icons-material";
import { motion } from "framer-motion";
import { Bolt, Keyboard } from "lucide-react";

const Feature = () => {
  const data = [
    {
      icon: <TaskAlt />,
      title: "Task Management",
      gradient: "linear-gradient(135deg, #6a5af9, #00e5ff)",
      des: "Organize your work with smart task lists, priorities, and completion tracking",
    },
    {
      icon: <Timer />,
      title: "Focus Timer & Challenges",
      gradient: "linear-gradient(135deg, #00e676, #00bfa5)",
      des: "Stay focused with Pomodoro sessions and daily productivity challenges",
    },
    {
      icon: <Dashboard />,
      title: "Dashboard Analytics",
      gradient: "linear-gradient(135deg, #ff4dff, #8e2de2)",
      des: "Visualize your productivity with clean and detailed analytics",
    },
    {
      icon: <TaskAlt />,
      title: "Project Organization",
      gradient: "linear-gradient(135deg, #ffa726, #ff7043)",
      des: "Group your tasks into projects and track progress easily",
    },

    {
      icon: <Work />,
      title: "Work Scheduler",
      gradient: "linear-gradient(135deg, #b5177b, #ff7043)",
      des: "Plan your day efficiently with a smart work scheduler that keeps your tasks and projects on track",
    },

    {
      icon: <Bolt />,
      title: "Your Routine",
      gradient: "linear-gradient(135deg, #c70cec, #e61655)",
      des: "Create and manage your routines with ease.",
    },

    {
      icon: <Keyboard />,
      title: "Keyboard-Driven Navigation",
      gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
      des: "Navigate instantly using Ctrl + K command palette and productivity shortcuts.",
    }



  ];

  return (
    <div className="feature_wrapper">
      {/* Background blobs */}
      <div className="feature_blob blob_a"></div>
      <div className="feature_blob blob_b"></div>

      <motion.h1
        className="banner_header"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        Everything You Need to Stay Productive
      </motion.h1>

      <div className="feature_container">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="feature_card"
            whileHover={{ y: -8, scale: 1.02 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div
              className="icon_circle"
              style={{ background: item.gradient }}
            >
              {item.icon}
            </div>

            <p>{item.title}</p>
            <span>{item.des}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
