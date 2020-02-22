<template>
  <div class="container-fluid">
    <div class="m-3 p-4 border shadow-sm">
      <h1>All Locations</h1>
      <b-table :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" sticky-header="80vh" striped hover :items="shops" :fields="fields">
        <template v-slot:cell(products)="{item}">
          <product-badges :products="item.products" />
        </template>

        <template v-slot:cell(openingTimes)="{item}">
          <div style="width : 300px">
            <button class="btn btn-outline-primary btn-block" v-b-toggle="`opening-hours-${item.id}`">
              Opening Hours
              <b-icon-chevron-compact-down />
            </button>
            <b-collapse :id="`opening-hours-${item.id}`" class="border-top-0 border border-primary bg-white">
              <div class="d-flex justify-content-cente p-2">
                <div v-if="item.is247">
                  <em>24/7</em>
                </div>
                <div v-else-if="item.externalOpeningHours">
                  <a target="_blank" :href="item.externalWebsite">Click here for Opening Hours</a>
                </div>
                <div v-else>
                  <div :key="openingTime.day" v-for="openingTime in item.openingTimes" class="d-flex">
                    <span class="mr-1" style="width : 100px">{{openingTime.day}} :</span>
                    <span v-if="openingTime.isClosed">CLOSED</span>
                    <span v-else>{{openingTime.from}} - {{openingTime.to}}</span>
                  </div>
                </div>
              </div>
            </b-collapse>
          </div>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref, onMounted } from '@vue/composition-api';
import ShopsService from '@/services/shopsService';
import { Shop } from './Shop';
import ProductBadges from '@/components/ProductBadges.vue'
export default createComponent({
  components: {
    ProductBadges
  },
  setup() {
    const shopService = new ShopsService();

    let shops = ref<Shop[]>([])
    onMounted(async () => shops.value = await shopService.get())

    let fields = [
      { key: 'name', sortable: true },
      { key: 'address', sortable: true },
      { key: 'products', sortable: true },
      { key: 'openingTimes', sortable: false }
    ]
    let sortBy = ref('name');
    let sortDesc = ref(false);




    return { shops, fields, sortBy, sortDesc }
  }
});
</script>

<style>
</style>