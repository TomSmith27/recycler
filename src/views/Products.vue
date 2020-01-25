<template>
  <div>
    <h1>Product List</h1>
    <router-link class="btn btn-primary" :to="{name : 'product-admin'}">Product Admin</router-link>
    <router-link class="btn btn-primary" :to="{name : 'shop-admin'}">Shop Admin</router-link>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
export default createComponent({
  components: {
  },
  setup() {
  }
});
</script>

<style>
</style>