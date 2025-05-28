import { getBlogPost, getAllSlugs } from '@/utils/getApi';
import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  console.log(post, '9090')

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Navigation */}
        <nav className="mb-12">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </nav>
        
        {/* Article */}
        <article className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <header className="px-8 mt-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-medium">
                  {post.author?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <span>By {post.author}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
            </div>
            <div className='border-b border-gray-300 py-5 w-[70%] mx-auto'></div>
          </header>
          
          {/* Content */}
          <div className="px-8 py-10">
            <div className="prose prose-lg max-w-none prose-gray prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600">
              <DynamicZoneRenderer components={post.content} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}