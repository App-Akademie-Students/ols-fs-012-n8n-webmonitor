import { Article } from './types';
import { fetchArticles } from './api';
import { formatDate } from './dateFormat';

let allArticles: Article[] = [];

async function loadArticles(): Promise<void> {
  const btn = document.getElementById('refresh-btn') as HTMLButtonElement;
  const status = document.getElementById('status') as HTMLDivElement;
  
  btn.disabled = true;
  status.textContent = 'Lädt...';
  status.className = 'status status-loading';
  
  try {
    allArticles = await fetchArticles();
    status.textContent = `${allArticles.length} Artikel geladen`;
    status.className = 'status status-success';
    renderTable(allArticles);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unbekannter Fehler';
    status.textContent = `Fehler: ${message}`;
    status.className = 'status status-error';
  } finally {
    btn.disabled = false;
  }
}

function filterAndSort(articles: Article[]): Article[] {
  const searchInput = document.getElementById('search') as HTMLInputElement;
  const minRelevanceInput = document.getElementById('min-relevance') as HTMLInputElement;
  
  const searchTerm = searchInput.value.toLowerCase();
  const minRelevance = parseInt(minRelevanceInput.value) || 0;
  
  const filtered = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm);
    const matchesRelevance = article.relevance >= minRelevance;
    return matchesSearch && matchesRelevance;
  });
  
  // Sort by published_at descending (newest first), with invalid dates at the end
  return filtered.sort((a, b) => {
    const dateA = new Date(a.published_at).getTime();
    const dateB = new Date(b.published_at).getTime();
    
    const isValidA = !isNaN(dateA);
    const isValidB = !isNaN(dateB);
    
    if (!isValidA && !isValidB) return 0;
    if (!isValidA) return 1;
    if (!isValidB) return -1;
    
    return dateB - dateA;
  });
}

function renderTable(articles: Article[]): void {
  const filtered = filterAndSort(articles);
  const tbody = document.getElementById('articles-tbody') as HTMLTableSectionElement;
  const detailsDiv = document.getElementById('article-details') as HTMLDivElement;
  
  tbody.innerHTML = '';
  detailsDiv.innerHTML = '';
  
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="4" class="text-center">Keine Artikel gefunden</td></tr>';
    return;
  }
  
  filtered.forEach(article => {
    const row = document.createElement('tr');
    row.className = 'clickable-row';
    row.innerHTML = `
      <td>${escapeHtml(article.title)}</td>
      <td>${escapeHtml(article.category)}</td>
      <td class="text-right">${article.relevance}</td>
      <td class="text-right">${formatDate(article.published_at)}</td>
    `;
    
    row.addEventListener('click', () => {
      renderDetails(article);
      document.querySelectorAll('.clickable-row').forEach(r => r.classList.remove('active'));
      row.classList.add('active');
    });
    
    tbody.appendChild(row);
  });
}

function renderDetails(article: Article): void {
  const detailsDiv = document.getElementById('article-details') as HTMLDivElement;
  
  detailsDiv.innerHTML = `
    <div class="details-container">
      <h2>${escapeHtml(article.title)}</h2>
      <div class="details-meta">
        <p><strong>Kategorie:</strong> ${escapeHtml(article.category)}</p>
        <p><strong>Relevanz:</strong> ${article.relevance}</p>
        <p><strong>Veröffentlicht:</strong> ${formatDate(article.published_at)}</p>
      </div>
      <div class="details-summary">
        <h3>Zusammenfassung</h3>
        <p>${escapeHtml(article.summary)}</p>
      </div>
      <div class="details-link">
        <a href="${escapeHtml(article.url)}" target="_blank" rel="noopener noreferrer">
          Zum Originalartikel →
        </a>
      </div>
    </div>
  `;
}

function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function setupEventListeners(): void {
  const searchInput = document.getElementById('search') as HTMLInputElement;
  const minRelevanceInput = document.getElementById('min-relevance') as HTMLInputElement;
  const refreshBtn = document.getElementById('refresh-btn') as HTMLButtonElement;
  
  searchInput.addEventListener('input', () => renderTable(allArticles));
  minRelevanceInput.addEventListener('change', () => renderTable(allArticles));
  refreshBtn.addEventListener('click', loadArticles);
}

document.addEventListener('DOMContentLoaded', () => {
  setupEventListeners();
  loadArticles();
});
