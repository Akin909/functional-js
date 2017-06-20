import { update } from './DOM.js';

export let state = {
  input: 'stuff',
  posts: [{ text: 'Stuffff', time: '22/07' }]
};

//Mutation to reflect new state
export function setState(newState, prevState = state) {
  state = update(prevState, newState);
}
