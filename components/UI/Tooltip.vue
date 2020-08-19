<template>
  <span class="tooltiptext"><slot></slot></span>
</template>

<script>
  export default {
    name: 'Tooltip'
  }

</script>

<style>
  /* Tooltip */
  .tooltip {
    @apply relative;
  }

  .tooltip .tooltiptext {
    width: 150px;
    top: 140%;
    left: 50%;
    margin-left: -75px;
    @apply p-2 invisible absolute z-10 bg-josa-black text-white text-center rounded-md opacity-80;
  }

  .tooltip .tooltiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -10px;
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #2e3436 transparent;
  }

  .tooltip:hover .tooltiptext {
    visibility: visible;
  }

  /*****/

</style>
