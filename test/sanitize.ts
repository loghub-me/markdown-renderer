import test, { describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { MarkdownRenderer } from '../src';

describe('sanitize', () => {
  test('should render HTML tags and sanitize', () => {
    const input = [['<script>alert("XSS")</script>'], ['<p style="color:red;">Red text</p>']]
      .map((line) => line.join(''))
      .join('\n');
    const expected = [['\n', '<p>Red text</p>']].map((line) => line.join('')).join('\n');

    const result = new MarkdownRenderer({ enabledPlugins: [] }).render(input);
    assert.equal(result, expected);
  });
});
