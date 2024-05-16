<script setup lang="ts">
import {onMounted} from "vue";
import ipData from '../../data/ip.ts'


const props = defineProps(['height', 'width', 'scrollHash'])

onMounted(() => {
  console.log('Human page mounted: ', props)

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

  const pageElementArr = Array.from(document.querySelectorAll('.column'))

  console.log('pageElementArr: ', pageElementArr)

  pageElementArr.forEach((el:any) => observer.observe(el))

  console.log('width/height: ', props.width.value, props.height.value, pageElementArr.length)

  const hash = pageElementArr.reduce((acc, value, idx) => {
    console.log('acc/post/idx: ', idx)

    return {...acc, [idx]: idx * Number(props.height.value) || 0}
  })

  props.scrollHash.value = hash

  console.log('scrollHash: ', props.scrollHash.value)

})
</script>

<template>
  <span>IP</span>
  <div class="main">
    <div class="column-container">
      <div v-for="(image, idx) in ipData" class="column"  :key="image.id">
        <div :style="
`              background: url(${image.backgroundImg}), linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86));
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
                      height: 100%;
                      width: 100%;
                      opacity: 1;`
">{{image.title}}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.main {

}

.column-container {
  display: flex;
  flex-direction: row;
}

.column {
  width: 25vw;
  height: 85vh;
  opacity: 0;
  filter: blur(5px);
  transform: translateX(-100%);
  transition: all 1s;
  margin-bottom: 15vh;
}

.column:nth-child(1) {
  transition-delay: 100ms;
}

.column:nth-child(2) {
  transition-delay: 200ms;
}
.column:nth-child(3) {
  transition-delay: 400ms;
}
.column:nth-child(4) {
  transition-delay: 600ms;
}

.hidden {
  opacity: 0;
  transition: all 1s;
}

.show {
  opacity: 1;
  filter: blur(0);
  transform: translateX(0);
}

@media (prefers-reduced-motion) {
  .hidden {
    transition: none;
  }
}
</style>