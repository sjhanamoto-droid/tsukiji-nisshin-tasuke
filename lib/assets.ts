/**
 * Prepend Vite's base URL to asset paths.
 * Ensures images/videos resolve correctly on GitHub Pages subdirectory deployments.
 */
export function assetUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${clean}`;
}
