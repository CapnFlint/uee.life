<template>
  <div class="app">
    <default-header />
    <default-navbar />
    <div class="main">
      <dock name="leftDock" class="leftDock"/>
      <nuxt class="content" />
      <dock name="rightDock" class="rightDock"/>
    </div>
    <default-footer />
  </div>
</template>

<script>
import DefaultHeader from '@/components/layout/DefaultHeader'
import DefaultFooter from '@/components/layout/DefaultFooter'
import DefaultNavbar from '@/components/layout/DefaultNavbar'
import Dock from '@/components/layout/Dock'

import { Wormhole } from 'portal-vue'
Wormhole.trackInstances = false

export default {
  components: {
    DefaultHeader,
    DefaultFooter,
    DefaultNavbar,
    Dock
  }
}
</script>

<style scoped>
.app {
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  padding-bottom: 100px;
  font-family: Electrolize;
}
.main {
  display: flex;
  flex-wrap: wrap;
  max-width: 2000px;
  margin: auto;
}
.app::before {
  position: fixed;
  content: "";
  background: url("~assets/starfield.jpg") repeat center;
  opacity: 0.6;
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
  margin: 0 10px;
  flex-grow: 1;
  flex-basis: 300px;
}
 
 .dock {
   max-width: 260px;
   margin: 0 auto;
 }

 /*.leftDock {
   min-width: 240px;
 }*/
 .vue-portal-target {
   display: flex;
   flex-direction: column;
   justify-content: center;
 }
</style>
