import highlightJs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import { RenderRule } from 'markdown-it/lib/renderer.mjs';
import { convertLinkToSafe, slugify, sanitize } from './plugins';
import { MarkdownRendererOptions } from '~/types';

class MarkdownRenderer {
  private static readonly DEFAULT_OPTIONS: MarkdownRendererOptions = {
    html: true,
    xhtmlOut: true,
    langPrefix: 'language-',
    linkify: true,
    typographer: false,
    highlight: (code, lang) => {
      try {
        if (lang && highlightJs.getLanguage(lang)) {
          return highlightJs.highlight(code, { language: lang }).value;
        }

        return highlightJs.highlightAuto(code).value;
      } catch {
        return '';
      }
    },
    enabledPlugins: ['anchor', 'safeLink'],
  };

  private readonly client: MarkdownIt;
  private readonly options: MarkdownRendererOptions;

  constructor(options: MarkdownRendererOptions) {
    this.options = { ...MarkdownRenderer.DEFAULT_OPTIONS, ...options };
    this.client = new MarkdownIt(this.options);

    const defaultRenderRule: RenderRule = (tokens, idx, opts, _env, renderer) =>
      renderer.renderToken(tokens, idx, opts);

    if (this.options.enabledPlugins.includes('anchor')) {
      this.client.use(markdownItAnchor, { slugify });
    }

    if (this.options.enabledPlugins.includes('safeLink')) {
      const linkOpenRule = (this.client.renderer.rules.link_open as RenderRule) || defaultRenderRule;

      this.client.renderer.rules.link_open = (tokens, idx, opts, env, renderer) => {
        convertLinkToSafe(tokens[idx]);
        return linkOpenRule(tokens, idx, opts, env, renderer);
      };
    }
  }

  render(markdown: string): string {
    const result = this.client.render(markdown);
    return sanitize(result);
  }
}

export { MarkdownRenderer };
