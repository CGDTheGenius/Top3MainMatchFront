<script>
  export let type = 'BLANK'
</script>

<div class="control-panel">
  <div class="control-type-selector">
    <button class="control-type-selector__item" on:click={() => (type = 'BLANK')}>BLANK</button>
    <button class="control-type-selector__item" on:click={() => (type = 'TREE')}>TREE</button>
    <button class="control-type-selector__item" on:click={() => (type = 'SAND')}>SAND</button>
    <button class="control-type-selector__item" on:click={() => (type = 'ROCK')}>ROCK</button>
    <button class="control-type-selector__item" on:click={() => (type = 'GRASS')}>GRASS</button>
    <button class="control-type-selector__item" on:click={() => (type = 'BLUE')}>BLUE</button>
    <button class="control-type-selector__item" on:click={() => (type = 'GREEN')}>GREEN</button>
    <button class="control-type-selector__item" on:click={() => (type = 'YELLOW')}>YELLOW</button>
    <button class="control-type-selector__item" on:click={() => (type = 'VIOLET')}>VIOLET</button>
    <button class="control-type-selector__item" on:click={() => (type = 'TOWER')}>TOWER</button>
    <button class="control-type-selector__item" on:click={() => (type = 'H_WALL')}
      >HORIZONTAL_WALL</button
    >
    <button class="control-type-selector__item" on:click={() => (type = 'V_WALL')}
      >VERTICAL_WALL</button
    >
  </div>
</div>

<style lang="scss">
  .control {
    &-panel {
      width: 200px;
      flex: 0 0 auto;
      background-color: crimson;
    }
  }
</style>
