<script setup lang="ts">

import {ref} from "vue";
import {useScroll} from "@vueuse/core";

import {useGlobalStore} from "./stores/global.ts";

import Human from "./components/hr/Human.vue";
import Intellectual from "./components/ip/Intellectual.vue";
import Strategy from "./components/strat/Strategy.vue";
import Trade from "./components/trade/Trade.vue";

const globalState = useGlobalStore()
// const isActive = ref('human')


const human = ref('human')
const intellectual = ref('intellectual')
const strategy = ref('strategy')
const trade = ref('trade')

const handleNavClick = (e: Event) => {
  console.log('handleNavClick: ', (e.target as HTMLButtonElement).id)

  globalState.$patch({
    activeNav: (e.target as HTMLButtonElement).id
  })

  console.log('patched value: ', globalState.$state.activeNav, document.querySelector('.human'))

  switch ((e.target as HTMLButtonElement).value) {
    case 'intellectual': {
      console.log('intellectual')
      // ;window.scroll({x: 0, y: 10000, behavior: "smooth"})
      // useScroll(document.querySelector('.human'))
      // scrollTo(document.querySelector('.human'))
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="mast">Dean Pinkert Consulting</div>
    <div class="navbar-container">
      <button value="human" @click="handleNavClick">Human Rights</button>
      <button value="intellectual" @click="handleNavClick">Intellectual Property</button>
      <button value="strategy" @click="handleNavClick">Agency Strategy</button>
      <button value="trade" @click="handleNavClick">Trade</button>
    </div>
    <br/>

    <Human id="human" ref="human" />
    <Strategy id="strategy" />
    <Trade id="trade"/>
    <Intellectual id="intellectual" ref="intellectual"/>
    <br />
    <div class="clients">Client Bar</div>
    <div class="footer">Footer</div>
  </div>
</template>

<style scoped>
  .app-container {
    width: 100vw;
    height: 100%;

    scroll-behavior: smooth !important;

    #human, #strategy, #trade, #intellectual {
      scroll-behavior: smooth !important;
    }

    .mast {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin-bottom: 25px;
    }

    .main {
      min-height: 100vh;
    }

    .clients {
      height: 75px;
    }

    .footer {
      height: 100%;
    }

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
  }
</style>
