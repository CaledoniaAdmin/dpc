<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)

const props = defineProps(['width'])

  const heroText = [
      'PINKERT TRADE',
      '&',
      'HUMAN RIGHTS',
      'CONSULTING'
  ]

</script>

<template>
  <div class="container__desktop" v-if="props.width > 900">
    <div class="container__left">
      <div class="container__left--hero-text">
        <div class="container__left--hero-text-sentence" v-for="word in heroText">
          <div class="">{{word}}</div>
        </div>
      </div>
      <img
          class="container__left--portrait"
          src="https://images.squarespace-cdn.com/content/v1/5810dda3e3df28ce37b58357/1635801209439-FFUCZLQKLS0TSL2CJ33G/signal-2021-11-01-160737_001.jpg?format=1000w"
          width="100%"
          loading="lazy"
          height="100%"
          alt="Large image of Dean Pinkert"
      />
    </div>
    <div class="container__bio">
      <p class="container__bio--content">An Innovator in international trade and human rights policy. Since departing from the
        International Trade Commission (“ITC”) in 2017 after ten years as a Commissioner (with two
        years as presidentially designated Vice Chairman), involvement in public debate has included
        testimony before the ITC and an interagency forced labor committee, televised interviews, and
        publications on a range of topics including human rights violations in U.S.-facing supply
        chains.</p>
      <div class="container__cta--desktop">
        <span class="mailto"><a href="mailto:pinkertconsulting@gmail.com" target="_blank"><img src="/mail.svg" width="30" height="30" alt="mail icon"/></a></span>
        <span class="linkedin"><a href="https://www.linkedin.com/in/dean-pinkert/" target="_blank"><img src="/linkedin.svg" width="30" height="30" alt="linkedin icon"/></a></span>
      </div>

    </div>
    <span class="overlay"></span>
    <div v-if="open" class="modal">
      <p>Hear Dean's story in his own words on the podcast below</p>
      <button @click="open = false">Close</button>
    </div>
  </div>
  <div class="container__mobile" v-else>
    <div class="container__mobile--hero-text">
      <div class="container__mobile--hero-text-sentence" v-for="word in heroText">
        <div class="container__mobile--hero-text">{{word}}</div>
      </div>
    </div>
    <div class="container__mobile--bio-cta-container">
      <p>An Innovator in international trade and human rights policy. Since departing from the
        International Trade Commission (“ITC”) in 2017 after ten years as a Commissioner (with two
        years as presidentially designated Vice Chairman), involvement in public debate has included
        testimony before the ITC and an interagency forced labor committee, televised interviews, and
        publications on a range of topics including human rights violations in U.S.-facing supply
        chains.
      </p>

      <div class="container__mobile--cta-container">
        <audio controls>
          <source src="https://audio.jukehost.co.uk/fHzavDGfQfonj9VuDlpnaUizgjZt9fm2">
        </audio>
        <span class="info">
            <img @click="open = true"  src="/info.svg" width="30" height="30" alt="info icon">
          </span>
        <span class="mailto"><a href="mailto:pinkertconsulting@gmail.com" target="_blank"><img src="/mail.svg" width="30" height="30" alt="mail icon"/></a></span>
        <span class="linkedin"><a href="https://www.linkedin.com/in/dean-pinkert/" target="_blank"><img src="/linkedin.svg" width="30" height="30" alt="linkedin icon"/></a></span>
      </div>

    </div>
    <img
        class="portrait-mobile"
        src="https://images.squarespace-cdn.com/content/v1/5810dda3e3df28ce37b58357/1635801209439-FFUCZLQKLS0TSL2CJ33G/signal-2021-11-01-160737_001.jpg?format=1000w"
        loading="lazy"
        alt="Image of Dean Pinkert"
    />
    <span class="overlay"></span>
    <div v-if="open" class="modal">
      <p>Hear Dean's story in his own words on the podcast below</p>
      <button @click="open = false">Close</button>
    </div>
  </div>
</template>

<style scoped>
  .container__desktop {
    min-height: 100vh;
    width: 100%;

    .container__left {

      .container__left--hero-text {
        position: absolute;
        bottom: 5px;
        height: 90vh;
        width: 55vw;
        z-index: 1;
        margin: 0 0 0 15px;
        font-size: 85px;
      }

      .container__left--hero-text-sentence {
        font-size: 1em;
      }

      .container__left--hero-text-sentence:nth-child(1) {
        color: #6dcbdf;
      }

      .container__left--hero-text-sentence:nth-child(2) {
        color: #eaeadd;
      }

      .container__left--hero-text-sentence:nth-child(3) {
        color: #fec452;
      }

      .container__left--hero-text-sentence:nth-child(4) {
        color: #f65147;
      }

      .container__left--portrait {
        width: 100%;
        position: absolute;
        height: 100%;
        object-fit: cover;
      }


    }

    .container__bio {
      position: absolute;
      margin: 35% 25px 0 0;
      right: 0;
      padding: 5px;
      border-radius: 8px;
      z-index: 2;
      color: white;
      font-weight: 100;
      font-size: 16px;
      width: 42vw;
      line-height: 1.8em;
    }

    .container__bio--content {
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.4));
      padding: 10px;
    }

    .container__cta--desktop {
      display: flex;
      flex-direction: row;

      .info {
        margin-left:  15px;
        display: flex;
        align-self: center;

        a {
          color: #f65147;
        }

      }

      .linkedin {
        margin-left:  15px;
        display: flex;
        align-self: center;

        a {
          color: #f65147;
        }

      }

      .mailto {
        margin-left:  15px;
        display: flex;
        align-self: center;

        a {
          color: #f65147;
        }

      }

    }

    .overlay {
      transition: .6s ease;
      opacity: 0.7;
      box-shadow:  2px 1px 6px 0 #949494;
      position: absolute;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86));
      height: 100%;
      width: 100%;
      text-align: center;
    }

  }

  .container__mobile {
    height: 100vh;
    display: flex;
    flex-direction: column;

    img {
      position: absolute;
      height: 100vh;
      width: 100vw;
      object-fit: cover;
    }

    .container__mobile--hero-text {
      z-index: 2;

      .container__mobile--hero-text-sentence {
        font-size: 60px;
        width: 100vw;
      }

      .container__mobile--hero-text-sentence:nth-child(1) {
        color: #6dcbdf;
      }

      .container__mobile--hero-text-sentence:nth-child(2) {
        color: #eaeadd;
        height: 65px;
      }

      .container__mobile--hero-text-sentence:nth-child(3) {
        color: #fec452;
      }

      .container__mobile--hero-text-sentence:nth-child(4) {
        color: #f65147;
      }
    }

    .container__mobile--bio-cta-container {
      z-index: 2;

      p {
        color: white;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.4));
        font-size: 14px;
        padding: 3px 5px;
      }

      audio {
        width: 250px;
      }

      a {
        width: 30px;
        height: 30px;
      }
      img {
        height: 30px;
        width: 30px;
      }

    }

    .overlay {
      transition: .6s ease;
      opacity: 0.7;
      box-shadow:  2px 1px 6px 0 #949494;
      position: absolute;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.86));
      height: 100%;
      width: 100%;
      text-align: center;
    }

    .container__mobile--cta-container {
      display: flex;
      flex-direction: row;

      .info {
        width: 30px;
        height: 30px;
        margin-left:  15px;
        display: flex;
        align-self: center;

        span {
          width: 30px;
          height: 30px;
          color: #f65147;

          img {
            width: 30px;
            height: 30px;
          }
        }

      }

      .linkedin {
        margin-left:  15px;
        display: flex;
        align-self: center;

        a {
          color: #f65147;
        }

      }

      .mailto {
        margin-left:  15px;
        display: flex;
        align-self: center;

        a {
          color: #f65147;
        }

      }
    }


  }

  .modal {
    position: fixed;
    z-index: 999;
    top: 40%;
    left: 30%;
    width: 200px;
    color: white;
    padding: 20px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.86), rgba(0, 0, 0, 0.4));

    button {
      margin-left: 25%;
      margin-bottom: 10%;
      background-color: white;
      color: black;
    }
  }
</style>