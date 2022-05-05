<script>
  import axios from '$lib/utils/axios.js'

  import ControlPanel from '$lib/components/ControlPanel.svelte'
  import Board from '$lib/components/Board.svelte'

  let data = {}
  let type = 'BLANK'

  const fetchBoard = async () => {
    const res = await axios.get('/admin/board')
    data = res.data
  }

  const handleEditCell = async (event) => {
    await axios.post('/admin/board/edit/cell', {
      ...event.detail,
      type: type,
    })
    fetchBoard()
  }

  const handleEditHorizontalWall = async (event) => {
    await axios.post('/admin/board/edit/h-wall', event.detail)
    fetchBoard()
  }

  const handleEditVerticalWall = async (event) => {
    await axios.post('/admin/board/edit/v-wall', event.detail)
    fetchBoard()
  }

  fetchBoard()
</script>

<div class="container">
  <Board
    {...data}
    bind:type
    on:clickCell={handleEditCell}
    on:clickHorizontalWall={handleEditHorizontalWall}
    on:clickVerticalWall={handleEditVerticalWall}
  />
  <ControlPanel bind:type />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
  }
</style>
