<script>
    export let marked;
</script>

<style>

.square {

  position: relative;
  box-sizing: border-box;
  text-align: center;
  border-radius: 7px;
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

  text-align: center;
  cursor: default;
}
</style>


<div class="square" style="background: {marked ? '#00A852' : '#0166AF'};">
  <div class="content"></div>
</div>