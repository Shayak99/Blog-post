import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksImageBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_image_blocks';
  info: {
    displayName: 'image-block';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files', true> &
      Schema.Attribute.Required;
  };
}

export interface BlocksQuoteBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_quote_blocks';
  info: {
    displayName: 'quote-block';
  };
  attributes: {
    author: Schema.Attribute.String;
    quote: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface BlocksTextBlock extends Struct.ComponentSchema {
  collectionName: 'components_blocks_text_blocks';
  info: {
    displayName: 'text-block';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.image-block': BlocksImageBlock;
      'blocks.quote-block': BlocksQuoteBlock;
      'blocks.text-block': BlocksTextBlock;
    }
  }
}
