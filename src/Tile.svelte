<script>

import {codeStore} from './codeStore.js';
import {markedStore} from './markedStore.js';
import {soundStore} from './soundStore.js';

import { createEventDispatcher } from 'svelte'

export let code;
export let position;

let sound = $soundStore.get(code);

const dispatch = createEventDispatcher();

function reporttile() {
  dispatch('overtile', {
    code
  });
}

function stopreport() {
  dispatch('overtile', {
    code: ""
  });
}

function mark(e){
  if(!$codeStore.has(code) || $markedStore[position]){
    return;
  }
  $markedStore[position] = true;
  sound.start();
}

</script>

<style>

.square {

  position: relative;
  box-sizing: border-box;
  text-align: center;
  border-radius: 10px;
  box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
  font-size: min(4vw, 3vh);
}

.enabled {

  border: 1px solid #0166AF;
  background: #0166AF;
  color: white;
  transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
}

.enabled:hover{

  border: 2px solid #92a5c5;
  color: #627595;
  transform:  scale(1.10);
  background: #dae3f3;
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

.disabled{

  border: 1px solid #00A852;
  background: #00A852;
  color: white;
}

.square::before {

  content: '';
  display: block;
  padding-top: 100%;
}

.content {

  position: absolute;
  top: 0; left: 0;
  max-height: 100%;
  width: 100%;
  padding: 40% 0px;
  line-height: 40%;
  text-align: center;
  cursor: default;
}

</style>

<div class="square {$markedStore[position] ? "disabled" : "enabled"}" on:mouseover={reporttile}  on:mouseleave={stopreport} on:click={mark}>
  <div class="content">
    <div>{code}</div>
  </div>
</div>
