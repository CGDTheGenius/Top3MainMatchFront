<script>
  import Sight from '$lib/components/Sight.svelte'
  import axios from '$lib/utils/axios'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'
  import ArtifactState from '$lib/components/ArtifactState.svelte'
  import { getPlayerPrevTaskSummary, getPlayerUndoneTaskSummary } from '$lib/utils/utils'

  let sight = {}
  let player = {
    x: 99999999999999,
    y: 99999999999999,
    undoneTask: null,
    lastTask: null,
    unlocked: '',
    inventory: '',
  }
  $: undoneTaskSummary = getPlayerUndoneTaskSummary(player.undoneTask)
  $: lastTaskSummary = getPlayerPrevTaskSummary(player.lastTask)

  let isFetchingSight = false
  const fetchSight = async () => {
    if (isFetchingSight) return
    isFetchingSight = true
    const res = await axios.get('board/players/sight').finally(() => (isFetchingSight = false))
    sight = {
      ...res.data,
      hWalls: res.data.h_walls,
      vWalls: res.data.v_walls,
    }
  }

  let isFetchingPlayer = false
  const fetchPlayer = async () => {
    if (isFetchingPlayer) return
    isFetchingPlayer = true
    const res = await axios.get('board/players/detail').finally(() => (isFetchingPlayer = false))
    player = {
      ...res.data,
      undoneTask: res.data.undone_task,
      lastTask: res.data.last_task,
    }
  }

  onMount(() => {
    login()
    fetchPlayer()
    fetchSight()
    // setInterval(() => {
    //   fetchPlayer()
    //   fetchSight()
    // }, 5000)
  })

  const handleRegisterTask = async (type, value) => {
    let undoneTask = player.undoneTask
    if (undoneTask && undoneTask.type === type && undoneTask.type === 'MOVE') {
      if (parseInt(undoneTask.value) * value >= 0) {
        if (Math.abs(value + parseInt(undoneTask.value)) > 10) {
          type = 'NOOP'
          value = null
        } else value += parseInt(undoneTask.value)
      }
    }
    if (undoneTask && undoneTask.type === type && undoneTask.type === 'ROTATE') {
      if (parseInt(undoneTask.value) == value) {
        type = 'NOOP'
        value = null
      }
    }
    await axios.post('board/tasks/register', {
      type,
      value,
    })
    fetchPlayer()
    fetchSight()
  }

  const handleCancelTask = async () => {
    handleRegisterTask('NOOP', null)
  }

  const handleCommunicate = () => {
    const message = prompt('조력자에게 전달할 한글 3글자 메시지를 적어주세요')
    if (!message) return
    const korean = /^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*$/
    if (message.length != 3) {
      alert('3글자가 아닙니다! 다시 시도해주세요')
      return
    }
    if (!korean.test(message)) {
      alert('한글이 아닌 글자가 포함되어 있습니다! 다시 시도해주세요')
      return
    }
    handleRegisterTask('COMMUNICATE', message)
  }

  const handleRefresh = () => {
    fetchPlayer()
    fetchSight()
  }
</script>

<div class="container">
  <div class="state">
    <ArtifactState inventory={player.inventory} />
  </div>
  <div class="prompt" style="height: 60px">
    <span>{@html lastTaskSummary}&nbsp;</span>
  </div>
  <Sight {...sight} {player} />
  <div class="prompt">
    <span>{undoneTaskSummary}&nbsp;</span>
    <button class="refresh" on:click={handleRefresh}>새로고침</button>
  </div>
  <div class="controller">
    <div class="controller-row">
      <button class="controller-row__item" on:click={handleCancelTask}>취소</button>
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', 1)}
        >앞으로</button
      >
      <button class="controller-row__item" on:click={handleCommunicate}>통신</button>
    </div>
    <div class="controller-row">
      <button class="controller-row__item" on:click={() => handleRegisterTask('ROTATE', -1)}
        >왼쪽</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', -1)}
        >뒤로</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('ROTATE', 1)}
        >오른쪽</button
      >
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: black;
    display: flex;
    flex-direction: column;
  }

  .state {
    font-weight: 700;
    font-size: 18px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 8px;
    background-color: #444;
    border-radius: 32px;
    margin: 4px;
  }

  .prompt {
    text-align: center;
    font-weight: 700;
    font-size: 20px;
    padding: 8px;
    color: white;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .refresh {
    position: absolute;
    right: 0;
    margin-right: 4px;
    border-radius: 16px;
    border: none;
    font-weight: 700;
    background-color: white;
    padding: 8px;
    box-shadow: 2px 2px 2px 1px black;
    cursor: pointer;
  }

  .controller {
    flex: 1 0 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 4px;

    &-row {
      flex: 1 0 0;
      display: flex;
      flex-direction: row;
      gap: 8px;

      &__item {
        flex: 1 0 0;
        border-radius: 8px;
        border: none;
        background-color: white;
        box-shadow: 2px 2px 2px 1px black;
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;
      }
    }
  }
</style>
