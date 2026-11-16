import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "../ui/Button";
import { isValidAlias, normalizeUrl } from "../../utils/validators";
import "./LinkForm.css";

const EMPTY = { url: "", alias: "" };

export default function LinkForm({ onSubmit }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [showAlias, setShowAlias] = useState(false);
  const [busy, setBusy] = useState(false);
  const aliasInputRef = useRef(null);

  const originHost = typeof window !== "undefined" ? window.location.host : "short.local";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = normalizeUrl(values.url);
    const alias = values.alias.trim();
    const found = {};
    if (!url) found.url = "Enter a valid destination URL.";
    if (alias && !isValidAlias(alias)) found.alias = "Use 4–32 letters, numbers, - or _.";
    if (Object.keys(found).length) {
      if (found.alias) setShowAlias(true);
      return setErrors(found);
    }

    setBusy(true);
    try {
      await onSubmit({ url, alias });
      setValues(EMPTY);
      setErrors({});
      setShowAlias(false);
    } catch (err) {
      setShowAlias(true);
      setErrors({ alias: err.message });
    } finally {
      setBusy(false);
    }
  };

  const toggleAlias = () => {
    setShowAlias((prev) => {
      const next = !prev;
      if (next) setTimeout(() => aliasInputRef.current?.focus(), 60);
      return next;
    });
  };

  return (
    <motion.form
      layout
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
      className="composer"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="composer__primary">
        <span className="composer__icon" aria-hidden="true">↗</span>
        <input
          type="url"
          className="composer__url-input"
          placeholder="Paste a destination link — e.g. example.com/article"
          aria-label="Destination URL"
          aria-invalid={!!errors.url}
          value={values.url}
          onChange={(e) => {
            setValues((p) => ({ ...p, url: e.target.value }));
            if (errors.url) setErrors((p) => ({ ...p, url: undefined }));
          }}
        />
        <div className="composer__controls">
          <button
            type="button"
            className={`composer__alias-toggle ${showAlias || values.alias ? "is-active" : ""}`}
            onClick={toggleAlias}
            aria-expanded={showAlias}
          >
            {values.alias ? `/${values.alias}` : "+ Custom alias"}
          </button>
          <Button type="submit" variant="inverse" disabled={busy}>
            {busy ? "Shortening…" : "Shorten ↵"}
          </Button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {showAlias && (
          <motion.div
            key="alias-drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 360, damping: 30 }}
            className="composer__drawer-wrap"
          >
            <div className="composer__drawer">
              <span className="composer__drawer-label">Custom slug</span>
              <div className="composer__slug-box">
                <span className="composer__slug-prefix">{originHost}/</span>
                <input
                  ref={aliasInputRef}
                  type="text"
                  className="composer__slug-input"
                  placeholder="my-custom-key"
                  aria-label="Custom alias"
                  aria-invalid={!!errors.alias}
                  value={values.alias}
                  onChange={(e) => {
                    setValues((p) => ({ ...p, alias: e.target.value }));
                    if (errors.alias) setErrors((p) => ({ ...p, alias: undefined }));
                  }}
                />
              </div>
              <span className="composer__drawer-hint">4–32 chars · leave blank for auto</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(errors.url || errors.alias) && (
          <motion.p
            key="composer-error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="composer__error"
            role="alert"
          >
            {errors.url || errors.alias}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
