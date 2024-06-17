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
// import {useSeoMeta} from "unhead";



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

const setState = (passVal: string)  => globalState.$patch({
  activeNav: passVal
})
const handleNavClick = (e: Event) => {

  const clickValue =  (e.target as HTMLButtonElement).value

  const baseHashVal = scrollHash.value[1]

  switch (clickValue) {
    case 'intellectual': {
      setState(clickValue)
      return scrollFn(baseHashVal * 3)
    }
    case 'trade': {
      setState(clickValue)
      return scrollFn(baseHashVal)
    }
    case 'strategy': {
     setState(clickValue)
      return scrollFn(scrollHash.value[2])

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

  const options = {
    threshold: .50
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        setState(entry.target.id)
        return
      } else {
        entry.target.classList.remove('show')
        return
      }
    })

  }, options)

  const pageElementArr = document.querySelector('.section') ? Array.from(document.querySelectorAll('.section')) : Array.from(document.querySelectorAll('.mobile-content'))

  scrollHash.value = pageElementArr.reduce((acc, value,  idx) => {
    console.log('value: ', !!value)
    return {...acc, [idx]: idx * Number(height.value) || 0}
  })

  pageElementArr.forEach((el:any) => observer.observe(el))

   return setTimeout(() => {
        return document.documentElement.scrollTop = 0;
      }, 200);
})
</script>

<template>
  <div v-if="width > 900" class="container__app--desktop">
    <div class="container__app--desktop--navbar-container">
      <div>
        <div class="container__mast--desktop" @click="handleNavClick">PT&HRC</div>
      </div>

      <div>
        <button :class="globalState.activeNav === 'trade' ? 'trade' : 'container__app--desktop--navbar-item' " value="trade" @click="handleNavClick">TRADE</button>
        <button :class="globalState.activeNav === 'strategy' ? 'strategy' : 'container__app--desktop--navbar-item' " value="strategy" @click="handleNavClick">AGENCY STRATEGY</button>
        <button :class="globalState.activeNav === 'intellectual' ? 'intellectual' : 'container__app--desktop--navbar-item' " value="intellectual" @click="handleNavClick">INTELLECTUAL PROPERTY</button>
        <button :class="globalState.activeNav === 'human' ? 'human' : 'container__app--desktop--navbar-item' "  value="human" @click="handleNavClick">HUMAN RIGHTS</button>
      </div>

    </div>

    <About id="about" class="section" :width="width" />
    <Trade id="trade" class="section"/>
    <Strategy id="strategy" class="section"/>
    <Intellectual id="intellectual" ref="intellectual" class="section" :height="height" :width="width" :scrollHash="scrollHash"/>
    <Human id="human" ref="human" class="section" />

    <div class="container__footer--desktop">
      <span>Pinkert Trade & Human Rights Consulting &copy; {{ currentYear }}</span>
    </div>

  </div>
  <div v-else class="container__app--mobile">
    <div class="container__header--mobile">
      <div class="container__mast-mobile">PT & HRC</div>
    </div>
    <About id="about" class="section" :width="width"/>
    <div class="container__content--mobile" v-for="(page, index) in sectionsObjects" :key="sectionsArray[index].id">
      <div :class="`header__section--mobile ${page.key}`">{{page.id.toUpperCase()}}</div>
      <div class="container__card--mobile" v-for="article in page.data" :key="article.id">
        <a :href="article.src" target="_blank">
          <span class="card">
            <span class="card-title">{{ article.title }}</span>
            <span class="source"><span class="source">{{article.source}}</span></span>
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
    <div class="container__footer--mobile">
      <span>Pinkert Trade & Human Rights Consulting &copy; {{ currentYear }}</span>
    </div>
  </div>
</template>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

  html {
    scroll-behavior: smooth;
    position: relative;
  }

  .container__app--desktop {
    width: 100vw;
    height: 100%;
    
    .container__app--desktop--navbar-item {
      font-weight: 400;
    }

    .human, #human {
     background-color: #4D4397;
     color: white;
    }

    .strategy, #strategy {
      background-color: #140B00;
      color: white;
    }

    .trade,#trade {
      background-color:  #41A9DF;
      color: white;
    }

    .intellectual, #intellectual {
      background-color: #70C6BE;
      color: white;
    }

    #human, #strategy, #trade, #intellectual {
      scroll-behavior: smooth !important;
      cursor: pointer;
    }

    .container__mast--desktop {
      display: flex;
      align-self: center;
      position: sticky;
      top: 5px;
      margin-left: 10px;
      font-size: 20px;
      cursor: pointer;
      font-family: 'EB Garamond', sans-serif;
    }

    .container__app--desktop--navbar-container {
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

    .container__footer--desktop {
      display: flex;
      justify-content: center;
    }

  }

  .container__app--mobile {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100vw;
    height: 100%;
    position: relative;

    .header__section--mobile {
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

    .container__header--mobile {
      top: 0;
      z-index: 5;
      background-color: white;

      .container__mast-mobile {
        display: flex;
        flex-direction: row;
        justify-content: center;
      }

    }

    .section {
      height: 100vh;
      width: 100vw;
    }

    .container__mast-mobile {
      display: flex;
      align-self: center;
      position: sticky;
      top: 0;
      cursor: pointer;
      font-family: 'EB Garamond',sans-serif;
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

    .container__card--mobile {
      position: relative;
      height: 25vh;
      overflow: hidden;
      margin-bottom: 5px;

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


  }

</style>
