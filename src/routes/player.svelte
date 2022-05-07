<script>
  import Sight from '$lib/components/Sight.svelte'
  import axios from '$lib/utils/axios'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'

  let sight = {}
  let player = {
    x: 0,
    y: 0,
    undoneTask: null,
    lastTask: null,
    unlocked: '',
  }
  $: undoneTaskSummary = getUndoneTaskSummary(player.undoneTask)
  $: lastTaskSummary = getLastTaskSummary(player.lastTask)

  const fetchSight = async () => {
    const res = await axios.get('board/players/sight')
    sight = {
      ...res.data,
      hWalls: res.data.h_walls,
      vWalls: res.data.v_walls,
    }
  }

  const fetchPlayer = async () => {
    const res = await axios.get('board/players/detail')
    player = {
      ...res.data,
      undoneTask: res.data.undone_task,
      lastTask: res.data.last_task,
    }
  }

  onMount(() => {
    login()
    fetchSight()
    fetchPlayer()
    setInterval(() => {
      fetchSight()
      fetchPlayer()
    }, 5000)
  })

  const getUndoneTaskSummary = (task) => {
    if (!task) return '동작을 예약해주세요'
    if (task.type === 'MOVE') {
      const step = parseInt(task.value)
      if (step > 0) return `앞으로 ${step}칸 이동 예약됨`
      else return `뒤로 ${Math.abs(step)}칸 이동 예약됨`
    }
    if (task.type === 'ROTATE') {
      const step = parseInt(task.value)
      if (step > 0) {
        return `오른쪽으로 90도 회전 예약됨`
      } else {
        return `왼쪽으로 90도 회전 예약됨`
      }
    }
    if (task.type === 'COMMUNICATE') {
      return `조력자에게 '${task.value}' 전달 예약됨`
    }
    if (task.type === 'NOOP') {
      return '아무 행동 안함'
    }
    return '알 수 없는 행동'
  }

  const getLastTaskSummary = (task) => {
    if (!task) return ''
    const errorMessage = !task.error ? ' 성공' : ' 실패: ' + task.error
    if (task.type === 'MOVE') {
      const step = parseInt(task.value)
      if (step > 0) return `앞으로 ${step}칸 이동` + errorMessage
      else return `뒤로 ${Math.abs(step)}칸 이동` + errorMessage
    }
    if (task.type === 'ROTATE') {
      const step = parseInt(task.value)
      if (step > 0) {
        return `오른쪽으로 90도 회전` + errorMessage
      } else {
        return `왼쪽으로 90도 회전` + errorMessage
      }
    }
    if (task.type === 'COMMUNICATE') {
      return `조력자에게 '${task.value}' 전달` + errorMessage
    }
    if (task.type === 'REVERSE_COMMUNICATE') {
      return `조력자에게서 '${task.value}' 수신` + errorMessage
    }
    if (task.type === 'NOOP') {
      return ''
    }
    return '알 수 없는 행동을 함'
  }

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
    undoneTask = {
      type,
      value,
    }
    player.undoneTask = undoneTask
    await axios.post('board/tasks/register', undoneTask)
  }

  const handleViewTaskList = async () => {
    alert('TODO')
  }

  const handleCommunicate = () => {
    const message = prompt('조력자에게 전달할 한글 3글자 메시지를 적어주세요')
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
</script>

<div class="container">
  <div class="prompt">
    <span>{lastTaskSummary}&nbsp;</span>
  </div>
  <div class="sight">
    <Sight {...sight} {player} />
  </div>
  <div class="prompt">
    <span>{undoneTaskSummary}&nbsp;</span>
  </div>
  <div class="controller">
    <div class="controller-row">
      <button class="controller-row__item" on:click={handleViewTaskList}>기록</button>
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
        font-size: 24px;
        font-weight: 700;
        cursor: pointer;

        &:hover {
          background-color: lightgray;
        }
      }
    }
  }
</style>
