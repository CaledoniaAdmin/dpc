<script setup lang="ts">
import strategyData from '../../data/strategy.ts'

</script>

<template>
  <div class="main">
    <span>Strategy</span>
    <div class="card-container" v-for="article in strategyData" :key="article.id">
      <div class="card">{{ article.title }}</div>
    </div>
  </div>
</template>

<style scoped>
.main {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.card-container {

}

.card {
  height: 350px;
  width: 200px;
}
</style>