import { fadeIn, fadeOut } from '../src/animations';

test('fadeIn applies correct styles', () => {
  const element = document.createElement('div');
  fadeIn(element, 1000);
  expect(element.style.transition).toBe('opacity 1000ms');
  expect(element.style.opacity).toBe('1');
});
