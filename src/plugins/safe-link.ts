import { Token } from 'markdown-it';

export function convertLinkToSafe(token: Token) {
  const href = token.attrGet('href');
  if (!href) return;

  try {
    const url = new URL(href);
    url.protocol = 'https:';

    const safeLink = `/safe-link?url=${url.toString()}`;
    token.attrSet('href', safeLink);
    token.attrSet('target', '_blank');
  } catch {
    return;
  }
}
