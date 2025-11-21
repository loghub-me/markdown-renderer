import { Token } from 'markdown-it';

export function convertImageToCaptioned(token: Token, render: () => string): string {
  token.attrSet('loading', 'lazy');

  const title = token.attrGet('title');
  const captionText = title?.trim();

  if (!captionText) {
    return render();
  }

  token.attrSet('class', 'mx-auto');
  const imgHTML = render();
  return `<figure>${imgHTML}<figcaption class="mt-2 text-sm text-center text-muted-foreground">${captionText}</figcaption></figure>`;
}
