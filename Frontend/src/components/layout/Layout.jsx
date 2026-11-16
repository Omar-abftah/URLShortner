import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ tone }) {
  return (
    <div className="page-shell">
      <Header tone={tone} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
