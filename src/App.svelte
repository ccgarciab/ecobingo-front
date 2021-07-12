<script>
import adapter from 'webrtc-adapter';

import {loadAllAudioFiles} from './loadAudioFiles.ts';
import {getDatachannel} from './initDataChannel.js';
import {soundStore} from './soundStore.js';

import { fade } from 'svelte/transition';

import LoadScreen from "./LoadScreen.svelte";
import PlayingScreen from "./PlayingScreen.svelte";
import StartScreen from "./StartScreen.svelte";

let screen = 0;
let card;
let target;
let dataChannel;
let sessionData;


function startLoading(event){
  
  screen = 1;
  loadAssets(event.detail)
    .then(() => screen = 2)
    .catch((err) => {console.log(err); screen = 0;})
}

async function loadAssets(textFields){

  dataChannel = await getDatachannel(textFields);
  const gotGameData = new Promise((resolve) => {

    dataChannel.onmessage = (event) => {

      ({card, target} = JSON.parse(event.data));
      resolve();
    }
  })
  const timedOut = new Promise((_, reject) => {

    setTimeout(() => {reject("Tiempo agotado esperando al admin")}, 2 * 60 * 1000);
  })
  await Promise.race([gotGameData, timedOut]);
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
    <PlayingScreen {card} {target} {dataChannel} {...sessionData} />
  </div>
{/if}
