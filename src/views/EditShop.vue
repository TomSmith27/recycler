<template>
  <div class="container">
    <h1>Edit Shop</h1>
    {{shopId}}
    <form @submit="editShop">
      <shop-form v-model="shop"></shop-form>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted, ref, watch } from '@vue/composition-api';
import ShopForm from '@/components/shop-form.vue'
import ShopsService from '../services/shopsService';
import { Shop } from '@/features/shops/Shop';
export default createComponent({
  components: {
    ShopForm
  },
  props: {
    id: String
  },
  setup(props, { root }) {
    let shopId = props.id
    const shopService = new ShopsService()
    let shop = ref<Shop>({
      name: '',
      address: '',
      products: [],
      openingTimes: [],
      shopType: ''
    })


    onMounted(async () => {
      if (shopId) {
        shop.value = await shopService.getById(shopId) as Shop
      }
    })

    async function editShop() {
      await shopService.update(shopId!, {
        name: shop.value.name,
        address: shop.value.address,
        products: shop.value.products,
        shopType: shop.value.shopType,
        openingTimes: shop.value.openingTimes
      })

      root.$router.push({ name: 'shop-admin' })

    }

    return { shopId, shop, editShop }
  }
});
</script>

<style>
</style>