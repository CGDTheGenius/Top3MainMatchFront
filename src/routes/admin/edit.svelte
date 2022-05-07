<script>
  import axios from '$lib/utils/axios.js'

  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import { onMount } from 'svelte'
  import login from '$lib/utils/login'
  import { isCellType } from '$lib/utils/utils'

  let data = {}
  let type = 'BLANK'

  const fetchBoard = async () => {
    const res = await axios.get('/board/view')
    data = {
      ...res.data,
      hWalls: res.data.h_walls,
      vWalls: res.data.v_walls,
    }
  }

  const handleEditCell = async (event) => {
    const x = event.detail.x
    const y = event.detail.y
    if (isCellType(type)) {
      axios
        .put(`/board/cells/${x}/${y}`, {
          type,
          x,
          y,
        })
        .finally(fetchBoard)
    } else {
      axios
        .post(`/board/items/${x}/${y}`, {
          type,
          x,
          y,
        })
        .finally(fetchBoard)
    }
  }

  const handleEditWall = async (event) => {
    const x = event.detail.x
    const y = event.detail.y
    axios
      .put(`/board/walls/${type}/${x}/${y}`, {
        type,
        x,
        y,
        closed: !event.detail.closed,
      })
      .finally(fetchBoard)
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
    on:clickHorizontalWall={handleEditWall}
    on:clickVerticalWall={handleEditWall}
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
