<script>
  import { labelList } from '$lib/utils/utils'

  import LabelButton from './LabelButton.svelte'

  export let type = null
  export let clickable = true

  const handleClick = (label) => {
    if (clickable) {
      type = label.type
    }
  }
</script>

<div class="control-panel">
  <div class="control-panel__type-selector">
    {#each labelList as label}
      <LabelButton {...label} selected={type === label.type} on:click={() => handleClick(label)}>
        {label.label}
      </LabelButton>
    {/each}
  </div>
</div>

<style lang="scss">
  .control-panel {
    // flex: 0 1 auto;
    background-color: silver;
    // display: flex;
    height: 100%;
    overflow-y: auto;

    &__type-selector {
      margin: 8px;
      display: flex;
      flex-direction: column;
      gap: 8px 8px;
    }
  }
</style>
