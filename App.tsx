
import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Truck, ShieldCheck, Star, ArrowRight, CheckCircle2, Menu, Sparkles, Facebook, Instagram, MessageCircle, Clock, Quote, BadgeCheck } from 'lucide-react';
import { Language, AppView } from './types';
import { TRANSLATIONS } from './constants';
import LanguageToggle from './components/LanguageToggle';
import OrderForm from './components/OrderForm';
import AiStylist from './components/AiStylist';

const REVIEWS = [
  {
    name: "Amira K.",
    city: "Tunis",
    rating: 5,
    comment: "Doudoune de très bonne qualité ! Deffia barcha wallah, et la taille est parfaite. Livraison jetni fi 24h.",
    date: "Il y a 2 jours"
  },
  {
    name: "Marwa F.",
    city: "Sousse",
    rating: 5,
    comment: "Service tayara, kalamni el livreur w jarrabt el Blouson 9bal ma nkhallas. Je recommande !",
    date: "Il y a 1 semaine"
  },
  {
    name: "Ines B.",
    city: "Bizerte",
    rating: 5,
    comment: "Hbal el doudoune! Khfifa ama tdaffi mli7 mli7. El finition mte3ha ndhifa barcha w el fermeture s7i7a. Merci !",
    date: "Il y a 1 jour"
  },
  {
    name: "Sonia M.",
    city: "Sfax",
    rating: 5,
    comment: "Coupe élégante et tissu impermiable kima fel tsawer. El couleur yécer chic.",
    date: "Il y a 3 jours"
  },
  {
    name: "Rim J.",
    city: "Nabeul",
    rating: 5,
    comment: "Commandé hier et reçu aujourd'hui ! Très satisfaite de la coupe longue, jétni 9ad 9ad m3a el taille mte3i. Un bon plan pour l'hiver.",
    date: "Il y a 4 jours"
  }
];

const CountdownTimer: React.FC<{ lang: Language }> = ({ lang }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 45, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          return { hours: 2, minutes: 59, seconds: 59 };
        }
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-4 bg-slate-900 text-white px-5 py-3 rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 text-blue-400">
        <Clock size={18} className="animate-pulse" />
        <span className="text-[10px] font-black uppercase tracking-widest shrink-0">{lang === 'fr' ? 'Offre Spéciale' : 'عرض خاص'}</span>
      </div>
      <div className="flex gap-2 text-xl font-black italic tracking-tighter">
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.hours)}</span>
        </div>
        <span className="text-blue-600">:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.minutes)}</span>
        </div>
        <span className="text-blue-600">:</span>
        <div className="flex flex-col items-center">
          <span>{format(timeLeft.seconds)}</span>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [lang, setLanguage] = useState<Language>('fr');
  const [view, setView] = useState<AppView>('landing');
  const scrollRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.style.scrollBehavior = 'smooth';
  }, [lang]);

  // Auto-scroll logic for reviews
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: number;
    const startScrolling = () => {
      scrollInterval = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: 300, behavior: 'smooth' });
        }
      }, 4000);
    };

    startScrolling();
    return () => clearInterval(scrollInterval);
  }, []);

  const scrollToOrder = () => {
    const element = document.getElementById('order-form');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  if (view === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 font-sans">
        <div className="max-w-md w-full bg-white rounded-[3rem] shadow-2xl p-10 text-center animate-in zoom-in-95 duration-500 border border-blue-100">
          <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 relative">
             <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
            <CheckCircle2 size={48} />
          </div>
          <h1 className={`text-3xl font-black mb-4 text-slate-900 ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.success.title}
          </h1>
          <p className={`text-slate-500 text-lg mb-10 leading-relaxed ${lang === 'ar' ? 'font-arabic' : ''}`}>
            {t.success.message}
          </p>
          <button
            onClick={() => setView('landing')}
            className="w-full bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-100"
          >
            {t.success.backBtn}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col bg-[#F8FAFC] overflow-x-hidden selection:bg-blue-600 selection:text-white font-sans ${lang === 'ar' ? 'font-arabic' : ''}`}>
      {/* Background decoration */}
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>

      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-40 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-3xl font-black italic tracking-tighter text-slate-900 group-hover:text-blue-600 transition-colors uppercase">BLZN</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageToggle language={lang} setLanguage={setLanguage} />
            <button 
              onClick={scrollToOrder}
              className="flex bg-slate-900 text-white px-5 md:px-6 py-2.5 rounded-xl text-sm font-black hover:bg-blue-600 transition-all shadow-lg active:scale-95"
            >
              {t.header.orderBtn}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-24">
        {/* Hero Section */}
        <section className="relative px-4 pb-16 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Hero Content */}
            <div className="order-2 lg:order-1 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                  <span className="animate-pulse shrink-0"><Sparkles size={12} /></span>
                  {t.hero.limitedOffer}
                </div>
                <CountdownTimer lang={lang} />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-5xl md:text-8xl font-black leading-tight text-slate-900 tracking-tighter uppercase italic">
                  {t.hero.title}
                </h1>
                <div className="w-24 h-2 bg-blue-600 rounded-full"></div>
              </div>
              
              <p className="text-lg text-slate-500 leading-relaxed max-w-lg font-medium">
                {t.hero.subtitle}
              </p>

              {/* Responsive Price Block */}
              <div className="bg-white p-6 md:p-10 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center md:items-stretch gap-8 group relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/50 rounded-full -mr-16 -mt-16 -z-10"></div>
                
                {/* Price Display */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-4 w-full">
                  <div className="relative inline-flex items-baseline">
                    <span className="text-5xl md:text-7xl font-black text-slate-300 italic line-through decoration-red-600 decoration-[4px] md:decoration-[8px]">
                      {t.hero.oldPrice}
                    </span>
                    <span className="text-sm font-black text-slate-400 ml-1 uppercase">{lang === 'fr' ? 'dt' : 'د.ت'}</span>
                  </div>
                  
                  <div className="flex items-baseline gap-1">
                    <span className="text-7xl md:text-9xl font-black text-blue-600 tracking-tighter drop-shadow-sm animate-pulse [animation-duration:4s]">
                      {t.hero.newPrice}
                    </span>
                    <span className="text-xl font-black text-blue-600 uppercase italic">{lang === 'fr' ? 'dt' : 'د.ت'}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-slate-100"></div>

                {/* Sub-info */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                  <div className="flex items-center gap-3 text-emerald-600 font-black text-base uppercase tracking-wider bg-emerald-50/50 px-6 py-3 rounded-2xl border border-emerald-100/50 w-full md:w-auto justify-center">
                    <Truck size={24} className="shrink-0" />
                    <span className="leading-tight whitespace-nowrap">{t.hero.freeDelivery}</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="bg-blue-600 text-white px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-100">
                      {lang === 'fr' ? 'ÉCONOMISEZ 30 DT' : 'وفر 30 د.ت'}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />)}
                      <span className="text-slate-500 text-xs font-black ml-1 tracking-tighter">4.9/5</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={scrollToOrder}
                  className="w-full sm:w-auto min-w-[300px] bg-slate-900 text-white text-center py-6 px-10 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-100 flex items-center justify-center gap-4 group active:scale-95"
                >
                  {t.header.orderBtn}
                  <ArrowRight size={24} className={`group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                </button>
              </div>
            </div>

            {/* Hero Image Section */}
            <div className="order-1 lg:order-2 relative animate-in zoom-in-95 duration-700">
               <div className="absolute -inset-4 bg-blue-500/5 rounded-[4rem] blur-[80px] -z-10 animate-pulse"></div>
               <div className="relative">
                <div className="relative overflow-hidden rounded-[3rem] shadow-2xl border-[8px] border-white">
                  <img
                    src="photo.jpeg"
                    alt="BLZN Puffer Jacket"
                    className="w-full h-auto object-cover min-h-[400px]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://i.postimg.cc/4NHLq5WN/Whats-App-Image-2026-01-04-at-18-39-57-(1).jpg";
                    }}
                  />
                  <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg font-black text-[9px] tracking-widest flex items-center gap-2">
                     <Star size={12} className="fill-white" />
                     {lang === 'fr' ? 'QUALITÉ SUPÉRIEURE' : 'جودة عالمية'}
                  </div>
                </div>

                <div className={`absolute -bottom-6 ${lang === 'ar' ? '-left-6' : '-right-6'} bg-white p-5 rounded-3xl shadow-2xl border border-slate-50 flex items-center gap-4 animate-bounce [animation-duration:5s]`}>
                   <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                      <ShieldCheck size={28} className="text-blue-600" />
                   </div>
                   <div className="pr-2">
                      <div className="font-black text-slate-900 text-base leading-tight tracking-tight">{lang === 'fr' ? 'Stock Limité' : 'كمية محدودة'}</div>
                      <div className="text-slate-400 text-[9px] font-black tracking-widest uppercase">Hiver 2026 Collection</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Bar */}
        <section className="bg-slate-950 py-16 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            {[
              { icon: Truck, title: lang === 'fr' ? "Livraison" : "توصيل", desc: lang === 'fr' ? "Gratuite sur toute la Tunisie" : "مجاني لكل الولايات" },
              { icon: ShieldCheck, title: lang === 'fr' ? "Performance" : "أداء", desc: lang === 'fr' ? "Tissu technique haute qualité" : "قماش عالي الجودة" },
              { icon: ShoppingCart, title: lang === 'fr' ? "Paiement" : "دفع", desc: lang === 'fr' ? "Cash à la réception" : "دفع عند الاستلام" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <item.icon size={28} />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-sm font-semibold mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews Section - Updated to Horizontal Slider */}
        <section className="py-24 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-3">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Témoignages</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                {lang === 'fr' ? 'La parole est à vous' : 'آراء حرفائنا'}
              </h2>
              <div className="w-12 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {REVIEWS.map((review, idx) => (
                <div 
                  key={idx} 
                  className="min-w-[85%] md:min-w-[calc(33.333%-16px)] snap-center bg-slate-50 p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all duration-300 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 bg-emerald-100 text-emerald-700 px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                        <BadgeCheck size={12} />
                        {lang === 'fr' ? 'Achat Vérifié' : 'تم التأكد'}
                      </div>
                    </div>
                    <p className="text-slate-600 font-semibold mb-8 leading-relaxed italic">"{review.comment}"</p>
                  </div>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-200/50">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xs flex items-center gap-2">
                        {review.name}
                      </h4>
                      <p className="text-slate-400 text-[9px] font-bold uppercase tracking-widest">{review.city} • {review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination indicators */}
            <div className="flex justify-center gap-2 mt-4">
               {REVIEWS.map((_, i) => (
                 <div key={i} className={`h-1.5 rounded-full bg-blue-600 transition-all duration-300 ${i === 0 ? 'w-8' : 'w-2 opacity-20'}`}></div>
               ))}
            </div>
          </div>
        </section>

        {/* Order Form Section */}
        <section id="order-form" className="py-24 px-4 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto text-center mb-16 space-y-3">
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.4em]">Fast Checkout</span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">{t.form.title}</h2>
            <div className="w-16 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <OrderForm 
            t={t.form} 
            lang={lang} 
            onSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView('success');
            }} 
          />
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16">
          <div className="lg:col-span-2 space-y-6">
            <span className="text-3xl font-black italic tracking-tighter text-blue-600 uppercase">BLZN</span>
            <p className="text-slate-400 text-lg leading-relaxed max-w-md font-medium">
              Performance urbaine, confort exceptionnel. La marque qui redéfinit l'hiver en Tunisie.
            </p>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-white/50">Contact</h4>
            <ul className="text-slate-400 space-y-4 font-bold text-sm">
              <li>📍 Tunis, Berges du Lac</li>
              <li>📞 44 377 533</li>
              <li>💬 Support WhatsApp 24/7</li>
            </ul>
          </div>
          <div className="space-y-6">
            <h4 className="font-black text-sm uppercase tracking-widest text-white/50">Réseaux</h4>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/blzntn/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/5 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all border border-white/10 group">
                <Facebook size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 hover:bg-pink-600 rounded-xl flex items-center justify-center transition-all border border-white/10 group">
                <Instagram size={20} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 hover:bg-emerald-600 rounded-xl flex items-center justify-center transition-all border border-white/10 group">
                <MessageCircle size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-black tracking-widest uppercase">
          <span>&copy; {new Date().getFullYear()} BLZN TUNISIA. URBAN PERFORMANCE WEAR.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-blue-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-500 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      <AiStylist lang={lang} />
    </div>
  );
};

export default App;
