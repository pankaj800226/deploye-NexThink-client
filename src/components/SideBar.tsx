import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiMenuAlt4 } from "react-icons/hi";
import { Button } from "@mui/material";
import { GiCaptainHatProfile } from "react-icons/gi";
import DataExplorationIcon from '@mui/icons-material/DataExploration';
import EqualizerIcon from '@mui/icons-material/Equalizer';

const menuItems = [
  { path: "/", label: "Home", icon: <HiHome /> },
  { path: "/dashboard", label: "Profile", icon: <GiCaptainHatProfile /> },
  // { path: "/analyze", label: "Analyze", icon: <GiCaptainHatProfile /> },


];

const Sidebar = () => {
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1100);
  const [todoIsOpen, setTodoIsOpen] = useState(false);
  const [analyzeIsOpen, setAnalyzeIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1100;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isMobile && !isOpen && (
        <button className="sideMenu__toggle" onClick={() => setIsOpen(true)}>
          <HiMenuAlt4 size={26} />
        </button>
      )}

      <aside
        className={`sideMenu ${isMobile ? "sideMenu-Mobile" : ""} ${isOpen ? "sideMenu-open" : "sideMenu-closed"
          }`}
      >
        {isMobile && (
          <div className="sideMenu__header">
            <h2>Menu</h2>
            <button onClick={() => setIsOpen(false)}>
              <HiMenuAlt4 size={22} />
            </button>
          </div>
        )}

        <nav className="sideMenu__nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sideMenu__link ${location.pathname === item.path ? "active" : ""
                }`}
              onClick={() => isMobile && setIsOpen(false)}
            >
              <span className="sideMenu__icon">{item.icon}</span>
              {item.label}
            </Link>
          ))}

          {/* ANALYZE DROPDOWN */}
          <div className={`todo_toggle ${analyzeIsOpen ? "open" : ""}`}>
            <Button
              fullWidth
              className="todo_toggle_btn"
              onClick={() => setAnalyzeIsOpen(!analyzeIsOpen)}
            >
              <EqualizerIcon/> Analyze
              <span className="arrow">{analyzeIsOpen ? "▲" : "▼"}</span>
            </Button>

            <div className="submenu">
              <Link to="/analyze"><DataExplorationIcon/> Todo Analyze</Link>
              <Link to="/managetodo"><DataExplorationIcon/> Project Analyze</Link>
            </div>
          </div>

          {/* TODO DROPDOWN */}
          <div className={`todo_toggle ${todoIsOpen ? "open" : ""}`}>
            <Button
              fullWidth
              className="todo_toggle_btn"
              onClick={() => setTodoIsOpen(!todoIsOpen)}
            >
              📝 Todo Manager
              <span className="arrow">{todoIsOpen ? "▲" : "▼"}</span>
            </Button>

            <div className="submenu">
              <Link to="/createTodo">➕ Create Todo</Link>
              <Link to="/managetodo">📋 Manage Todo</Link>
            </div>
          </div>


        </nav>
      </aside>

      {isMobile && isOpen && (
        <div className="sideMenu__overlay" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
