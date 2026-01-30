import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import { Login, Menu as MenuIcon, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  const email = localStorage.getItem('EMAIL');

  const logOut = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <Link to="/">
          <img width={55} src="logo.png" alt="Logo" />
        </Link>
      </div>

      {/* Desktop Links */}
      <nav className="nav-links desktop-nav">
        {email ? (
          <>
            <Link to="/timechallaner" className="nav-link">FocusMood</Link>
            <Link to="/createshedular" className="nav-link">Work Scheduler</Link>
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            {/* <Button className="avatar-btn">
              <span className="avatar-text">{email.charAt(0).toUpperCase()}</span>
            </Button> */}
            <Button className="logout-btn" onClick={logOut}>Logout</Button>
          </>
        ) : (
          <Link to="/login">
            <Button startIcon={<Login />}>Login</Button>
          </Link>
        )}
      </nav>

      {/* Mobile Hamburger */}
      <IconButton className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
        <MenuIcon sx={{ color: '#fff' }} />
      </IconButton>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="mobile-sidebar"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="sidebar-header">
              <Link to="/" onClick={() => setSidebarOpen(false)}>
                <img width={45} src="logo.png" alt="Logo" />
              </Link>
              <IconButton onClick={() => setSidebarOpen(false)}>
                <Close sx={{ color: '#fff' }} />
              </IconButton>
            </div>

            <div className="sidebar-links">
              {email ? (
                <>
                  <Link to="/timechallaner" onClick={() => setSidebarOpen(false)}>FocusMood</Link>
                  <Link to="/createshedular" onClick={() => setSidebarOpen(false)}>Work Scheduler</Link>
                  <Link to="/dashboard" onClick={() => setSidebarOpen(false)}>Dashboard</Link>
                  <Button className="sidebar-logout-btn" onClick={logOut}>Logout</Button>
                </>
              ) : (
                <Link to="/login" onClick={() => setSidebarOpen(false)}>Login</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
