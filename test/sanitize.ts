import test, { describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { MarkdownRenderer } from '../src';

describe('sanitize', () => {
  test('should render HTML tags and sanitize', () => {
    const input = [['<script>alert("XSS")</script>'], ['<p style="color:red;">Red text</p>']]
      .map((line) => line.join(''))
      .join('\n');

    const expected = [
      ['<p>&lt;script&gt;alert("XSS")&lt;/script&gt;'],
      ['&lt;p style="color:red;"&gt;Red text&lt;/p&gt;</p>'],
      [],
    ]
      .map((line) => line.join(''))
      .join('\n');

    const result = new MarkdownRenderer({ enabledPlugins: [] }).render(input);
    console.log(result);
    assert.equal(result, expected);
  });
});
