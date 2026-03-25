const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001';

async function request(method, path, body, opts = {}) {
  const url = `${BASE}/api${path}`;
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json', ...opts.headers },
    body: body ? JSON.stringify(body) : undefined,
    signal: opts.signal,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw Object.assign(new Error(err.error ?? 'Request failed'), { status: res.status, data: err });
  }

  const ct = res.headers.get('content-type') ?? '';
  if (ct.includes('application/json')) return res.json();
  return res.text();
}

export const api = {
  get:    (path, opts)       => request('GET',    path, null, opts),
  post:   (path, body, opts) => request('POST',   path, body, opts),
  patch:  (path, body, opts) => request('PATCH',  path, body, opts),
  delete: (path, opts)       => request('DELETE', path, null, opts),

  // Upload with FormData (bypass JSON serialization)
  upload(path, formData, { onProgress } = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${BASE}/api${path}`);
      xhr.responseType = 'json';

      if (onProgress) {
        xhr.upload.addEventListener('progress', e => {
          if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
        });
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) resolve(xhr.response);
        else reject(Object.assign(new Error(xhr.response?.error ?? 'Upload failed'), { status: xhr.status }));
      };
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.send(formData);
    });
  },
};
