<script setup lang="ts">

</script>

<template>
  <div class="main">
    <div>
      <img
          class="portrait"
          src="https://images.squarespace-cdn.com/content/v1/5810dda3e3df28ce37b58357/1635801209439-FFUCZLQKLS0TSL2CJ33G/signal-2021-11-01-160737_001.jpg?format=1000w"
          width="100%"
          loading="lazy"
          height="100%"
      />
    </div>
    <div class="text">
      <p>Innovator in international trade and human rights policy. Since departing from the
        International Trade Commission (“ITC”) in 2017 after ten years as a Commissioner (with two
        years as presidentially designated Vice Chairman), involvement in public debate has included
        testimony before the ITC and an interagency forced labor committee, televised interviews, and
        publications on a range of topics including human rights violations in U.S.-facing supply
        chains.</p>
    </div>
  </div>
</template>

<style scoped>
  .main {
    height: 100%;
  }

  .text {
    position: absolute;
    margin-top: 35%;
    right: 0;
    padding: 5px;
    border-radius: 8px;
    z-index: 2;
    color: white;
    font-weight: 400;
    font-size: 16px;
    width: 450px;
    background: linear-gradient(109.6deg, rgba(0, 0, 0, 0.93) 11.2%, rgb(63, 61, 61) 78.9%);
  }

  #about {
    display: flex;
    flex-direction: row;

    .portrait {
      width: 100%;
      position: absolute;
      height: 100%;
      object-fit: cover;
    }
  }
</style>