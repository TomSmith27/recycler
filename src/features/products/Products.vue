<template>
  <div class="container-fluid">
    <div class="m-3">
      <h1>Product List</h1>
      <div class="row">
        <div class="col-md-4">
          <ul class="list-group list-group-flush">
            <li class="list-group-item" :key="group.group" v-for="group in groupedProducts">
              <h3 class="text-primary">{{group.group}}</h3>
              <ul>
                <div :key="product.id" v-for="product in group.products">
                  <b-badge class="big-badge white-space-norml" :to="{name : 'home', query : { product : product.name }}" variant="primary">{{product.name}}</b-badge>
                </div>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, onMounted, ref, computed } from '@vue/composition-api';
import ProductsService from './productsService';
import { Product } from './Product';
import { useProducts } from './useProducts'
export default createComponent({
  name: 'Products',
  components: {
  },
  setup() {

    let { orderedProducts, products } = useProducts()


    let groupedProducts = computed(() => {      return orderedProducts.value.reduce((r: any, e: Product) => {
        // get first letter of name of current element
        let group = e.name[0];
        // if there is no property in accumulator with this letter create it
        if (!r[group]) r[group] = { group, products: [e] }
        // if there is push current element to children array for that letter
        else r[group].products.push(e);
        // return accumulator
        return r;
      }, {})
    });

    return { orderedProducts, groupedProducts }

  }
});
</script>
