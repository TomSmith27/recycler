<template>
  <div class="d-flex justify-content-center flex-column align-items-center overflow-auto home" :class="{'offset-search' : filteredShops.length == 0}">
    <div class="d-flex justify-content-center align-items-center flex-column w-100 mb-3">
      <div class="d-flex justify-content-center align-items-center w-100">
        <h3>Where can I recycle</h3>
      </div>
      <b-select class="mx-2 w-25" v-model="selectedProduct" :options="orderedProducts" value-field="name" text-field="name"></b-select>
      <h3>in Sheffield?</h3>
    </div>
    <div class="container">
      <b-alert class="text-center" variant="danger" :show="filteredShops.length == 0 && selectedProduct != null">Can't be recycled</b-alert>
      <div class="shops">
        <b-card :title="s.name" :key="s" v-for="s in filteredShops">
          <b-card-text>{{s.address}}</b-card-text>
          <div>{{s.shopType}}</div>
          <div>
            Products:
            <b-badge href="#" :key="product" v-for="product in s.products" variant="primary" class="m-1">{{product}}</b-badge>
          </div>
          <div>
            <strong>Opening Hours</strong>
            <div v-if="!s.is247">
              <div :key="openingTime.day" v-for="openingTime in s.openingTimes" class="d-flex">
                <span class="mr-1" style="width : 100px">{{openingTime.day}} :</span>
                <span v-if="openingTime.isClosed">CLOSED</span>
                <span v-else>{{openingTime.from}} - {{openingTime.to}}</span>
              </div>
            </div>
            <div v-else>
              <em>24/7</em>
            </div>
          </div>

          <!--   <a href="#" class="card-link">Card link</a>
          <b-link href="#" class="card-link">Another link</b-link>-->
        </b-card>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import db from '@/firebase/firebase';
import Vue from 'vue';
import {
  createComponent,
  ref,
  computed,
  onMounted
} from '@vue/composition-api';
import { DocumentData } from '@firebase/firestore-types';
import ProductsService from '@/features/products/productsService';
import ShopsService from '../services/shopsService';
import { Shop } from '../features/shops/Shop';
import { Product } from '@/features/products/Product';
import { useProducts } from '@/features/products/useProducts'
export default createComponent({
  components: {
    HelloWorld
  },
  setup() {
    const productService = new ProductsService();
    const shopsService = new ShopsService();

    let { orderedProducts, products } = useProducts()
    let selectedProduct = ref<string>(null);
    let shops = ref<Shop[]>([]);

    onMounted(async () => {
      products.value = await productService.getProducts();
      shops.value = await shopsService.get();
    });

    const filteredShops = computed(() => {
      if (selectedProduct.value != null) {
        return shops.value
          .sort((a: any, b: any) => (a.name > b.name ? 1 : -1))
          .filter(s =>
            s.products.some(
              (i: string) =>
                i.toLowerCase() ==
                selectedProduct.value!.toLowerCase()
            )
          );
      }
      return [];
    });

    return { orderedProducts, selectedProduct, filteredShops };
  }
});
</script>

<style lang="scss" scoped>
.shops {
  display: grid;
  grid-gap: 5px;
}
@media (min-width: 991.98px) {
  .shops {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

.home {
  transition: margin 500ms;
  margin-top: 5vh;
}
.offset-search {
  margin-top: 45vh;
}
</style>
