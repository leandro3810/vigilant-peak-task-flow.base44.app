import { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronDown } from 'lucide-react';

const STATUS_COLORS = {
  pendente: 'bg-yellow-100 text-yellow-700',
  confirmado: 'bg-blue-100 text-blue-700',
  enviado: 'bg-purple-100 text-purple-700',
  entregue: 'bg-green-100 text-green-700',
  cancelado: 'bg-red-100 text-red-700',
};

const STATUS_OPTIONS = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];

export default function OrdersTable({ orders, onUpdate }) {
  const [expanded, setExpanded] = useState(null);

  const formatPrice = (val) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val || 0);

  const updateStatus = async (id, status) => {
    await base44.entities.Order.update(id, { status });
    onUpdate();
  };

  if (orders.length === 0) return (
    <div className="text-center py-16 text-muted-foreground">Nenhum pedido ainda.</div>
  );

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Cliente</th>
            <th className="text-left px-5 py-3 font-medium text-muted-foreground hidden md:table-cell">Data</th>
            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Total</th>
            <th className="text-left px-5 py-3 font-medium text-muted-foreground">Status</th>
            <th className="px-5 py-3"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map(order => (
            <>
              <tr key={order.id} className="hover:bg-muted/20 transition-colors cursor-pointer" onClick={() => setExpanded(expanded === order.id ? null : order.id)}>
                <td className="px-5 py-3">
                  <p className="font-medium">{order.customer_name}</p>
                  <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                </td>
                <td className="px-5 py-3 text-muted-foreground hidden md:table-cell">
                  {order.created_date && format(new Date(order.created_date), "dd MMM yyyy", { locale: ptBR })}
                </td>
                <td className="px-5 py-3 font-semibold">{formatPrice(order.total)}</td>
                <td className="px-5 py-3">
                  <select
                    value={order.status}
                    onClick={e => e.stopPropagation()}
                    onChange={e => updateStatus(order.id, e.target.value)}
                    className={`text-xs px-2 py-1 rounded-full border-0 outline-none font-medium cursor-pointer ${STATUS_COLORS[order.status]}`}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </td>
                <td className="px-5 py-3">
                  <ChevronDown
                    size={14}
                    className={`text-muted-foreground transition-transform ${expanded === order.id ? 'rotate-180' : ''}`}
                  />
                </td>
              </tr>
              {expanded === order.id && (
                <tr key={`${order.id}-exp`} className="bg-muted/10">
                  <td colSpan={5} className="px-5 py-4">
                    <div className="space-y-2">
                      {order.address && <p className="text-xs text-muted-foreground">Endereço: {order.address}</p>}
                      {order.notes && <p className="text-xs text-muted-foreground">Obs: {order.notes}</p>}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {(order.items || []).map((item, i) => (
                          <div key={i} className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-1.5 text-xs">
                            {item.image_url && <img src={item.image_url} alt="" className="w-6 h-6 rounded object-cover" />}
                            <span>{item.product_name} × {item.quantity}</span>
                            <span className="text-gold font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
