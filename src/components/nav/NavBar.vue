<script setup lang="ts">

import {useGlobalStore} from "../../stores/global.ts";
import {ref} from "vue";

const globalState = useGlobalStore()

const human = ref('human')
const intellectual = ref('intellectual')
const strategy = ref('strategy')
const trade = ref('trade')

  const handleNavClick = (e: Event) => {
    console.log('handleNavClick: ', (e.target as HTMLButtonElement).id)

    globalState.$patch({
      activeNav: (e.target as HTMLButtonElement).id
    })

    console.log('patched value: ', globalState.$state.activeNav)

    switch ((e.target as HTMLButtonElement).id) {
      case 'trade ': {
        return trade.scrollIntoView({behavior: 'smooth'})
      }
    }
  }
</script>

<template>
  <div class="navbar-container">
    <button id="human" @click="handleNavClick">Human Rights</button>
    <button id="intellectual" @click="handleNavClick">Intellectual Property</button>
    <button id="strategy" @click="handleNavClick">Agency Strategy</button>
    <button id="trade" @click="handleNavClick">Trade</button>
  </div>
</template>

<style scoped>
  .navbar-container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    width: 200px;
    font-size: 24px;
    color: black;
  }
</style>