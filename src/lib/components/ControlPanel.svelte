<script>
  import LabelList from './LabelList.svelte'

  export let type = null
</script>

<div class="control-panel">
  <div class="size-controller">
    <span class="size-controller__label">크기</span>
    <button class="size-controller__button">&lt;</button>
    <button class="size-controller__button">&gt;</button>
  </div>
  <div class="type-selector">
    <LabelList bind:type />
  </div>
</div>

<style lang="scss">
  .control-panel {
    background-color: silver;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .size-controller {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 8px;

    &__label {
      font-weight: 700;
    }

    &__button {
      font-weight: 700;
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }
</style>
