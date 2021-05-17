<script>

export let color1 = "#0166AF";
export let color2 = "#00A852";
export let unit = "vw";
export let duration = "2s";
export let size = "15";

let durationUnit = duration.match(/[a-zA-Z]/)[0];
let durationNum = duration.replace(/[a-zA-Z]/, "");

</script>
  
<style>

.wrapper {
  height: var(--size);
  width: var(--size);
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  height: var(--size);
  width: var(--size);
  animation: rotate var(--duration) infinite linear;
}
.dot {
  width: 60%;
  height: 60%;
  display: inline-block;
  position: absolute;
  top: 0;
  border-radius: 100%;
  animation: bounce var(--duration) infinite ease-in-out;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes bounce {
  0% {
    background-color: var(--color2);
    transform: scale(0);
  }
  100% {
    transform: scale(0);
    background-color: var(--color2);
  }
  50% {
    transform: scale(1);
    background-color: var(--color1);
  }
}
</style>
  
<div style="display: flex; justify-content: center; align-items: center; width: 100vw; height: 70vh;">
  <div
    class="wrapper"
    style="--size: {size}{unit}; --color1: {color1}; --color2: {color2}; --duration: {duration};">
    <div class="spinner">
      {#each [0, 1] as version}
        <div
          class="dot"
          style="animation-delay: {version === 1 ? `${durationNum / 2}${durationUnit}` : '0s'}; bottom: {version === 1 ? '0' : ''}; top: {version === 1 ? 'auto' : ''};" />
      {/each}
    </div>
  </div>
</div>

  