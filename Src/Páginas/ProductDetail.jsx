import { useEffect, useState } from 'react';
import { useParams, Link, useOutletContext } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Heart, Share2 } from 'lucide-react';
import ReviewSection, { ReviewStars } from '@/components/store/ReviewSection';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImg, setMainImg] = useState(null);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { addToCart } = useOutletContext();

  useEffect(() => {
    base44.entities.Product.filter({ id })
      .then(data => {
        const p = data[0];
        setProduct(p);
        setMainImg(p?.image_url);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    base44.entities.Review.filter({ product_id: id }).then(setReviews);
  }, [id]);

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="aspect-square rounded-2xl bg-muted animate-pulse" />
        <div className="space-y-4">
          <div className="h-6 bg-muted rounded animate-pulse w-1/3" />
          <div className="h-10 bg-muted rounded animate-pulse" />
          <div className="h-8 bg-muted rounded animate-pulse w-1/4" />
        </div>
      </div>
    </div>
  );

  if (!product) return (
    <div className="text-center py-24">
      <p className="font-playfair text-xl text-muted-foreground">Produto não encontrado</p>
      <Link to="/produtos" className="text-gold mt-3 inline-block hover:underline text-sm">← Voltar</Link>
    </div>
  );

  const discount = product.original_price
    ? Math.round((1 - product.price / product.original_price) * 100)
    : null;

  const allImages = [product.image_url, ...(product.images || [])].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/produtos" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
        <ArrowLeft size={14} /> Voltar aos produtos
      </Link>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <motion.div
            key={mainImg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square rounded-2xl overflow-hidden bg-muted mb-4 border border-border"
          >
            {mainImg ? (
              <img src={mainImg} alt={product.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <ShoppingBag size={60} />
              </div>
            )}
          </motion.div>
          {allImages.length > 1 && (
            <div className="flex gap-3">
              {allImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImg(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${mainImg === img ? 'border-gold' : 'border-border'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <p className="text-gold text-xs uppercase tracking-wider mb-2">{product.category}</p>
          <h1 className="font-playfair text-3xl sm:text-4xl font-bold mb-4">{product.name}</h1>

          {/* Reviews summary */}
          <div className="mb-6">
            {reviews.length > 0 ? (
              <ReviewStars
                rating={reviews.reduce((s, r) => s + r.rating, 0) / reviews.length}
                count={reviews.length}
              />
            ) : (
              <p className="text-sm text-muted-foreground">Sem avaliações ainda</p>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="font-playfair text-3xl font-bold">{formatPrice(product.price)}</span>
            {product.original_price && (
              <>
                <span className="text-muted-foreground line-through text-lg">{formatPrice(product.original_price)}</span>
                <span className="text-xs bg-destructive/10 text-destructive px-2 py-0.5 rounded-full">-{discount}%</span>
              </>
            )}
          </div>

          {product.description && (
            <p className="text-muted-foreground leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Qty */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted transition-colors text-lg">−</button>
              <span className="px-4 py-2 border-x border-border font-medium">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-muted transition-colors text-lg">+</button>
            </div>
            {product.stock !== undefined && (
              <p className="text-sm text-muted-foreground">{product.stock} em estoque</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAdd}
              className={`flex-1 py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
                added ? 'bg-green-600 text-white' : 'bg-gold text-white hover:bg-gold/90'
              }`}
            >
              <ShoppingBag size={18} />
              {added ? 'Adicionado!' : 'Adicionar ao Carrinho'}
            </motion.button>
            <button className="p-3.5 rounded-xl border border-border hover:border-gold transition-colors">
              <Heart size={18} />
            </button>
            <button className="p-3.5 rounded-xl border border-border hover:border-gold transition-colors">
              <Share2 size={18} />
            </button>
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-6">
              {product.tags.map(tag => (
                <span key={tag} className="text-xs border border-border px-3 py-1 rounded-full text-muted-foreground">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <ReviewSection productId={id} />
    </div>
  );
}
