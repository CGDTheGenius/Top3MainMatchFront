<script>
  import { iconMap } from '$lib/utils/utils'
  import ItemCount from './ItemCount.svelte'
  import Player from './Player.svelte'

  export let player = {
    x: 0,
    y: 0,
    unlocked: '',
  }
  export let cells = []
  export let items = []
  $: circledItems = items.map((item) => getCircledItem(item, player))
  export let hWalls = [[]]
  export let vWalls = [[]]
  export let others = []

  const padding = 0.05
  $: size = 3
  $: unit = (1 - padding * 2) / size
  $: lineWidth = unit * 0.02
  $: wallWidth = lineWidth * 5

  const getCircledItem = (item, player) => {
    const dx = item.x - player.x
    const dy = item.y - player.y
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
  <!-- Cells -->
  {#each cells as cell, i}
    <svg
      y={padding + unit * (cell.x - player.x + 1)}
      x={padding + unit * (cell.y - player.y + 1)}
      width={unit}
      height={unit}
    >
      <svelte:component this={iconMap[cell.type]} />
    </svg>
    <!-- Items -->
    {#each cell.items.slice(0, 1) as item}
      <svg
        y={padding + unit * (item.x - player.x + 1)}
        x={padding + unit * (item.y - player.y + 1)}
        width={unit}
        height={unit}
      >
        <svelte:component this={iconMap[item.type]} />
      </svg>
    {/each}
    <!-- Item count -->
    {#if cell.items.length > 1}
      <svg
        y={padding + unit * (cell.x - player.x + 1)}
        x={padding + unit * (cell.y - player.y + 1)}
        width={unit}
        height={unit}
      >
        <ItemCount count={cell.items.length} />
      </svg>
    {/if}
  {/each}
  <!-- Horizontal lines -->
  {#each { length: size + 1 } as _, i}
    <line
      x1={padding + unit * i}
      y1={padding}
      x2={padding + unit * i}
      y2={1 - padding}
      stroke="gray"
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
      stroke="gray"
      stroke-width={lineWidth}
      stroke-linecap="round"
    />
  {/each}
  <!-- H-Walls -->
  {#each hWalls as wall, j}
    {#if wall.closed}
      <line
        y1={padding + unit * (wall.x - player.x + 1)}
        x1={padding + unit * (wall.y - player.y + 1)}
        y2={padding + unit * (wall.x - player.x + 1)}
        x2={padding + unit * (wall.y - player.y + 1 + 1)}
        stroke="black"
        stroke-width={wallWidth}
        stroke-linecap="round"
      />
    {/if}
  {/each}
  <!-- V-Walls -->
  {#each vWalls as wall, j}
    {#if wall.closed}
      <line
        y1={padding + unit * (wall.x - player.x + 1)}
        x1={padding + unit * (wall.y - player.y + 1)}
        y2={padding + unit * (wall.x + 1 - player.x + 1)}
        x2={padding + unit * (wall.y - player.y + 1)}
        stroke="black"
        stroke-width={wallWidth}
        stroke-linecap="round"
      />
    {/if}
  {/each}
  <!-- Artifact Walls -->
  {#each cells as cell, i}
    {#each cell.items as item}
      {#if !player.unlocked.includes(item.type)}
        <line
          y1={padding + unit * (item.x - player.x + 1)}
          x1={padding + unit * (item.y - player.y + 1)}
          y2={padding + unit * (item.x - player.x + 1 + 1)}
          x2={padding + unit * (item.y - player.y + 1)}
          stroke="black"
          stroke-width={wallWidth}
          stroke-linecap="round"
        />
        <line
          y1={padding + unit * (item.x - player.x + 1)}
          x1={padding + unit * (item.y - player.y + 1 + 1)}
          y2={padding + unit * (item.x - player.x + 1 + 1)}
          x2={padding + unit * (item.y - player.y + 1 + 1)}
          stroke="black"
          stroke-width={wallWidth}
          stroke-linecap="round"
        />
        <line
          y1={padding + unit * (item.x - player.x + 1 + 1)}
          x1={padding + unit * (item.y - player.y + 1)}
          y2={padding + unit * (item.x - player.x + 1 + 1)}
          x2={padding + unit * (item.y - player.y + 1 + 1)}
          stroke="black"
          stroke-width={wallWidth}
          stroke-linecap="round"
        />
        <line
          y1={padding + unit * (item.x - player.x + 1 + 1)}
          x1={padding + unit * (item.y - player.y + 1)}
          y2={padding + unit * (item.x - player.x + 1 + 1)}
          x2={padding + unit * (item.y - player.y + 1 + 1)}
          stroke="black"
          stroke-width={wallWidth}
          stroke-linecap="round"
        />
      {/if}
    {/each}
  {/each}
  <!-- Player -->
  <svg y={padding + unit * 1} x={padding + unit * 1} width={unit} height={unit}>
    <Player color={player.color} />
  </svg>
  <!-- Other Players -->
  {#each others as other}
    <svg
      y={padding + unit * (other.x - player.x + 1)}
      x={padding + unit * (other.y - player.y + 1)}
      width={unit}
      height={unit}
    >
      <Player color={other.color} />
    </svg>
  {/each}
  <!-- Circle -->
  <path
    d="M 0.5 {padding} A 0.1 0.1 0 0 1 0.5 {1 - padding} L 0.45 1 L 1 1 L 1 0 L 0.45 0"
    fill="black"
  />
  <path
    d="M 0.5 {padding} A 0.1 0.1 0 0 0 0.5 {1 - padding} L 0.5 1 L 0 1 L 0 0 L 0.5 0"
    fill="black"
  />
  <!-- Items -->
  {#each circledItems as item}
    {#if Math.max(Math.abs(item.dx), Math.abs(item.dy)) >= 2}
      <svg
        style="filter:url(#dropshadow)"
        y={((item.cx + 1) * (1 - 2 * padding)) / 2 + padding - 0.03}
        x={((item.cy + 1) * (1 - 2 * padding)) / 2 + padding - 0.03}
        width={0.06}
        height={0.06}
        viewBox="0 0 1 1"
      >
        <circle cy={0.5} cx={0.5} r="0.5" fill="white" stroke="gray" stroke-width="0.05" />
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
