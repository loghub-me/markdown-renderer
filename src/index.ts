import highlightJs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { safeLinkify } from '~/safe-linkify';
import { sanitize } from '~/sanitize';
import { slugify } from '~/slugify';
import { MarkdownRendererOptions } from '~/types';

class MarkdownRenderer {
  private static readonly DEFAULT_OPTIONS: MarkdownRendererOptions = {
    html: false,
    xhtmlOut: false,
    langPrefix: 'language-',
    linkify: true,
    typographer: false,
    highlight: (code, lang) => {
      if (lang && highlightJs.getLanguage(lang)) {
        try {
          return highlightJs.highlight(code, { language: lang }).value;
        } catch (_) {}
      }

      return '';
    },
    useMarkdownItAnchor: true,
    useSafeLinkify: true,
    useSanitize: true,
  };

  private readonly client: MarkdownIt;
  private readonly options: MarkdownRendererOptions;

  constructor(options: MarkdownRendererOptions = {}) {
    this.options = { ...MarkdownRenderer.DEFAULT_OPTIONS, ...options };
    this.client = new MarkdownIt(this.options);

    if (this.options.useMarkdownItAnchor) {
      this.client.use(markdownItAnchor, { slugify });
    }
    if (this.options.useSafeLinkify) {
      const originalLinkOpen =
        this.client.renderer.rules.link_open ??
        ((tokens, idx, opts, _env, renderer) => renderer.renderToken(tokens, idx, opts));

      this.client.renderer.rules.link_open = (tokens, idx, opts, env, renderer) => {
        safeLinkify(tokens[idx]);
        return originalLinkOpen(tokens, idx, opts, env, renderer);
      };
    }
  }

  render(markdown: string): string {
    const result = this.client.render(markdown);
    return this.options.useSanitize ? sanitize(result) : result;
  }
}

export { MarkdownRenderer };
