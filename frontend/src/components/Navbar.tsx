import { Link, NavLink } from 'react-router-dom';
import type { User } from '../types';

interface Props { count: number; user: User | null; onLogout: () => void; }

export default function Navbar({ count, user, onLogout }: Props) {
  return <header className="site-header"><nav className="nav container" aria-label="Main navigation">
    <Link className="brand" to="/">REC<span>.</span></Link>
    <div className="nav-links"><NavLink to="/">Home</NavLink><NavLink to="/products">Shop</NavLink></div>
    <div className="nav-actions">
      {user ? <button className="text-button" onClick={onLogout}>Sign out</button> : <NavLink to="/login">Sign in</NavLink>}
      <NavLink className="cart-link" to="/cart" aria-label={`Cart with ${count} items`}>Cart <span>{count}</span></NavLink>
    </div>
  </nav></header>;
}
