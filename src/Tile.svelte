<script>
	export let content;
	
	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();
	
	let state = "enabled";
	
	function reporttile() {
		dispatch('overtile', {
			text: content
		});
	}

	function stopreport() {
		dispatch('overtile', {
			text: ""
		});
	}
	
	function disable(e){
	
		state = "disabled"
	}
	
	let enabled = true;
</script>

<style>

.square {
  position: relative;
  box-sizing: border-box;
  text-align: center;
  border-radius: 10px;
	box-shadow: 0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05);
}

.enabled {

  border: 1px solid #2c2f33;
  background: #2c2f33;
  color: white;
	transition: .3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12);
}

.enabled:hover{
  border: 1px solid #4287f5;
	transform:  scale(1.10);
	background: #4287f5;
	box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
}

.disabled{

  border: 1px solid grey;
  background: grey;
  color: black;
}

.square::before {
  content: '';
  display: block;
  padding-top: 100%;
}

.square .content {
  position: absolute;
  top: 0; left: 0;
  height: 100%;
  width: 100%;
}
.content {

	padding: 30% 0px;
	text-align: center;
	cursor: default;
}

</style>


<div class="square {state}" on:mouseover={reporttile}  on:mouseleave={stopreport} on:click={disable}>
	<div class="content">
		<div>{content}</div>
	</div>
</div>


