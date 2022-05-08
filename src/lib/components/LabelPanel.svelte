<script>
  import LabelList from './LabelList.svelte'
  import { cellTypeList, fakeWallTypeList, itemTypeList, wallTypeList } from '$lib/utils/utils'

  export let type = null
  export let controllable = false
</script>

<div class="control-panel">
  {#if controllable}
    <div class="size-controller">
      <span class="size-controller__label">크기</span>
      <button class="size-controller__button">&lt;</button>
      <button class="size-controller__button">&gt;</button>
    </div>
  {/if}
  <div class="type-selector">
    <LabelList groupName="지형" labelList={cellTypeList} bind:type clickable={controllable} />
    <LabelList
      groupName="벽"
      labelList={wallTypeList.concat(fakeWallTypeList)}
      bind:type
      clickable={controllable}
    />
    <LabelList groupName="아이템" labelList={itemTypeList} bind:type clickable={controllable} />
  </div>
</div>

<style lang="scss">
  .control-panel {
    background-color: silver;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 16px 0;
  }

  .size-controller {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;

    &__label {
      font-weight: 700;
    }

    &__button {
      font-weight: 700;
      border: none;
      background-color: white;
      box-shadow: 2px 2px 2px 1px gray;
      padding: 4px 8px;
      border-radius: 16px;
      cursor: pointer;
    }
  }

  .type-selector {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
