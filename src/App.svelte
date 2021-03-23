<script>

import Grid from './Grid.svelte';
import {defs} from './data.js';

function getRandom(arr, n) {
  var result = new Array(n),
  len = arr.length,
  taken = new Array(len);
  if (n > len){

    throw new RangeError("getRandom: taking too much");
  }

  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

function range(a, b, step){

  if(b === undefined){

    b = a;
    a = 0;
  }
  if(step === undefined){

    step = 1;
  }

  let result = [];

  for(let i = a; i < b; i += step){

    result.push(i);
  }

  return result;
}

let columns = {};

for(let i = 0; i < 5; ++i){

  let [l, n] = ["BINGO"[i], i * 15 + 1];
  columns[l] = range(n, n + 15).map((m) => `${l}${m}`);
}

let placeholder = [];

for(let l of "BINGO"){

  placeholder.push(getRandom(columns[l], 5));
}

let numbers = [];

for(let i = 0; i < 5; ++i){

  for(let sublist of placeholder){

    numbers.push(sublist[i]);
  }
}

let bingoCode = "";
let data = "";

function f(event){

  console.log(event.detail.text);
}

function handleMessage(event) {
  bingoCode = event.detail.text;
  data = defs.get(bingoCode);
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

<div class="container">
  <div></div>

  <div class="grid_limiter">
    <Grid content={numbers} on:overtile={handleMessage}/>
  </div>

  <div class="display">
    <div id="bingocode" class="inner">{bingoCode}</div>
    <div id="description" class="inner">{data}</div>
  </div>
</div>

