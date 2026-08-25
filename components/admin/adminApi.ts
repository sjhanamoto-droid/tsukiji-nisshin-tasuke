// 管理画面から叩くAPIラッパ。cookie（セッション）を同送する。
async function api<T = any>(path: string, opts: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: 'same-origin',
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data && data.error) || `HTTP ${res.status}`);
  return data as T;
}

export interface AdminUser { id: number; email: string; created_at?: string }

export interface ContentInput {
  title: string;
  category: string;
  date: string;
  coverImageUrl?: string | null;
  contentHtml: string;
  images?: string[];
}

export const authApi = {
  me: () => api<{ admin: AdminUser }>('/auth/me'),
  login: (email: string, password: string) =>
    api<{ admin: AdminUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => api('/auth/logout', { method: 'POST' }),
  setupStatus: () => api<{ setupNeeded: boolean }>('/setup'),
  setup: (token: string, email: string, password: string) =>
    api('/setup', { method: 'POST', body: JSON.stringify({ token, email, password }) }),
};

export const adminsApi = {
  list: () => api<{ admins: AdminUser[] }>('/admins'),
  create: (email: string, password: string) =>
    api('/admins', { method: 'POST', body: JSON.stringify({ email, password }) }),
  remove: (id: number) => api(`/admins/${id}`, { method: 'DELETE' }),
};

function makeContentApi(base: 'news' | 'columns') {
  return {
    list: () => api<{ items: any[] }>(`/${base}`),
    get: (id: string) => api<{ item: any }>(`/${base}/${id}`),
    create: (data: ContentInput) => api<{ item: any }>(`/${base}`, { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: ContentInput) =>
      api<{ item: any }>(`/${base}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id: string) => api(`/${base}/${id}`, { method: 'DELETE' }),
  };
}

export const newsApi = makeContentApi('news');
export const columnsApi = makeContentApi('columns');
