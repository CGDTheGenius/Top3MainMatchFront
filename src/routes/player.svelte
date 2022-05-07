<script>
  import Sight from '$lib/components/Sight.svelte'
  import axios from '$lib/utils/axios'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'

  let board = {}
  let player = {
    tasks: [],
  }
  let undoneTask = null
  $: undoneTask = player.tasks.find((task) => !task.done)
  $: undoneTaskSummary = getUndoneTaskSummary(undoneTask)

  const fetchBoard = async () => {
    const res = await axios.get('board/view')
    board = res.data
  }

  const fetchPlayer = async () => {
    const res = await axios.get('board/players/detail', {
      headers: {
        Authorization: '???',
      },
    })
    player = res.data
  }

  onMount(() => {
    login()
    fetchBoard()
    fetchPlayer()
  })

  const getUndoneTaskSummary = (undoneTask) => {
    if (!undoneTask) return '동작을 예약해주세요'
    if (undoneTask.type === 'MOVE') {
      const step = parseInt(undoneTask.value)
      if (step > 0) return `앞으로 ${step}칸 이동 예약됨`
      else return `뒤로 ${Math.abs(step)}칸 이동 예약됨`
    }
    if (undoneTask.type === 'ROTATE') {
      const step = parseInt(undoneTask.value)
      if (step > 0) {
        return `오른쪽으로 90도 회전 예약됨`
      } else {
        return `왼쪽으로 90도 회전 예약됨`
      }
    }
    if (undoneTask.type === 'COMMUNICATE') {
      return `조력자에게 '${undoneTask.value}' 전달 예약됨`
    }
    return '알 수 없는 행동'
  }

  const handleRegisterTask = async (type, value) => {
    if (undoneTask && undoneTask.type === type && undoneTask.type === 'MOVE') {
      if (parseInt(undoneTask.value) * value > 0) {
        if (Math.abs(value + parseInt(undoneTask.value)) > 10) return
        value += parseInt(undoneTask.value)
      }
    }
    undoneTask = {
      type,
      value,
    }
    await axios.post('board/tasks/register', undoneTask)
  }
</script>

<div class="container">
  <div class="sight">
    <Sight {...board} {player} />
  </div>
  <div class="prompt">
    <span>{undoneTaskSummary}</span>
  </div>
  <div class="controller">
    <div class="controller-row">
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', 1)}
        >FORWARD</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', 1)}
        >FORWARD</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', 1)}
        >FORWARD</button
      >
    </div>
    <div class="controller-row">
      <button class="controller-row__item" on:click={() => handleRegisterTask('ROTATE', -1)}
        >CCW</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('MOVE', -1)}
        >BACKWARD</button
      >
      <button class="controller-row__item" on:click={() => handleRegisterTask('ROTATE', 1)}
        >CW</button
      >
    </div>
  </div>
</div>

<style lang="scss">
  .container {
    width: 100%;
    height: 100%;
    background-color: gray;
    display: flex;
    flex-direction: column;
  }

  .prompt {
    font-weight: 700;
    text-align: center;
    font-size: 20px;
    padding: 8px;
    color: white;
    background-color: black;
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
      }
    }
  }
</style>
