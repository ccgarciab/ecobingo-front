<script>

import {codeStore} from './codeStore.js';
import {markedStore} from './markedStore.js';

import ConfettiGenerator from "confetti-js";

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

let celebrate = false;

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

    let confettiSettings = { target: 'canvas' };
    let confetti = new ConfettiGenerator(confettiSettings);
    celebrate = true;
    confetti.render();
/*     let canvas = document.getElementById('text');
    let ctx = canvas.getContext("2d");
    ctx.font = "30px Arial";
    ctx.strokeText("Hello World", 10, 50);

    function fadeOut(text) {
      let alpha = 0.0,   // clear opacity
        interval = setInterval(function () {
            canvas.width = canvas.width; // Clears the canvas
            ctx.fillStyle = `rgba(100, 100, 100, ${alpha})`;
            ctx.font = "italic 20pt Arial";
            ctx.fillText(text, window.innerWidth / 2, window.innerHeight / 2);
            alpha = alpha + 0.01; // increase opacity (fade in)
            if (alpha > 1) {
                clearInterval(interval);
            }
        }, 100); 
    }

    fadeOut("Felicitaciones!"); */
  }
  else{

    alert("Aún no has ganado. Sigue jugando.");
  }
}

</script>

<style>

.canvas {

  z-index: 2147483647;
  display:block;
  position: absolute;
  width:100vw; height:100vh;
  margin:0; padding:0;
}

.hidden {
  visibility: hidden;
}

.visible {
  visibility: visible;
}

</style>

<svelte:window bind:innerWidth={wWidth}/>


<canvas id="canvas" class="canvas {celebrate ? "visible" : "hidden"}" on:click={() => {celebrate = !celebrate;}}></canvas>
<!--canvas id="text" class="canvas {celebrate ? "visible" : "hidden"}"></canvas-->

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
