<script>
  import Logos from './Logos.svelte';


import Grid from './Grid.svelte';
import GoalFigure from "./GoalFigure.svelte";
import {defs} from './defs.js';
import {getRandomCard, getRandomCode} from './randomCard.js';
import {codeStore} from './codeStore.js';

let hooverBingoCode = "";
$: [hooverConcept, hooverDefinition] = defs.get(hooverBingoCode);
let currentBingoCode = "";
$: [currentConcept, currentDefinition] = defs.get(currentBingoCode);
[currentConcept, currentDefinition] = defs.get(currentBingoCode);

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

.inner{

  display: flex;
  flex-direction: row;
  width: 90%;
  height: 30%;
  margin: 0% 8% 0% 2%;
  margin-left: 2em;
  
  z-index: 10;
}

.grid_limiter{

  padding: 1em calc(110% - 100vmin);
}

.bingocode{

  color: #00A852;
  position: relative;
  font-size: 2em;
  text-align: center;
  min-width: 20%;
  background: transparent;
  z-index: 10;
}

.description{

  color: #11374D;
  overflow: auto;
  text-align: left;
  margin-left: 5%;
  overflow: scroll;
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
    <div class="label">Balota en juego</div>
    <div class="inner">
      <div class="bingocode"><div class="code">{currentBingoCode}</div></div>
      <div class="description"><b>{currentConcept}</b>{currentDefinition}</div>    
    </div>
    <div class="label">Balota seleccionada</div>
    <div class="inner">
      <div class="bingocode"><div class="code">{hooverBingoCode}</div></div>
      <div class="description"><b>{hooverConcept}</b>{hooverDefinition}</div>     
    </div>
    <button class="button" type="button">BINGO!</button>
  </div>
</div>

