<script>
  export let count
</script>

<svg style="filter:url(#dropshadow)" viewBox="0 0 100 100">
  <path d="M 0 0 L 100 100" stroke="transparent" />
  <text
    x="50"
    y="50"
    dominant-baseline="middle"
    text-anchor="middle"
    fill="white"
    stroke="black"
    stroke-width="1"
    font-weight="700"
    font-size="30"
    opacity="0.9"
    >{count}
  </text>
</svg>
