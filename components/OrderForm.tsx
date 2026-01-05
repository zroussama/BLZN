import React, { useState } from 'react';
import { Language, TranslationSchema } from '../types';
import { GOVERNORATES, SIZES } from '../constants';
import { AlertCircle, Loader2, Send } from 'lucide-react';

// --- CONFIGURATION NOTIFICATIONS ---
const TELEGRAM_BOT_TOKEN = '8485058700:AAHxEji7N99TFsmngTq64wXbQWckzeJEENI'; 

// Liste des IDs pour recevoir les notifications (Vous et votre ami)
const TELEGRAM_CHAT_IDS = [
  '8072987611', // Votre ID
  '7113006069'  // ID de votre ami
]; 

const N8N_WEBHOOK_URL = ''; 
// ----------------------------------

interface OrderFormProps {
  t: TranslationSchema['form'];
  lang: Language;
  onSuccess: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ t, lang, onSuccess }) => {
  const [formData, setFormData] = useState({
    nom: '',
    tel: '',
    adresse: '',
    ville: '',
    taille: 'M'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const validatePhone = (phone: string) => {
    return /^[0-9]{8}$/.test(phone.replace(/\s/g, ''));
  };

  const sendNotification = async (data: any) => {
    const text = `
🆕 *NOUVELLE COMMANDE BLZN*
━━━━━━━━━━━━━━━━━━
👤 *Client:* ${data.Nom}
📞 *Tel:* [${data.Tel}](tel:+216${data.Tel})
📍 *Ville:* ${data.Ville}
🏠 *Adresse:* ${data.Adresse}
📏 *Taille:* ${data.Taille}
━━━━━━━━━━━━━━━━━━
💰 *Total:* 69 DT (Livraison Gratuite)
⏰ *Date:* ${data.Date}
    `;

    // Envoi à tous les IDs configurés (Correction du bug de référence)
    const notificationPromises = TELEGRAM_CHAT_IDS
      .filter(id => id.trim() !== '')
      .map(id => 
        fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: id,
            text: text,
            parse_mode: 'Markdown'
          })
        })
      );

    try {
      await Promise.all(notificationPromises);
    } catch (e) {
      console.error("Erreur Telegram:", e);
    }

    if (N8N_WEBHOOK_URL) {
      try {
        await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...data, source: 'Landing Page BLZN' })
        });
      } catch (e) {
        console.error("Erreur n8n:", e);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);

    if (!formData.nom || !formData.tel || !formData.adresse || !formData.ville) {
      return;
    }

    if (!validatePhone(formData.tel)) {
      alert(t.errorTel);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      Date: new Date().toLocaleString('fr-TN'),
      Nom: formData.nom,
      Tel: formData.tel,
      Adresse: formData.adresse,
      Ville: formData.ville,
      Taille: formData.taille
    };

    try {
      const response = await fetch('https://sheetdb.io/api/v1/jla1cqhs8wphf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ data: [payload] }),
      });

      const result = await response.json();

      if (response.ok && (result.created === 1 || result.affected_rows === 1)) {
        await sendNotification(payload);
        if (typeof (window as any).fbq === 'function') {
          (window as any).fbq('track', 'Purchase', { value: 69.00, currency: 'TND' });
        }
        onSuccess();
      } else {
        throw new Error('SheetDB API Error');
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-blue-50 max-w-xl mx-auto mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-8 text-center flex items-center justify-center gap-3 uppercase italic">
        {t.title}
        <Send size={24} className="text-blue-600" />
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t.nameLabel}</label>
          <input
            type="text"
            name="nom"
            required
            value={formData.nom}
            onChange={handleChange}
            placeholder={t.namePlaceholder}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all text-slate-900 font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t.telLabel}</label>
          <input
            type="tel"
            name="tel"
            required
            maxLength={8}
            value={formData.tel}
            onChange={handleChange}
            placeholder={t.telPlaceholder}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all text-slate-900 font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t.addressLabel}</label>
          <input
            type="text"
            name="adresse"
            required
            value={formData.adresse}
            onChange={handleChange}
            placeholder={t.addressPlaceholder}
            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all text-slate-900 font-medium"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t.cityLabel}</label>
            <select
              name="ville"
              required
              value={formData.ville}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all text-slate-900 font-medium appearance-none"
            >
              <option value="">{t.cityPlaceholder}</option>
              {GOVERNORATES.map(gov => (
                <option key={gov} value={gov}>{gov}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">{t.sizeLabel}</label>
            <select
              name="taille"
              value={formData.taille}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:ring-4 focus:ring-blue-100 focus:bg-white focus:border-blue-600 outline-none transition-all text-slate-900 font-medium appearance-none"
            >
              {SIZES.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
              <option value="XL" disabled className="text-slate-300">XL (Épuisé / نفذت الكمية)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-blue-200 transform transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-xl mt-4"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              {t.submitting}
            </>
          ) : (
            t.submitBtn
          )}
        </button>
      </form>

      {error && (
        <div className="space-y-4 mt-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-2xl border border-red-100">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-semibold">
              {lang === 'fr' 
                ? "Désolé, une erreur s'est produite. Commandez directement via WhatsApp !" 
                : "صار مشكل صغير، تنجم تطلبنا مباشرة على الواتساب !"}
            </span>
          </div>
          
          <a 
            href={`https://wa.me/21644377533?text=${encodeURIComponent("Bonjour, je souhaite commander la doudoune BLZN. Voici mes infos: " + formData.nom + " - " + formData.tel + " - " + formData.taille)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-black py-5 rounded-2xl shadow-xl shadow-green-100 flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 text-lg"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.653a11.888 11.888 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {lang === 'fr' ? "Commander via WhatsApp" : "اطلب عبر الواتساب"}
          </a>
        </div>
      )}
    </div>
  );
};

export default OrderForm;