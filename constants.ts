import { TranslationSchema } from './types';

export const GOVERNORATES = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", 
  "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "La Manouba", 
  "Médenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", 
  "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

export const SIZES = ["S", "M", "L", "XL"];

export const TRANSLATIONS: Record<'fr' | 'ar', TranslationSchema> = {
  fr: {
    header: {
      logo: "BLZN",
      orderBtn: "Commander"
    },
    hero: {
      title: "Doudoune BLZN Tech-Wear",
      subtitle: "Performance et style urbain. Notre nouvelle collection 2026 est conçue pour l'hiver tunisien le plus rude.",
      oldPrice: "99",
      newPrice: "69",
      freeDelivery: "Livraison Gratuite (Tunisie) 🇹🇳",
      limitedOffer: "Vente Flash : -30% Aujourd'hui !"
    },
    form: {
      title: "Passer Commande",
      nameLabel: "Nom & Prénom",
      namePlaceholder: "Votre nom complet",
      telLabel: "Téléphone",
      telPlaceholder: "Ex: 22 123 456",
      addressLabel: "Adresse",
      addressPlaceholder: "Rue, Quartier, Appartement...",
      cityLabel: "Gouvernorat",
      cityPlaceholder: "Choisir...",
      sizeLabel: "Taille",
      submitBtn: "Confirmer l'achat",
      submitting: "Traitement...",
      errorTel: "Numéro invalide (8 chiffres requis)",
      errorRequired: "Veuillez remplir tous les champs"
    },
    success: {
      title: "C'est parti !",
      message: "Votre commande BLZN a été enregistrée. On vous appelle dans moins d'une heure pour confirmer !",
      backBtn: "Retour"
    }
  },
  ar: {
    header: {
      logo: "BLZN",
      orderBtn: "اطلب توا"
    },
    hero: {
      title: "دودون BLZN العالمية",
      subtitle: "أفضل جودة في تونس. عصرية، مريحة وضد الماء. العرض صالح لفترة محدودة!",
      oldPrice: "99",
      newPrice: "69",
      freeDelivery: "توصيل بلاش لكل الولايات 🇹🇳",
      limitedOffer: "تخفيض -30% اليوم بركة!"
    },
    form: {
      title: "سجل طلبيتك",
      nameLabel: "الاسم واللقب",
      namePlaceholder: "اسمك الكامل",
      telLabel: "رقم الهاتف",
      telPlaceholder: "مثال: 22123456",
      addressLabel: "العنوان",
      addressPlaceholder: "عنوانك بالضبط",
      cityLabel: "الولاية",
      cityPlaceholder: "اختر ولايتك",
      sizeLabel: "المقاس",
      submitBtn: "تأكيد الطلب",
      submitting: "جاري الإرسال...",
      errorTel: "الرقم غالط (لازم 8 أرقام)",
      errorRequired: "عمر الخانات الكل يعيشك"
    },
    success: {
      title: "تم التسجيل بنجاح!",
      message: "شكرا لثقتكم في BLZN. تو نكلموك في أقل من ساعة باش نأكدو معاك التوصيل!",
      backBtn: "الرجوع"
    }
  }
};