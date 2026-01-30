import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiHome, HiMenuAlt4 } from "react-icons/hi";
import { Button } from "@mui/material";
import { GiCaptainHatProfile } from "react-icons/gi";
import DataExplorationIcon from '@mui/icons-material/DataExploration';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

const menuItems = [
  { path: "/", label: "Home", icon: <HiHome size={20} /> },
  { path: "/dashboard", label: "Profile", icon: <GiCaptainHatProfile size={20} /> },
];

const Sidebar = () => {
  const location = useLocation();

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1100);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 1100);
  const [todoIsOpen, setTodoIsOpen] = useState(false);
  const [analyzeIsOpen, setAnalyzeIsOpen] = useState(false);
  const [projectIsOpen, setProjectIsOpen] = useState(false);

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
        className={`sideMenu ${isMobile ? "sideMenu-Mobile" : ""} ${
          isOpen ? "sideMenu-open" : "sideMenu-closed"
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
              className={`sideMenu__link ${
                location.pathname === item.path ? "active" : ""
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
              startIcon={<EqualizerIcon />}
            >
              Analyze
              <span className="arrow">{analyzeIsOpen ? "▲" : "▼"}</span>
            </Button>

            <div className="submenu">
              <Link to="/analyze">
                <DataExplorationIcon /> Todo Analyze
              </Link>
              <Link to="/projectanalyzer">
                <DataExplorationIcon /> Project Analyze
              </Link>
            </div>
          </div>

          {/* TODO DROPDOWN */}
          <div className={`todo_toggle ${todoIsOpen ? "open" : ""}`}>
            <Button
              fullWidth
              className="todo_toggle_btn"
              onClick={() => setTodoIsOpen(!todoIsOpen)}
              startIcon={<PlaylistAddIcon />}
            >
              Todo Manager
              <span className="arrow">{todoIsOpen ? "▲" : "▼"}</span>
            </Button>

            <div className="submenu">
              <Link to="/createTodo">
                <PlaylistAddIcon /> Create Todo
              </Link>
              <Link to="/managetodo">
                <ManageAccountsIcon /> Manage Todo
              </Link>
            </div>
          </div>

          {/* PROJECT MANAGEMENT DROPDOWN */}
          <div className={`todo_toggle ${projectIsOpen ? "open" : ""}`}>
            <Button
              fullWidth
              className="todo_toggle_btn"
              onClick={() => setProjectIsOpen(!projectIsOpen)}
              startIcon={<FolderCopyIcon />}
            >
              Project Manager
              <span className="arrow">{projectIsOpen ? "▲" : "▼"}</span>
            </Button>

            <div className="submenu">
              <Link to="/createProject">
                <FolderCopyIcon /> Create Project
              </Link>
              <Link to="/manageproject">
                <FolderOpenIcon /> Manage Project
              </Link>
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
