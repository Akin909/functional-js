import {
  domManip,
  create,
  addContent,
  update,
  createNode,
  append
} from './DOM.js';
import { _chat, _chatInput } from './css.js';

const _submitBtn = {
  backgroundColor: 'skyblue',
  width: '10%',
  height: '100%',
  border: 'none'
};

const chatInput = createNode(
  {
    element: 'input',
    attributes: { placeholder: 'Type in your Message' }
  },
  '',
  '',
  _chatInput
);
const chatSubmit = createNode(
  { element: 'input', attributes: { type: 'submit' } },
  '',
  'Submit',
  _submitBtn
);
export const chatInputContainer = createNode(
  'div',
  document,
  '',
  _chat,
  chatInput,
  chatSubmit
);
