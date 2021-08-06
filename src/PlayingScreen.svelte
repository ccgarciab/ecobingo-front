<script>

import {codeStore} from './codeStore.js';
import {markedStore} from './markedStore.js';

import BallotShowcase from './BalotShowcase.svelte';
import BingoButton from "./BingoButton.svelte";
import Grid from './Grid.svelte';
import GoalFigure from "./GoalFigure.svelte";
import Label from "./Label.svelte";
import LayoutAdapter from "./LayoutAdapter.svelte";
import Logos from './Logos.svelte';

export let card;
export let target;
export let name;
export let room;
export let roomDocument;

let hooverBingoCode = "";
let currentBingoCode = "";

let wWidth = window.innerWidth;

function handleOverTile(event) {

  hooverBingoCode = event.detail.code;
}

roomDocument.onSnapshot((snapshot) => {
  const data = snapshot.data();
  if(data?.ballot) {
    currentBingoCode = data.ballot;
    $codeStore.add(currentBingoCode);
  }
});

function declareVictory(){

  let won = target.every((required, index) => !required || $markedStore[index]);

  if(won){

    alert("Felicitaciones!");
  }
  else{

    alert("Aún no has ganado. Sigue jugando.");
  }
}

</script>

<svelte:window bind:innerWidth={wWidth}/>

<LayoutAdapter {wWidth}>
  <Logos slot="logos"/>
  <Label content={`Sala: <b>${room}</b>`} slot="room_label"/>
  <Label content={`Usuario: <b>${name}</b>`} slot="user_label"/>
  <Label content={"Figura Ganadora"} slot="figure_label"/>
  <GoalFigure figure={target} slot="figure"/>
  <Grid content={card} on:overtile={handleOverTile} slot="grid"/>
  <BallotShowcase label="Balota en juego" bingoCode={currentBingoCode} slot="balot_current"/>
  <BallotShowcase label="Balota seleccionada" bingoCode={hooverBingoCode} slot="balot_hoover"/>
  <BingoButton on:click={declareVictory} slot="bingo_button"/>
</LayoutAdapter>
