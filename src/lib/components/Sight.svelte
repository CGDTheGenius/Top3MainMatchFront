<script>
  import { colorMap } from '$lib/utils/utils'

  export let cells = []
  export let player

  $: {
    cells.forEach((row) => {
      row.forEach((cell) => {
        cell.color = colorMap[cell.type] ?? 'gray'
      })
    })
  }

  const padding = 0.05
  $: size = cells.length
  $: unit = (1 - padding * 2) / size
  $: lineWidth = unit * 0.1
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
  {#each cells as row, i}
    {#each row as cell, j}
      <rect
        y={padding + unit * cell.x}
        x={padding + unit * cell.y}
        width={unit}
        height={unit}
        fill={cell.color}
        stroke="none"
      />
    {/each}
  {/each}
</svg>

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
