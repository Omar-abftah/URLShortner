import { NavLink, Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Compass, LayoutDashboard, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import Button from "../ui/Button";
import "./Header.css";

export default function Header({ tone = "light" }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initial = (user?.name?.[0] || "U").toUpperCase();

  return (
    <header className={`header header--${tone}`}>
      <div className="header__inner">
        <Link to="/" className="header__brand" aria-label="Short home">
          <motion.span
            whileHover={{ rotate: -8, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 450, damping: 22 }}
            className="header__seal"
          >
            S
          </motion.span>
          <span className="header__brand-text">
            <span className="header__wordmark">Short</span>
            <span className="header__tag">Link Atelier</span>
          </span>
        </Link>

        <nav className="header__links" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `header__link ${isActive ? "is-active" : ""}`}
          >
            <Compass size={14} strokeWidth={1.75} />
            <span>Exhibition</span>
          </NavLink>
          {user && (
            <NavLink
              to="/dashboard"
              className={({ isActive }) => `header__link ${isActive ? "is-active" : ""}`}
            >
              <LayoutDashboard size={14} strokeWidth={1.75} />
              <span>Dashboard</span>
            </NavLink>
          )}
        </nav>

        <div className="header__actions">
          <motion.button
            type="button"
            onClick={toggleTheme}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.92 }}
            className="header__theme-btn"
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -45, opacity: 0, scale: 0.7 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 45, opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.18 }}
                className="header__theme-icon"
              >
                {theme === "dark" ? <Sun size={15} strokeWidth={1.8} /> : <Moon size={15} strokeWidth={1.8} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          {user ? (
            <div className="header__account">
              <div className="header__user-pill" title={user.name}>
                <span className="header__avatar" aria-hidden="true">{initial}</span>
                <span className="header__username">{user.name.split(" ")[0]}</span>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="header__logout"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={14} strokeWidth={1.75} />
                <span className="header__logout-label">Exit</span>
              </button>
            </div>
          ) : (
            <div className="header__guest">
              <Link to="/login" className="header__signin">Log in</Link>
              <Link to="/signup">
                <Button className="header__cta">
                  <span>Sign up</span>
                  <ArrowUpRight size={13} strokeWidth={2} />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
