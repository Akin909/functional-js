import { pipe, compose } from './utils.js';
import { _showup, _output, _result, _title } from './css.js';
import {
  domManip,
  create,
  addContent,
  update,
  createNode,
  append
} from './DOM.js';
import { forumContainer } from './forum.js';
//Functional JS

//Examples =============================================
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

//==========================================================
// Components
//==========================================================

const content = `A functional programming playground`;

const title = createNode('h3', 'output', 'Compose', _title);

const secondTitle = update(title, { content: 'Pipe' });

const codeBlock = createNode('pre', 'results', pre, { fontSize: '1em' });

const codeBlockTwo = update(codeBlock, { content: prePipe });

const composeTxt = `Composing functions means running function in series, each function passes its result onto the previous function`;
const explainFirst = createNode('p', 'results', composeTxt);
const resultOne = createNode('p', 'output', pre(5), _result, explainFirst);

const resultTwo = update(resultOne, { content: prePipe(5) });

const showup = createNode('div', 'output', content, _showup);

const exampleOne = createNode(
  'div',
  'output',
  '',
  {},
  title,
  codeBlock,
  resultOne
);

const exampleTwo = update(exampleOne, {
  children: [secondTitle, codeBlockTwo, resultTwo]
});

const output = createNode(
  'div',
  document,
  `<p>An experiment into DOM manipulation using functional programming</p>`,
  _output,
  showup,
  exampleOne,
  exampleTwo
);

/* Alternate syntax for node creation
 *const output = {
 *  document: document,
 *  parent: document,
 *  type: 'div',
 *  className: 'output',
 *  css: _output,
 *  children: [showup, exampleOne, exampleTwo]
 *};
 */

//INIT APP =================================================
//domManip(output);
domManip(forumContainer);
