// app/_types/blockContent.ts

export interface Block {
  _type: 'block';
  _key: string; // Add _key here for unique block identification
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'blockquote';
  children: Array<Span>;
  markDefs?: Array<MarkDef>;
}

interface Span {
  _key: string; // Unique key for each span
  _type: 'span';
  text: string;
  marks?: string[];
}

interface MarkDef {
  _key: string; // Key for the mark definition
  _type: 'link';
  href: string;
}

export interface ImageBlock {
  _type: 'image';
  _key: string; // Add _key for unique image identification
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export type BlockContent = Array<Block | ImageBlock>;
