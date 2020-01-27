<template>
  <div>
    <h1>Product Admin</h1>

    <div class="container">
      <transition-group name="list">
        <div class="input-group mb-3" :key="product.name" v-for="product in orderedProducts">
          <input type="text" class="form-control" v-model="product.name" />
          <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" @click="updateProduct(product)">Update</button>
            <button class="btn btn-danger" type="button" @click="deleteProduct(product)">Delete</button>
          </div>
        </div>
      </transition-group>
      <div class="input-group mb-3">
        <input type="text" class="form-control" v-model="newProduct.name" />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button" @click="addProduct" :disabled="newProduct.name.length == 0">Add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, onMounted, ref } from '@vue/composition-api';
import firebase from '@/firebase/firebase'
import { DocumentData } from '@firebase/firestore-types';
import ProductsService from './productsService';
import { Product } from './Product'
import { useProducts } from "./useProducts";
export default createComponent({
  components: {
  },
  setup() {
    const productsService = new ProductsService()

    let { orderedProducts, products } = useProducts()
    function updateProduct(product: Product) {
      productsService.productsCollection.doc(product.id).update({ name: product.name })
    }

    async function deleteProduct(product: Product) {
      try {
        await productsService.productsCollection.doc(product.id).delete()
        products.value = products.value.filter(p => p.id != product.id)
      }
      catch (err) {
        console.error(err)
      }

    }

    let newProduct = ref<Product>({
      name: ''
    })

    async function addProduct() {
      try {

        var addedProduct = (await productsService.productsCollection.add(newProduct.value));

        products.value.push({ id: addedProduct.id, ...newProduct.value })
        newProduct.value.name = ''
      }
      catch (err) {
        console.log(err)
      }

    }


    return { newProduct, updateProduct, deleteProduct, addProduct, orderedProducts }


  }
});
</script>

<style>
.list-enter-active,
.list-leave-active,
.list-move {
  transition: 250ms cubic-bezier(0.59, 0.12, 0.34, 0.95);
  transition-property: opacity, transform;
}

.list-enter {
  opacity: 0;
  transform: translateX(50px) scaleY(0.5);
}

.list-enter-to {
  opacity: 1;
  transform: translateX(0) scaleY(1);
}

.list-leave-active {
  position: absolute;
}

.list-leave-to {
  opacity: 0;
  transform: scaleY(0);
  transform-origin: center top;
}
</style>