<script>

import { createEventDispatcher } from 'svelte'

let name = "";
let room = "";

const dispatch = createEventDispatcher();

function logIn() {

  dispatch('login', {
    name,
    room
  })
}

</script>

<style>

.center_container {

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

</style>

<div class="center_container">
  <input type="text" placeholder="Sala de Juego" bind:value={room}>
  <input type="text" placeholder="Nombre de Usuario" bind:value={name}>
  <button on:click={logIn}>Ingresar</button>
</div>