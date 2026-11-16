import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage({ message = "That page doesn't exist." }) {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>{message}</p>
      <Link to="/">Back home</Link>
    </div>
  );
}
