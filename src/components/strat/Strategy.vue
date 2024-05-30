<script setup lang="ts">
import strategyData from '../../data/strategy.ts'

</script>

<template>
  <div class="main">
    <div class="card-container" v-for="article in strategyData" :key="article.id">
      <a :href="article.src" target="_blank">
              <span class="card">
        <span>{{ article.title }}</span>
        <span>source: <span class="source">{{article.source}}</span></span>
        <span class="linkout">Read More...</span>
      </span>

        <img :src="article.backgroundImg" :style="`
              position: absolute;
              width: 100%;
              text-align: center;
              color: white;`"
             loading="lazy"/>
      </a>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
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
  height: 220px;
  overflow: hidden;
}

.card {
  height: 100px;
  width: 100%;
  position: absolute;
  z-index: 1;
  margin-left: 65%;
  color: white;
  font-size: 20px;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
</style>