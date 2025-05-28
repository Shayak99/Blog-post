import axios from 'axios';
import { StrapiResponse, BlogPost } from '@/types/blog';

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const strapi = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const response = await strapi.get<StrapiResponse<BlogPost[]>>(
      '/blogs?populate[content][populate]=*'
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const response = await strapi.get<StrapiResponse<BlogPost[]>>(
      `/blogs?filters[slug][$eq]=${slug}&populate[content][populate]=*`
    );
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const response = await strapi.get<StrapiResponse<Pick<BlogPost, 'slug'>[]>>(
      '/blogs?fields[0]=slug'
    );
    return response.data.data.map(post => post.slug);
  } catch (error) {
    console.error('Error fetching slugs:', error);
    return [];
  }
}