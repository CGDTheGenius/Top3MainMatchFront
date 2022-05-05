<script>
  export let widthRatio = 1
  export let heightRatio = 1
  let clientWidth
  let clientHeight

  let contentWidth = 100
  let contentHeight = 100

  $: contentWidth = Math.min(clientWidth, clientHeight * (widthRatio / heightRatio))
  $: contentHeight = Math.min(clientHeight, clientWidth * (heightRatio / widthRatio))
</script>

<div class="container" bind:clientWidth bind:clientHeight>
  <div style="width: {contentWidth}px; height: {contentHeight}px">
    <slot />
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }
</style>
