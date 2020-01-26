<template>
  <div class="container">
    <router-link :to="{name : 'shop-create'}">
      <button type="button" class="btn btn-primary">Add Shop</button>
    </router-link>
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
  </div>
</template>

<script lang="ts">
import { createComponent, ref, computed, onMounted } from '@vue/composition-api';
import ProductsService from '@/features/products/productsService';
import ShopsService from '../services/shopsService';
import { Shop } from '../features/shops/Shop';
export default createComponent({
  components: {

  },
  setup(props, context) {
    const shopService = new ShopsService();

    let shops = ref<Shop[]>([])
    onMounted(async () => shops.value = await shopService.get())



    async function deleteShop(id: string) {
      await shopService.delete(id);
      shops.value = shops.value.filter((f: any) => f.id != id)
    }



    return { shops, deleteShop }
  }
});
</script>
<style>
</style>