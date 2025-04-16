export function fadeIn(element, duration = 500) {
  element.style.opacity = 0;
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 1;
}

export function fadeOut(element, duration = 500) {
  element.style.transition = `opacity ${duration}ms`;
  element.style.opacity = 0;
}
