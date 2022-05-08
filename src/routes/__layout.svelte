<!-- <header>
  <h1>더지니어스 Top3 메인 매치 : 유적 탐험 레이스</h1>
</header> -->

<div class="container">
  <filter id="dropshadow" height="130%">
    <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
    <!-- stdDeviation is how much to blur -->
    <feOffset dx="2" dy="2" result="offsetblur" />
    <!-- how much to offset -->
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.7" />
      <!-- slope is the opacity of the shadow -->
    </feComponentTransfer>
    <feMerge>
      <feMergeNode />
      <!-- this contains the offset blurred image -->
      <feMergeNode in="SourceGraphic" />
      <!-- this contains the element that the filter is applied to -->
    </feMerge>
  </filter>
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

  * {
    font-family: 'Nanum Barun Gothic';
  }

  h1 {
    color: white;
    margin-left: 16px;
  }

  .container {
    height: 100%;
  }
</style>
