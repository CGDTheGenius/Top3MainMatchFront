<script>
  import { createEventDispatcher } from 'svelte'

  export let iconComponent
  export let selected

  const dispatch = createEventDispatcher()

  const handleClick = () => {
    dispatch('click')
  }
</script>

<button class="label-button" class:selected on:click={handleClick}>
  <div class="label-button__icon">
    <svelte:component this={iconComponent} />
  </div>
  <div class="label-button__label">
    <slot />
  </div>
</button>

<style lang="scss">
  .label-button {
    display: flex;
    outline: none;
    border: none;
    background-color: white;
    border-radius: 116px;
    padding: 8px;
    font-weight: 700;
    height: 32px;
    box-shadow: 2px 2px 2px 1px gray;
    cursor: pointer;

    &__icon {
      border: 1px solid black;
      width: 16px;
      height: 16px;
      margin-left: 8px;
    }

    &__label {
      flex: 1 1 auto;
      margin: 0 8px;
      white-space: pre;
    }
  }

  button.selected {
    background-color: dodgerblue;
    color: white;
  }
</style>
