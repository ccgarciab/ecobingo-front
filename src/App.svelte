<script>

import Logos from './Logos.svelte';
import Grid from './Grid.svelte';
import BallotShowcase from './BalotShowcase.svelte';
import GoalFigure from "./GoalFigure.svelte";
import {getRandomCard, getRandomCode} from './randomCard.js';
import {codeStore} from './codeStore.js';

let hooverBingoCode = "";
let currentBingoCode = "";

let card = getRandomCard();
let filled = new Array(25).fill(false);
filled[12] = true;
let target = new Array(25).fill(null).map((_) => Math.random() < 0.5);
console.log(target);


function handleOverTile(event) {

  hooverBingoCode = event.detail.code;
}

function mark(event){

  let position = event.detail.position;
  filled[position] = true;
  
  if(filled.reduce((a, b) => a && b)){
  
    window.alert("ganó");
  }
}

async function updatePlayingCode(){

  while(true){

    currentBingoCode = await getRandomCode();
    $codeStore = currentBingoCode;
  }
} 

updatePlayingCode();

</script>

<style>

:global(body) {

  background: white;  
}

.container{

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: 100vh;
}

.display{

  display: flex;
  flex-direction: column;
  padding-top: 15%;
  padding-left: 3%;
}

.grid_limiter{

  padding: 1em calc(110% - 100vmin);
}

.label{

  width: 90%;
  height: 1.8em;
  padding-top: 0.4em;
  margin: 0.5em 0.5em 1em 0.5em;
  text-align: center;
  background: #dae3f3;
  border-radius: 10px;
  border: 2px solid #92a5c5;
}

.button {

  background-color: #f7cd43;
  max-width: 50%;
  border-radius: 10px;
  margin-left: 6em;
}
</style>

<svelte:head>
	<title>
	  Bingo Ambiental
	</title>
</svelte:head>

<div class="container">
  <div>
    <Logos/>
    <div class="label">Sala: <b>ABCD</b></div>
    <div class="label">Usuario: <b>Pepito</b></div>
    <div class="label">Figura Ganadora</div>
    <div style="padding: 0% 30%;">
      <GoalFigure figure={target}/>
    </div>
  </div>

  <div class="grid_limiter">
    <Grid content={card} on:overtile={handleOverTile} on:marktile={mark}/>
  </div>

  <div class="display">
    <BallotShowcase label="Balota en juego" bingoCode={currentBingoCode}/>
    <BallotShowcase label="Balota seleccionada" bingoCode={hooverBingoCode}/>
    <button class="button" type="button">BINGO!</button>
  </div>
</div>

