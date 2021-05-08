<script>

import {defs} from './defs.js';

export let label;
export let bingoCode = "";

$: [concept, definition] = defs.get(bingoCode);

</script>

<style>

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
  overflow: scroll;
}

</style>

<div class="label">{label}</div>
<div class="lower_row">
  <div class="bingocode">{bingoCode}</div>
  <div class="description"><b>{concept}</b>{definition}</div>     
</div>