<script setup lang="ts">

import {onMounted, ref} from "vue";
import {useScroll} from "@vueuse/core";
import { useWindowSize } from '@vueuse/core'

import {useGlobalStore} from "./stores/global.ts";

import Human from "./components/hr/Human.vue";
import Intellectual from "./components/ip/Intellectual.vue";
import Strategy from "./components/strat/Strategy.vue";
import Trade from "./components/trade/Trade.vue";

const globalState = useGlobalStore()
// const isActive = ref('human')

const { width, height } = useWindowSize()

const human = ref('human')
const intellectual = ref('intellectual')
// const strategy = ref('strategy')
// const trade = ref('trade')

const scrollHash = ref({})

const handleNavClick = (e: Event) => {
  console.log('handleNavClick: ', (e.target as HTMLButtonElement).id)

  globalState.$patch({
    activeNav: (e.target as HTMLButtonElement).id
  })

  console.log('patched value: ', globalState.$state.activeNav, document.querySelector('.human'))

  switch ((e.target as HTMLButtonElement).value) {
    case 'human': {
      console.log('human')
      return window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }
    case 'intellectual': {
      console.log('intellectual')
      return window.scrollTo({
        top: scrollHash.value[1],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'strategy': {
      console.log('strategy')
      return window.scrollTo({
        top: scrollHash.value[2],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'trade': {
     console.log('trade')
     return window.scrollTo({
        top: scrollHash.value[3],
        left: 0,
        behavior: "smooth",
      })
    }
    default:
      return console.log('error state')
  }
}

onMounted(() => {
  console.log('Human page mounted')

  // I know the height of the screen and how many sections

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('entry: ', entry)

      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.remove('show')
      }
    })
  })

  const pageElementArr = Array.from(document.querySelectorAll('.section'))

  console.log('pageElementArr: ', pageElementArr)

  pageElementArr.forEach((el:any) => observer.observe(el))

  console.log('width/height: ', width.value, height.value, pageElementArr.length)

  const hash = pageElementArr.reduce((acc, value, idx) => {
    console.log('acc/post/idx: ', idx)

    return {...acc, [idx]: idx * Number(height.value) || 0}
  })

  scrollHash.value = hash

  console.log('scrollHash: ', scrollHash.value)

})
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

    <Human id="human" ref="human" class="section" />
    <Intellectual id="intellectual" ref="intellectual" class="section"/>
    <Strategy id="strategy" class="section"/>
    <Trade id="trade" class="section"/>
    <br />
    <div class="clients">Client Bar</div>
    <div class="footer">Footer</div>
    <button class="up-btn" value="human" @click="handleNavClick"> UP </button>
  </div>
</template>

<style scoped>

  html {
    scroll-behavior: smooth;
    position: relative;
  }

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
      position: sticky;
      top: 0;
      z-index: 1;
      background: white;
    }

    button {
      cursor: pointer;
      background-color: transparent;
      width: 200px;
      font-size: 24px;
      color: black;
    }
    .up-btn {
      position: sticky;
      bottom: 0;
      margin-left: 80%;

    }
  }
</style>
