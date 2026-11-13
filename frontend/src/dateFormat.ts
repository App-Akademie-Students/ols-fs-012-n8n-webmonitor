export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return '–';
  
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return '–';
    
    const formatter = new Intl.DateTimeFormat('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Europe/Berlin',
    });
    
    const parts = formatter.formatToParts(date);
    const year = parts.find(p => p.type === 'year')?.value;
    const month = parts.find(p => p.type === 'month')?.value;
    const day = parts.find(p => p.type === 'day')?.value;
    const hour = parts.find(p => p.type === 'hour')?.value;
    const minute = parts.find(p => p.type === 'minute')?.value;
    
    return `${day}.${month}.${year}, ${hour}:${minute}`;
  } catch {
    return '–';
  }
}
