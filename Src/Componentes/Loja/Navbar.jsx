import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ cartCount = 0, onCartOpen, onSearchOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Início', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Sobre', href: '/sobre' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="font-playfair text-xl font-bold tracking-wide">
          <span className="text-foreground">LUXE</span>
          <span className="text-gold ml-1">STORE</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={`text-sm font-inter font-medium tracking-wide transition-colors hover:text-gold ${
                location.pathname === link.href ? 'text-gold' : 'text-muted-foreground'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSearchOpen}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <Search size={18} />
          </button>
          <button
            onClick={onCartOpen}
            className="relative p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-medium">
                {cartCount}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {links.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium tracking-wide py-1 transition-colors hover:text-gold ${
                    location.pathname === link.href ? 'text-gold' : 'text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
