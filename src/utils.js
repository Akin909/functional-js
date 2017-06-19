//Core Functions =====================================
export const pipe = (fn, ...fns) => (...args) =>
  fns.reduce((acc, fn) => fn(acc), fn(...args));

export const compose = (...fns) => pipe(...fns.reverse());
export const recursivePipe = (fn, ...fns) => (...args) =>
  !fns.length ? fn(...args) : pipe(...fns)(fn(...args));
