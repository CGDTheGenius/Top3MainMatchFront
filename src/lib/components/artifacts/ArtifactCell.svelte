<script>
  import { increase_brightness } from '$lib/utils/utils'

  export let color = '#999'
</script>

<svg viewBox="0 0 100 100" style="filter:url(#dropshadow)">
  <path d="M 0 0 L 100 100" stroke="transparent" />
  <path
    d="M 30 20 L 10 35 L 50 90 L 90 35 L 70 20 Z"
    fill={increase_brightness(color, 50)}
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M 65 40 L 50 90 L 90 35 Z"
    fill={color}
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M 35 40 L 50 90 L 10 35 Z"
    fill={increase_brightness(color, 80)}
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M 35 40 L 50 90 Z M 10 35 L 35 40 L 65 40"
    fill="none"
    stroke={color}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
