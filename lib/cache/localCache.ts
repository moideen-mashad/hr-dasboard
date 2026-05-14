export function setCache<T>(key: string, data: T, ttlMs: number) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify({
    data,
    expires: Date.now() + ttlMs,
  }));
}

export function getCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(key);
  if (!raw) return null;
  
  try {
    const { data, expires } = JSON.parse(raw);
    if (Date.now() > expires) {
      localStorage.removeItem(key);
      return null;
    }
    return data as T;
  } catch (e) {
    return null;
  }
}
