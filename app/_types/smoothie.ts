// app/_types/smoothie.ts

export interface Smoothie {
  _id: string;
  title: string;
  description: string;
  image?: {
    url: string;
    alt: string;
  };
  ingredients: string[];
  steps: string[];
  date: string;
  type: 'smoothie';
}
