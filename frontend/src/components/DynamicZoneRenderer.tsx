import { DynamicZoneComponent } from '@/types/blog';
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';

interface DynamicZoneRendererProps {
  components: DynamicZoneComponent[];
}

export default function DynamicZoneRenderer({ components }: DynamicZoneRendererProps) {
  const renderComponent = (component: DynamicZoneComponent, index: number) => {
    const uniqueKey = `${component.__component}-${component.id}-${index}`;

    switch (component.__component) {
      case 'blocks.text-block':
        const htmlContent = DOMPurify.sanitize(marked(component.text) as string);
        return (
          <div
            key={uniqueKey}
            className="text-md text-gray-800 mb-5 mt-0"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        );
      case 'blocks.image-block': {
        if (!Array.isArray(component.image) || component.image.length === 0) {
          return (
            <div key={uniqueKey} className="mb-6">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Images not available</p>
              </div>
              {component.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {component.caption}
                </p>
              )}
            </div>
          );
        }

        return (
          <div key={uniqueKey} className="mb-6 space-y-6">
            {component.image.map((img: any, index: number) => {
              const imageUrl = img?.url?.startsWith('http')
                ? img.url
                : `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`;

              return (
                <div key={index} className="relative w-full h-96">
                  <Image
                    src={imageUrl}
                    alt={img?.alternativeText || 'Blog image'}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              );
            })}
            {component.caption && (
              <p className="text-sm text-gray-600 text-center italic">
                {component.caption}
              </p>
            )}
          </div>
        );
      }



      case 'blocks.quote-block':
        return (
          <blockquote key={uniqueKey} className="border-l-4 border-gray-300 pl-4 py-2 mb-4 my-4">
            <p className="text-small italic text-gray-800 ">"{component.quote}"</p>
            {component.author && (
              <cite className="text-sm text-gray-600 mt-5 block">
                — {component.author}
              </cite>
            )}
          </blockquote>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {components.map((component, index) => renderComponent(component, index))}
    </div>
  );
}