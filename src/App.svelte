<script>

import {getRandomCard} from './randomCard.js';

import PlayingScreen from "./PlayingScreen.svelte";

let card = getRandomCard();
let target = new Array(25).fill(false);
target[0] = true;

</script>


<PlayingScreen {card} {target}/>