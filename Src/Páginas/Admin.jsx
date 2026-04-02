import { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Package, ShoppingBag, TrendingUp, Star } from 'lucide-react';
import ProductForm from '@/components/admin/ProductForm';
import OrdersTable from '@/components/admin/OrdersTable';

export default function Admin() {
  const [tab, setTab] = useState('produtos');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadData = async () => {
    setLoading(true);
    const [prods, ords] = await Promise.all([
      base44.entities.Product.list('-created_date'),
      base44.entities.Order.list('-created_date'),
    ]);
    setProducts(prods);
    setOrders(ords);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id) => {
    if (!confirm('Excluir este produto?')) return;
    await base44.entities.Product.delete(id);
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const totalRevenue = orders.filter(o => o.status !== 'cancelado').reduce((sum, o) => sum + (o.total || 0), 0);

  const stats = [
    { label: 'Produtos', value: products.length, icon: Package, color: 'text-blue-500 bg-blue-50' },
    { label: 'Pedidos', value: orders.length, icon: ShoppingBag, color: 'text-gold bg-amber-50' },
    { label: 'Receita', value: formatPrice(totalRevenue), icon: TrendingUp, color: 'text-green-600 bg-green-50' },
    { label: 'Destaques', value: products.filter(p => p.featured).length, icon: Star, color: 'text-purple-500 bg-purple-50' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-gold text-xs uppercase tracking-[3px] mb-1">Painel</p>
          <h1 className="font-playfair text-3xl font-bold">Admin</h1>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
              <Icon size={18} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="font-bold text-sm">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border border-border rounded-xl p-1 mb-8 w-fit">
        {['produtos', 'pedidos'].map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === 'produtos' && (
        <div>
          <div className="flex justify-end mb-5">
            <button
              onClick={() => { setEditing(null); setFormOpen(true); }}
              className="flex items-center gap-2 bg-gold text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-gold/90 transition-all"
            >
              <Plus size={16} /> Novo Produto
            </button>
          </div>

          {loading ? (
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-border overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Produto</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Categoria</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground">Preço</th>
                    <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden sm:table-cell">Estoque</th>
                    <th className="px-5 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {products.map(p => (
                    <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-muted/20 transition-colors">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                            {p.image_url && <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />}
                          </div>
                          <div>
                            <p className="font-medium line-clamp-1">{p.name}</p>
                            {p.featured && <span className="text-xs text-gold">⭐ Destaque</span>}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-muted-foreground capitalize hidden md:table-cell">{p.category}</td>
                      <td className="px-5 py-3 font-semibold">{formatPrice(p.price)}</td>
                      <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell">{p.stock ?? '—'}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => { setEditing(p); setFormOpen(true); }}
                            className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-1.5 rounded-lg hover:bg-destructive/10 transition-colors text-muted-foreground hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                  {products.length === 0 && (
                    <tr><td colSpan={5} className="text-center py-10 text-muted-foreground">Nenhum produto cadastrado</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === 'pedidos' && <OrdersTable orders={orders} onUpdate={loadData} />}

      <ProductForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        product={editing}
        onSave={loadData}
      />
    </div>
  );
}
