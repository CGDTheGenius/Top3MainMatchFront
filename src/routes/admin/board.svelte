<script>
  import Board from '$lib/components/Board.svelte'
  import axios from '$lib/utils/axios.js'

  let data = {}

  const fetchBoard = async () => {
    const res = await axios.get('/admin/board')
    data = res.data
  }

  setInterval(fetchBoard, 1000)
</script>

<div class="container">
  <Board {...data} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: row;
  }
</style>
