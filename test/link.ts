import test, { describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { MarkdownRenderer } from '../src';

describe('link', () => {
  describe('when enabledPlugin.safeLink is false', () => {
    test('should render markdown links into HTML <a> tags', () => {
      const input = [
        ['[link1](https://example.com)'],
        ['[link2](https://example.com "Title")'],
        ['https://example.com'],
        ['example.com'],
      ]
        .map((line) => line.join(''))
        .join('\n');
      const expected = [
        ['<p>', '<a href="https://example.com">link1</a>'],
        ['<a href="https://example.com" title="Title">link2</a>'],
        ['<a href="https://example.com">https://example.com</a>'],
        ['<a href="http://example.com">example.com</a>', '</p>', '\n'],
      ]
        .map((line) => line.join(''))
        .join('\n');

      const result = new MarkdownRenderer({ enabledPlugins: [] }).render(input);
      assert.equal(result, expected);
    });
  });

  describe('when enabledPlugin.safeLink is true', () => {
    test('should render markdown links into HTML <a> tags with safe-linking', () => {
      const input = [
        ['[link1](https://example.com)'],
        ['[link2](https://example.com "Title")'],
        ['https://example.com'],
        ['example.com'],
      ]
        .map((line) => line.join(''))
        .join('\n');
      const expected = [
        ['<p>', '<a href="/safe-link?url=https://example.com/" target="_blank">link1</a>'],
        ['<a href="/safe-link?url=https://example.com/" title="Title" target="_blank">link2</a>'],
        ['<a href="/safe-link?url=https://example.com/" target="_blank">https://example.com</a>'],
        ['<a href="/safe-link?url=https://example.com/" target="_blank">example.com</a>', '</p>', '\n'],
      ]
        .map((line) => line.join(''))
        .join('\n');

      const result = new MarkdownRenderer({ enabledPlugins: ['safeLink'] }).render(input);
      assert.equal(result, expected);
    });
  });
});
