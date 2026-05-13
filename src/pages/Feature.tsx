import { TaskAlt, Timer, Dashboard, Work } from "@mui/icons-material";
import { Bolt, Keyboard } from "lucide-react";

const Feature = () => {
  const features = [
    {
      icon: <TaskAlt />,
      title: "Task Management",
      desc: "Organize your work with smart task lists, priorities, and completion tracking.",
      tag: "Productivity",
      gradient: "from-indigo-600 to-purple-600",
    },
    {
      icon: <Timer />,
      title: "Focus Timer & Challenges",
      desc: "Stay focused with Pomodoro sessions and daily productivity challenges.",
      tag: "Focus",
      gradient: "from-sky-500 to-indigo-600",
    },
    {
      icon: <Dashboard />,
      title: "Dashboard Analytics",
      desc: "Visualize your productivity with clean and detailed analytics.",
      tag: "Insights",
      gradient: "from-purple-600 to-indigo-500",
    },
    {
      icon: <Work />,
      title: "Habit Tracker",
      desc: "Build positive habits and track your progress with intuitive tracking.",
      tag: "Habits",
      gradient: "from-indigo-500 to-indigo-700",
    },
    {
      icon: <Bolt size={20} />,
      title: "Smart Planner",
      desc: "Plan your schedule and stay ahead of your goals with ease.",
      tag: "Planning",
      gradient: "from-indigo-600 to-sky-500",
    },
    {
      icon: <Keyboard size={20} />,
      title: "Keyboard Shortcuts",
      desc: "Navigate instantly using powerful command shortcuts (Ctrl + K).",
      tag: "Speed",
      gradient: "from-purple-600 to-indigo-600",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Your All-in-One
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {" "}Productivity OS
          </span>
        </h1>

        <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto">
          Manage tasks, build habits, stay focused, and track progress — all in one clean workspace designed for deep productivity.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">
            Get Started Free
          </button>
          <button className="px-6 py-3 rounded-xl border border-slate-300 font-semibold hover:border-slate-400 transition">
            View Dashboard
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Stay Productive
          </h2>
          <p className="text-slate-500 mt-3">
            A complete toolkit built for focus, clarity, and execution.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition hover:-translate-y-1"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br ${f.gradient}`}
              >
                {f.icon}
              </div>

              <h3 className="mt-4 font-bold text-lg">{f.title}</h3>
              <p className="text-sm text-slate-500 mt-2">{f.desc}</p>

              <span className="inline-block mt-4 text-xs font-semibold text-indigo-600">
                {f.tag}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-6 py-24 text-center bg-gradient-to-b from-white to-indigo-50">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Organizing Your Life Today
        </h2>
        <p className="text-slate-500 mt-4 max-w-xl mx-auto">
          Stop switching between apps. Bring everything into one powerful workspace.
        </p>

        <button className="mt-8 px-8 py-4 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition">
          Get Started Now
        </button>
      </section>
    </div>
  );
}
export default Feature