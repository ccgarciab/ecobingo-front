<script>

import Grid from './Grid.svelte';
import {defs} from './defs.js';
import {getRandomCard} from './randomCard.js';

let bingoCode = "";
let definition = "";
let card = getRandomCard();
let target = new Array(25).fill(false);
target[12] = true;

function handleOverTile(event) {

  bingoCode = event.detail.code;
  definition = defs.get(bingoCode);
}

function mark(event){

  let position = event.detail.position;
  target[position] = true;
  
  if(target.reduce((a, b) => a && b)){
  
    window.alert("ganó");
  }
}

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
  padding: 15% 0 0;
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

  padding: 5% calc(110% - 100vmin);
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
  margin: 2em 1em;
  text-align: center;
  background: #dae3f3;
  border-radius: 10px;
  border: 2px solid #92a5c5;
}
</style>

<svelte:head>
	<title>
	  Bingo Ambiental
	</title>
</svelte:head>

<div class="container">
  <div></div>

  <div class="grid_limiter">
    <Grid content={card} on:overtile={handleOverTile} on:marktile={mark}/>
  </div>
  <div class="display">
    <div class="label">Balota en juego</div>
    <div class="inner">
      <div class="bingocode"><div class="code">{bingoCode}</div></div>
      <div class="description">{definition}</div>    
    </div>
    <div class="label">Balota seleccionada</div>
    <div class="inner">
      <div class="bingocode"><div class="code">{bingoCode}</div></div>
      <div class="description">{definition}</div>    
    </div>
  </div>
</div>

