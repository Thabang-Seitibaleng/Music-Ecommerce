import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  // Shared footer keeps the same supporting navigation at the bottom of every page.
  return (
    <footer className="footer rec-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <Link className="brand" to="/" aria-label="REC. home">
              REC<span>.</span>
            </Link>
            <p className="footer-heading">
              Built for listening.
              <br />
              Not collecting dust.
            </p>
            <p className="footer-description">
              Modern pressings. Classic sound.
              <br />
              Make a little room for music.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <div>
              <h2>Explore</h2>
              <Link to="/products">All records</Link>
              <Link to="/products?category=Turntables">Turntables</Link>
              <Link to="/products?category=Classics">The classics</Link>
            </div>
            <div>
              <h2>Your REC.</h2>
              <Link to="/">Home</Link>
              <Link to="/cart">Your cart</Link>
              <Link to="/login">Sign in</Link>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <small>© {new Date().getFullYear()} REC. / SEN371 E-Commerce</small>
          <span>Good music. On repeat.</span>
        </div>
      </div>
    </footer>
  );
}
