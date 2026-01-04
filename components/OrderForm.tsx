
import React, { useState } from 'react';
import { Language, TranslationSchema } from '../types';
import { GOVERNORATES, SIZES } from '../constants';
import { AlertCircle, Loader2, Send } from 'lucide-react';

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
  const [error, setError] = useState<string | null>(null);

  const validatePhone = (phone: string) => {
    return /^[0-9]{8}$/.test(phone.replace(/\s/g, ''));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.nom || !formData.tel || !formData.adresse || !formData.ville) {
      setError(t.errorRequired);
      return;
    }

    if (!validatePhone(formData.tel)) {
      setError(t.errorTel);
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
        // Trigger Google Analytics Event
        if (typeof (window as any).gtag === 'function') {
          (window as any).gtag('event', 'purchase', {
            currency: 'TND',
            value: 69.00,
            items: [{
              item_id: 'BLZN_DOUDOUNE_2026',
              item_name: 'Doudoune BLZN Tech-Wear',
              item_category: 'Hiver 2026',
              price: 69.00,
              quantity: 1,
              variant: formData.taille
            }]
          });
        }
        onSuccess();
      } else {
        console.error("Détails erreur SheetDB:", result);
        throw new Error('Failed to submit');
      }
    } catch (err) {
      console.error(err);
      setError("Erreur: Vérifiez vos colonnes Sheets (Date, Nom, Tel, Adresse, Ville, Taille)");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div id="order-form" className="bg-white rounded-[2.5rem] shadow-2xl p-8 border border-blue-50 max-w-xl mx-auto mb-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      
      <h2 className="text-3xl font-black text-slate-900 mb-8 text-center flex items-center justify-center gap-3">
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
            </select>
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-3 text-red-600 text-sm bg-red-50 p-4 rounded-2xl border border-red-100">
            <AlertCircle size={20} className="shrink-0" />
            <span className="font-semibold">{error}</span>
          </div>
        )}

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
    </div>
  );
};

export default OrderForm;
