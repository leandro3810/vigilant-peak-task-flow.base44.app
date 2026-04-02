import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false);
  const [liked, setLiked] = useState(false);

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg hover:border-gold/30 transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <Link to={`/produto/${product.id}`} className="block relative overflow-hidden aspect-square bg-muted">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag size={40} />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.badge && (
            <span className="text-xs font-medium bg-gold text-white px-2 py-0.5 rounded-full">
              {product.badge}
            </span>
          )}
          {discount && (
            <span className="text-xs font-medium bg-destructive text-white px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors"
        >
          <Heart
            size={14}
            className={liked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}
          />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
        <Link to={`/produto/${product.id}`}>
          <h3 className="font-playfair font-semibold text-foreground hover:text-gold transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.original_price && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.original_price)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onAddToCart(product)}
          className="mt-3 w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ShoppingBag size={14} />
          Adicionar ao carrinho
        </motion.button>
      </div>
    </motion.div>
  );
}
