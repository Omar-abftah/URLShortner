import { AnimatePresence, motion } from "motion/react";
import LinkItem from "./LinkItem";
import "./LinkList.css";

export default function LinkList({ links, ...handlers }) {
  if (!links.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="link-list__empty"
      >
        <p>No links in your exhibition yet.</p>
        <span className="muted">Paste a destination URL above to mint your first short key.</span>
      </motion.div>
    );
  }
  return (
    <motion.ul layout className="link-list">
      <AnimatePresence initial={false}>
        {links.map((link, idx) => (
          <LinkItem key={link.id} link={link} index={idx} {...handlers} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
