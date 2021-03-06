import { createNode } from './DOM.js';
import { setState, state } from './state.js';
import { _pageTitle, _chat, _chatInput } from './css.js';

const _submitBtn = {
  backgroundColor: 'skyblue',
  width: '10%',
  height: '100%',
  border: 'none'
};

const _Container = {
  width: '100%',
  height: '100%'
};

const _messages = {
  backgroundColor: 'white',
  width: '100%',
  height: '70%',
  padding: '0.5em',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const _post = {
  listStyleType: 'none',
  margin: '0.5em',
  boxShadow: '0 1px 0 grey',
  width: '80%',
  height: '10%',
  backgroundColor: 'skyblue',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const handler = () => {
  const input = findElement('forum-input', document).value;
  setState({ input, posts: [{ text: input }] });
};

const chatInput = {
  document: document,
  type: {
    element: 'input',
    attributes: {
      placeholder: 'Type in your Message',
      id: 'forum-input'
    }
  },
  css: _chatInput
};
const chatSubmit = {
  document: document,
  type: {
    element: 'input',
    attributes: { type: 'submit' }
  },
  content: { handler, type: 'click', text: 'Submit' },
  css: _submitBtn
};
const chatInputContainer = {
  type: 'div',
  document: document,
  css: _chat,
  children: [chatInput, chatSubmit]
};

const posts = state.posts.map(post => createNode('li', 'ul', post, _post));

const messages = {
  type: 'div',
  document: document,
  parent: document,
  css: _messages,
  children: [...posts]
};

const pageTitle = {
  type: 'h1',
  content: 'Functional Forum',
  document: document,
  parent: document,
  css: _pageTitle
};

export const forumContainer = {
  type: 'div',
  document: document, //need to pass in document to avoid sideeffect
  parent: document,
  css: _Container,
  children: [pageTitle, messages, chatInputContainer]
};
