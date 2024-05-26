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

const scrollHash = ref({}) as object

const sectionsArray = [tradeData, humanData, strategyData, ipData] as any[]
const sectionsObjects = [{id: 'Human Rights', data: humanData}, {id: 'Intellectual Property', data: ipData}, {id: 'Agency Strategy', data: strategyData}, {id: 'Trade', data: tradeData}] as any[]

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
        // @ts-ignore
        top: scrollHash?.value[1],
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
        // @ts-ignore
        top: scrollHash?.value[2],
        left: 0,
        behavior: "smooth",
      })
    }
    case 'trade': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
     return window.scrollTo({
       // @ts-ignore
       top: scrollHash?.value[1] * 3,
        left: 0,
        behavior: "smooth",
      })
    }
    case 'about': {
      globalState.$patch({
        activeNav: (e.target as HTMLButtonElement).value
      })
      // console.log('about: ', scrollHash.value[3])
      return window.scrollTo({
        // @ts-ignore
        top: scrollHash?.value[1] * 4,
        left: 0,
        behavior: "smooth",
      })
    }
    default:
      return console.log('error state')
  }
}

const backToTop = () => {
  return window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  })
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

  const pageElementArr = document.querySelector('.section') ? Array.from(document.querySelectorAll('.section')) : Array.from(document.querySelectorAll('.mobile-content'))

  const hash = pageElementArr.reduce((acc: any, idx: any) => {
    return {...acc, [idx]: idx * Number(height.value) || 0}
  })

  //@ts-ignore
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
    <div class="foost"><span>Dean Pinkert Consulting &copy; 2024</span></div>

  </div>
  <div v-else class="app-container-mobile">
    <div class="mobile-header">
      <div class="mast">Dean Pinkert Consulting</div>
    </div>
    <div class="mobile-content" v-for="(page, index) in sectionsObjects" :key="sectionsArray[index].id">
      <div class="section-header">{{page.id}}</div>
      <div class="card-container" v-for="article in page.data" :key="article.id">
        <a :href="article.src" target="_blank">
          <span class="card">
            <span class="card-title">{{ article.title }}</span>
            <span>source: <span class="source">{{article.source}}</span></span>
            <span class="linkout">Read More...</span>
          </span>

          <img :src="article.backgroundImg" :style="`
              position: absolute;
              width: 100%;
              text-align: center;
              color: white;`"/>
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
      cursor: pointer;
    }

    #strategy {
      margin: 10px 0 70px 0;
    }

    .mast {
      display: flex;
      align-self: center;
      position: sticky;
      top: 0;
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
      background-color: white;
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

      .linkout {
        font-weight: 400;
        text-decoration: underline;
        margin-top: 35px;
      }
    }
  }

</style>
