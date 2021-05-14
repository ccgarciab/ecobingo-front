<script>

export let wWidth;

</script>

<style>

.horizontal_container{

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-height: 100vh;
}

.right{

  display: flex;
  flex-direction: column;
  padding-top: 20vh;
  padding-left: 3%;
  font-size: 1.2vw;
  align-items: center;
}

.panel {

  font-size: 1.2vw;
}

.vertical_container {

  display: flex;
  flex-direction: column;
  align-items: center;
}

.top {

  display: flex;
  flex-direction: row;
  width: 85vw; 
  padding-left: 10vw; 
  align-items: center;
}

.vertical_labels {

  display: flex; 
  flex-direction: column; 
  min-width: 60%;
}

hr {

  border: hidden;
}

</style>

{#if wWidth > 600}

<!--Horizontal layout, made of 3 columns-->
<div class="horizontal_container">
  <div class="panel">
    <slot name="logos"></slot>
    <hr style="height: 0.4em;">
    <slot name="room_label"></slot>
    <hr>
    <slot name="user_label"></slot>
    <hr>
    <slot name="figure_label"></slot>
    <hr style="height: 2em;">
    <div style="padding: 0% 30%;">
      <slot name="figure"></slot>
    </div>
  </div>
  
  <div style="padding-top: 7vh;">
    <slot name="grid"></slot>
  </div>

  <div class="right panel">
    <slot name="balot_current"></slot>
    <slot name="balot_hoover"></slot>
    <slot name="bingo_button"></slot>
  </div>
</div>

{:else}

<!--Vertical layout made of a single column-->
<div class="vertical_container">
  <div class="top">
    <div class="vertical_labels">
      <slot name="room_label"></slot>
      <slot name="user_label"></slot>
    </div>
    <div style="width: 25%;">
      <slot name="figure"></slot>
    </div>
  </div>
  <hr>
  <div style="min-width: 60vw;">
    <slot name="grid"></slot>
  </div>
  <hr>
  <div style="width: 100%; min-height: 30vh;">
    <slot name="balot_current"></slot>
  </div>
    <slot name="bingo_button"></slot>
</div>

{/if}