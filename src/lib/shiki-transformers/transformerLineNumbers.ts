import type { ShikiTransformer } from 'shiki'

/**
 * Adds classes to <pre> and line <span> elements to enable line numbers via CSS.
 * Relies on CSS counters for displaying the numbers.
 */
export function transformerLineNumbers(): ShikiTransformer {
  return {
    name: 'syak-ui-line-numbers',
    // Add a class to the <pre> element
    pre(node) {
      this.addClassToHast(node, 'line-numbers')
    },
    // Add a class to each line
    line(node) {
      this.addClassToHast(node, 'line')
    },
  }
}
