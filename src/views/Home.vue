<template>
  <div style="height : 90vh" class="d-flex justify-content-center flex-column align-items-center overflow-auto">
    <div class="d-flex justify-content-center align-items-center flex-column w-100 mb-3">
      <div class="d-flex justify-content-center align-items-center w-100">
        <h3>Where can I recycle</h3>
        <b-select class="mx-2 w-25" v-model="selectedProduct" :options="products" value-field="name" text-field="name"></b-select>
      </div>
      <h3>in Sheffield?</h3>
    </div>
    <div>
      <b-alert variant="danger" :show="filteredShops.length == 0 && selectedProduct != null">nowhere</b-alert>
      <b-card :title="s.name" :key="s" v-for="s in filteredShops" class>
        <b-card-text>{{s.address}}</b-card-text>
        <div>
          Products:
          <b-badge href="#" :key="product" v-for="product in s.products" variant="primary" class="m-1">{{product}}</b-badge>
        </div>
        <a href="#" class="card-link">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import db from "@/firebase/firebase";
import Vue from "vue";
import { createComponent, ref, computed, onMounted } from '@vue/composition-api';
import { DocumentData } from '@firebase/firestore-types'
import ProductsService from '@/features/products/productsService';
import ShopsService from '../services/shopsService';
import { Shop } from '../features/shops/Shop';
import { Product } from '@/features/products/Product';



export default createComponent({
  components: {
    HelloWorld,
  },
  setup() {
    const productService = new ProductsService()
    const shopsService = new ShopsService()
    let products = ref<Product[]>([])
    let selectedProduct = ref<string>(null);
    let shops = ref<Shop[]>([]);

    onMounted(async () => {
      products.value = await productService.getProducts();
      shops.value = await shopsService.get();
    })


    const filteredShops = computed(() => {
      if (selectedProduct.value != null) {
        return shops.value
          .sort((a: any, b: any) => a.name > b.name ? 1 : -1)
          .filter(s => s.products.some((i: string) => i.toLowerCase() == selectedProduct.value!.toLowerCase()))
      }
      return []
    })

    return { products, selectedProduct, filteredShops }

  }

});

</script>
