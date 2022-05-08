<script>
  import {
    artifactList,
    getAssistantPrevTaskSummary,
    getAssistantUndoneTaskSummary,
    getPlayerPrevTaskSummary,
    getPlayerUndoneTaskSummary,
  } from '$lib/utils/utils'

  import { createEventDispatcher } from 'svelte'
  import ArtifactCell from './artifacts/ArtifactCell.svelte'

  export let players = []
  export let assistants = []

  let isPlayerTurn = false
  const dispatch = createEventDispatcher()

  const handleProcessAssistant = async () => {
    if (!confirm('조력자 턴을 진행하시겠습니까?')) return
    await dispatch('processAssistant')
    isPlayerTurn = true
  }

  const handleProcessPlayer = async () => {
    if (!confirm('플레이어 턴을 진행하시겠습니까?')) return
    await dispatch('processPlayer')
    isPlayerTurn = false
  }
</script>

<div class="state-panel">
  <div class="process-controller">
    <span class="process-controller__label">다음 턴</span>
    <button
      class="process-controller__button"
      class:active={!isPlayerTurn}
      on:click={handleProcessAssistant}>조력자</button
    >
    <button
      class="process-controller__button"
      class:active={isPlayerTurn}
      on:click={handleProcessPlayer}>플레이어</button
    >
  </div>
  <div class="player-state-container">
    {#each players as player}
      <div class="player-state-item">
        <div class="player-state-item__name">
          {player.username}
        </div>
        <div class="player-state-item__inventory">
          {#each artifactList as artifact}
            <div class="player-state-item__inventory-item">
              <svelte:component
                this={player.inventory.includes(artifact.type)
                  ? artifact.iconComponent
                  : ArtifactCell}
              />
            </div>
          {/each}
        </div>
        <div class="player-state-item__task">
          - {getPlayerPrevTaskSummary(player.last_task)}
        </div>
        <div class="player-state-item__task">
          - {getPlayerUndoneTaskSummary(player.undone_task)}
        </div>
      </div>
    {/each}
  </div>
  <div class="assistant-state-container">
    {#each assistants as assistant}
      <div class="assistant-state-item">
        <div class="assistant-state-item__name">
          {assistant.username}
        </div>
        <div class="assistant-state-item__task">
          - {getAssistantPrevTaskSummary(assistant.last_task)}
        </div>
        <div class="assistant-state-item__task">
          - {getAssistantUndoneTaskSummary(assistant.undone_task)}
        </div>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .state-panel {
    flex: 0 0 auto;
    width: 200px;
    background-color: rgb(163, 163, 163);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 16px 8px;
    gap: 32px;
  }

  .process-controller {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    gap: 8px;

    &__label {
      font-weight: 700;
      font-size: 20px;
      white-space: pre;
      text-align: center;
    }

    &__button {
      white-space: pre;
      font-weight: 700;
      border: none;
      background-color: rgb(199, 199, 199);
      color: rgb(128, 128, 128);
      box-shadow: 2px 2px 2px 1px gray;
      padding: 4px 8px;
      font-size: 18px;
      border-radius: 16px;
      cursor: pointer;
    }

    &__button.active {
      background-color: white;
      color: black;
    }
  }

  .player-state {
    &-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-item {
      background-color: white;
      box-shadow: 2px 2px 2px 1px gray;
      padding: 4px 8px;
      border-radius: 16px;

      &__name {
        font-size: 18px;
        font-weight: 700;
      }

      &__inventory {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        margin: 4px 0;

        &-item {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .assistant-state {
    &-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    &-item {
      background-color: white;
      box-shadow: 2px 2px 2px 1px gray;
      padding: 4px 8px;
      border-radius: 16px;

      &__name {
        font-size: 18px;
        font-weight: 700;
      }
    }
  }
</style>
