//DOM Manipulation =====================================
import { compose } from './utils.js';

export function create(element) {
  const { document, parent, type, children = [], css = {} } = element;
  const node = document.createElement(type);

  for (let key in css) {
    node.style[key] = css[key];
  }
  children.forEach(child => domManip(update(child, { parent: node })));
  return update(element, { node });
}

export function append({
  document,
  parent,
  node,
  children,
  content,
  attributes
  //className
}) {
  //if (className) {
  //node.classList.add(className);
  //}
  if (attributes) {
    addAttribute(node, attributes);
  }
  if (typeof parent !== 'string') {
    if (parent === document) {
      parent.body.appendChild(node);
    } else {
      parent.appendChild(node);
    }
  } else {
    document.querySelector(`.${parent}`) ||
      document.querySelector(`#${parent}`).appendChild(node);
  }
  return {
    content,
    node
  };
}

export function addContent({ node, content }) {
  if (content) {
    node.innerHTML += content;
  }
}

export function addAttribute(node, attribute) {
  for (let key in attribute) {
    node.setAttribute(key, attribute[key]);
  }
}

export function createNode(
  type,
  parent,
  content,
  css,
  /* className,*/ ...children
) {
  let typeString;
  if (!type) {
    return console.warn('You must declare a type');
  }
  if (!document) {
    console.warn("This isn't going to work");
  }
  if (typeof type === 'object') {
    typeString = type.element;
  }

  console.log('type', type);
  return {
    document: document,
    type: typeString || type,
    attributes: type.attributes || {},
    parent,
    content,
    css,
    //className,
    children
  };
}

export function update(obj, keysToChange) {
  if (typeof keysToChange !== 'object') {
    return console.warn('Second argument should be an object');
  }
  return Object.assign({}, obj, keysToChange);
}

export const domManip = compose(addContent, append, create);
