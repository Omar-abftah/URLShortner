import { Link } from "react-router-dom";
import { ArrowUpRight, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import "./Footer.css";

export default function Footer() {
  const { user } = useAuth();
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <div className="footer__logo-row">
              <span className="footer__seal">S</span>
              <span className="footer__title">Short</span>
            </div>
            <p className="footer__tagline">
              An editorial ledger for concise, enduring web addresses. Crafted with instant edge redirects and live telemetry.
            </p>
            <div className="footer__badges">
              <span className="footer__badge">
                <Zap size={12} /> 307 Instant Redirect
              </span>
              <span className="footer__badge">
                <ShieldCheck size={12} /> Clerk Verified
              </span>
              <span className="footer__badge">
                <Sparkles size={12} /> Custom Keys
              </span>
            </div>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <h4>Navigate</h4>
              <ul>
                <li><Link to="/">Exhibition</Link></li>
                <li><Link to={user ? "/dashboard" : "/login"}>Dashboard</Link></li>
                {!user && (
                  <>
                    <li><Link to="/login">Sign in</Link></li>
                    <li><Link to="/signup">Create account</Link></li>
                  </>
                )}
              </ul>
            </div>

            <div className="footer__col">
              <h4>Capabilities</h4>
              <ul>
                <li><span>Custom Slugs</span></li>
                <li><span>Click Telemetry</span></li>
                <li><span>REST API v1</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span className="footer__copy">
            © {new Date().getFullYear()} Short Atelier · All rights reserved
          </span>
          <div className="footer__meta">
            <span className="footer__status">
              <span className="footer__status-dot" aria-hidden="true" />
              All redirect nodes operational
            </span>
            <button type="button" onClick={scrollToTop} className="footer__top-btn">
              Back to top <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
