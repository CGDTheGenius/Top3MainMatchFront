<script>
  import LabelButton from './LabelButton.svelte'

  export let groupName = ''
  export let labelList = []
  export let type = null
  export let clickable = true

  const handleClick = (label) => {
    if (clickable) {
      type = label.type
    }
  }
</script>

<div class="container">
  <div class="group-name">
    {groupName}
  </div>
  <div class="label-list">
    {#each labelList as label}
      <LabelButton {...label} selected={type === label.type} on:click={() => handleClick(label)}>
        {label.label}
      </LabelButton>
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    background-color: silver;
    display: flex;
    flex-direction: column;
  }

  .group-name {
    font-weight: 700;
    align-self: center;
  }

  .label-list {
    margin: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
</style>
