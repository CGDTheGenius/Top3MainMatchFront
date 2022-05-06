<script>
  import axios from '$lib/utils/axios.js'

  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'

  let data = {}
  let type = 'BLANK'

  const fetchBoard = async () => {
    try {
      const res = await axios.get('/board/view')
      data = {
        ...res.data,
        hWalls: [],
        vWalls: [],
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditCell = async (event) => {
    const x = event.detail.x
    const y = event.detail.y
    await axios.put(`/board/cells/${x}/${y}`, {
      ...event.detail,
      type: type,
    })
    fetchBoard()
  }

  const handleEditHorizontalWall = async (event) => {
    await axios.post('/board/edit/h-wall', event.detail)
    fetchBoard()
  }

  const handleEditVerticalWall = async (event) => {
    await axios.post('/board/edit/v-wall', event.detail)
    fetchBoard()
  }

  onMount(() => {
    login()
    fetchBoard()
  })
</script>

<div class="container">
  <Board
    {...data}
    bind:type
    clickable={true}
    on:clickCell={handleEditCell}
    on:clickHorizontalWall={handleEditHorizontalWall}
    on:clickVerticalWall={handleEditVerticalWall}
  />
  <LabelPanel bind:type controllable={true} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
    height: 100%;
  }
</style>
