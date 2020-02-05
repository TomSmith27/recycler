<template>
  <div class="container">
    <h1>Add Shop</h1>
    <form @submit="addShop">
      <shop-form v-model="shop"></shop-form>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { Shop } from './Shop';
import ShopsService from '../../services/shopsService';

import ShopForm from '@/components/shop-form.vue'
export default createComponent({
  components: {
    ShopForm
  },
  setup(props, { root }) {
    let shopService = new ShopsService()


    let shop = ref<Shop>({
      name: '',
      address: '',
      products: [],
      shopType: 'Shop',
      openingTimes: [
        { day: 'Monday', from: '', to: '', isClosed: false },
        { day: 'Tuesday', from: '', to: '', isClosed: false },
        { day: 'Wednesday', from: '', to: '', isClosed: false },
        { day: 'Thursday', from: '', to: '', isClosed: false },
        { day: 'Friday', from: '', to: '', isClosed: false },
        { day: 'Saturday', from: '', to: '', isClosed: false },
        { day: 'Sunday', from: '', to: '', isClosed: false },
      ],
      is247: false
    } as Shop)


    shop.value.openingTimes.forEach((o) => {
      o.from = '09:00';
      o.to = '17:00'
    })


    async function addShop() {
      try {
        await shopService.add(shop.value)
        root.$router.push({ name: 'home' })

      }
      catch (e) {
        console.error(e)
        alert(e)
      }


    }


    return { shop, addShop }
  }
});
</script>

<style>
</style>