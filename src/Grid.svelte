<script>
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
	{#each content as i}
		<Tile content={i} on:overtile/>
	{/each}
</div>

