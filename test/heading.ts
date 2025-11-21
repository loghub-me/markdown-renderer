import test, { describe } from 'node:test';
import { strict as assert } from 'node:assert';
import { MarkdownRenderer } from '../src';

describe('heading', () => {
  test('should render markdown headings into HTML <h1>~<h6> tags', () => {
    const input = [
      ['# Title 1'],
      ['## Title 2'],
      ['### Title 3'],
      ['#### Title 4'],
      ['##### Title 5'],
      ['###### Title 6'],
    ]
      .map((line) => line.join(''))
      .join('\n');
    const expected = [
      ['<h1 id="title-1">Title 1</h1>'],
      ['<h2 id="title-2">Title 2</h2>'],
      ['<h3 id="title-3">Title 3</h3>'],
      ['<h4 id="title-4">Title 4</h4>'],
      ['<h5>Title 5</h5>'],
      ['<h6>Title 6</h6>', '\n'],
    ]
      .map((line) => line.join(''))
      .join('\n');

    const result = new MarkdownRenderer({ enabledPlugins: ['anchor'] }).render(input);
    assert.equal(result, expected);
  });
});
