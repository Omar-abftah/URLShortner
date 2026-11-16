import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, BarChart3, Link2, Shield, Sparkles } from "lucide-react";
import Button from "../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import "./LandingPage.css";

const PILLARS = [
  { icon: Link2, label: "Instant Short Keys" },
  { icon: Sparkles, label: "Custom Slugs" },
  { icon: BarChart3, label: "Live Click Telemetry" },
  { icon: Shield, label: "Private Ledger" },
];

const FEATURES = [
  {
    icon: Link2,
    tag: "01 · Compression",
    title: "Shorten",
    text: "Distill unwieldy URLs into clean, root-level keys ready to share anywhere.",
  },
  {
    icon: Sparkles,
    tag: "02 · Identity",
    title: "Curate",
    text: "Mint memorable custom aliases that read like part of your own publication.",
  },
  {
    icon: BarChart3,
    tag: "03 · Telemetry",
    title: "Measure",
    text: "Track every redirect in real time with a distraction-free editorial index.",
  },
];

export default function LandingPage() {
  const { user } = useAuth();
  return (
    <>
      <section className="hero">
        <motion.div
          className="hero__cluster"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="hero__eyebrow">
            <Sparkles size={13} /> Editorial Link Shortener
          </span>
          <h1>
            Long links, <em>made</em> short
          </h1>
          <div className="hero__pillars">
            {PILLARS.map(({ icon: Icon, label }) => (
              <span key={label} className="hero__pillar">
                <Icon size={14} strokeWidth={1.75} />
                {label}
              </span>
            ))}
          </div>
          <Link to={user ? "/dashboard" : "/signup"}>
            <Button className="hero__cta">
              <span>{user ? "Open dashboard" : "Start shortening"}</span>
              <ArrowRight size={14} strokeWidth={2} />
            </Button>
          </Link>
        </motion.div>
        <motion.div
          className="hero__wordmark"
          aria-hidden="true"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Short
        </motion.div>
      </section>

      <section className="features">
        <div className="features__inner">
          <div className="features__header">
            <span className="features__kicker">How it works</span>
            <h2>Your links, on exhibition</h2>
          </div>
          <div className="features__grid">
            {FEATURES.map(({ icon: Icon, tag, title, text }, i) => (
              <motion.article
                key={title}
                className="features__card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <div className="features__card-top">
                  <span className="features__tag">{tag}</span>
                  <div className="features__icon-badge" aria-hidden="true">
                    <Icon size={24} strokeWidth={1.6} />
                  </div>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
