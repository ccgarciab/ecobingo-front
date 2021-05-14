<script>

import {defs} from './defs.js';

import Label from "./Label.svelte";

export let label;
export let bingoCode = "";

$: [concept, definition] = defs.get(bingoCode);

</script>

<style>

.lower_row{

  display: flex;
  flex-direction: row;
  width: 90%;
  height: 30%;
  margin: 0% 8% 0% 2%;
  margin-left: 2em;

  z-index: 10;
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
  overflow: hidden;
}

</style>

<Label content={label}/>
<div style="height: min(1.2vh, 1.1vw);"></div>
<div class="lower_row">
  <div class="bingocode">{bingoCode}</div>
  <div class="description"><b>{concept}</b>{definition}</div>     
</div>