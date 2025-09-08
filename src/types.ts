import type MarkdownIt from 'markdown-it';

export interface MarkdownRendererOptions extends MarkdownIt.Options {
  useMarkdownItAnchor?: boolean;
  useSafeLinkify?: boolean;
  useSanitize?: boolean;
}

export interface RenderedResult {
  html: string;
  anchors: Anchor[];
}

export interface Anchor {
  level: number;
  slug: string;
  text: string;
}
