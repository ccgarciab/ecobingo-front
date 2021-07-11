<script>

import {getRandomCard} from './randomCard.js';
import {loadAllAudioFiles} from './loadAudioFiles.ts';
import {soundStore} from './soundStore.js';

import { fade } from 'svelte/transition';

import LoadScreen from "./LoadScreen.svelte";
import PlayingScreen from "./PlayingScreen.svelte";
import StartScreen from "./StartScreen.svelte";

let screen = 0;
let card;
let target;
let sessionData;

function startLoading(event){

  screen = 1;
  loadAssets(event.detail).then(() => screen = 2).catch((err) => {console.log(err); screen = 0;})
}

async function loadAssets(textFields){

  card = getRandomCard();
  target = new Array(25).fill(false);
  target[0] = true;
  sessionData = textFields;
  $soundStore = await loadAllAudioFiles(card);
}

</script>

{#if screen == 0}
  <StartScreen on:login={startLoading}/>
{:else if screen == 1}
  <LoadScreen/>
{:else}
  <div transition:fade>
    <PlayingScreen {card} {target} {...sessionData} />
  </div>
{/if}
