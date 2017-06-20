import { update } from './DOM.js';
import { render } from './';

export let state = {
  input: 'stuff',
  posts: [
    { text: 'Stuffff', time: '22/07' },
    { text: 'Testing Stuff!', time: '25/08' }
  ]
};

//Mutation to reflect new state
export function setState(newState, prevState = state) {
  state = update(prevState, newState);
  render(state);
}
