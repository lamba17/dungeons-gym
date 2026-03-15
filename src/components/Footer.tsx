import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-8 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Logo */}
        <Link to="/" className="font-heading text-2xl font-bold uppercase tracking-[0.15em]">
          <span className="text-gradient">Dungeon</span>{' '}
          <span className="text-foreground">Gym</span>
        </Link>

        {/* Nav quick links */}
        <div className="flex items-center gap-6">
          {['About', 'Plans', 'Gallery', 'Contact'].map(l => (
            <Link
              key={l}
              to={l === 'Gallery' ? '/gallery' : `/#${l.toLowerCase()}`}
              className="font-heading text-xs uppercase tracking-[0.15em] text-foreground/50 hover:text-primary transition-colors"
            >
              {l}
            </Link>
          ))}
        </div>

        {/* Social */}
        <div className="flex items-center gap-4">
          {[
            { Icon: Instagram, href: '#' },
            { Icon: Facebook,  href: '#' },
            { Icon: Youtube,   href: '#' },
          ].map(({ Icon, href }) => (
            <a
              key={href + Icon.displayName}
              href={href}
              className="w-10 h-10 rounded-full border border-foreground/20 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-foreground/40 font-body">© 2025 Dungeon Gym. All rights reserved.</p>
          <p className="text-xs text-foreground/30 font-body">Designed for warriors. Built for champions.</p>
        </div>
      </div>
    </footer>
  );
}
