<template>
  <div class="d-flex justify-content-center flex-column align-items-center overflow-auto home" :class="{'offset-search' : filteredShops.length == 0}">
    <div class="d-flex justify-content-center align-items-center flex-column w-100 mb-3">
      <div class="d-flex justify-content-center align-items-center w-100">
        <h3>Where can I recycle</h3>
      </div>
      <b-select class="mx-2 w-75" v-model="selectedProduct" :options="orderedProducts" value-field="name" text-field="name"></b-select>
      <h3>in Sheffield?</h3>
    </div>

    <div class="container">
      <b-alert class="text-center" variant="danger" :show="filteredShops.length == 0 && selectedProduct != null && !isLoading">Can't be recycled</b-alert>
      <div class="shops">
        <b-card class="shadow mb-2" :title="s.name" :key="s.id" v-for="s in filteredShops">
          <b-card-text>
            <a v-if="!s.address.includes('See website')" target="_blank" :href="mapUrl(s)">{{s.address}}</a>
            <span v-else>{{s.address}}</span>
          </b-card-text>
          <div>
            <p>Products:</p>
            <b-badge href="#" :key="product.name" v-for="product in s.products" variant="primary" class="m-1">{{product}}</b-badge>
          </div>
          <div>
            <button class="btn btn-outline-primary btn-block" v-b-toggle="`opening-hours-${s.id}`">
              Opening Hours
              <b-icon-chevron-compact-down />
            </button>
            <b-collapse :id="`opening-hours-${s.id}`" class="border-top-0 border border-primary p-2">
              <div class="d-flex justify-content-center">
                <div v-if="s.is247">
                  <em>24/7</em>
                </div>
                <div v-else-if="s.externalOpeningHours">
                  <a target="_blank" :href="s.externalWebsite">Click here for Opening Hours</a>
                </div>
                <div v-else>
                  <div :key="openingTime.day" v-for="openingTime in s.openingTimes" class="d-flex">
                    <span class="mr-1" style="width : 100px">{{openingTime.day}} :</span>
                    <span v-if="openingTime.isClosed">CLOSED</span>
                    <span v-else>{{openingTime.from}} - {{openingTime.to}}</span>
                  </div>
                </div>
              </div>
            </b-collapse>
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
  setup(props, context) {
    const productService = new ProductsService();
    const shopsService = new ShopsService();

    let { orderedProducts, products } = useProducts()
    let selectedProduct = ref<string>(null);

    var routeProduct = context.root.$router.currentRoute.query["product"];
    if (routeProduct != undefined && routeProduct != null) {
      selectedProduct.value = routeProduct as string;
    }

    let shops = ref<Shop[]>([]);
    let isLoading = ref(true)
    onMounted(async () => {
      isLoading.value = true;
      products.value = await productService.getProducts();
      shops.value = await shopsService.get();
      isLoading.value = false;
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

    let mapUrl = (shop: Shop) => {
      return `http://maps.google.com/?q=${shop.address}`;
    }

    return { orderedProducts, selectedProduct, filteredShops, mapUrl, isLoading };
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
