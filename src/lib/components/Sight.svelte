<script>
  import { iconMap } from '$lib/utils/utils'

  export let player
  export let cells = [[]]
  let croppedCells
  $: {
    player
    cells
    const _cells = []
    for (let i = 0; i < 3; ++i) {
      if (!player) break
      _cells.push([])
      for (let j = 0; j < 3; ++j) {
        const ii = player.x - 1 + i
        const jj = player.y - 1 + j
        if (cells[ii] && cells[ii][jj]) {
          _cells[i].push(cells[ii][jj])
        }
      }
    }
    croppedCells = _cells
  }
  export let items = []
  $: circledItems = items.map(getCircledItem)
  export let hWalls = [[]]
  export let vWalls = [[]]

  const padding = 0.05
  $: size = croppedCells.length
  $: unit = (1 - padding * 2) / size
  $: lineWidth = unit * 0.1

  const getCircledItem = (item) => {
    const dx = player.x - item.x
    const dy = player.y - item.y
    const d = Math.sqrt(dx * dx + dy * dy)
    return {
      ...item,
      dx: dx,
      dy: dy,
      cx: d === 0 ? 0 : dx / d,
      cy: d === 0 ? 0 : dy / d,
      d: d,
    }
  }
</script>

<svg class="board-svg" viewBox="0 0 1 1">
  <!-- Horizontal lines -->
  {#each { length: size + 1 } as _, i}
    <line
      x1={padding + unit * i}
      y1={padding}
      x2={padding + unit * i}
      y2={1 - padding}
      stroke="black"
      stroke-width={lineWidth}
      stroke-linecap="round"
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
      stroke-linecap="round"
    />
  {/each}
  <!-- Cells -->
  {#each croppedCells as row, i}
    {#each row as cell, j}
      <svg y={padding + unit * cell.x} x={padding + unit * cell.y} width={unit} height={unit}>
        <svelte:component this={iconMap[cell.type]} />
      </svg>
      <!-- Items -->
      {#each cell.items as item}
        <svg y={padding + unit * item.x} x={padding + unit * item.y} width={unit} height={unit}>
          <svelte:component this={iconMap[item.type]} />
        </svg>
      {/each}
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
          stroke-linecap="round"
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
          stroke-linecap="round"
        />
      {/if}
    {/each}
  {/each}
  <!-- Circle -->
  <path
    d="M 0.5 {padding} A 0.1 0.1 0 0 1 0.5 {1 - padding} L 0.5 1 L 1 1 L 1 0 L 0.5 0"
    fill="black"
  />
  <path
    d="M 0.5 {padding} A 0.1 0.1 0 0 0 0.5 {1 - padding} L 0.5 1 L 0 1 L 0 0 L 0.5 0"
    fill="black"
  />
  <!-- Items -->
  {#each circledItems as item}
    {#if Math.min(circledItems.dx, circledItems.dy) >= 2}
      <svg
        y={((item.cx + 1) * (1 - 2 * padding)) / 2 + padding - 0.03}
        x={((item.cy + 1) * (1 - 2 * padding)) / 2 + padding - 0.03}
        width={0.06}
        height={0.06}
        viewBox="0 0 1 1"
      >
        <circle cy={0.5} cx={0.5} r="0.5" fill="white" stroke="black" stroke-width="0.01" />
        <svelte:component this={iconMap[item.type]} />
      </svg>
    {/if}
  {/each}
</svg>

<style lang="scss">
  .board-svg {
    margin: auto;
  }
</style>
