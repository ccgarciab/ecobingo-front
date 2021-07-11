<script>

import {codeStore} from './codeStore.js';
import {markedStore} from './markedStore.js';
import {getRandomCode} from './randomCard.js';

import BallotShowcase from './BalotShowcase.svelte';
import BingoButton from "./BingoButton.svelte";
import Grid from './Grid.svelte';
import GoalFigure from "./GoalFigure.svelte";
import Label from "./Label.svelte";
import LayoutAdapter from "./LayoutAdapter.svelte";
import Logos from './Logos.svelte';

export let card;
export let target;
export let dataChannel;
export let user;
export let room;

let hooverBingoCode = "";
let currentBingoCode = "";

$: marked = $markedStore;

let wWidth = window.innerWidth;

function handleOverTile(event) {

  hooverBingoCode = event.detail.code;
}

async function updatePlayingCode(){

  while(true){

    currentBingoCode = await getRandomCode();
    $codeStore = currentBingoCode;
  }
}

function declareVictory(){

  let won = target.every((required, i) => marked[i] || !required);

  if (won) {

    alert("Felicitaciones!");
  }
  else {

    console.log("Sin trampas!");
  }
}

updatePlayingCode();

</script>

<svelte:window bind:innerWidth={wWidth}/>

<LayoutAdapter {wWidth}>
  <Logos slot="logos"/>
  <Label content={`Sala: <b>${room}</b>`} slot="room_label"/>
  <Label content={`Usuario: <b>${user}</b>`} slot="user_label"/>
  <Label content={"Figura Ganadora"} slot="figure_label"/>
  <GoalFigure figure={target} slot="figure"/>
  <Grid content={card} on:overtile={handleOverTile} slot="grid"/>
  <BallotShowcase label="Balota en juego" bingoCode={currentBingoCode} slot="balot_current"/>
  <BallotShowcase label="Balota seleccionada" bingoCode={hooverBingoCode} slot="balot_hoover"/>
  <BingoButton on:click={declareVictory} slot="bingo_button"/>
</LayoutAdapter>
