import { useEffect, useState, useMemo } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Shield, Truck, RefreshCw, Search, X } from 'lucide-react';
import ProductCard from '@/components/store/ProductCard';

const CATEGORIES = [
  { value: 'todos', label: 'Todos' },
  { value: 'roupas', label: 'Roupas' },
  { value: 'acessórios', label: 'Acessórios' },
  { value: 'calçados', label: 'Calçados' },
  { value: 'beleza', label: 'Beleza' },
  { value: 'casa', label: 'Casa' },
  { value: 'eletrônicos', label: 'Eletrônicos' },
  { value: 'outros', label: 'Outros' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const { addToCart } = useOutletContext();

  useEffect(() => {
    base44.entities.Product.filter({ featured: true }, '-created_date', 20)
      .then(data => { setFeatured(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filteredProducts = useMemo(() => {
    return featured.filter(p => {
      const matchesCategory = activeCategory === 'todos' || p.category === activeCategory;
      const matchesSearch = !search || p.name?.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [featured, search, activeCategory]);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-xl"
          >
            <p className="text-gold text-sm uppercase tracking-[4px] mb-4 font-inter font-medium">Nova Coleção 2026</p>
            <h1 className="font-playfair text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
              Elegância que fala por si
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8 font-inter font-light">
              Descubra peças selecionadas com cuidado para quem valoriza o estilo e a qualidade em cada detalhe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 bg-gold text-white px-7 py-3.5 rounded-full font-medium hover:bg-gold/90 transition-all hover:gap-3"
              >
                Ver Coleção <ArrowRight size={16} />
              </Link>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 border border-white/40 text-white px-7 py-3.5 rounded-full font-medium hover:bg-white/10 transition-all"
              >
                Saiba Mais
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: 'Frete Grátis', sub: 'Acima de R$ 200' },
            { icon: Shield, title: 'Compra Segura', sub: 'Proteção total' },
            { icon: RefreshCw, title: 'Troca Fácil', sub: 'Até 30 dias' },
            { icon: Star, title: 'Qualidade', sub: 'Produtos selecionados' },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/40 border border-border">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mb-3">
                <Icon size={18} className="text-gold" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Search & Filters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Search bar */}
        <div className="relative max-w-xl mx-auto mb-8">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar produtos em destaque..."
            className="w-full pl-11 pr-10 py-3 rounded-full border border-border bg-card text-sm outline-none focus:border-gold transition-colors shadow-sm"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                activeCategory === cat.value
                  ? 'bg-gold text-white border-gold'
                  : 'bg-card text-muted-foreground border-border hover:border-gold hover:text-gold'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-gold text-xs uppercase tracking-[3px] mb-2 font-inter">Destaques</p>
            <h2 className="font-playfair text-3xl sm:text-4xl font-semibold">Produtos em Destaque</h2>
          </div>
          <Link to="/produtos" className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors">
            Ver todos <ArrowRight size={14} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {Array(4).fill(0).map((_, i) => (
              <div key={i} className="rounded-xl bg-muted animate-pulse aspect-square" />
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} onAddToCart={addToCart} />)}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-playfair text-lg">Nenhum produto em destaque ainda</p>
            <Link to="/admin" className="text-sm text-gold mt-2 inline-block hover:underline">Ir para o painel admin →</Link>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-playfair text-lg">Nenhum produto encontrado</p>
            <button onClick={() => { setSearch(''); setActiveCategory('todos'); }} className="text-sm text-gold mt-2 hover:underline">
              Limpar filtros
            </button>
          </div>
        )}
      </section>

      {/* Banner CTA */}
      <section className="relative overflow-hidden py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-foreground/70" />
        <div className="relative text-center text-white max-w-lg mx-auto px-4">
          <p className="text-gold text-xs uppercase tracking-[3px] mb-3">Oferta Especial</p>
          <h2 className="font-playfair text-4xl font-bold mb-4">Até 40% de desconto</h2>
          <p className="text-white/70 mb-8">Aproveite os descontos especiais em produtos selecionados por tempo limitado.</p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold/90 transition-all"
          >
            Aproveitar Agora <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
