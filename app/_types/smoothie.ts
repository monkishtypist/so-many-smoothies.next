// app/_types/smoothie.ts

export interface Smoothie {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  affiliateProducts?: AffiliateProduct[];
  ingredients: string[];
  steps: string[];
  date: string;
  tags?: string[];
  type?: 'smoothie';
}

export interface AffiliateProduct {
  _id: string;
  name: string;
  image?: string;
  link: string;
  category?: string;
}
