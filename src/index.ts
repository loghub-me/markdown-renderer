import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { MarkdownRendererOptions, RenderedResult } from '~/types';
import { slugify } from '~/slugify';
import highlightJs from 'highlight.js';
import { sanitize } from '~/sanitize';
import { safeLinkify } from '~/safe-linkify';
import { JSDOM } from 'jsdom';

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

  render(markdown: string): RenderedResult {
    const renderedHTML = this.client.render(markdown);
    const resolvedHTML = this.options.useSanitize ? sanitize(renderedHTML) : renderedHTML;

    const dom = new JSDOM(resolvedHTML);
    const anchors = this.parseAnchors(dom.window.document.body.innerHTML);

    return {
      html: resolvedHTML,
      anchors,
    };
  }

  private parseAnchors(html: string) {
    const dom = new JSDOM(html);
    return Array.from(dom.window.document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')).map(
      (el) => ({
        level: parseInt(el.tagName[1], 10),
        slug: el.id,
        text: el.textContent || '',
      })
    );
  }
}

export { MarkdownRenderer };
