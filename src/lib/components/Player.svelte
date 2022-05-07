<script>
  import { increase_brightness } from '$lib/utils/utils'

  export let color = 'red'
</script>

<svg viewBox="0 0 100 100" style="filter:url(#dropshadow)">
  <path d="M 50 10 L 10 90 L 50 70 Z" fill={increase_brightness(color, 50)} stroke={color} />
  <path d="M 50 10 L 90 90 L 50 70 Z" fill={color} stroke={color} />
</svg>
