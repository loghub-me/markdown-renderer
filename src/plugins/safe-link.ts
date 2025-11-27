import { Token } from 'markdown-it';

const ORIGIN = 'https://loghub.me';
const ALLOWED_PROTOCOLS = new Set(['http:', 'https:']);
const IGNORED_PROTOCOLS = new Set(['mailto:', 'tel:']);

export function convertLinkToSafe(token: Token) {
  const href = token.attrGet('href')?.trim();

  if (!href || href.length === 0) {
    token.attrSet('href', '');
    return;
  }
  if (href.startsWith(':')) {
    token.attrSet('href', '');
    return;
  }
  if (href.startsWith('#')) return;
  if (href.startsWith('/safe-link?url=')) return;

  let url: URL;
  try {
    url = new URL(href, ORIGIN);
    url.username = '';
    url.password = '';
  } catch {
    token.attrSet('href', '');
    return;
  }

  const protocol = url.protocol.toLowerCase();
  if (IGNORED_PROTOCOLS.has(protocol)) {
    token.attrSet('href', url.toString());
    return;
  }

  if (!ALLOWED_PROTOCOLS.has(protocol)) {
    token.attrSet('href', '');
    return;
  }

  if (url.origin === ORIGIN) {
    token.attrSet('href', url.toString());
    return;
  }

  const encodedTarget = encodeURIComponent(url.toString());
  const safeLink = `/safe-link?url=${encodedTarget}`;

  token.attrSet('href', safeLink);
  token.attrSet('target', '_blank');
}
