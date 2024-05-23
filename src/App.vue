<script setup lang="ts">

import {onMounted, ref} from "vue";
import { useWindowSize } from '@vueuse/core'

import {useGlobalStore} from "./stores/global.ts";

import Human from "./components/hr/Human.vue";
import Intellectual from "./components/ip/Intellectual.vue";
import Strategy from "./components/strat/Strategy.vue";
import Trade from "./components/trade/Trade.vue";
import About from "./components/about/About.vue";

const globalState = useGlobalStore()

const { width, height } = useWindowSize()

const scrollHash = ref({}) as object

const handleNavClick = (e: Event) => {

  globalState.$patch({
    activeNav: (e.target as HTMLButtonElement).value
  })

  console.log('activeNav: ', globalState.activeNav)

  switch ((e.target as HTMLButtonElement).value) {
    case 'human': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      console.log('human')
      return window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
    }
    case 'intellectual': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      console.log('intellectual')
      return window.scrollTo({
        top: scrollHash.value[1],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'strategy': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      console.log('strategy')
      return window.scrollTo({
        top: scrollHash.value[2],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'trade': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
     console.log('trade: ', scrollHash.value[3])
     return window.scrollTo({
        top: scrollHash.value[1] * 3,
        left: 0,
        behavior: "smooth",
      })
    }
    case 'about': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      console.log('about: ', scrollHash.value[3])
      return window.scrollTo({
        top: scrollHash.value[1] * 4,
        left: 0,
        behavior: "smooth",
      })
    }
    default:
      return console.log('error state')
  }
}

onMounted(() => {
  console.log('App mounted')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log('entry in app.vue: ', entry, (entry.target as HTMLElement).id ,globalState)
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.remove('show')
      }
    })
  })

  const pageElementArr = Array.from(document.querySelectorAll('.section'))

  const hash = pageElementArr.reduce((acc, value, idx) => {
    return {...acc, [idx]: idx * Number(height.value) || 0}
  })

  scrollHash.value = hash


  pageElementArr.forEach((el:any) => observer.observe(el))
})
</script>

<template>
  <div v-if="width > 600" class="app-container">
    <div class="navbar-container">
      <div class="mast">Dean Pinkert Consulting</div>

      <button :class="globalState.activeNav === 'human' ? 'active' : '' "  value="human" @click="handleNavClick">Human Rights</button>
      <button :class="globalState.activeNav === 'intellectual' ? 'active' : '' " value="intellectual" @click="handleNavClick">Intellectual Property</button>
      <button :class="globalState.activeNav === 'strategy' ? 'active' : '' " value="strategy" @click="handleNavClick">Agency Strategy</button>
      <button :class="globalState.activeNav === 'trade' ? 'active' : '' " value="trade" @click="handleNavClick">Trade</button>
      <button :class="globalState.activeNav === 'about' ? 'active' : '' " value="about" @click="handleNavClick">About</button>
    </div>
    <br/>

    <Human id="human" ref="human" class="section" />
    <Intellectual id="intellectual" ref="intellectual" class="section" :height="height" :width="width" :scrollHash="scrollHash"/>
    <Strategy id="strategy" class="section"/>
    <Trade id="trade" class="section"/>
    <About id="about" class="section" />
<!--    <br />-->
<!--    <div class="clients">Client Bar</div>-->
<!--    <div class="footer">Footer</div>-->
<!--    <button class="up-btn" value="human" @click="handleNavClick"> UP </button>-->
  </div>
  <div v-else class="app-container">
    <h1>MOBILE VIEW</h1>
  </div>
  <div class="foost"><span>Dean Pinkert Consulting &copy; 2024</span></div>
</template>

<style scoped>

  html {
    scroll-behavior: smooth;
    position: relative;
  }

  .foost {
    display: flex;
    justify-content: center;
  }


  .app-container {
    width: 100vw;
    height: 100%;

    scroll-behavior: smooth !important;


    #human, #strategy, #trade, #intellectual {
      scroll-behavior: smooth !important;
    }

    #strategy {
      margin: 10px 0 70px 0;
    }

    .mast {
      display: flex;
      align-self: center;
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
      z-index: 3;
      background: white;
    }

    button {
      cursor: pointer;
      background-color: transparent;
      width: 200px;
      font-size: 24px;
      color: black;
      border-bottom: 5px solid white;

      &.active {
        border-bottom: 5px solid red;
        border-bottom-right-radius: unset !important;
        border-bottom-left-radius: unset !important;
      }
    }

    .up-btn {
      position: sticky;
      bottom: 0;
      margin-left: 80%;

    }

    .show {
      opacity: 1;
    }

    .section {
      opacity: 0;

      &.show {
        opacity: 1;
        transition: all 1s;
      }
    }
  }
</style>
