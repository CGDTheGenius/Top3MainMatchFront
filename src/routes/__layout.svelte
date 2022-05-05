<!-- <header>
  <h1>더지니어스 Top3 메인 매치 : 유적 탐험 레이스</h1>
</header> -->

<div class="container">
  <slot />
</div>

<style global>
  html,
  body,
  #svelte {
    height: 100%;
    background-color: black;
    margin: 0;
  }

  h1 {
    color: white;
    margin-left: 16px;
  }

  .container {
    height: 100%;
  }
</style>
