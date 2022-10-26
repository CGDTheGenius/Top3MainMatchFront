<script>
  import Board from '$lib/components/Board.svelte'
  import LabelPanel from '$lib/components/LabelPanel.svelte'
  import axios from '$lib/utils/axios.js'
  import login from '$lib/utils/login'
  import { onMount } from 'svelte'

  let data = {}

  const fetchBoard = async () => {
    const res = await axios.get('/board/view')
    data = {
      ...res.data,
      hWalls: res.data.h_walls,
      vWalls: res.data.v_walls,
    }
  }

  onMount(() => {
    login()
    fetchBoard()
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
