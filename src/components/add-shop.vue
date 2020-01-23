<template>
  <div>
    <input type="text" v-model="example" />
    {{example}}
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';


export default createComponent({

  setup() {
    const example = ref('test')


    return { example }
  }
})

</script>

<style>
</style>