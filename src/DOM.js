//DOM Manipulation =====================================
import { compose } from './utils.js';

export function create(element) {
  const { document, parent, type, children = [], css = {} } = element;
  const node = document.createElement(type);

  for (let key in css) {
    node.style[key] = css[key];
  }
  children.forEach(child => manipulateDom(update(child, { parent: node })));
  return update(element, { node });
}

export function append(element) {
  const {
    document,
    parent,
    attributes,
    node,
    children,
    content,
    className
  } = element;
  if (className) {
    node.classList.add(className);
  }
  addAttribute(node, attributes);
  if (typeof parent !== 'string') {
    if (parent === document) {
      console.log('appending', node);
      parent.body.appendChild(node);
    } else {
      parent.appendChild(node);
    }
  } else {
    findElement(parent, document).appendChild(node);
  }
  return element;
}

export function findElement(element, document) {
  return (
    document.querySelector(`.${element}`) ||
    document.querySelector(`#${element}`)
  );
}

export function addContent(element) {
  const { node, content, attributes } = element;
  if (content && typeof content !== 'object') {
    node.innerHTML += content;
  } else if (typeof content === 'object') {
    if (content.text) {
      node.innerHTML += content.text;
    }
    addListener(node, content.handler, content.type);
  }
  return element;
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
    console.warn("This isn't going to work");
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

//TODO this function should ideally replace the append function so DOM on
//selectively updates
export function updateDom({ parent, element, newNode, oldNode, index = 0 }) {
  if (!oldNode) {
    const { node } = create(element);
    parent.appendChild(node);
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(newNode, oldNode)) {
    parent.replaceChild(newNode, parent.childNodes[index]);
  } else {
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateDom({
        parent: parent.childNodes[index],
        newNode: newNode.children[i],
        oldNode: oldNode.children[i],
        index: i
      });
    }
  }
}

export function update(obj, keysToChange) {
  if (typeof keysToChange !== 'object') {
    return console.warn('Second argument should be an object');
  }
  return Object.assign({}, obj, keysToChange);
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

export const manipulateDom = compose(addContent, append, create, checkType);
