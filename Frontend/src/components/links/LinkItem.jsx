import { useState } from "react";
import { motion } from "motion/react";
import { formatDate, hostOf, shortUrl } from "../../utils/format";
import "./LinkItem.css";

export default function LinkItem({ link, index = 0, onCopy }) {
  const [copied, setCopied] = useState(false);
  const short = shortUrl(link.code);
  const host = hostOf(link.url);
  const initial = (host?.[0] || "S").toUpperCase();

  const handleCopy = async () => {
    await onCopy(short);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 420, damping: 32, delay: Math.min(index * 0.035, 0.25) }}
      className="ledger-row"
    >
      <span className="ledger-row__index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="ledger-row__identity">
        <div className="ledger-row__short-line">
          <a href={short} target="_blank" rel="noreferrer" className="ledger-row__short">
            <span className="ledger-row__slash">/</span>
            {link.code}
          </a>
          <span className="ledger-row__badge">{host}</span>
        </div>
        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="ledger-row__dest muted"
          title={link.url}
        >
          {link.url}
        </a>
      </div>

      <div className="ledger-row__metrics">
        <div className="ledger-row__stat">
          <span className="ledger-row__stat-value">{link.clicks}</span>
          <span className="ledger-row__stat-label">{link.clicks === 1 ? "click" : "clicks"}</span>
        </div>
        <span className="ledger-row__date">{formatDate(link.createdAt)}</span>
      </div>

      <div className="ledger-row__actions">
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
          className={`ledger-row__btn ${copied ? "is-copied" : ""}`}
          onClick={handleCopy}
        >
          {copied ? "Copied ✓" : "Copy"}
        </motion.button>
        <a
          href={short}
          target="_blank"
          rel="noreferrer"
          className="ledger-row__visit"
          aria-label={`Open ${short}`}
          title="Open short link"
        >
          ↗
        </a>
      </div>
    </motion.li>
  );
}
