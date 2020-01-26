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

    <div class="form-group">
      <label for="inputAddress">Shop Type</label>
      <b-form-select v-model="shopType" :options="shopTypes" @input="onChange"></b-form-select>
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

    <b-form-group label-cols-lg="2" label="Opening Hours :" class="mb-0">
      <b-form-group label-cols-sm="2" label="Open 24/7?:" label-align-sm="right" label-for="nested-street" id="allDay">
        <b-form-checkbox id="checkbox-1" v-model="allDay" name="checkbox-1"></b-form-checkbox>
      </b-form-group>
      <b-form-group :key="openingTime.day" v-for="openingTime in openingTimes" label-cols-sm="2" :label="openingTime.day" label-align-sm="right" label-for="nested-street" v-if="!allDay">
        <vue-timepicker @input="onChange" v-model="openingTime.from" auto-scroll :minute-interval="10" close-on-complete input-width="15em"></vue-timepicker>
        <span class="px-2">to :</span>
        <vue-timepicker @input="onChange" v-model="openingTime.to" auto-scroll :minute-interval="10" close-on-complete input-width="15em"></vue-timepicker>
      </b-form-group>
    </b-form-group>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, computed, watch, PropType } from '@vue/composition-api';
import ShopsService from '@/services/shopsService';
import ProductsService from '@/features/products/productsService';
import { Shop } from '../features/shops/Shop'
import { PropOptions } from 'vue';
// @ts-ignore
import VueTimepicker from 'vue2-timepicker/src'
import { OpeningTimes } from '@/features/shops/OpeningHours';
export default createComponent({
  model: {
    prop: 'shop',
    event: 'input'
  },
  props: {
    shop: {
      type: Object as () => Shop,
      required: true
    }
  },
  components: {
    VueTimepicker
  },
  setup(props, { emit }) {
    const productService = new ProductsService();
    const shopService = new ShopsService();
    const options = ref<any[]>([])
    let name = ref(props.shop.name)
    let address = ref(props.shop.address)
    let allDay = ref(false)
    let openingTimes = ref<OpeningTimes[]>([
      { day: 'Monday', from: '', to: '' },
      { day: 'Tuesday', from: '', to: '' },
      { day: 'Wednesday', from: '', to: '' },
      { day: 'Thursday', from: '', to: '' },
      { day: 'Friday', from: '', to: '' },
      { day: 'Saturday', from: '', to: '' },
      { day: 'Sunday', from: '', to: '' },
    ]);

    openingTimes.value.forEach((o) => {
      o.from = '09:00';
      o.to = '17:00'
    })
    let shopType = ref('Shop')
    let shopTypes = ref(['Shop', 'Roadside', 'Car park', 'Community', 'Recycling Centre'])

    onMounted(async () => {
      options.value = await productService.getProducts();

    })
    let selectedProducts = ref<string[]>(props.shop.products)
    const availableOptions = computed(() => options.value.filter(opt => selectedProducts.value.indexOf(opt.name) === -1))

    watch(() => {
      name.value = props.shop.name;
      address.value = props.shop.address;
      selectedProducts.value = props.shop.products;
      openingTimes.value = props.shop.openingTimes;
      shopType.value = props.shop.shopType;
    })


    function onChange() {
      emit('input', {
        name: name.value,
        address: address.value,
        products: selectedProducts.value,
        shopType: shopType.value,
        openingTimes: openingTimes.value
      })
    }

    return {      name, address, options, selectedProducts, availableOptions, onChange, allDay, openingTimes,
      shopType, shopTypes    }
  }
});
</script>

<style lang="scss" >
#allDay {
  div.bv-no-focus-ring {
    display: flex;
    align-items: center;
  }
}
</style>