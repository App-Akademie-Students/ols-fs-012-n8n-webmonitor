import { Article } from './types';

export async function fetchArticles(): Promise<Article[]> {
  const response = await fetch('/api/articles');
  if (!response.ok) {
    throw new Error(`Failed to fetch articles: ${response.statusText}`);
  }
  return response.json();
}
