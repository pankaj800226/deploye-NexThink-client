import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight } from "lucide-react"; 
import { commandRoutes } from "../routesData";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredRoutes = commandRoutes.filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filteredRoutes.length || 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredRoutes.length) % (filteredRoutes.length || 1));
      } else if (e.key === "Enter" && filteredRoutes.length > 0) {
        handleNavigate(filteredRoutes[selectedIndex].path);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredRoutes, selectedIndex]);

  useEffect(() => setSelectedIndex(0), [search]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className="fixed inset-0 bg-white/40 backdrop-blur-[8px] z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* Command Box Container */}
          <div className="fixed inset-0 z-[1000] flex items-start justify-center pt-[15vh] pointer-events-none">
            <motion.div
              className="w-full max-w-[640px] bg-white rounded-2xl shadow-[0_20px_70px_-10px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden pointer-events-auto"
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Search Header */}
              <div className="flex items-center px-5 py-4 border-b border-gray-50 bg-gray-50/30">
                <Search size={20} className="text-gray-400 mr-4" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Type a command or search workspace..."
                  className="w-full bg-transparent border-none outline-none text-[17px] text-slate-800 placeholder:text-gray-400 font-medium"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  autoFocus
                />
                <div className="flex items-center gap-1 ml-4">
                  <span className="px-2 py-1 bg-white border border-gray-200 rounded text-[10px] font-bold text-gray-400 shadow-sm">ESC</span>
                </div>
              </div>

              {/* Results List */}
              <div className="max-h-[380px] overflow-y-auto p-2 custom-scrollbar">
                {filteredRoutes.length > 0 ? (
                  <div className="py-2">
                    <p className="px-4 pb-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Navigation</p>
                    {filteredRoutes.map((route, index) => (
                      <motion.div
                        key={index}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => handleNavigate(route.path)}
                        className={`
                          group flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer transition-all duration-150
                          ${index === selectedIndex ? "bg-indigo-600 shadow-lg shadow-indigo-100" : "hover:bg-gray-50"}
                        `}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`
                            w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                            ${index === selectedIndex ? "bg-white/20" : "bg-gray-100 text-gray-500"}
                          `}>
                            <Command size={16} className={index === selectedIndex ? "text-white" : "text-gray-500"} />
                          </div>
                          <span className={`text-[15px] font-semibold ${index === selectedIndex ? "text-white" : "text-slate-700"}`}>
                            {route.name}
                          </span>
                        </div>

                        {index === selectedIndex ? (
                          <motion.span 
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="text-white/70 text-xs font-medium flex items-center gap-1"
                          >
                            Jump to <ArrowRight size={14} />
                          </motion.span>
                        ) : (
                           <span className="text-gray-300 text-xs group-hover:text-gray-400">Go to page</span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-full mb-3 text-gray-300">
                        <Search size={24} />
                    </div>
                    <p className="text-gray-500 font-medium">No results for <span className="text-slate-800">"{search}"</span></p>
                    <p className="text-sm text-gray-400 mt-1">Try searching for 'Dashboard' or 'Create'</p>
                  </div>
                )}
              </div>

              {/* Footer / Shortcuts */}
              <div className="px-5 py-3 bg-gray-50/50 border-t border-gray-100 flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm font-bold">↑↓</span>
                    <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
                    <span className="px-1.5 py-0.5 bg-white border border-gray-200 rounded shadow-sm font-bold">Enter</span>
                    <span>Select</span>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;