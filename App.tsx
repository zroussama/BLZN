import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Truck, ShieldCheck, Star, ArrowRight, CheckCircle2, Sparkles, Facebook, Instagram, MessageCircle, Clock, BadgeCheck, Zap } from 'lucide-react';
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
    <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2.5 rounded-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2 text-blue-400">
        <Clock size={16} className="animate-pulse" />
        <span className="text-[9px] font-black uppercase tracking-widest shrink-0">{lang === 'fr' ? 'Offre Spéciale' : 'عرض خاص'}</span>
      </div>
      <div className="flex gap-1.5 text-lg font-black italic tracking-tighter">
        <span>{format(timeLeft.hours)}</span>
        <span className="text-blue-600">:</span>
        <span>{format(timeLeft.minutes)}</span>
        <span className="text-blue-600">:</span>
        <span>{format(timeLeft.seconds)}</span>
      </div>
    </div>
  );
};

const WhatsAppButton: React.FC<{ lang: Language }> = ({ lang }) => {
  const phone = "44377533"; // Votre numéro
  const message = lang === 'fr' 
    ? "Bonjour BLZN, je voudrais avoir plus d'informations sur la Doudoune." 
    : "عسلامة BLZN، نحب نسأل على الـ Doudoune يعيشكم.";
  
  const url = `https://wa.me/216${phone}?text=${encodeURIComponent(message)}`;

  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-3 hover:scale-110 transition-all active:scale-95 border-4 border-white shadow-emerald-500/20 group"
    >
      <MessageCircle className="fill-white" />
      <span className="font-black hidden md:inline uppercase tracking-widest text-xs italic">WhatsApp</span>
      <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full animate-ping opacity-75"></div>
    </a>
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

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollInterval: number;
    const startScrolling = () => {
      scrollInterval = window.setInterval(() => {
        if (scrollContainer.scrollLeft + scrollContainer.offsetWidth >= scrollContainer.scrollWidth - 10) {
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
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'InitiateCheckout');
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
      <div className="fixed top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-400/5 blur-[120px] rounded-full -z-10 animate-pulse"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full -z-10"></div>

      {/* High Impact Green Communication Bar */}
      <div className="fixed top-20 w-full bg-[#10B981] text-white z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 text-center">
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest italic">
            <Truck size={18} />
            <span>{lang === 'fr' ? 'LIVRAISON GRATUITE (TUNISIE) 🇹🇳' : 'توصيل مجاني لكل الولايات 🇹🇳'}</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30"></div>
          <div className="flex items-center gap-2 font-black text-xs sm:text-sm uppercase tracking-widest italic">
            <Zap size={18} className="fill-white" />
            <span>{lang === 'fr' ? 'REÇU EN 24H-48H PARTOUT EN TUNISIE' : 'الاستلام في 24-48 ساعة في كل الولايات'}</span>
          </div>
        </div>
      </div>

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

      <main className="flex-1 pt-32 sm:pt-40">
        <section className="relative px-4 pb-16 lg:pb-32 overflow-hidden">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 space-y-12 animate-in slide-in-from-bottom-8 duration-700">
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

              <div className="relative pt-6">
                <div className={`absolute -top-12 ${lang === 'ar' ? 'left-6' : 'right-6'} z-10 animate-bounce duration-[3000ms]`}>
                  <div className="bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] text-center shadow-2xl shadow-slate-300 transform -rotate-3 hover:rotate-0 transition-transform cursor-default">
                    <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 mb-1">
                      {lang === 'fr' ? 'OFFRE LIMITÉE' : 'عرض محدود'}
                    </div>
                    <div className="text-3xl font-black italic tracking-tighter flex items-center justify-center gap-3 text-blue-400">
                      <Zap size={20} className="fill-blue-400" />
                      <span>-{lang === 'fr' ? '30 DT' : '30 د.ت'}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex flex-col gap-8 group overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50/50 rounded-full -mr-24 -mt-24 -z-10"></div>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-x-12 gap-y-4 justify-center md:justify-start">
                    <div className="relative inline-flex items-baseline opacity-70 group-hover:opacity-100 transition-opacity">
                      <span className="text-5xl md:text-6xl font-black text-slate-500 italic line-through decoration-red-500 decoration-[8px] drop-shadow-sm">
                        {t.hero.oldPrice}
                      </span>
                      <span className="text-sm font-black text-slate-500 ml-1 uppercase">{lang === 'fr' ? 'dt' : 'د.ت'}</span>
                    </div>
                    
                    <div className="flex items-baseline gap-2">
                      <span className="text-[8rem] md:text-[10rem] font-black text-blue-600 tracking-tighter drop-shadow-sm leading-none">
                        {t.hero.newPrice}
                      </span>
                      <span className="text-3xl font-black text-blue-600 uppercase italic">{lang === 'fr' ? 'dt' : 'د.ت'}</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={scrollToOrder}
                      className="w-full bg-blue-600 text-white text-center py-7 rounded-3xl font-black text-2xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-blue-200 flex items-center justify-center gap-4 group active:scale-95"
                    >
                      {t.header.orderBtn}
                      <ArrowRight size={28} className={`group-hover:translate-x-2 transition-transform ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative animate-in zoom-in-95 duration-700">
               <div className="absolute -inset-4 bg-blue-500/5 rounded-[4rem] blur-[80px] -z-10 animate-pulse"></div>
               <div className="relative">
                <div className="relative overflow-hidden rounded-[4rem] shadow-2xl border-[10px] border-white">
                  <img
                    src="https://i.postimg.cc/4NHLq5WN/Whats-App-Image-2026-01-04-at-18-39-57-(1).jpg"
                    alt="BLZN Puffer Jacket"
                    className="w-full h-auto object-cover min-h-[450px]"
                    loading="eager"
                  />
                  <div className="absolute top-8 right-8 bg-blue-600 text-white px-5 py-2.5 rounded-2xl shadow-xl font-black text-[10px] tracking-widest flex items-center gap-2">
                     <Star size={14} className="fill-white" />
                     {lang === 'fr' ? 'QUALITÉ SUPÉRIEURE' : 'جودة عالمية'}
                  </div>
                </div>

                <div className={`absolute -bottom-8 ${lang === 'ar' ? '-left-8' : '-right-8'} bg-white p-6 rounded-[2.5rem] shadow-2xl border border-slate-50 flex items-center gap-5 animate-bounce [animation-duration:6s]`}>
                   <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0">
                      <ShieldCheck size={32} className="text-blue-600" />
                   </div>
                   <div className="pr-2">
                      <div className="font-black text-slate-900 text-lg leading-tight tracking-tight">{lang === 'fr' ? 'Stock Limité' : 'كمية محدودة'}</div>
                      <div className="text-slate-400 text-[10px] font-black tracking-widest uppercase">Hiver 2026 Collection</div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-16 text-center md:text-left">
            {[
              { icon: Truck, title: lang === 'fr' ? "Livraison Rapide" : "توصيل سريع", desc: lang === 'fr' ? "Gratuite sur toute la Tunisie" : "مجاني لكل الولايات" },
              { icon: ShieldCheck, title: lang === 'fr' ? "Performance Tech" : "أداء تقني", desc: lang === 'fr' ? "Tissu technique imperméable" : "قماش عالي الجودة وضد الماء" },
              { icon: ShoppingCart, title: lang === 'fr' ? "Paiement Cash" : "دفع كاش", desc: lang === 'fr' ? "Payez seulement à la livraison" : "دفع عند الاستلام après التثبت" },
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <div>
                  <h4 className="text-white font-black text-xl uppercase tracking-tight">{item.title}</h4>
                  <p className="text-slate-400 text-sm font-semibold mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em]">Témoignages Clients</span>
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic">
                {lang === 'fr' ? 'La parole est à vous' : 'آراء حرفائنا'}
              </h2>
              <div className="w-16 h-2 bg-blue-600 mx-auto rounded-full"></div>
            </div>

            <div 
              ref={scrollRef}
              className="flex gap-8 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar scroll-smooth"
            >
              {REVIEWS.map((review, idx) => (
                <div 
                  key={idx} 
                  className="min-w-[90%] md:min-w-[calc(33.333%-21px)] snap-center bg-slate-50 p-10 rounded-[3rem] border border-slate-100 flex flex-col justify-between hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        <BadgeCheck size={14} />
                        {lang === 'fr' ? 'Achat Vérifié' : 'تم التأكد'}
                      </div>
                    </div>
                    <p className="text-slate-700 font-semibold mb-10 leading-relaxed italic text-lg">"{review.comment}"</p>
                  </div>
                  <div className="flex items-center gap-5 pt-8 border-t border-slate-200/50">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      {review.name[0]}
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
                        {review.name}
                      </h4>
                      <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{review.city} • {review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="order-form" className="py-24 px-4 bg-slate-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto text-center mb-16 space-y-4">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em]">Livraison Express</span>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter uppercase italic">{t.form.title}</h2>
            <div className="w-20 h-2 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <OrderForm 
            t={t.form} 
            lang={lang} 
            onSuccess={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setView('success');
              if (typeof (window as any).fbq === 'function') {
                (window as any).fbq('track', 'Lead', { value: 69, currency: 'TND' });
              }
            }} 
          />
        </section>
      </main>

      <footer className="bg-slate-950 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <span className="text-4xl font-black italic tracking-tighter text-blue-600 uppercase">BLZN</span>
            </div>
            <p className="text-slate-400 text-xl leading-relaxed max-w-md font-medium">
              Performance urbaine, confort exceptionnel. La marque qui redéfinit l'hiver en Tunisie pour la nouvelle génération.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="font-black text-sm uppercase tracking-widest text-white/50">Support & Contact</h4>
            <ul className="text-slate-400 space-y-5 font-bold text-base">
              <li className="flex items-center gap-3">📍 <span className="text-white">Tunis, Berges du Lac 2</span></li>
              <li className="flex items-center gap-3">📞 <span className="text-white">44 377 533</span></li>
              <li className="flex items-center gap-3">💬 <span className="text-white">Support WhatsApp 24/7</span></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="font-black text-sm uppercase tracking-widest text-white/50">Rejoignez-nous</h4>
            <div className="flex gap-5">
              <a href="https://www.facebook.com/blzntn/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center transition-all border border-white/10 group shadow-lg">
                <Facebook size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.instagram.com/blzn_tn" className="w-14 h-14 bg-white/5 hover:bg-gradient-to-tr from-yellow-500 via-pink-600 to-purple-600 rounded-2xl flex items-center justify-center transition-all border border-white/10 group shadow-lg">
                <Instagram size={24} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="w-14 h-14 bg-white/5 hover:bg-emerald-600 rounded-2xl flex items-center justify-center transition-all border border-white/10 group shadow-lg">
                <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton lang={lang} />
      <AiStylist lang={lang} />
    </div>
  );
};

export default App;