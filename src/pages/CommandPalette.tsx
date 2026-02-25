import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react"; // Optional: npm install lucide-react
import { commandRoutes } from "../routesData";

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  const filteredRoutes = commandRoutes.filter((route) =>
    route.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e:KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      
      if (!open) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredRoutes.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredRoutes.length) % filteredRoutes.length);
      } else if (e.key === "Enter") {
        handleNavigate(filteredRoutes[selectedIndex].path);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, filteredRoutes, selectedIndex]);

  // Reset selection when search changes
  useEffect(() => setSelectedIndex(0), [search]);

  const handleNavigate = (path:string) => {
    navigate(path);
    setOpen(false);
    setSearch("");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="command-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
        >
          <motion.div 
            className="command-box"
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking box
          >
            <div className="search-wrapper">
              <Search size={18} className="search-icon" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Type a command or search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoFocus
              />
              <div className="kbd-shortcut">ESC</div>
            </div>

            <ul>
              {filteredRoutes.length > 0 ? (
                filteredRoutes.map((route, index) => (
                  <li 
                    key={index} 
                    className={index === selectedIndex ? "active" : ""}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => handleNavigate(route.path)}
                  >
                    <span className="route-name">{route.name}</span>
                    {index === selectedIndex && (
                      <span className="enter-hint">↵ Enter</span>
                    )}
                  </li>
                ))
              ) : (
                <div className="no-results">No results found.</div>
              )}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;