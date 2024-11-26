// app/_types/post.ts
import { BlockContent } from './blockContent';

export interface Post {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  author?: {
    name: string;
  };
  image?: {
    url: string;
    alt: string;
  };
  categories?: Array<{ title: string }>;
  body?: BlockContent;
  date: string;
  type: 'post';
}
