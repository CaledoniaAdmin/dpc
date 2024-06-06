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
import {useSeoMeta} from "unhead";



const globalState = useGlobalStore()

const { width, height } = useWindowSize()

const scrollHash = ref({}) as any

const now = new Date()
const currentYear = now.getFullYear()

// useSeoMeta({
//   title: `Pinkert Trade and Human Rights Consulting`,
//   description: 'Pinkert Trade and Human Rights Consulting Company Page',
//   ogTitle: 'Pinkert Trade and Human Rights Consulting',
//   ogDescription: 'Pinkert Trade and Human Rights Consulting Company Page'
// })


const sectionsArray = [tradeData, humanData, strategyData, ipData] as any[]
const sectionsObjects = [{id: 'Human Rights', data: humanData, key: 'human'}, {id: 'Intellectual Property', data: ipData, key: 'intellectual'}, {id: 'Agency Strategy', data: strategyData, key: 'strategy'}, {id: 'Trade', data: tradeData, key: 'trade'}] as any[]

const scrollFn = (positionValue: number) => window.scrollTo({
  top: positionValue,
  left: 0,
  behavior: "smooth",
})
const handleNavClick = (e: Event) => {

  const clickValue =  (e.target as HTMLButtonElement).value

  const setState = (passVal: string)  => globalState.$patch({
    activeNav: passVal
  })

  const baseHashVal = scrollHash.value[1]

  switch (clickValue) {
    case 'intellectual': {
      setState(clickValue)
      return scrollFn(baseHashVal)
    }
    case 'trade': {
      setState(clickValue)
     return scrollFn(scrollHash.value[2])
    }
    case 'strategy': {
     setState(clickValue)
     return scrollFn(baseHashVal * 3)
    }
    case 'human': {
      setState(clickValue)
      return scrollFn(baseHashVal * 4)
    }
    default:
      setState('mast-desktop')
      return scrollFn(0)
  }
}

const backToTop = () => {
  return scrollFn(0)
}

onMounted(() => {
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
  <div v-if="width > 900" class="app-container">
    <div class="navbar-container">
      <div>
        <div class="mast-desktop" @click="handleNavClick">PT&HRC</div>
      </div>

      <div>
        <button :class="globalState.activeNav === 'intellectual' ? 'intellectual' : 'nav-item' " value="intellectual" @click="handleNavClick">INTELLECTUAL PROPERTY</button>
        <button :class="globalState.activeNav === 'trade' ? 'trade' : 'nav-item' " value="trade" @click="handleNavClick">TRADE</button>
        <button :class="globalState.activeNav === 'strategy' ? 'strategy' : 'nav-item' " value="strategy" @click="handleNavClick">AGENCY STRATEGY</button>
        <button :class="globalState.activeNav === 'human' ? 'human' : 'nav-item' "  value="human" @click="handleNavClick">HUMAN RIGHTS</button>
      </div>

    </div>

    <About id="about" class="section" :width="width" />
    <Intellectual id="intellectual" ref="intellectual" class="section" :height="height" :width="width" :scrollHash="scrollHash"/>
    <Trade id="trade" class="section"/>
    <Strategy id="strategy" class="section"/>
    <Human id="human" ref="human" class="section" />

    <div class="foost"><span>Pinkert Trade & Human Rights Consulting &copy; {{ currentYear }}</span></div>

  </div>
  <div v-else class="app-container-mobile">
    <div class="mobile-header">
      <div class="mast">PT & HRC</div>
    </div>
    <About id="about" class="section" :width="width"/>
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
    <div class="foost"><span>Pinkert Trade & Human Rights Consulting &copy; {{ currentYear }}</span></div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

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

    .nav-item {
      font-weight: 400;
    }

    .human, #human {
     background-color: #f65147;
      color: white;
    }

    .strategy, #strategy {
      background-color: #eaeadd;
      color: white;
    }

    .trade,#trade {
      background-color: #6dcbdf;
      color: white;
    }

    .intellectual, #intellectual {
      background-color: #fec452;
      color: white;
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
      font-family: 'EB Garamond',sans-serif;
    }

    .mast-desktop {
      display: flex;
      align-self: center;
      position: sticky;
      top: 5px;
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;
      font-family: 'EB Garamond', sans-serif;
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
      justify-content: space-between;
      position: sticky;
      top: 0;
      z-index: 3;
      background: white;
      font-family: Tahoma , sans-serif;
      font-weight: 700;
    }

    button {
      cursor: pointer;
      background-color: transparent;
      width: 260px; /*BUTTON*/
      font-size: 16px;
      line-height: 1em;
      color: black;
      border-right: 0 !important;
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
      top: 0;
      z-index: 4;
      height: 40px;
      padding: 0 15px;
      font-weight: 500;
      font-size: 20px !important;
      display: flex;
      align-items: center;
      font-family: 'EB Garamond',sans-serif;


      &.human, #human {
        background-color: #f65147;
        color: white;
      }

      &.strategy, #strategy {
        background-color: #eaeadd;
      }

      &.trade,#trade {
        background-color: #6dcbdf;
        color: white;
      }

      &.intellectual, #intellectual {
        background-color: #fec452;
        color: white;
      }
    }

    .controls {
      position: absolute;
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
