<template>
  <div>
    <h1>Product List</h1>
    <router-link class="btn btn-primary" :to="{name : 'product-admin'}">Admin</router-link>
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