import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/CartContext';
import { CheckCircle2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', notes: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await base44.entities.Order.create({
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      address: form.address,
      notes: form.notes,
      items: items.map(i => ({ product_id: i.id, product_name: i.name, quantity: i.quantity, price: i.price, image_url: i.image_url })),
      total: cartTotal,
      status: 'pendente',
    });
    clearCart();
    setDone(true);
    setLoading(false);
  };

  if (items.length === 0 && !done) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <ShoppingBag size={48} className="text-muted-foreground/30 mx-auto mb-4" />
      <p className="font-playfair text-xl text-muted-foreground">Seu carrinho está vazio</p>
      <Link to="/produtos" className="text-gold mt-3 inline-block hover:underline">Ver produtos →</Link>
    </div>
  );

  if (done) return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-green-600" />
      </motion.div>
      <h2 className="font-playfair text-3xl font-bold mb-3">Pedido Realizado!</h2>
      <p className="text-muted-foreground mb-8">Obrigado! Você receberá uma confirmação em breve.</p>
      <Link to="/" className="inline-flex items-center gap-2 bg-gold text-white px-6 py-3 rounded-full hover:bg-gold/90 transition-colors">
        Voltar ao início
      </Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-8">
        <ArrowLeft size={14} /> Continuar comprando
      </Link>
      <h1 className="font-playfair text-3xl font-bold mb-8">Finalizar Pedido</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { id: 'name', label: 'Nome completo', type: 'text', required: true },
            { id: 'email', label: 'E-mail', type: 'email', required: true },
            { id: 'phone', label: 'Telefone', type: 'tel', required: false },
            { id: 'address', label: 'Endereço de entrega', type: 'text', required: true },
          ].map(field => (
            <div key={field.id}>
              <label className="text-sm font-medium mb-1.5 block">{field.label}</label>
              <input
                type={field.type}
                required={field.required}
                value={form[field.id]}
                onChange={e => setForm({ ...form, [field.id]: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 outline-none focus:border-gold text-sm transition-colors"
              />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium mb-1.5 block">Observações (opcional)</label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={e => setForm({ ...form, notes: e.target.value })}
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-muted/20 outline-none focus:border-gold text-sm resize-none transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gold text-white font-medium hover:bg-gold/90 transition-all disabled:opacity-60"
          >
            {loading ? 'Processando...' : 'Confirmar Pedido'}
          </button>
        </form>

        {/* Summary */}
        <div>
          <div className="bg-muted/30 border border-border rounded-2xl p-6 sticky top-24">
            <h2 className="font-playfair text-lg font-semibold mb-5">Resumo do Pedido</h2>
            <div className="space-y-3 mb-5">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                    {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-playfair text-xl font-bold text-gold">{formatPrice(cartTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
