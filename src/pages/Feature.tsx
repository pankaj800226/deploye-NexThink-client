import { Dashboard, TaskAlt, Timer, Work } from "@mui/icons-material";
import { Bolt, Keyboard } from "lucide-react";

const FeatureStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    @keyframes fadeUpFeature {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0);    }
    }

    @keyframes iconShimmer {
      0%   { background-position: 0% 50%;   }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%;   }
    }

    @keyframes slideRightFeat {
      from { width: 0%;   }
      to   { width: 100%; }
    }

    .animate-fadeUp {
      animation: fadeUpFeature 0.6s cubic-bezier(.22,1,.36,1) forwards;
    }
    .animate-slideRight {
      animation: slideRightFeat 0.8s cubic-bezier(.22,1,.36,1) forwards;
    }
    .animate-iconShimmer {
      animation: iconShimmer 4s linear infinite;
      background-size: 200% auto;
    }
  `}</style>
);

const Feature = () => {
  const data = [
    {
      icon: <TaskAlt sx={{ fontSize: 22 }} />,
      title: "Task Management",
      gradientTailwind: "from-indigo-600 to-purple-600",
      des: "Organize your work with smart task lists, priorities, and completion tracking.",
      tag: "Productivity",
    },
    {
      icon: <Timer sx={{ fontSize: 22 }} />,
      title: "Focus Timer & Challenges",
      gradientTailwind: "from-sky-500 to-indigo-600",
      des: "Stay focused with Pomodoro sessions and daily productivity challenges.",
      tag: "Focus",
    },
    {
      icon: <Dashboard sx={{ fontSize: 22 }} />,
      title: "Dashboard Analytics",
      gradientTailwind: "from-purple-600 to-purple-500",
      des: "Visualize your productivity with clean and detailed analytics.",
      tag: "Insights",
    },
    {
      icon: <Work sx={{ fontSize: 22 }} />,
      title: "Habit Tracker",
      gradientTailwind: "from-indigo-500 to-indigo-600",
      des: "Build positive habits and track your progress with our intuitive habit tracker.",
      tag: "Habits",
    },
    {
      icon: <Bolt size={22} />,
      title: "Your Planner",
      gradientTailwind: "from-indigo-600 to-sky-500",
      des: "Create and manage your planners with ease and stay ahead of your schedule.",
      tag: "Planning",
    },
    {
      icon: <Keyboard size={22} />,
      title: "Keyboard Navigation",
      gradientTailwind: "from-purple-600 to-indigo-600",
      des: "Navigate instantly using Ctrl + K command palette and productivity shortcuts.",
      tag: "Shortcuts",
    },
  ];

  return (
    <>
      <FeatureStyles />

      <section className="bg-white py-24 px-5 md:px-8 lg:px-10 font-['Plus_Jakarta_Sans'] relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-600 rounded-full blur-[100px]" />
        </div>

        {/* Heading Section */}
        <div className="text-center mb-16 opacity-0 animate-fadeUp [animation-fill-mode:forwards]">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-[11px] font-bold text-indigo-600 uppercase tracking-widest mb-6">
            ✦ Features
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
            Everything You Need to{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-iconShimmer">
                Stay Productive
              </span>
              <span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 animate-slideRight [animation-delay:0.5s]" />
            </span>
          </h2>

          <p className="text-gray-500 max-w-lg mx-auto text-lg leading-relaxed">
            A complete toolkit built for focused work — tasks, habits, timers,
            and analytics in one clean workspace.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {data.map((item, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100 rounded-2xl p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2 hover:border-indigo-100 cursor-default opacity-0 animate-fadeUp [animation-fill-mode:forwards]"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              {/* Icon Container */}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${item.gradientTailwind} shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                {item.icon}
              </div>

              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.des}
                </p>
              </div>

              {/* Hover Tag (Now visible on hover because of 'group' class) */}
              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-indigo-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <span>{item.tag}</span>
                <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Feature;