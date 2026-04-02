import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function StarRating({ value, onChange, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange && onChange(i)}
          onMouseEnter={() => onChange && setHovered(i)}
          onMouseLeave={() => onChange && setHovered(0)}
          className={onChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            size={size}
            className={`transition-colors ${
              i <= (hovered || value)
                ? 'fill-amber-400 text-amber-400'
                : 'text-muted-foreground/30'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewStars({ rating, count }) {
  return (
    <div className="flex items-center gap-2">
      <StarRating value={Math.round(rating)} size={14} />
      <span className="text-sm font-medium">{rating.toFixed(1)}</span>
      {count !== undefined && (
        <span className="text-sm text-muted-foreground">({count} avaliações)</span>
      )}
    </div>
  );
}

export default function ReviewSection({ productId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ author_name: '', rating: 5, comment: '' });

  const loadReviews = async () => {
    const data = await base44.entities.Review.filter({ product_id: productId }, '-created_date');
    setReviews(data);
    setLoading(false);
  };

  useEffect(() => {
    if (productId) loadReviews();
  }, [productId]);

  const avgRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.Review.create({ ...form, product_id: productId });
    setForm({ author_name: '', rating: 5, comment: '' });
    setShowForm(false);
    await loadReviews();
    setSubmitting(false);
  };

  return (
    <div className="mt-16 border-t border-border pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-playfair text-2xl font-semibold mb-2">Avaliações</h2>
          {reviews.length > 0 && (
            <ReviewStars rating={avgRating} count={reviews.length} />
          )}
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-xl border border-border text-sm font-medium hover:border-gold hover:text-gold transition-colors"
        >
          {showForm ? 'Cancelar' : 'Avaliar produto'}
        </button>
      </div>

      {/* Distribution */}
      {reviews.length > 0 && (
        <div className="mb-8 p-5 rounded-2xl bg-muted/30 border border-border flex items-center gap-8">
          <div className="text-center flex-shrink-0">
            <p className="font-playfair text-5xl font-bold">{avgRating.toFixed(1)}</p>
            <StarRating value={Math.round(avgRating)} size={16} />
            <p className="text-xs text-muted-foreground mt-1">{reviews.length} avaliações</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviews.filter(r => r.rating === star).length;
              const pct = reviews.length ? (count / reviews.length) * 100 : 0;
              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-3 text-right text-muted-foreground">{star}</span>
                  <Star size={10} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                  <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="w-4 text-muted-foreground">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Form */}
      <AnimatePresence>
        {showForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmit}
            className="mb-8 p-6 rounded-2xl border border-gold/30 bg-gold/5 space-y-4 overflow-hidden"
          >
            <h3 className="font-playfair font-semibold text-lg">Deixe sua avaliação</h3>
            <div>
              <label className="text-sm font-medium mb-2 block">Sua nota</label>
              <StarRating value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} size={28} />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Seu nome *</label>
              <input
                required
                value={form.author_name}
                onChange={e => setForm(f => ({ ...f, author_name: e.target.value }))}
                placeholder="Ex: João Silva"
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Comentário</label>
              <textarea
                rows={3}
                value={form.comment}
                onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                placeholder="Conte sua experiência com o produto..."
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm outline-none focus:border-gold resize-none transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all disabled:opacity-60"
            >
              {submitting ? 'Enviando...' : 'Publicar avaliação'}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews list */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map(i => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : reviews.length === 0 ? (
        <p className="text-center text-muted-foreground py-12 font-playfair text-lg">
          Seja o primeiro a avaliar este produto!
        </p>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-semibold text-sm">{review.author_name}</p>
                  <StarRating value={review.rating} size={14} />
                </div>
                {review.created_date && (
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(review.created_date), "dd MMM yyyy", { locale: ptBR })}
                  </p>
                )}
              </div>
              {review.comment && (
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{review.comment}</p>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
