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

function create({ type, className, content }) {
  return {
    node: document.createElement(type),
    className,
    content
  };
}

function append({ node, content, className }) {
  if (className) {
    node.classList.add(className);
  }
  output.appendChild(node);
  return {
    content,
    node
  };
}

function addContent({ node, content }) {
  node.innerHTML += content;
}

const content = `A functional programming playground`;

const domManip = compose(addContent, append, create);
domManip({ type: 'div', className: 'showup', content });

output.innerHTML += `<h3 class="title">Compose</h3>
                      <pre class="code">${pre}</pre>
                      <p class="result">${pre(5)}</p>`;
output.innerHTML += `<h3 class="title">Pipe</h3>
                      <pre class="code">${prePipe}</pre>
                      <p class="result">${prePipe(5)}</p>`;
