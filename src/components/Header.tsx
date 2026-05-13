import * as React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Login, Menu as MenuIcon, Close, KeyboardArrowDown, KeyboardArrowRight } from "@mui/icons-material";

const HeaderStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

    /* ── Drawer slide ── */
    @keyframes drawerIn {
      from { opacity: 0; transform: translateX(-100%); }
      to   { opacity: 1; transform: translateX(0);      }
    }
    @keyframes drawerOut {
      from { opacity: 1; transform: translateX(0);      }
      to   { opacity: 0; transform: translateX(-100%);  }
    }
    @keyframes overlayIn  { from { opacity: 0; } to { opacity: 1; } }
    @keyframes navLinkIn {
      from { opacity: 0; transform: translateX(-14px); }
      to   { opacity: 1; transform: translateX(0);     }
    }

    /* Dropdown animations */
    @keyframes dropdownIn {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0);     }
    }

    /* ════════════════ HEADER ════════════════ */
    .hdr {
      position: sticky;
      top: 0; left: 0; right: 0;
      z-index: 1000;
      font-family: 'Plus Jakarta Sans', sans-serif;
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      border-bottom: 1px solid #f3f4f6;
      height: 60px;
      display: flex;
      align-items: center;
      padding: 0 28px;
    }

    /* scroll shadow */
    .hdr.scrolled {
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.06);
    }

    .hdr-inner {
      width: 100%;
      max-width: 1400px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 24px;
    }

    /* ── Logo ── */
    .hdr-logo {
      display: flex;
      align-items: center;
      gap: 9px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .hdr-logo img { display: block; }
    .hdr-logo-text {
      font-size: 15px;
      font-weight: 700;
      color: #111827;
      letter-spacing: -0.02em;
    }

    /* ── Desktop nav ── */
    .hdr-nav {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
      justify-content: center;
    }

    /* Dropdown Container */
    .hdr-nav-item {
      position: relative;
    }

    .hdr-link {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      text-decoration: none;
      transition: color .16s, background .16s;
      white-space: nowrap;
      cursor: pointer;
    }
    .hdr-link:hover {
      color: #111827;
      background: #f3f4f6;
    }
    .hdr-link.active {
      color: #4f46e5;
      background: #eef2ff;
    }
    .hdr-link .arrow-icon {
      font-size: 16px;
      transition: transform 0.2s ease;
    }
    .hdr-nav-item:hover .hdr-link .arrow-icon {
      transform: rotate(180deg);
    }

    /* Mega Dropdown Menu */
    .mega-dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 50%;
      transform: translateX(-50%);
      min-width: 280px;
      background: white;
      border-radius: 16px;
      box-shadow: 0 20px 35px -8px rgba(0, 0, 0, 0.15), 0 1px 3px rgba(0, 0, 0, 0.05);
      border: 1px solid #e5e7eb;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s ease;
      z-index: 100;
      animation: dropdownIn 0.2s ease forwards;
    }

    .hdr-nav-item:hover .mega-dropdown {
      opacity: 1;
      visibility: visible;
      top: calc(100% + 4px);
    }

    .dropdown-header {
      padding: 12px 16px;
      border-bottom: 1px solid #f3f4f6;
      background: linear-gradient(135deg, #f9fafb, #ffffff);
      border-radius: 16px 16px 0 0;
    }

    .dropdown-header h4 {
      margin: 0;
      font-size: 13px;
      font-weight: 700;
      color: #4f46e5;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .dropdown-header p {
      margin: 4px 0 0 0;
      font-size: 11px;
      color: #6b7280;
    }

    .dropdown-links {
      padding: 8px;
    }

    .dropdown-link {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 12px;
      border-radius: 10px;
      text-decoration: none;
      transition: all 0.2s ease;
      color: #374151;
      font-size: 13px;
      font-weight: 500;
    }

    .dropdown-link:hover {
      background: #f3f4f6;
      transform: translateX(4px);
    }

    .dropdown-link .link-icon {
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #eef2ff;
      border-radius: 8px;
      color: #4f46e5;
      font-size: 14px;
    }

    .dropdown-link .link-text {
      flex: 1;
    }

    .dropdown-link .link-desc {
      font-size: 10px;
      color: #9ca3af;
      margin-top: 2px;
    }

    .dropdown-divider {
      height: 1px;
      background: #f3f4f6;
      margin: 6px 0;
    }

    /* Right side dropdown for specific Todo items */
    .todo-dropdown {
      min-width: 320px;
    }

    .todo-stats {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: #f9fafb;
      border-radius: 12px;
      margin: 8px;
    }

    .todo-stat {
      flex: 1;
      text-align: center;
    }

    .todo-stat-number {
      font-size: 18px;
      font-weight: 800;
      color: #4f46e5;
    }

    .todo-stat-label {
      font-size: 10px;
      color: #6b7280;
      margin-top: 4px;
    }

    /* ── Right actions ── */
    .hdr-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .hdr-btn-login {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 7px 18px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      border: none;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 3px 14px rgba(79,70,229,.28);
      transition: transform .16s, box-shadow .16s;
    }
    .hdr-btn-login:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(79,70,229,.36);
    }

    .hdr-btn-logout {
      display: inline-flex;
      align-items: center;
      padding: 7px 18px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      background: transparent;
      border: 1.5px solid #e5e7eb;
      cursor: pointer;
      transition: border-color .16s, color .16s, background .16s;
    }
    .hdr-btn-logout:hover {
      border-color: #4f46e5;
      color: #4f46e5;
      background: #eef2ff;
    }

    /* ── Hamburger ── */
    .hdr-burger {
      display: none;
      width: 38px; height: 38px;
      border-radius: 10px;
      border: 1.5px solid #e5e7eb;
      background: #fff;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #374151;
      transition: border-color .16s, background .16s, color .16s;
      flex-shrink: 0;
    }
    .hdr-burger:hover {
      border-color: #4f46e5;
      background: #eef2ff;
      color: #4f46e5;
    }

    /* ════════════ OVERLAY ════════════ */
    .hdr-overlay {
      position: fixed;
      inset: 0;
      background: rgba(17, 24, 39, 0.35);
      backdrop-filter: blur(3px);
      z-index: 1001;
      animation: overlayIn .22s ease forwards;
    }
    .hdr-overlay.closing { animation: overlayIn .18s ease reverse forwards; }

    /* ════════════ DRAWER ════════════ */
    .hdr-drawer {
      position: fixed;
      top: 0; left: 0; bottom: 0;
      width: 300px;
      background: #ffffff;
      z-index: 1002;
      display: flex;
      flex-direction: column;
      box-shadow: 4px 0 32px rgba(0,0,0,.10);
      animation: drawerIn .28s cubic-bezier(.22,1,.36,1) forwards;
    }
    .hdr-drawer.closing {
      animation: drawerOut .22s ease forwards;
    }

    /* Drawer top */
    .hdr-drawer-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      border-bottom: 1px solid #f3f4f6;
    }

    /* Drawer close btn */
    .hdr-drawer-close {
      width: 34px; height: 34px;
      border-radius: 8px;
      border: 1.5px solid #e5e7eb;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: #6b7280;
      transition: border-color .16s, color .16s, background .16s;
    }
    .hdr-drawer-close:hover {
      border-color: #4f46e5;
      color: #4f46e5;
      background: #eef2ff;
    }

    /* Drawer body */
    .hdr-drawer-body {
      flex: 1;
      overflow-y: auto;
      padding: 20px 16px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    /* Drawer section label */
    .hdr-drawer-label {
      font-size: 10px;
      font-weight: 700;
      color: #9ca3af;
      text-transform: uppercase;
      letter-spacing: .08em;
      padding: 10px 10px 6px;
    }

    /* Drawer link */
    .hdr-drawer-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 14px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      color: #374151;
      text-decoration: none;
      transition: background .16s, color .16s;
      opacity: 0;
      animation: navLinkIn .3s cubic-bezier(.22,1,.36,1) forwards;
    }
    .hdr-drawer-link:hover  { background: #f3f4f6; color: #111827; }
    .hdr-drawer-link.active { background: #eef2ff; color: #4f46e5; }
    .hdr-drawer-link .dl-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: #d1d5db;
      flex-shrink: 0;
      transition: background .16s;
    }
    .hdr-drawer-link:hover .dl-dot  { background: #6b7280; }
    .hdr-drawer-link.active .dl-dot { background: #4f46e5; }

    /* Drawer nested items */
    .drawer-nested {
      padding-left: 28px;
      margin-top: 4px;
      margin-bottom: 4px;
    }

    .drawer-nested-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 14px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 500;
      color: #6b7280;
      text-decoration: none;
      transition: all .16s;
    }

    .drawer-nested-link:hover {
      background: #f3f4f6;
      color: #4f46e5;
      padding-left: 20px;
    }

    /* Drawer footer */
    .hdr-drawer-footer {
      padding: 16px;
      border-top: 1px solid #f3f4f6;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .hdr-drawer-login {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 12px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      background: linear-gradient(135deg, #4f46e5, #7c3aed);
      border: none;
      cursor: pointer;
      text-decoration: none;
      box-shadow: 0 3px 14px rgba(79,70,229,.28);
    }
    .hdr-drawer-logout {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 11px;
      border-radius: 50px;
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #6b7280;
      background: transparent;
      border: 1.5px solid #e5e7eb;
      cursor: pointer;
      transition: border-color .16s, color .16s;
    }
    .hdr-drawer-logout:hover { border-color: #4f46e5; color: #4f46e5; }

    /* ── Responsive breakpoint ── */
    @media (max-width: 768px) {
      .hdr-nav     { display: none; }
      .hdr-actions { display: none; }
      .hdr-burger  { display: flex; }
      .hdr         { padding: 0 18px; }
    }
  `}</style>
);

/* ══════════════════════════════════════════════════ */
const NAV_LINKS = [
  { to: "/dailyplanner", label: "Daily Planner" },
  { to: "/timechallaner", label: "Focus Time" },
  { to: "/habittracker", label: "Habit Tracker" },
  { to: "/about", label: "About" },
  { to: "/profile", label: "Profile" },
  { to: "/analyze", label: "Analyze" },
];

const TODO_NAV_LINKS = [
  { to: "/createTodo", label: "Create Todo", description: "Add new tasks", icon: "📝" },
  { to: "/managetodo", label: "Manage Todo", description: "Edit & organize", icon: "⚙️" },
];

const Header = () => {
  const [open, setOpen] = React.useState(false);
  const [closing, setClosing] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [email, setEmail] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* sync email on route change */
  React.useEffect(() => {
    setEmail(localStorage.getItem("EMAIL"));
  }, [location]);

  /* scroll shadow */
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* smooth close */
  const closeDrawer = () => {
    setClosing(true);
    setTimeout(() => { setOpen(false); setClosing(false); }, 200);
  };

  const handleNav = () => closeDrawer();

  const logOut = () => {
    localStorage.clear();
    setEmail(null);
    closeDrawer();
    navigate("/login");
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <HeaderStyles />

      {/* ════ Header bar ════ */}
      <header className={`hdr${scrolled ? " scrolled" : ""}`}>
        <div className="hdr-inner">

          {/* Logo */}
          <Link to="/" className="hdr-logo">
            <img width={36} src="logo.png" alt="NextThink" />
            <span className="hdr-logo-text">NextThink</span>
          </Link>

          {/* Desktop nav — only when logged in */}
          {email && (
            <nav className="hdr-nav">
              {NAV_LINKS.map((l) => (
                <div className="hdr-nav-item" key={l.to}>
                  <Link
                    to={l.to}
                    className={`hdr-link${isActive(l.to) ? " active" : ""}`}
                  >
                    {l.label}
                  </Link>
                </div>
              ))}

              {/* Todo Dropdown Menu */}
              <div className="hdr-nav-item">
                <div className="hdr-link">
                  Todo <KeyboardArrowDown className="arrow-icon" style={{ fontSize: 16 }} />
                </div>
                <div className="mega-dropdown todo-dropdown">
                  <div className="dropdown-header">
                    <h4>Task Management</h4>
                    <p>Organize your work efficiently</p>
                  </div>
                  
                  <div className="todo-stats">
                    <div className="todo-stat">
                      <div className="todo-stat-number">{TODO_NAV_LINKS.length}</div>
                      <div className="todo-stat-label">Modules</div>
                    </div>
                    
                    
                  </div>
                  
                  <div className="dropdown-links">
                    {TODO_NAV_LINKS.map((link, idx) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        className="dropdown-link"
                        style={{ animationDelay: `${idx * 0.03}s` }}
                      >
                        <div className="link-icon">{link.icon}</div>
                        <div className="link-text">
                          <div>{link.label}</div>
                          <div className="link-desc">{link.description}</div>
                        </div>
                        <KeyboardArrowRight style={{ fontSize: 14, color: '#9ca3af' }} />
                      </Link>
                    ))}
                  </div>
                  
                  <div className="dropdown-divider" />
                  
                  <div style={{ padding: '10px 12px 14px', textAlign: 'center' }}>
                    <Link 
                      to="/managetodo" 
                      style={{ 
                        fontSize: '12px', 
                        color: '#4f46e5', 
                        textDecoration: 'none',
                        fontWeight: 600 
                      }}
                    >
                      View All Tasks →
                    </Link>
                  </div>
                </div>
              </div>
            </nav>
          )}

          {/* Desktop actions */}
          <div className="hdr-actions">
            {email ? (
              <button className="hdr-btn-logout" onClick={logOut}>
                Logout
              </button>
            ) : (
              <Link to="/login" className="hdr-btn-login">
                <Login style={{ fontSize: 16 }} />
                Login
              </Link>
            )}
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="hdr-burger"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon style={{ fontSize: 20 }} />
          </button>
        </div>
      </header>

      {/* ════ Mobile drawer + overlay ════ */}
      {(open || closing) && (
        <>
          {/* Overlay */}
          <div
            className={`hdr-overlay${closing ? " closing" : ""}`}
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <aside className={`hdr-drawer${closing ? " closing" : ""}`}>

            {/* Top */}
            <div className="hdr-drawer-top">
              <Link to="/" className="hdr-logo" onClick={handleNav}>
                <img width={30} src="logo.png" alt="NextThink" />
                <span className="hdr-logo-text">NextThink</span>
              </Link>
              <button className="hdr-drawer-close" onClick={closeDrawer} aria-label="Close menu">
                <Close style={{ fontSize: 18 }} />
              </button>
            </div>

            {/* Body */}
            <div className="hdr-drawer-body">
              {email && (
                <>
                  <p className="hdr-drawer-label">Main Navigation</p>
                  {NAV_LINKS.map((l, i) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`hdr-drawer-link${isActive(l.to) ? " active" : ""}`}
                      onClick={handleNav}
                      style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                    >
                      <span className="dl-dot" />
                      {l.label}
                    </Link>
                  ))}
                  
                  <p className="hdr-drawer-label" style={{ marginTop: 12 }}>Todo Management</p>
                  {TODO_NAV_LINKS.map((l, i) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`hdr-drawer-link${isActive(l.to) ? " active" : ""}`}
                      onClick={handleNav}
                      style={{ animationDelay: `${0.05 + i * 0.06}s`, paddingLeft: '28px' }}
                    >
                      <span className="dl-dot" />
                      {l.label}
                    </Link>
                  ))}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="hdr-drawer-footer">
              {email ? (
                <>
                  {/* Logged-in user chip */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "#f9fafb",
                    border: "1.5px solid #f3f4f6",
                    marginBottom: "4px",
                  }}>
                    <div style={{
                      width: "32px", height: "32px",
                      borderRadius: "8px",
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "13px", fontWeight: 700, color: "#fff",
                      flexShrink: 0,
                    }}>
                      {email.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{
                        margin: 0, fontSize: "12px", fontWeight: 600, color: "#111827",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}>
                        {email}
                      </p>
                      <p style={{
                        margin: 0, fontSize: "11px", color: "#9ca3af",
                        fontFamily: "'Plus Jakarta Sans', sans-serif"
                      }}>
                        Signed in
                      </p>
                    </div>
                  </div>

                  <button className="hdr-drawer-logout" onClick={logOut}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="hdr-drawer-login" onClick={handleNav}>
                  <Login style={{ fontSize: 16 }} />
                  Login to NextThink
                </Link>
              )}
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Header;