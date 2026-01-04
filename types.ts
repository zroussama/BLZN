
export type Language = 'fr' | 'ar';

export interface OrderFormData {
  date: string;
  nom: string;
  tel: string;
  adresse: string;
  ville: string;
  taille: string;
}

export type AppView = 'landing' | 'success';

export interface TranslationSchema {
  header: {
    logo: string;
    orderBtn: string;
  };
  hero: {
    title: string;
    subtitle: string;
    oldPrice: string;
    newPrice: string;
    freeDelivery: string;
    limitedOffer: string;
  };
  form: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    telLabel: string;
    telPlaceholder: string;
    addressLabel: string;
    addressPlaceholder: string;
    cityLabel: string;
    cityPlaceholder: string;
    sizeLabel: string;
    submitBtn: string;
    submitting: string;
    errorTel: string;
    errorRequired: string;
  };
  success: {
    title: string;
    message: string;
    backBtn: string;
  };
}
