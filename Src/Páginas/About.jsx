import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, Users, Globe } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-72 flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-white">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-gold text-xs uppercase tracking-[4px] mb-3">Sobre Nós</p>
            <h1 className="font-playfair text-4xl sm:text-5xl font-bold">Nossa História</h1>
          </motion.div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="text-gold text-xs uppercase tracking-[3px] mb-3">Quem somos</p>
            <h2 className="font-playfair text-3xl font-semibold mb-5">Qualidade e elegância em cada peça</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A LUXE STORE nasceu da paixão por moda e estilo de vida refinado. Selecionamos cuidadosamente cada produto para oferecer a melhor experiência aos nossos clientes.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Nossa missão é tornar o luxo acessível sem abrir mão da qualidade. Cada peça passa por uma curadoria rigorosa antes de chegar até você.
            </p>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-square">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
              alt="Nossa loja"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {[
            { icon: Award, title: 'Qualidade', desc: 'Produtos cuidadosamente selecionados com os melhores materiais.' },
            { icon: Users, title: 'Atendimento', desc: 'Suporte dedicado para garantir sua satisfação em cada compra.' },
            { icon: Globe, title: 'Sustentabilidade', desc: 'Comprometidos com práticas responsáveis e sustentáveis.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="text-center p-6 rounded-2xl bg-muted/30 border border-border">
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <Icon size={22} className="text-gold" />
              </div>
              <h3 className="font-playfair font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-gold text-white px-8 py-3.5 rounded-full font-medium hover:bg-gold/90 transition-all"
          >
            Ver nossa coleção <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
