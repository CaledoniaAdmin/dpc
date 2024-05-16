<script setup lang="ts">
import tradeData from '../../data/trade.ts'

</script>

<template>
  <div class="main" >
    <div class="gallery">
      <div v-for="(image, idx) in tradeData" :class="`gallery-item gallery-item-${idx} slide-left`" :key="image.id">
        <div :style=" `
             transition: .5s ease;
              opacity: 1;
              position: absolute;
              background: url(${image.backgroundImg}), linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86));
              background-size: cover;
              background-repeat: no-repeat;
              background-position: center;
              height: ${image.height}px;
              width: 100%;
              text-align: center;
              color: white;
           `">
          <div class="overlay">
            <a :href="image.src" target="_blank">
              <span class="title">{{image.title}}</span>
              <span>source: <span class="source">{{image.source}}</span></span>
              <span class="linkout">Read More...</span>

            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

/***** Slide Left Animation *****/

@keyframes slide-left {
  from {
    margin-left: 100%;
    opacity: 0;
  }
  to {
    margin-left: 0%;
    opacity: 1;
  }
}

.main {
  height: 100%;

  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: minmax(100px, auto);
    gap: 10px;

    img {
      width: 100%;
      object-fit: cover;
      cursor: pointer;
      overflow: hidden;
    }

    .gallery-item {
      position: relative;

      a {
        color: white;
        background: transparent;
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        justify-content: center;
        align-items: center;
      }
    }

    .overlay {
      transition: .5s ease;
      opacity: 0;
      position: absolute;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86));
      height: 100%;
      width: 100%;
      text-align: center;

      .title {
        font-weight: 600;
      }

      .linkout {
        font-weight: 400;
        text-decoration: underline;
      }
    }

    .overlay:hover {
      opacity: 0.7;
      box-shadow:  2px 1px 6px 0px #949494;
    }

    .gallery-item-0 {
      grid-column: 1 / 3;
      grid-row: 1;
      animation: 1s slide-left;

    }
    .gallery-item-1 {
      grid-column: 3;
      grid-row: 1/3;
      animation: 1.7s slide-left;

    }
    .gallery-item-2 {
      grid-column: 1;
      grid-row: 2 / 5;
      animation: 2.4s slide-left;

    }
    .gallery-item-3 {
      grid-column: 2 / 3;
      grid-row: 4;
      animation: 3s slide-left;

    }
    .gallery-item-4 {
      grid-column: 2;
      grid-row: 4/2;
      animation: 3.6s slide-left;

    }
    .gallery-item-5 {
      grid-column: 3;
      grid-row: 4;
      animation: 3.9s slide-left;

    }

    .gallery-item-6 {
      grid-column: 2;
      grid-row: 4;
      animation: 7s slide-left;
    }
  }
}
</style>