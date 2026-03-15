import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Dumbbell, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_LINKS = [
  { label: 'Home',        href: '/#home' },
  { label: 'About',       href: '/#about' },
  { label: 'Facilities',  href: '/#facilities' },
  { label: 'Plans',       href: '/#plans' },
  { label: 'Gallery',     href: '/gallery' },
  { label: 'Contact',     href: '/#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentMember, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (href: string) => {
    setOpen(false);
    if (href.startsWith('/#')) {
      const id = href.slice(2);
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 300);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled ? 'bg-background/98 shadow-lg shadow-background/50' : 'bg-background/95'}
        backdrop-blur-xl border-b border-border`}>
        <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 flex items-center justify-between h-[69px]">

          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-bold uppercase tracking-[0.15em]">
            <span className="text-gradient">Dungeon</span>{' '}
            <span className="text-foreground">Gym</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="relative font-heading text-sm uppercase tracking-[0.15em] text-foreground/70 hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden lg:flex items-center gap-4">
            {isAdmin ? (
              <>
                <Link to="/admin" className="font-heading text-sm uppercase tracking-[0.1em] text-primary flex items-center gap-2">
                  <LayoutDashboard className="w-4 h-4" />
                  Admin Panel
                </Link>
                <button onClick={handleLogout} className="btn-outline-premium text-xs py-2 px-4 flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </>
            ) : currentMember ? (
              <>
                <Link to="/dashboard" className="font-heading text-sm uppercase tracking-[0.1em] text-foreground/70 hover:text-foreground flex items-center gap-2 transition-colors">
                  <User className="w-4 h-4" />
                  {currentMember.name.split(' ')[0]}
                </Link>
                <button onClick={handleLogout} className="btn-outline-premium text-xs py-2 px-4 flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-outline-premium text-xs py-2.5 px-5">Login</Link>
                <Link to="/signup" className="btn-primary-premium text-xs py-2.5 px-6">Join Now</Link>
              </>
            )}
          </div>

          {/* Hamburger */}
          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-background/98 flex flex-col items-center justify-center gap-8 lg:hidden">
          <button className="absolute top-5 right-8" onClick={() => setOpen(false)}>
            <X className="w-7 h-7 text-foreground" />
          </button>
          <div className="flex items-center gap-2 mb-4">
            <Dumbbell className="w-6 h-6 text-primary" />
            <span className="font-heading text-2xl font-bold uppercase tracking-[0.15em]">
              <span className="text-gradient">Dungeon</span> Gym
            </span>
          </div>
          {NAV_LINKS.map(link => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.href)}
              className="font-heading text-xl uppercase tracking-[0.15em] text-foreground/70 hover:text-primary transition-colors"
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col items-center gap-4 mt-4 w-full px-10">
            {isAdmin ? (
              <>
                <Link to="/admin" onClick={() => setOpen(false)}
                  className="btn-primary-premium w-full py-3 text-center">Admin Panel</Link>
                <button onClick={handleLogout} className="btn-outline-premium w-full py-3">Logout</button>
              </>
            ) : currentMember ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}
                  className="btn-outline-premium w-full py-3 text-center">My Dashboard</Link>
                <button onClick={handleLogout} className="btn-outline-premium w-full py-3">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login"  onClick={() => setOpen(false)}
                  className="btn-outline-premium w-full py-3 text-center">Login</Link>
                <Link to="/signup" onClick={() => setOpen(false)}
                  className="btn-primary-premium w-full py-3 text-center">Join Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
