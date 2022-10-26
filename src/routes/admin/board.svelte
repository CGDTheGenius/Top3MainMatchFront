<script>
  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import StatePanel from '$lib/components/StatePanel.svelte'
  import axios from '$lib/utils/axios.js'
  import login from '$lib/utils/login'
  import { onMount } from 'svelte'

  let data = {}
  let players = []
  let assistants = []

  const fetchBoard = async () => {
    const res = await axios.get('/board/view')
    data = {
      ...res.data,
      hWalls: res.data.h_walls,
      vWalls: res.data.v_walls,
    }
  }

  const fetchPlayers = async () => {
    const res = await axios.get('/board/players')
    players = res.data
  }

  const fetchAssistants = async () => {
    const res = await axios.get('/board/assistants')
    assistants = res.data
  }

  onMount(() => {
    login()
    fetchBoard()
    fetchPlayers()
    fetchAssistants()
    setInterval(() => {
      fetchPlayers()
      fetchAssistants()
    }, 2000)
  })

  const handleProcessAssistant = async () => {
    await axios.post('/board/tasks/process/assistant')
    await fetchBoard()
  }

  const handleProcessPlayer = async () => {
    await axios.post('/board/tasks/process/player')
    await fetchBoard()
  }
</script>

<div class="container">
  <Board {...data} {players} simple={false} />
  <StatePanel
    {players}
    {assistants}
    on:processAssistant={handleProcessAssistant}
    on:processPlayer={handleProcessPlayer}
  />
  <LabelPanel controllable={false} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
  }
</style>
