<template>
  <b-badge class="font-weight-normal" :variant="status.variant">{{status.text}}</b-badge>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import { Shop } from '@/features/shops/Shop';
export default createComponent({
  name: 'shop-status',
  components: {
  },
  props: {
    shop: {
      type: Object as () => Shop,
      required: true
    }
  },
  setup(props) {

    const isOpen = computed(() => {
      if (props.shop.is247) {
        return true;
      }
      else {
        const currentDayOfWeek = new Date().getDay() - 1;
        let openingTimes = props.shop.openingTimes[currentDayOfWeek];

        if (openingTimes.isClosed) {
          return false;
        }

        let currentD = new Date();
        let openTime = new Date();
        let openinTimeParts = openingTimes.from.split(':');
        openTime.setHours(Number.parseInt(openinTimeParts[0]), Number.parseInt(openinTimeParts[1]), 0);

        let closeTime = new Date();
        let closeTimeParts = openingTimes.to.split(':');
        closeTime.setHours(Number.parseInt(closeTimeParts[0]), Number.parseInt(closeTimeParts[1]), 0);

        console.log(openTime, closeTime)
        if (currentD > openTime && currentD < closeTime) {
          return true;
        }
        else {
          return false;
        }

      }
    })

    const status = computed(() => {
      console.log('test')
      if (isOpen.value) {
        return { variant: 'success', text: 'Open' }
      }

      return { variant: 'danger', text: 'closed' }
    })


    return { status }

  }
});
</script>

<style>
</style>