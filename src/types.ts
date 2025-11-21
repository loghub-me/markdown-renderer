import type MarkdownIt from 'markdown-it';

export interface MarkdownRendererOptions extends MarkdownIt.Options {
  enabledPlugins: MarkdownRendererPlugin[];
}

export type MarkdownRendererPlugin = 'anchor' | 'safeLink';
