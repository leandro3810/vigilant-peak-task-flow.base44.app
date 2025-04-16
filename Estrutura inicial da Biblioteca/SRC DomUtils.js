export function $(selector) {
  return document.querySelector(selector);
}

export function $$(selector) {
  return document.querySelectorAll(selector);
}

export function on(element, event, callback) {
  element.addEventListener(event, callback);
}
