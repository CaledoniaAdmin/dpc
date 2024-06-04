<script setup lang="ts">

  const heroText = [
      'Dean',
      'Pinkert',
      'Consulting'
  ]

</script>

<template>
  <div class="main">
    <div>
      <div class="hero-text-container">
        <div class="hero-text-sentence" v-for="word in heroText">
          <div class="hero-text-word">{{word}}</div>
        </div>
      </div>
      <img
          class="portrait"
          src="https://images.squarespace-cdn.com/content/v1/5810dda3e3df28ce37b58357/1635801209439-FFUCZLQKLS0TSL2CJ33G/signal-2021-11-01-160737_001.jpg?format=1000w"
          width="100%"
          loading="lazy"
          height="100%"
      />
      <span class="overlay"></span>
    </div>
    <div class="text">
      <p>An Innovator in international trade and human rights policy. Since departing from the
        International Trade Commission (“ITC”) in 2017 after ten years as a Commissioner (with two
        years as presidentially designated Vice Chairman), involvement in public debate has included
        testimony before the ITC and an interagency forced labor committee, televised interviews, and
        publications on a range of topics including human rights violations in U.S.-facing supply
        chains.</p>
      <div class="cta-container">
        <audio controls>
          <source src="https://rr4---sn-4g5edndd.googlevideo.com/videoplayback?expire=1717486545&ei=cW9eZqioDJqL6dsPx6aB2Ac&ip=94.130.97.248&id=o-ADpuURF8bCFaT8yuW_yFox_NT6qsS1M4hqeHIvEnQKIT&itag=251&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&mh=Uy&mm=31%2C29&mn=sn-4g5edndd%2Csn-4g5e6nss&ms=au%2Crdu&mv=u&mvi=4&pl=27&bui=AbKP-1M9AQO-1rpfLqiPG9JY0_iglC6sXwOFcYiEnz5WiVVyNKhpkVRMs6tfz0SPzVFEuTzYMWUZr4xf&spc=UWF9f3mdUDLR0IDaMdG8yc3snGLaJ-dsCczkMLebY2UKnCOYQ_LdXajtc6FP&vprv=1&svpuc=1&mime=audio%2Fwebm&ns=DQHq_KM14vSj2fQpYe4jNQUQ&rqh=1&gir=yes&clen=25413875&dur=1712.561&lmt=1717069809838792&mt=1717464166&fvip=2&keepalive=yes&c=WEB&sefc=1&txp=6218224&n=V_Gz7sGUVgWJhA&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRAIgKXt62GI5TZCnbq8QHuORNkJsK2iAstqlgjbjRhbQ_lECID44wc-Gr3f8YmCVMpxNZtOH1Skri5CO_6EnQqE-LbJw&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl&lsig=AHlkHjAwRQIgepBLcYYQZtVo6LtvXAbYgsXMQeR4IEqsCTDOb_2gqIYCIQCIWVL3DQKGOFfJNrJtf5vvoeGyxf4iKLq4IRShI-sUYw%3D%3D">
        </audio>
        <span class="mailto"><a href="mailto:pinkertconsulting@gmail.com">Let's Work Together</a></span>
      </div>

    </div>
  </div>
</template>

<style scoped>
  .main {
    height: 100%;
  }

  .text {
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

  .overlay {
    transition: .6s ease;
    opacity: 0.7;
    box-shadow:  2px 1px 6px 0 #949494;
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

  .hero-text-container {
    position: absolute;
    bottom: 0;
    height: 80vh;
    width: 40vw;
    z-index: 3;
    margin: 0 0 0 15px;
  }

  .hero-text-sentence {
    color: white;
    height: 33%;
  }

  .hero-text-word {
    font-size: 100px;
  }

  .hero-text-sentence:nth-child(1) {
    color: #eaeadd;
  }

  .hero-text-sentence:nth-child(2) {
    color: #6dcbdf;
  }

  .hero-text-sentence:nth-child(3) {
    color: #fec452;
  }

  .cta-container {
    display: flex;
    flex-direction: row;
  }

  .mailto {
    margin-left:  15px;
    display: flex;
    align-self: center;

    a {
      color: #f65147;
      &:hover {
        color: white;
        &::after {
          content: '...';
        }
      }
    }


  }

</style>