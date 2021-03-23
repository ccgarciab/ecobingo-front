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
  grid-template-columns: 1fr 3fr 2fr;
  max-height: 100vh;
}

.display{

  display: flex;
  flex-direction: column;
  padding: 40% 0 0;
}

.inner{

  height: 20%;
  width: 90%;
  margin: 5% 8% 0% 2%;
}

.grid_limiter{

  padding: 5% calc(105% - 100vh);
}

#bingocode{

  color: #00A852;
  font-size: 2em;
  text-align: center;
}

#description{

  color: #11374D;
  text-align: left;
  margin-left: 1em;
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
    <div id="bingocode" class="inner">{bingoCode}</div>
    <div id="description" class="inner">{definition}</div>
  </div>
</div>

