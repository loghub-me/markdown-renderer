import type MarkdownIt from 'markdown-it';

export interface MarkdownRendererOptions extends MarkdownIt.Options {
  useMarkdownItAnchor?: boolean;
  useSafeLinkify?: boolean;
  useSanitize?: boolean;
}
