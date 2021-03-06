function h(type = 'div', attributes, ...children) {
  if (children[0] instanceof Array) {
    children = children[0];
  }

  attributes = attributes || {};
  const el = document.createElement(type);

  Object
    .keys(attributes)
    .map(key => [key, attributes[key]])
    .forEach(([key, value]) => {
      if (typeof value === 'function') {
        el.addEventListener(key, e => value(e), false);
      } else {
        el.setAttribute(key, value);
      }
    });

  if (children instanceof Array) {
    appendChildren(el, children);
  } else if (children instanceof HTMLElement) {
    el.appendChild(children);
  } else if (typeof children === 'string') {
    el.innerText = children;
  }

  return el;
}

const appendChildren = (el, children) => {
  children.filter(child => child !== null).forEach(child => {
    if (child instanceof HTMLElement) {
      el.appendChild(child)
    } else if (child instanceof Array) {
      appendChildren(el, child);
    } else {
      el.innerHTML += child;
    }
  });
}

const H3 = children => h('h3', { class: 'text-center' }, children);

const replaceChild = ($target, child) => {
  $target.innerHTML = '';
  $target.appendChild(child);
};
