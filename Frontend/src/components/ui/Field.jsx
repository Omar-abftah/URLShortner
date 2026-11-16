import { useId } from "react";
import "./Field.css";

export default function Field({ label, error, hint, tone = "light", ...inputProps }) {
  const id = useId();
  return (
    <div className={`field field--${tone}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} aria-invalid={!!error} {...inputProps} />
      {error ? <span className="field__error">{error}</span> : hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}
