<script>
  import axios from '$lib/utils/axios.js'

  import ControlPanel from '$lib/components/ControlPanel.svelte'

  const colorMap = {
    BLANK: 'white',
    TREE: 'teal',
    SAND: 'sandybrown',
    ROCK: 'gray',
    GRASS: 'greenyellow',
    RED: 'red',
    BLUE: 'blue',
    GREEN: 'green',
    YELLOW: 'yellow',
    VIOLET: 'violet',
    TOWER: 'skyblue',
  }

  $: board = [[]]
  $: hWalls = [[]]
  $: vWalls = [[]]

  const padding = 0.05
  $: size = board.length
  $: unit = (1 - padding * 2) / size
  $: lineWidth = unit * 0.1

  $: hoveredCell = null
  let type

  const fetchBoard = async () => {
    const res = await axios.get('/admin/board')
    board = res.data.board
    board.forEach((cells) => {
      cells.forEach((cell) => {
        cell.color = colorMap[cell.type] ?? 'gray'
      })
    })
    hWalls = res.data.h_walls
    vWalls = res.data.v_walls
  }

  const handleHoverCell = (cell) => {
    hoveredCell = cell
  }

  const handleEditCell = async (cell) => {
    const res = await axios.post('/admin/board/edit/cell', {
      type: type,
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    fetchBoard()
  }

  const handleEditHorizontalWall = async (cell) => {
    const res = await axios.post('/admin/board/edit/h-wall', {
      closed: true,
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    fetchBoard()
  }

  const handleEditVerticalWall = async (cell) => {
    const res = await axios.post('/admin/board/edit/v-wall', {
      closed: true,
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    fetchBoard()
  }

  fetchBoard()
</script>

<div class="container">
  <div class="board-panel">
    <svg viewBox="0 0 1 1">
      <!-- Horizontal lines -->
      {#each { length: size + 1 } as _, i}
        <line
          x1={padding + unit * i}
          y1={padding}
          x2={padding + unit * i}
          y2={1 - padding}
          stroke="black"
          stroke-width={lineWidth}
        />
      {/each}
      <!-- Vertical lines -->
      {#each { length: size + 1 } as _, i}
        <line
          x1={padding}
          y1={padding + unit * i}
          x2={1 - padding}
          y2={padding + unit * i}
          stroke="black"
          stroke-width={lineWidth}
        />
      {/each}
      <!-- Cells -->
      {#each board as row, i}
        {#each row as cell, j}
          <rect
            y={padding + unit * cell.x}
            x={padding + unit * cell.y}
            width={unit}
            height={unit}
            fill={cell.color}
            stroke="none"
            on:mouseover|preventDefault={() => handleHoverCell(cell)}
          />
        {/each}
      {/each}
      <!-- H-Walls -->
      {#each hWalls as row, i}
        {#each row as wall, j}
          {#if wall.closed}
            <line
              y1={padding + unit * wall.x}
              x1={padding + unit * wall.y}
              y2={padding + unit * wall.x}
              x2={padding + unit * (wall.y + 1)}
              stroke="black"
              stroke-width={lineWidth}
            />
          {/if}
        {/each}
      {/each}
      <!-- V-Walls -->
      {#each vWalls as row, i}
        {#each row as wall, j}
          {#if wall.closed}
            <line
              y1={padding + unit * wall.x}
              x1={padding + unit * wall.y}
              y2={padding + unit * (wall.x + 1)}
              x2={padding + unit * wall.y}
              stroke="black"
              stroke-width={lineWidth}
            />
          {/if}
        {/each}
      {/each}

      <!-- Hovered -->
      {#if hoveredCell}
        {#if type === 'H_WALL'}
          <line
            y1={padding + unit * hoveredCell.x}
            x1={padding + unit * hoveredCell.y}
            y2={padding + unit * hoveredCell.x}
            x2={padding + unit * (hoveredCell.y + 1)}
            stroke="black"
            stroke-width={lineWidth}
          />
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="transparent"
            on:click|preventDefault={() => handleEditHorizontalWall(hoveredCell)}
          />
        {:else if type === 'V_WALL'}
          <line
            y1={padding + unit * (hoveredCell.x + 1)}
            x1={padding + unit * hoveredCell.y}
            y2={padding + unit * hoveredCell.x}
            x2={padding + unit * hoveredCell.y}
            stroke="black"
            stroke-width={lineWidth}
          />
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="transparent"
            on:click|preventDefault={() => handleEditVerticalWall(hoveredCell)}
          />
        {:else}
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="#44AAFF66"
            on:click|preventDefault={() => handleEditCell(hoveredCell)}
          />
        {/if}
      {/if}
    </svg>
  </div>
  <ControlPanel bind:type />
</div>

<style lang="scss">
  svg rect,
  svg rect:focus {
    outline: none;
  }

  .container {
    display: flex;
    flex-direction: row;
    background-color: teal;
  }
  .board-panel {
    flex: 1 0 0;
    background-color: aliceblue;
  }
</style>
