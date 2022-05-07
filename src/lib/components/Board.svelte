<script>
  import { createEventDispatcher } from 'svelte'

  import { iconMap } from '$lib/utils/utils'
  import RatioElement from './RatioElement.svelte'
  import Player from './Player.svelte'
import ItemCount from './ItemCount.svelte';

  const dispatch = createEventDispatcher()

  export let clickable = false
  export let cells = [[]]
  export let items = []
  export let hWalls = [[]]
  export let vWalls = [[]]
  export let players = []
  export let type

  const padding = 0.05
  $: size = cells.length
  $: unit = (1 - padding * 2) / size
  $: lineWidth = unit * 0.02
  $: wallWidth = lineWidth * 5

  $: hoveredCell = null

  const handleHoverCell = (cell) => {
    hoveredCell = cell
  }

  const handleClickCell = async (cell) => {
    dispatch('clickCell', {
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    hoveredCell = null
  }

  const handleClickHorizontalWall = async (cell) => {
    dispatch('clickHorizontalWall', {
      closed: hWalls[cell.x][cell.y].closed,
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    hoveredCell = null
  }

  const handleClickVerticalWall = async (cell) => {
    dispatch('clickVerticalWall', {
      closed: vWalls[cell.x][cell.y].closed,
      x: hoveredCell.x,
      y: hoveredCell.y,
    })
    hoveredCell = null
  }
</script>

<div class="board-panel">
  <RatioElement>
    <svg class="board-svg" viewBox="0 0 1 1">
      <!-- Cells -->
      {#each cells as row, i}
        {#each row as cell, j}
          <svg
            y={padding + unit * cell.x}
            x={padding + unit * cell.y}
            width={unit}
            height={unit}
            on:focus|preventDefault={() => handleHoverCell(cell)}
            on:mouseover|preventDefault={() => handleHoverCell(cell)}
          >
            <svelte:component this={iconMap[cell.type]} />
          </svg>
          <!-- Items -->
          {#each cell.items.slice(0, 1) as item}
            <svg
              y={padding + unit * item.x}
              x={padding + unit * item.y}
              width={unit}
              height={unit}
              on:focus|preventDefault={() => handleHoverCell(item)}
              on:mouseover|preventDefault={() => handleHoverCell(item)}
            >
              <svelte:component this={iconMap[item.type]} />
            </svg>
          {/each}
          <!-- Item count -->
          {#if cell.items.length > 1}
            <svg y={padding + unit * cell.x} x={padding + unit * cell.y} width={unit} height={unit}>
              <ItemCount count={cell.items.length} />
            </svg>
          {/if}
        {/each}
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
      {#each hWalls as row, i}
        {#each row as wall, j}
          {#if wall.closed}
            <line
              y1={padding + unit * wall.x}
              x1={padding + unit * wall.y}
              y2={padding + unit * wall.x}
              x2={padding + unit * (wall.y + 1)}
              stroke="black"
              stroke-width={wallWidth}
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
              stroke-width={wallWidth}
              stroke-linecap="round"
            />
          {/if}
        {/each}
      {/each}

      <!-- Players -->
      {#each players as player}
        <svg y={padding + unit * player.x} x={padding + unit * player.y} width={unit} height={unit}>
          <Player color={player.color} />
        </svg>
      {/each}

      <!-- Hovered -->
      {#if clickable && hoveredCell}
        {#if type === 'H_WALL'}
          <line
            y1={padding + unit * hoveredCell.x}
            x1={padding + unit * hoveredCell.y}
            y2={padding + unit * hoveredCell.x}
            x2={padding + unit * (hoveredCell.y + 1)}
            stroke="#44AAFFAA"
            stroke-width={wallWidth}
            stroke-linecap="round"
          />
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="transparent"
            on:click|preventDefault={() => handleClickHorizontalWall(hoveredCell)}
          />
        {:else if type === 'V_WALL'}
          <line
            y1={padding + unit * (hoveredCell.x + 1)}
            x1={padding + unit * hoveredCell.y}
            y2={padding + unit * hoveredCell.x}
            x2={padding + unit * hoveredCell.y}
            stroke="#44AAFFAA"
            stroke-width={wallWidth}
            stroke-linecap="round"
          />
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="transparent"
            on:click|preventDefault={() => handleClickVerticalWall(hoveredCell)}
          />
        {:else}
          <rect
            y={padding + unit * hoveredCell.x}
            x={padding + unit * hoveredCell.y}
            width={unit}
            height={unit}
            fill="#44AAFF66"
            on:click|preventDefault={() => handleClickCell(hoveredCell)}
          />
        {/if}
      {/if}
    </svg>
  </RatioElement>
</div>

<style lang="scss">
  svg rect,
  svg rect:focus {
    outline: none;
  }

  .board-panel {
    flex: 1 1 auto;
    background-color: gray;
  }

  .board-svg {
    margin: auto;
  }
</style>
