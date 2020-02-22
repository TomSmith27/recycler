<template>
  <div class="container-fluid">
    <div class="m-3">
      <div class="pb-2">
        <router-link :to="{name : 'shop-create'}">
          <button type="button" class="btn btn-primary btn-block">Add Shop</button>
        </router-link>
      </div>
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sticky-header="80vh" bordered striped hover :items="shops" :fields="fields">
        <template v-slot:cell(products)="{item}">
          <div>
            <b-badge :key="product" v-for="product in item.products" variant="primary" class="ml-1">{{product}}</b-badge>
          </div>
        </template>
        <template v-slot:cell(edit)="{item}">
          <router-link :to="{name : 'shop-admin-edit', params : {id : item.id}}">
            <button class="btn btn-primary">Edit</button>
          </router-link>
        </template>
        <template v-slot:cell(delete)="{item}">
          <button @click="deleteShop(item.id)" type="button" class="btn btn-danger">Delete</button>
        </template>
      </b-table>
    </div>
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

    let fields = [
      { key: 'name', sortable: true },
      { key: 'address', sortable: true },
      { key: 'products', sortable: true },

      'edit', 'delete'];
    let sortBy = ref('name');
    let sortDesc = ref(false);

    async function deleteShop(id: string) {
      await shopService.delete(id);
      shops.value = shops.value.filter((f: any) => f.id != id)
    }



    return { shops, deleteShop, fields, sortBy, sortDesc }
  }
});
</script>
<style>
</style>