<script>
  import axios from '$lib/utils/axios'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'
  import { getAssistantPrevTaskSummary, getAssistantUndoneTaskSummary } from '$lib/utils/utils'

  let assistant = {
    undoneTask: null,
    lastTask: null,
  }
  $: undoneTaskSummary = getAssistantUndoneTaskSummary(assistant.undoneTask)
  $: lastTaskSummary = getAssistantPrevTaskSummary(assistant.lastTask)

  let isFetching = false
  const fetchAssistant = async () => {
    if (isFetching) return
    isFetching = true
    const res = await axios.get('board/assistants/detail').finally(() => (isFetching = false))
    assistant = {
      ...res.data,
      undoneTask: res.data.undone_task,
      lastTask: res.data.last_task,
    }
  }

  onMount(() => {
    login()
    fetchAssistant()
    // setInterval(() => {
    //   fetchAssistant()
    // }, 5000)
  })

  const handleRegisterTask = async (type, value) => {
    assistant.undoneTask = {
      type,
      value,
    }
    await axios.post('board/tasks/register', assistant.undoneTask)
    fetchAssistant()
  }

  const handleCancel = () => {
    handleRegisterTask('NOOP', null)
  }

  const handleCommunicate = () => {
    const message = prompt('플레이어에게 전달할 한글 3글자 메시지를 적어주세요')
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
    fetchAssistant()
  }
</script>

<div class="container">
  <div class="prompt" style="height: 60px">
    <span>{@html lastTaskSummary}&nbsp;</span>
  </div>
  <div style="flex-grow: 1" />
  <div class="prompt">
    <span>{undoneTaskSummary}&nbsp;</span>
    <button class="refresh" on:click={handleRefresh}>새로고침</button>
  </div>
  <div class="controller">
    <div class="controller-row">
      <button class="controller-row__item" on:click={handleCancel}>취소</button>
      <button class="controller-row__item" on:click={handleCommunicate}>통신</button>
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
