const output = document.querySelector('.output');
const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((acc, fn) => fn(acc), fn(...args));

const compose = (...fns) => pipe(...fns.reverse());
const recursivePipe = (fn, ...fns) => (...args) =>
  !fns.length ? fn(...args) : pipe(...fns)(fn(...args));

function addOne(x) {
  return x + 1;
}

function addTwo(x) {
  return x + 2;
}

function double(x) {
  return x * 2;
}

const pre = compose(addOne, addTwo, double);
const prePipe = pipe(addOne, addTwo, double);
console.log('pre', pre(5));

function create(element) {
  const { parent, type, children = [] } = element;
  children.forEach(child => domManip(child));
  return Object.assign(element, { node: document.createElement(type) });
}

function append({ parent, node, childNodes, content, className }) {
  if (className) {
    node.classList.add(className);
  }
  parent.appendChild(node);
  return {
    content,
    node
  };
}

function addContent({ node, childNodes, content }) {
  node.innerHTML += content;
}

const content = `A functional programming playground`;
const resultOne = `<p class="result">${pre(5)}</p>`;
const resultTwo = `<p class="result">${prePipe(5)}</p>`;
const codeBlock = `<pre class="code">${pre}</pre>`;
const codeBlockTwo = `<pre class="code">${prePipe}</pre>`;

const title = {
  parent: output,
  className: 'title',
  type: 'h3',
  content: 'Compose'
};
const exampleOne = {
  parent: output,
  type: 'div',
  className: 'results',
  children: [title],
  content: [codeBlock, resultOne]
};

const secondTitle = Object.assign({}, title, { content: 'Pipe' });
const exampleTwo = Object.assign({}, exampleOne, {
  content: [codeBlockTwo, resultTwo],
  children: [secondTitle]
});

const domManip = compose(addContent, append, create);
domManip({
  parent: output,
  type: 'div',
  className: 'showup',
  content,
  children: [exampleOne, exampleTwo]
});
