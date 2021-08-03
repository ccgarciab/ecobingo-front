<script>

import {loadAllAudioFiles} from './loadAudioFiles.ts';
import {connect} from './connect.js';
import {soundStore} from './soundStore.js';

import { fade } from 'svelte/transition';

import LoadScreen from "./LoadScreen.svelte";
import PlayingScreen from "./PlayingScreen.svelte";
import StartScreen from "./StartScreen.svelte";

let screen = 0;
let card;
let target;
let sessionData;
let roomDocument;

function startLoading(event){
  
  screen = 1;
  loadAssets(event.detail)
    .then(() => screen = 2)
    .catch((err) => {console.log(err); screen = 0;})
}

async function loadAssets(textFields){

  [card, target, roomDocument] = await connect(textFields);
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
    <PlayingScreen {card} {target} {roomDocument} {...sessionData} />
  </div>
{/if}
