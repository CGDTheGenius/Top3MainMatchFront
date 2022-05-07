<script>
  import { artifactList } from '$lib/utils/utils'
  import ArtifactCell from './artifacts/ArtifactCell.svelte'

  export let inventory
</script>

<div class="container">
  <div />
  유물획득현황
  {#each artifactList as artifact}
    <div class="item">
      <svelte:component
        this={inventory.includes(artifact.type) ? artifact.iconComponent : ArtifactCell}
      />
    </div>
  {/each}
  <div />
</div>

<style>
  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
  }

  .item {
    height: 30px;
    width: 30px;
  }
</style>
