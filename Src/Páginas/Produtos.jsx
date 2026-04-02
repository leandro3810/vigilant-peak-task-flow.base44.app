import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';

const CATEGORIES = ['todos', 'roupas', 'acessórios', 'calçados', 'beleza', 'casa', 'eletrônicos', 'outros'];
const SORT_OPTIONS = [
  { label: 'Mais recentes', value: '-created_date' },
  { label: 'Menor preço', value: 'price' },
  { label: 'Maior preço', value: '-price' },
  { label: 'A-Z', value: 'name' },
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('todos');
  const [sort, setSort] = useState('-created_date');
  const [search, setSearch] = useState('');
  const { addToCart } = useOutletContext();

  useEffect(() => {
    setLoading(true);
    const filter = category !== 'todos' ? { category } : {};
    base44.entities.Product.filter(filter, sort)
      .then(data => { setProducts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [category, sort]);

  const filtered = products.filter(p =>
    !search || p.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      {/* Header */}
      <div className="mb-10">
        <p className="text-gold text-xs uppercase tracking-[3px] mb-2">Catálogo</p>
        <h1 className="font-playfair text-4xl font-semibold">Todos os Produtos</h1>
        <p className="text-muted-foreground mt-2">{filtered.length} produtos encontrados</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        {/* Categories */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all border ${
                category === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-transparent border-border text-muted-foreground hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="ml-auto flex items-center gap-2">
          <SlidersHorizontal size={14} className="text-muted-foreground" />
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="text-sm bg-transparent border border-border rounded-lg px-3 py-1.5 text-foreground outline-none focus:border-gold"
          >
            {SORT_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-8">
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filtrar por nome..."
          className="w-full max-w-xs px-4 py-2 rounded-lg border border-border bg-muted/30 text-sm outline-none focus:border-gold placeholder:text-muted-foreground"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
            <X size={14} />
          </button>
        )}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="rounded-xl bg-muted animate-pulse aspect-square" />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {filtered.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
        </motion.div>
      ) : (
        <div className="text-center py-24">
          <p className="font-playfair text-xl text-muted-foreground">Nenhum produto encontrado</p>
        </div>
      )}
    </div>
  );
}
