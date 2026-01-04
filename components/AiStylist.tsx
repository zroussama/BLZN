
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { X, Send, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface AiStylistProps {
  lang: Language;
}

const AiStylist: React.FC<AiStylistProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMsg = lang === 'fr' 
        ? "Hello ! C'est l'assistant BLZN. Dis-moi tout, tu hésites sur la taille ou tu veux savoir si ça tient chaud ?"
        : "أهلا بيك في عائلة BLZN! كيفاش نجم نعاونك تختار أحسن قطعة اليوم؟";
      setMessages([{ role: 'assistant', text: initialMsg }]);
    }
    scrollToBottom();
  }, [isOpen, lang, messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const systemInstruction = `Tu es l'assistant de vente expert pour la marque de vêtements BLZN en Tunisie. 
      L'identité de la marque est urbaine, premium et technique. 
      Prix: 69 DT (au lieu de 99 DT). Livraison gratuite partout en Tunisie. Tailles: S, M, L, XL.
      
      CONSIGNE CRITIQUE DE FORMATAGE: 
      - Réponds UNIQUEMENT en texte brut et fluide. 
      - N'UTILISE JAMAIS d'astérisques (*) ou de doubles astérisques (**) pour mettre en gras ou en italique.
      - N'utilise aucun autre symbole markdown. 
      - Tes réponses doivent ressembler à un message WhatsApp naturel.
      
      Sois sympa, direct et encourage l'achat via le formulaire sur la page. 
      Langue préférée: ${lang === 'fr' ? 'Français moderne' : 'Arabe tunisien (Derja)'}. 
      Réponds toujours de manière concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.text }] })), { role: 'user', parts: [{ text: userMessage }] }],
        config: { systemInstruction, temperature: 0.75 }
      });

      // Post-processing to strip any accidental asterisks
      const rawText = response.text || "";
      const aiText = rawText.replace(/\*/g, '').trim();
      
      const fallbackText = lang === 'fr' ? "Désolé, petit souci technique. Commande directement via le formulaire !" : "فما مشكل صغير، سجل طلبيتك طول في الفورمولار!";
      
      setMessages(prev => [...prev, { role: 'assistant', text: aiText || fallbackText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', text: "Service temporairement indisponible. Passez commande directement sur le site !" }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 text-white p-5 rounded-[2rem] shadow-2xl flex items-center gap-3 hover:bg-blue-600 transition-all active:scale-95 group border-4 border-white shadow-blue-500/20"
        >
          <Sparkles className="text-blue-400 group-hover:text-white transition-colors animate-pulse" />
          <span className="font-black hidden md:inline uppercase tracking-widest text-xs italic">Talk to BLZN</span>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full animate-ping opacity-75"></div>
        </button>
      ) : (
        <div className="bg-white w-[350px] sm:w-[420px] h-[550px] rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] flex flex-col border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-12 duration-500">
          <div className="bg-slate-950 text-white p-7 flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 p-2.5 rounded-2xl">
                <Sparkles size={20} className="text-white" />
              </div>
              <div>
                <h3 className="font-black text-sm tracking-tighter uppercase italic">BLZN Concierge</h3>
                <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.2em]">Live Shopping Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2.5 rounded-2xl transition-all">
              <X size={22} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-7 space-y-6 bg-[#FAFAFA]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm leading-relaxed font-bold shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-100' 
                    : 'bg-white text-slate-900 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100 flex gap-1.5 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={lang === 'fr' ? "Ta question..." : "أسأل هنا..."}
              className="flex-1 bg-slate-50 border-none rounded-2xl px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all font-bold placeholder:text-slate-300"
            />
            <button
              onClick={handleSend}
              disabled={isTyping}
              className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-blue-600 transition-all shadow-xl disabled:opacity-50 active:scale-90"
            >
              <Send size={22} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiStylist;
