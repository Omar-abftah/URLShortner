import { useMemo, useState } from "react";
import { motion } from "motion/react";
import LinkForm from "../components/links/LinkForm";
import LinkList from "../components/links/LinkList";
import Toast from "../components/ui/Toast";
import { useAuth } from "../hooks/useAuth";
import { useLinks } from "../hooks/useLinks";
import { useToast } from "../hooks/useToast";
import "./DashboardPage.css";

export default function DashboardPage() {
  const { user } = useAuth();
  const { links, loading, error, create } = useLinks();
  const { message, show } = useToast();
  const [query, setQuery] = useState("");

  const totalClicks = links.reduce((sum, l) => sum + l.clicks, 0);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return links;
    return links.filter((l) => [l.url, l.code].some((f) => f.toLowerCase().includes(q)));
  }, [links, query]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      show("Copied to clipboard");
    } catch {
      show("Couldn't copy — select the link manually");
    }
  };

  return (
    <motion.div
      className="dashboard"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <section className="dashboard__intro">
        <div>
          <h1>
            Hello, <em>{user.name.split(" ")[0]}</em>
          </h1>
          <p className="dashboard__subtitle muted">Curate and measure your short keys.</p>
        </div>
        <div className="dashboard__stats">
          <div className="dashboard__stat-card">
            <span className="dashboard__stat-label">Active keys</span>
            <strong className="dashboard__stat-num">{links.length}</strong>
          </div>
          <div className="dashboard__stat-card">
            <span className="dashboard__stat-label">Total clicks</span>
            <strong className="dashboard__stat-num">{totalClicks}</strong>
          </div>
        </div>
      </section>

      <section className="dashboard__create" aria-label="Shorten a link">
        <LinkForm
          onSubmit={async (data) => {
            const link = await create(data);
            show(`Created /${link.code}`);
          }}
        />
      </section>

      <section className="dashboard__links">
        <div className="dashboard__links-head">
          <div className="dashboard__links-title">
            <h2>Index</h2>
            <span className="dashboard__count muted">{visible.length}</span>
          </div>
          <input
            type="search"
            placeholder="Filter by key or destination…"
            aria-label="Search links"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {error && <p className="dashboard__error" role="alert">{error}</p>}
        {loading ? <p className="muted">Loading index…</p> : <LinkList links={visible} onCopy={copy} />}
      </section>
      <Toast message={message} />
    </motion.div>
  );
}
