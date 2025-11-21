import test, { describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { MarkdownRenderer } from '../src';

describe('image', () => {
  describe('when enabledPlugins.captionedImage is false', () => {
    test('should render markdown images into HTML <img> tags', () => {
      const input = [
        ['![example1](https://example.com/image.png)'],
        ['![example2](https://example.com/image.png "Image Title")'],
        ['![](https://example.com/image.png)'],
      ]
        .map((line) => line.join(''))
        .join('\n');
      const expected = [
        ['<p>', '<img src="https://example.com/image.png" alt="example1" />'],
        ['<img src="https://example.com/image.png" alt="example2" title="Image Title" />'],
        ['<img src="https://example.com/image.png" alt="" />', '</p>', '\n'],
      ]
        .map((line) => line.join(''))
        .join('\n');

      const result = new MarkdownRenderer({ enabledPlugins: [] }).render(input);
      assert.equal(result, expected);
    });
  });

  describe('when enabledPlugins.captionedImage is true', () => {
    test('should render markdown images into HTML <figure>/<figcaption><img> tags', () => {
      const input = [
        ['![example1](https://example.com/image.png)'],
        ['![example2](https://example.com/image.png "example2-title")'],
        ['![](https://example.com/image.png)'],
      ]
        .map((line) => line.join(''))
        .join('\n');
      const expected = [
        ['<p>', '<img src="https://example.com/image.png" alt="example1" loading="lazy" />'],
        [
          '</p>',
          '<figure>',
          '<img src="https://example.com/image.png" alt="example2" title="example2-title" loading="lazy" class="mx-auto" />',
          '<figcaption class="mt-2 text-sm text-center text-muted-foreground">example2-title</figcaption>',
          '</figure>',
        ],
        ['<img src="https://example.com/image.png" alt="" loading="lazy" />', '<p></p>', '\n'],
      ]
        .map((line) => line.join(''))
        .join('\n');

      const result = new MarkdownRenderer({ enabledPlugins: ['captionedImage'] }).render(input);
      assert.equal(result, expected);
    });
  });
});
