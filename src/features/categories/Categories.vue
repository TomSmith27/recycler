<template>
  <div class="container-fluid p-4">
    <h1>Categories</h1>
    <div class="d-flex flex-wrap">
      <div :key="cat.id" v-for="cat in categories" class="col-md-6 py-2">
        <b-card :header="cat.name" class="text-center">
          <b-card-text>
            <draggable v-model="cat.products" group="people">
              <div :key="prod.name" v-for="prod in cat.products">
                <b-badge class="big-badge" variant="primary">{{ prod.name }}</b-badge>
              </div>
            </draggable>
          </b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createComponent, computed, onMounted, ref } from '@vue/composition-api';
import draggable from 'vuedraggable';
export default createComponent({
  components: {
    draggable
  },
  setup() {
    const categories = ref([
      {
        id: 1,
        name: 'Cat 1',
        products: [
          {
            name: 'prod1'
          }
        ]
      },
      {
        id: 2,
        name: 'Cat 2',
        products: [
          {
            name: 'prod2'
          }
        ]
      },
      {
        id: 2,
        name: 'Cat 2',
        products: [{ name: 'prod3' }, { name: 'prod4' }]
      }
    ]);

    return {
      categories
    };
  }
});
</script>

<style></style>
