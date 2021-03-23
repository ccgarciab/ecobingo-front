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

.heading {

  text-align: center;
  color: #00A852;
  font-size: 2rem;
  font-family: helvetica;
}

</style>


<div class="square-container">
  {#each "BINGO" as c}
    <div class="heading">
      {c}
    </div>
  {/each}
  {#each content as code, i}
    {#if i != 12}
      <Tile {code} position={i} on:overtile on:marktile />
    {:else}
      <CenterTile/>
    {/if}
  {/each}
</div>

