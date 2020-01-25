<template>
  <div>
    <div class="form-row">
      <div class="form-group col">
        <label>Name</label>
        <input type="text" class="form-control" v-model="name" placeholder="Name" @input="onChange" />
      </div>
    </div>
    <div class="form-group">
      <label for="inputAddress">Address</label>
      <textarea class="form-control" rows="3" v-model="address" @input="onChange"></textarea>
    </div>

    <b-form-group label="Products this shop can recycle">
      <!-- prop `add-on-change` is needed to enable adding tags vie the `change` event -->
      <b-form-tags v-model="selectedProducts" size="lg" add-on-change no-outer-focus class="mb-2" @input="onChange">
        <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
          <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
            <li v-for="tag in tags" :key="tag" class="list-inline-item">
              <b-form-tag @remove="removeTag(tag)" :title="tag" :disabled="disabled" variant="primary">{{ tag }}</b-form-tag>
            </li>
          </ul>
          <b-form-select v-bind="inputAttrs" v-on="inputHandlers" text-field="name" value-field="name" :disabled="disabled || availableOptions.length === 0" :options="availableOptions">
            <template v-slot:first>
              <!-- This is required to prevent bugs with Safari -->
              <option disabled value>Choose a product...</option>
            </template>
          </b-form-select>
        </template>
      </b-form-tags>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, computed, watch, onUpdated } from '@vue/composition-api';
import ShopsService from '@/services/shopsService';
import ProductsService from '@/services/productsService';
export default createComponent({
  model: {
    prop: 'shop',
    event: 'input'
  },
  props: {
    shop: Object
  },
  components: {
  },
  setup(props: any, { emit }) {
    const productService = new ProductsService();
    const shopService = new ShopsService();
    const options = ref<any[]>([])
    let name = ref(props.shop.name)
    let address = ref(props.shop.address)


    onMounted(async () => {
      options.value = await productService.getProducts();

    })

    /*   onUpdated(() => {
  
  
      }) */

    let selectedProducts = ref<string>(props.shop.products)
    const availableOptions = computed(() => options.value.filter(opt => selectedProducts.value.indexOf(opt.name) === -1))

    watch(() => {
      name.value = props.shop.name;
      address.value = props.shop.address;
      selectedProducts.value = props.shop.products;

    })


    function onChange() {
      emit('input', {
        name: name.value,
        address: address.value,
        products: selectedProducts.value
      })
    }

    return { name, address, options, selectedProducts, availableOptions, onChange }
  }
});
</script>

<style>
</style>