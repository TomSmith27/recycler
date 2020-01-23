<template>
  <div style="height : 90vh" class="d-flex justify-content-center flex-column align-items-center">
    <div class="d-flex justify-content-center align-items-center flex-column w-100 mb-3">
      <div class="d-flex justify-content-center align-items-center w-100">
        <h3>Where can I recycle</h3>
        <b-select class="mx-2 w-25" v-model="selectedProduct" :options="products" value-field="name" text-field="name"></b-select>
      </div>
      <h3>in Sheffield?</h3>
    </div>
    <div>
      <b-alert variant="danger" :show="filteredShops.length == 0 && selectedProduct != null">nowhere</b-alert>
      <b-card :title="s.name" :key="s" v-for="s in filteredShops">
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
import AddShop from '@/components/add-shop.vue';
import db from "@/firebase/firebase";
import Vue from "vue";
import { createComponent, ref, computed, onMounted } from '@vue/composition-api';
import { DocumentData } from '@firebase/firestore-types'
import ProductsService from '../services/productsService';

interface Shop {
  name: string,
  address: string,
  products: string[]
}

export default createComponent({
  components: {
    HelloWorld,
    AddShop
  },
  setup() {
    const productService = new ProductsService()
    let products = ref<any[]>([])
    let selectedProduct = ref<string>(null);

    onMounted(async () => products.value = await productService.getProducts())


    let shops = ref<Shop[]>([]);

    db.collection("places")
      .get()
      .then(querySnapshot => {
        shops.value = querySnapshot.docs.map(d => d.data() as Shop);

      });


    const filteredShops = computed(() => {
      if (selectedProduct.value != null) {
        return shops.value.filter(s => s.products.some(i => i.toLowerCase() == selectedProduct.value!.toLowerCase()))
      }
      return []
    })

    return { products, selectedProduct, filteredShops }

  }

});

</script>
