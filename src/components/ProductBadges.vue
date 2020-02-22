<template>
  <div>
    <b-badge :key="product.name" v-for="product in s.products" variant="primary" class="m-1 white-space-norml">{{product}}</b-badge>
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