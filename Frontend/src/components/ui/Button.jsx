import { motion } from "motion/react";
import "./Button.css";

export default function Button({ variant = "primary", type = "button", className = "", disabled, ...props }) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`btn btn--${variant} ${className}`}
      {...props}
    />
  );
}
