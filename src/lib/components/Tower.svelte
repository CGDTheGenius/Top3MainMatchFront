<script>
  let color = '#222'
</script>

<svg viewBox="0 -5 100 100" style="filter:url(#dropshadow)">
  <path d="M 0 0 L 100 100" stroke="transparent" />
  <path
    d="M 30 80 L 50 40 L 70 80 L 65 70 L 35 70 L 60 60 L 45 55"
    stroke={color}
    fill="none"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <circle
    cx="50"
    cy="38"
    r="3"
    stroke={color}
    fill="none"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="
      M 40 45 A 12 12 0 0 1 40 30
      M 33 52 A 24 24 0 0 1 33 23
      M 26 59 A 36 36 0 0 1 26 16
      M 60 45 A 12 12 0 0 0 60 30
      M 67 52 A 24 24 0 0 0 67 23
      M 74 59 A 36 36 0 0 0 74 16
    "
    stroke={color}
    fill="none"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>
