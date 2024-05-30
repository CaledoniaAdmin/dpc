<script setup lang="ts">

import {onMounted, ref} from "vue";
import { useWindowSize } from '@vueuse/core'

import {useGlobalStore} from "./stores/global.ts";

import Human from "./components/hr/Human.vue";
import Intellectual from "./components/ip/Intellectual.vue";
import Strategy from "./components/strat/Strategy.vue";
import Trade from "./components/trade/Trade.vue";
import About from "./components/about/About.vue";

import tradeData from '../src/data/trade.ts'
import strategyData from '../src/data/strategy.ts'
import ipData from '../src/data/ip.ts'
import humanData from '../src/data/human.ts'

const globalState = useGlobalStore()

const { width, height } = useWindowSize()

const scrollHash = ref({}) as any

const sectionsArray = [tradeData, humanData, strategyData, ipData] as any[]
const sectionsObjects = [{id: 'Human Rights', data: humanData, key: 'human'}, {id: 'Intellectual Property', data: ipData, key: 'intellectual'}, {id: 'Agency Strategy', data: strategyData, key: 'strategy'}, {id: 'Trade', data: tradeData, key: 'trade'}] as any[]

const handleNavClick = (e: Event) => {

  globalState.$patch({
    activeNav: (e.target as HTMLButtonElement).value
  })

  switch ((e.target as HTMLButtonElement).value) {
    case 'intellectual': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      return window.scrollTo({
        top: scrollHash.value[1],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'trade': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      return window.scrollTo({
        top: scrollHash.value[2],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'strategy': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
     return window.scrollTo({
       top: scrollHash.value[1] * 3,
        left: 0,
        behavior: "smooth",
      })
    }
    case 'human': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      return window.scrollTo({
        top: scrollHash.value[1] * 4,
        left: 0,
        behavior: "smooth",
      })
    }
    default:
      return window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      })
  }
}

const backToTop = () => {
  return window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  })
}

onMounted(() => {
  console.log('App mounted')

  window.scrollTo(0,0)

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
      } else {
        entry.target.classList.remove('show')
      }
    })
  })

  const pageElementArr = document.querySelector('.section') ? Array.from(document.querySelectorAll('.section')) : Array.from(document.querySelectorAll('.mobile-content'))

  scrollHash.value = pageElementArr.reduce((acc, value,  idx) => {
    console.log('value: ', !!value)
    return {...acc, [idx]: idx * Number(height.value) || 0}
  })
  pageElementArr.forEach((el:any) => observer.observe(el))
})
</script>

<template>
  <div v-if="width > 600" class="app-container">
    <div class="navbar-container">
      <div class="mast" @click="handleNavClick">Dean Pinkert Consulting</div>

      <button :class="globalState.activeNav === 'intellectual' ? 'intellectual' : '' " value="intellectual" @click="handleNavClick">Intellectual Property</button>
      <button :class="globalState.activeNav === 'trade' ? 'trade' : '' " value="trade" @click="handleNavClick">Trade</button>
      <button :class="globalState.activeNav === 'strategy' ? 'strategy' : '' " value="strategy" @click="handleNavClick">Agency Strategy</button>
      <button :class="globalState.activeNav === 'human' ? 'human' : '' "  value="human" @click="handleNavClick">Human Rights</button>

    </div>

    <About id="about" class="section" />
    <Intellectual id="intellectual" ref="intellectual" class="section" :height="height" :width="width" :scrollHash="scrollHash"/>
    <Trade id="trade" class="section"/>
    <Strategy id="strategy" class="section"/>
    <Human id="human" ref="human" class="section" />

    <div class="foost"><span>Dean Pinkert Consulting &copy; 2024</span></div>

  </div>
  <div v-else class="app-container-mobile">
    <div class="mobile-header">
      <div class="mast">Dean Pinkert Consulting</div>
    </div>
    <div class="mobile-content" v-for="(page, index) in sectionsObjects" :key="sectionsArray[index].id">
      <div :class="`section-header ${page.key}`">{{page.id.toUpperCase()}}</div>
      <div class="card-container" v-for="article in page.data" :key="article.id">
        <a :href="article.src" target="_blank">
          <span class="card">
            <span class="card-title">{{ article.title }}</span>
            <span class="source">source: <span class="source">{{article.source}}</span></span>
            <span class="linkout">Read More...</span>
          </span>

          <img :src="article.backgroundImg"
               :alt="article.title"
               :style="`
                  position: absolute;
                  width: 100%;
                  text-align: center;
                  color: white;`"
                loading="lazy"
                width="100%"
          />
        </a>
      </div>
    </div>
    <div class="controls">
      <button @click="backToTop">UP</button>
    </div>
    <div v-if="false" class="contact">
      <button>MAIL</button>
    </div>
    <div class="foost"><span>Dean Pinkert Consulting &copy; 2024</span></div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

  html {
    scroll-behavior: smooth;
    position: relative;
    font-family: 'Garamond',sans-serif;
  }

  .foost {
    display: flex;
    justify-content: center;
  }


  .app-container {
    width: 100vw;
    height: 100%;

    scroll-behavior: smooth !important;

    .human, #human {
     background-color: #f65147;
    }

    .strategy, #strategy {
      background-color: #eaeadd;
    }

    .trade,#trade {
      background-color: #f1191b;
    }

    .intellectual, #intellectual {
      background-color: #fec452;
    }

    #human, #strategy, #trade, #intellectual {
      scroll-behavior: smooth !important;
      cursor: pointer;
    }

    .mast {
      display: flex;
      align-self: center;
      position: sticky;
      top: 0;
      cursor: pointer;
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
      width: 250px;
      font-size: 16px;
      line-height: 1em;
      color: black;
      border-right: 0 !important;

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


  .app-container-mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100%;
    position: relative;


    .section-header {
      position: sticky;
      top: 20px;
      z-index: 4;
      height: 40px;
      font-weight: 500;
      font-size: 20px !important;
      display: flex;
      align-items: center;
      font-family: 'EB Garamond',sans-serif;


      &.human, #human {
        background-color: white;
      }

      &.strategy, #strategy {
        background-color: #d9ebe9;
      }

      &.trade,#trade {
        background-color: #2467a0;
        color: white;
      }

      &.intellectual, #intellectual {
        background-color: #1c2159;
        color: white;
      }
    }

    .controls {
      position: sticky;
      margin-left: 80%;
      bottom: 20px;
      z-index: 4;
    }

    .contact {
      position: sticky;
      margin-left: 80%;
      bottom: 80%;
      z-index: 4;
    }
    .mobile-header {
      position: sticky;
      top: 0;
      z-index: 5;
      background-color: white;
      .mast {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }

    .section {
      height: 25vw;
      width: 100vw;
    }



    a {
      color: white;
      position: absolute;
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
    }

    img {
      object-fit: contain;
    }

    .card-container {
      position: relative;
      height: 25vh;
      overflow: hidden;
    }

    .card {
      position: absolute;
      height: 25vh;
      width: 100%;
      z-index: 1;
      color: white;
      font-size: 13px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.36), rgba(0, 0, 0, 0.86));

      .card-title {
        width: 88vw;
      }

      .source {
        padding-top: 15px;
      }

      .linkout {
        font-weight: 400;
        text-decoration: underline;
        margin-top: 15px;
      }
    }
  }

</style>
