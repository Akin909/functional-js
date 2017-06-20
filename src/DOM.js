//DOM Manipulation =====================================
import { compose } from './utils.js';

export function create(element) {
  const { document, parent, type, children = [], css = {} } = element;
  const node = document.createElement(type);

  for (let key in css) {
    node.style[key] = css[key];
  }
  children.forEach(child => manipulateDom(update(child, { parent: node })));
  const updatedElement = update(element, { node });
  return {
    parent,
    newNode: node,
    oldNode: null,
    index: null
  };
}

export function append({
  document,
  parent,
  node,
  children,
  content,
  attributes,
  className
}) {
  if (className) {
    node.classList.add(className);
  }
  addAttribute(node, attributes);
  if (typeof parent !== 'string') {
    if (parent === document) {
      parent.body.appendChild(node);
    } else {
      parent.appendChild(node);
    }
  } else {
    findElement(parent, document).appendChild(node);
  }
  return {
    content,
    node
  };
}

export function findElement(element, document) {
  return (
    document.querySelector(`.${element}`) ||
    document.querySelector(`#${element}`)
  );
}

export function addContent({ node, content }) {
  if (content && typeof content !== 'object') {
    node.innerHTML += content;
  } else if (content.text) {
    node.innerHTML += content.text;
    addListener(node, content.handler, content.type);
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
  return checkType({
    document: document,
    type,
    parent,
    content,
    css,
    children
  });
}

function checkType({
  document,
  type,
  attributes,
  parent,
  content,
  css,
  children
}) {
  let typeString;
  if (!type) {
    return console.warn('You must declare a type');
  }
  if (!document) {
    console.error("This isn't going to work");
  }
  if (typeof type === 'object') {
    typeString = type.element;
  }

  return {
    document: document,
    type: typeString || type,
    attributes: type.attributes || {},
    parent,
    content,
    css,
    //className
    children
  };
}

export function update(obj, keysToChange) {
  if (typeof keysToChange !== 'object') {
    return console.warn('Second argument should be an object');
  }
  return Object.assign({}, obj, keysToChange);
}

function changed(firstNode, secondNode) {
  return (
    typeof firstNode !== typeof secondNode ||
    (typeof firstNode === 'string' && firstNode !== secondNode) ||
    firstNode.type !== secondNode.type
  );
}

export function updateDom({ parent, newNode, oldNode, index = 0 }) {
  if (!oldNode) {
    create(newNode);
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(create(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateDom(
        parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i]
      );
    }
  }
  return newNode;
}

//IMPURE =============================================
function addListener(node, fn, type) {
  node.addEventListener(type, fn);
}

export function empty(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

export const manipulateDom = compose(
  addContent,
  append,
  updateDom,
  create,
  checkType
);
