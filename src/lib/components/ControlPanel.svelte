<script>
  export let type = 'BLANK'
</script>

<div class="control-panel">
  <div class="control-type-selector">
    <button
      class="control-type-selector__item"
      class:selected={type === 'BLANK'}
      on:click={() => (type = 'BLANK')}>BLANK</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'TREE'}
      on:click={() => (type = 'TREE')}>TREE</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'SAND'}
      on:click={() => (type = 'SAND')}>SAND</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'ROCK'}
      on:click={() => (type = 'ROCK')}>ROCK</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'GRASS'}
      on:click={() => (type = 'GRASS')}>GRASS</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'BLUE'}
      on:click={() => (type = 'BLUE')}>BLUE</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'GREEN'}
      on:click={() => (type = 'GREEN')}>GREEN</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'YELLOW'}
      on:click={() => (type = 'YELLOW')}>YELLOW</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'VIOLET'}
      on:click={() => (type = 'VIOLET')}>VIOLET</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'TOWER'}
      on:click={() => (type = 'TOWER')}>TOWER</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'H_WALL'}
      on:click={() => (type = 'H_WALL')}>HORIZONTAL_WALL</button
    >
    <button
      class="control-type-selector__item"
      class:selected={type === 'V_WALL'}
      on:click={() => (type = 'V_WALL')}>VERTICAL_WALL</button
    >
  </div>
</div>

<style lang="scss">
  .control {
    &-panel {
      flex: 0 1 auto;
      background-color: silver;
      display: flex;
    }

    &-type-selector {
      margin: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px 8px;

      &__item {
        outline: none;
        border: none;
        background-color: white;
        border-radius: 116px;
        padding: 8px;
        font-weight: 700;
        height: 32px;
        box-shadow: 2px 2px 2px 1px gray;
        cursor: pointer;
      }
    }
  }

  button.selected {
    background-color: deepskyblue;
    color: white;
  }
</style>
