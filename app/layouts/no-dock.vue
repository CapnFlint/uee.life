<template>
  <div class="app">
    <default-header />
    <default-navbar />
    <div class="main">
      <nuxt class="content" />
    </div>
    <default-footer />
  </div>
</template>

<script>
import DefaultHeader from '@/components/layout/DefaultHeader'
import DefaultFooter from '@/components/layout/DefaultFooter'
import DefaultNavbar from '@/components/layout/DefaultNavbar'

import { Wormhole } from 'portal-vue'
Wormhole.trackInstances = false

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
    DefaultNavbar
  }
}
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  padding-bottom: 90px;
  font-family: Electrolize;
}
.main {
  display: flex;
  flex-wrap: wrap;
}
.app::before {
  position: fixed;
  content: "";
  background: url("~assets/nebula.jpg") repeat;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -2;
}
.app::after {
  position: fixed;
  content: "";
  background: url("~assets/gridbg_glow.png") repeat center top;
  opacity: 0.5;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.content {
  flex-grow: 1;
  flex-basis: 300px;
}
 
 .dock {
   width: 240px;
 }
</style>
