export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  author: string;
  content: DynamicZoneComponent[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export type DynamicZoneComponent = 
  | TextBlockComponent 
  | ImageBlockComponent 
  | QuoteBlockComponent;

export interface TextBlockComponent {
  __component: 'blocks.text-block';
  id: number;
  text: string;
}

export interface ImageBlockComponent {
  __component: 'blocks.image-block';
  id: number;
  image: {
    url: string;
    alternativeText?: string;
  };
  caption?: string;
}

export interface QuoteBlockComponent {
  __component: 'blocks.quote-block';
  id: number;
  quote: string;
  author?: string;
}