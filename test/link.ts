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
        ['<a href="http://example.com">example.com</a>', '</p>'],
        [],
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
        ['[link2](http://example.com "Title")'],
        ['[link3](://example.com)'],
        ['https://example.com'],
        ['http://example.com'],
        ['//example.com'],
        ['example.com'],

        ['[relative path](foo/bar)'],
        ['[whitespace only](   )'],
        ['[js scheme](javascript:alert(1))'],
        ['[file scheme](file:///etc/passwd)'],
        ['[mailto simple](mailto:test@example.com)'],
        ['[auth in url](https://user:pass@example.com/path)'],
        ['[mixed case scheme](HtTp://Example.com)'],
        ['[already safe-link](/safe-link?url=https%3A%2F%2Fexample.com)'],
      ]
        .map((line) => line.join(''))
        .join('\n');
      const expected = [
        ['<p>', '<a href="/safe-link?url=https%3A%2F%2Fexample.com%2F" target="_blank">link1</a>'],
        ['<a href="/safe-link?url=http%3A%2F%2Fexample.com%2F" title="Title" target="_blank">link2</a>'],
        ['<a>link3</a>'],
        ['<a href="/safe-link?url=https%3A%2F%2Fexample.com%2F" target="_blank">https://example.com</a>'],
        ['<a href="/safe-link?url=http%3A%2F%2Fexample.com%2F" target="_blank">http://example.com</a>'],
        ['<a href="/safe-link?url=https%3A%2F%2Fexample.com%2F" target="_blank">//example.com</a>'],
        ['<a href="/safe-link?url=http%3A%2F%2Fexample.com%2F" target="_blank">example.com</a>'],
        ['<a href="https://loghub.me/foo/bar">relative path</a>'],
        ['<a>whitespace only</a>'],
        ['[js scheme](javascript:alert(1))'],
        ['[file scheme](file:///etc/passwd)'],
        ['<a href="mailto:test@example.com">mailto simple</a>'],
        ['<a href="/safe-link?url=https%3A%2F%2Fexample.com%2Fpath" target="_blank">auth in url</a>'],
        ['<a href="/safe-link?url=http%3A%2F%2Fexample.com%2F" target="_blank">mixed case scheme</a>'],
        ['<a href="/safe-link?url=https%3A%2F%2Fexample.com">already safe-link</a>', '</p>'],
        [],
      ]
        .map((line) => line.join(''))
        .join('\n');

      const result = new MarkdownRenderer({ enabledPlugins: ['safeLink'] }).render(input);
      assert.equal(result, expected);
    });
  });
});
