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
      axios.put(`/board/cells/${x}/${y}`, {
        type,
        x,
        y,
      })
      data.cells.find((cell) => cell.x === x && cell.y === y).type = type
      data = data
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
    if (type.startsWith('H_WALL')) {
      const wall = data.hWalls.find((wall) => wall.x === x && wall.y === y)
      wall.closed = !event.detail.closed
      wall.fake = type.includes('FAKE')
    } else {
      const wall = data.vWalls.find((wall) => wall.x === x && wall.y === y)
      wall.closed = !event.detail.closed
      wall.fake = type.includes('FAKE')
    }
    data = data
    axios.put(`/board/walls/${type.replace('_FAKE', '')}/${x}/${y}`, {
      type: type.replace('_FAKE', ''),
      x,
      y,
      closed: !event.detail.closed,
      fake: type.includes('FAKE'),
    })
    // .finally(fetchBoard)
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
    simple={false}
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
