<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" sticky>
      <b-navbar-brand tag="h1" class="mb-0" :to="{name : 'home'}">The Recycle Guide</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="text-right">
          <b-nav-item :to="{name : 'products'}">Products A-Z</b-nav-item>
          <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
          <b-nav-item href="#">Compositing</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld,
  },
});
</script>

<style lang="scss">
</style>
