import type Token from 'markdown-it/lib/token.mjs';

export function safeLinkify(token: Token) {
  const href = token.attrGet('href');
  if (href) {
    const safeLink = `/safe-link/${href}`;
    token.attrSet('href', safeLink);
    token.attrSet('target', '_blank');
  }
}
