import { writable } from 'svelte/store';

let marked = new Array(25).fill(false)
marked[12] = true;

export const markedStore = writable(marked);