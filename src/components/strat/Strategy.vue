<script setup lang="ts">
import strategyData from '../../data/strategy.ts'

</script>

<template>
  <div class="main">Strategy

    <div class="main" v-for="article in strategyData" :key="article.id">
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

.card {
  height: 200px;
  width: 200px;
}
</style>