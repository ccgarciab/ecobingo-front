import { writable } from 'svelte/store';

export const codeStore = writable(new Set());
