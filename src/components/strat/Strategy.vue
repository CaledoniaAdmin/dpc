<script setup lang="ts">
import strategyData from '../../data/strategy.ts'

</script>

<template>
  <div class="main">
    <div class="card-container" v-for="article in strategyData" :key="article.id">
      <div class="card">{{ article.title }}</div>
    </div>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.card-container {

}

.card {
  height: 100px;
  width: 100%;
}
</style>