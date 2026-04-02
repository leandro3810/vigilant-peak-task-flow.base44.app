import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const CATEGORIES = ['roupas', 'acessórios', 'calçados', 'beleza', 'casa', 'eletrônicos', 'outros'];

const empty = { name: '', description: '', price: '', original_price: '', category: 'outros', image_url: '', stock: '', featured: false, badge: '' };

export default function ProductForm({ open, onClose, product, onSave }) {
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    setForm(product ? { ...empty, ...product } : empty);
  }, [product, open]);

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set('image_url', file_url);
    setUploading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const data = {
      ...form,
      price: parseFloat(form.price) || 0,
      original_price: form.original_price ? parseFloat(form.original_price) : null,
      stock: form.stock !== '' ? parseInt(form.stock) : null,
    };
    if (product?.id) {
      await base44.entities.Product.update(product.id, data);
    } else {
      await base44.entities.Product.create(data);
    }
    setSaving(false);
    onSave();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-border">
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-playfair text-xl font-semibold">{product ? 'Editar Produto' : 'Novo Produto'}</h2>
                <button onClick={onClose} className="p-1.5 rounded-full hover:bg-muted transition-colors"><X size={18} /></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Image */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Imagem</label>
                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-xl bg-muted overflow-hidden flex-shrink-0 border border-border">
                      {form.image_url
                        ? <img src={form.image_url} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">Sem imagem</div>
                      }
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="cursor-pointer inline-flex items-center gap-2 px-3 py-2 border border-border rounded-lg text-xs hover:border-gold transition-colors">
                        {uploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                        {uploading ? 'Enviando...' : 'Upload'}
                        <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
                      </label>
                      <input
                        type="url"
                        placeholder="Ou cole uma URL"
                        value={form.image_url}
                        onChange={e => set('image_url', e.target.value)}
                        className="text-xs px-3 py-2 border border-border rounded-lg bg-muted/20 outline-none focus:border-gold w-48"
                      />
                    </div>
                  </div>
                </div>

                {[
                  { id: 'name', label: 'Nome *', type: 'text', required: true },
                  { id: 'badge', label: 'Badge (ex: Novo, Promoção)', type: 'text' },
                ].map(f => (
                  <div key={f.id}>
                    <label className="text-sm font-medium mb-1.5 block">{f.label}</label>
                    <input
                      type={f.type}
                      required={f.required}
                      value={form[f.id]}
                      onChange={e => set(f.id, e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="text-sm font-medium mb-1.5 block">Descrição</label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={e => set('description', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold resize-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Preço *</label>
                    <input
                      type="number" step="0.01" min="0" required
                      value={form.price}
                      onChange={e => set('price', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Preço Original</label>
                    <input
                      type="number" step="0.01" min="0"
                      value={form.original_price}
                      onChange={e => set('original_price', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Categoria</label>
                    <select
                      value={form.category}
                      onChange={e => set('category', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold transition-colors capitalize"
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Estoque</label>
                    <input
                      type="number" min="0"
                      value={form.stock}
                      onChange={e => set('stock', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 text-sm outline-none focus:border-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={!!form.featured}
                    onChange={e => set('featured', e.target.checked)}
                    className="w-4 h-4 rounded accent-yellow-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium cursor-pointer">Produto em destaque na home</label>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={onClose} className="px-5 py-2.5 rounded-xl border border-border text-sm hover:bg-muted transition-colors">
                    Cancelar
                  </button>
                  <button type="submit" disabled={saving} className="px-5 py-2.5 rounded-xl bg-gold text-white text-sm font-medium hover:bg-gold/90 transition-all disabled:opacity-60">
                    {saving ? 'Salvando...' : 'Salvar Produto'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
