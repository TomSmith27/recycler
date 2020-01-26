<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Address</th>
          <th scope="col">Products</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr :key="shop.id" v-for="shop in shops">
          <td>{{shop.name}}</td>
          <td>{{shop.address}}</td>
          <td>
            <div>
              <b-badge :key="product" v-for="product in shop.products" variant="primary" class="ml-1">{{product}}</b-badge>
            </div>
          </td>
          <td>
            <router-link :to="{name : 'shop-admin-edit', params : {id : shop.id}}">
              <button class="btn btn-primary">Edit</button>
            </router-link>
          </td>
          <td>
            <button @click="deleteShop(shop.id)" type="button" class="btn btn-danger">Delete</button>
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
import ProductsService from '@/features/products/productsService';
import ShopsService from '../services/shopsService';
import ShopForm from '@/components/shop-form.vue'
import { Shop } from '../features/shops/Shop';
export default createComponent({
  components: {
    ShopForm
  },
  setup(props, context) {
    const shopService = new ShopsService();
    let shop = ref<Shop>({
      name: '',
      address: '',
      products: [],
      shopType: 'Shop',
      openingTimes: [
        { day: 'Monday', from: '', to: '' },
        { day: 'Tuesday', from: '', to: '' },
        { day: 'Wednesday', from: '', to: '' },
        { day: 'Thursday', from: '', to: '' },
        { day: 'Friday', from: '', to: '' },
        { day: 'Saturday', from: '', to: '' },
        { day: 'Sunday', from: '', to: '' },
      ]
    })


    shop.value.openingTimes.forEach((o) => {
      o.from = '09:00';
      o.to = '17:00'
    })
    let shops = ref<Shop[]>([])
    onMounted(async () => shops.value = await shopService.get())

    async function addShop() {
      await shopService.add({
        name: shop.value.name,
        address: shop.value.address,
        products: shop.value.products,
        shopType: shop.value.shopType,
        openingTimes: shop.value.openingTimes
      })

      context.root.$router.push({ name: 'home' })

    }

    async function deleteShop(id: string) {
      await shopService.delete(id);
      shops.value = shops.value.filter((f: any) => f.id != id)
    }



    return { addShop, shop, shops, deleteShop }
  }
});
</script>
<style>
</style>