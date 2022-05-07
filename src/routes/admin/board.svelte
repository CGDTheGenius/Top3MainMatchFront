<script>
  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import axios from '$lib/utils/axios.js'
  import login from '$lib/utils/login'
  import { onMount } from 'svelte'

  let data = {}
  let players = []

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

  onMount(() => {
    login()
    fetchBoard()
    fetchPlayers()
    setInterval(() => {
      fetchBoard()
      fetchPlayers()
    }, 2000)
  })
</script>

<div class="container">
  <Board {...data} {players} />
  <LabelPanel controllable={false} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
  }
</style>
