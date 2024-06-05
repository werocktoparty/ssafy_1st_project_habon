<script setup>
import { RouterLink, RouterView } from 'vue-router'
import TheHeaderNav from '@/components/common/TheHeaderNav.vue'

</script>

<template>
  <div id="app">
    <TheHeaderNav />
   
    
  </div>
</template>

<style>
/* body, label {
  cursor: url("../public/hyojason.png"), auto;

}

button, A, a {
  cursor: url("../public/Chyojason.png"), auto;
}

input,s,textarea {
  cursor: url("../public/Ihyojason2.png"), auto;
} */
body, label, html, .all, div, .choice, .board-box, .choice-text, .choice-img img, .winner-container, .winner {
  cursor: url("../public/hyojason.png"), auto;
}

button, a, .board-box:hover, .sec:hover, .fir:hover, select, RouterLink{
  cursor: url("../public/Chyojason.png"), auto;
}

input, s, textarea {
  cursor: url("../public/Ihyojason2.png"), auto;
}



@font-face {
  font-family: 'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 400;
}
@font-face {
  font-family: 'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 300;
}
@font-face {
  font-family: 'BMEuljiro10yearslater';
  src: url('@/assets/fonts/BMEuljiro10yearslater.ttf') format('truetype');
  font-weight: 700;
}

body {
  font-family: 'BMEuljiro10yearslater', sans-serif !important;
}
</style>

