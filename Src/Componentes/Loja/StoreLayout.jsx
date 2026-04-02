import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import CartDrawer from './CartDrawer';
import SearchModal from './SearchModal';
import { useCart } from '@/lib/CartContext';

export default function StoreLayout() {
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { items, addToCart, updateQty, removeItem, cartCount } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar
        cartCount={cartCount}
        onCartOpen={() => setCartOpen(true)}
        onSearchOpen={() => setSearchOpen(true)}
      />
      <main className="pt-16">
        <Outlet context={{ addToCart }} />
      </main>
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQty={updateQty}
        onRemove={removeItem}
      />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
      <footer className="border-t border-border mt-20 py-10 text-center text-sm text-muted-foreground">
        <p className="font-playfair text-base font-semibold text-foreground mb-1">LUXE STORE</p>
        <p>© {new Date().getFullYear()} Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
