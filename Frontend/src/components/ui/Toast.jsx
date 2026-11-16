import { AnimatePresence, motion } from "motion/react";
import "./Toast.css";

export default function Toast({ message }) {
  return (
    <div className="toast-anchor" role="status" aria-live="polite">
      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            className="toast"
            initial={{ opacity: 0, y: 18, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 28 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
