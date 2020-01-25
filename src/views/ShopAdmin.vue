<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Products</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="shop in shops">
          <td>{{shop.name}}</td>
          <td>{{shop.address}}</td>
          <td>{{shop.products}}</td>
          <td>
            <router-link :to="{name : 'shop-admin-edit', params : {id : shop.id}}">
              <button class="btn btn-primary">Edit</button>
            </router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <h1>Create Shop</h1>
    <form @submit="addShop">
      <shop-form v-model="shop"></shop-form>
      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed, onMounted } from '@vue/composition-api';
import ProductsService from '../services/productsService';
import ShopsService from '../services/shopsService';
import ShopForm from '@/components/shop-form.vue'
export default createComponent({
  components: {
    ShopForm
  },
  setup(props, context) {
    const shopService = new ShopsService();
    let shop = ref({
      name: '',
      address: '',
      products: []
    })
    let shops = ref<any>([])
    onMounted(async () => shops.value = await shopService.get())

    async function addShop() {
      await shopService.add({
        name: shop.value.name,
        address: shop.value.address,
        products: shop.value.products
      })

      context.root.$router.push({ name: 'home' })

    }



    return { addShop, shop, shops }
  }
});
</script>
<style>
</style>