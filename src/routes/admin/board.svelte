<script>
  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import axios from '$lib/utils/axios.js'
  import login from '$lib/utils/login'
  import { onMount } from 'svelte'

  let data = {}

  const fetchBoard = async () => {
    const res = await axios.get('/board/view')
    data = res.data
  }

  onMount(() => {
    login()
    setInterval(fetchBoard, 1000)
  })
</script>

<div class="container">
  <Board {...data} />
  <LabelPanel controllable={false} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
  }
</style>
