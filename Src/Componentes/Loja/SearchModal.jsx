import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

export default function SearchModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const timeout = setTimeout(async () => {
      setLoading(true);
      const all = await base44.entities.Product.list();
      const filtered = all.filter(p =>
        p.name?.toLowerCase().includes(query.toLowerCase()) ||
        p.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6));
      setLoading(false);
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-lg bg-card rounded-2xl shadow-2xl border border-border z-50 overflow-hidden"
          >
            <div className="flex items-center px-4 py-3 border-b border-border gap-3">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Buscar produtos..."
                className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm"
              />
              <button onClick={onClose} className="p-1 rounded-full hover:bg-muted transition-colors">
                <X size={16} />
              </button>
            </div>
            {results.length > 0 && (
              <div className="py-2 max-h-80 overflow-y-auto">
                {results.map(product => (
                  <Link
                    key={product.id}
                    to={`/produto/${product.id}`}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-2 hover:bg-muted transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-gold">{formatPrice(product.price)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {query && !loading && results.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-6">Nenhum produto encontrado</p>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
