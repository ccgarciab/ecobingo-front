<script>

import CenterTile from './CenterTile.svelte';
import Tile from './Tile.svelte';
export let content;

</script>

<style>

.square-container {

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 0.5vw;
}

.bingo_heading{

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-column: span 5;
  background-color: white;
  color: #00A852;
  font-family: helvetica;
  font-size: 2rem;
  border-radius: 10px;
  height: 2.05em;
}

.bingo_letter {

  text-align: center;
  padding-top: 20%;
}

</style>


<div class="square-container">
  <div class="bingo_heading">
    {#each "BINGO" as c}
      <div class="bingo_letter">
        {c}
      </div>
    {/each}
  </div>
  {#each content as code, i}
    {#if i != 12}
      <Tile {code} position={i} on:overtile on:marktile />
    {:else}
      <CenterTile/>
    {/if}
  {/each}
</div>

