<template>
  <section class="stay-index">
<!--    <stay-filter @filter="setFilter"/>-->
    <stay-list :stays="stays"/>
  </section>
</template>

<script>
import StayList from '@/components/StayList.vue'
import StayFilter from "@/components/StayFilter.vue"

export default {
  name: 'StayIndex',
  components: {
    StayList,
    StayFilter
  },
  data() {
    return {
      stays: [],
    }
  },
  methods: {
    setFilter(filter) {
      this.$store.dispatch('setFilter', filter)
          .then(() => this.$store.dispatch('loadStays'))
    }
  },
  watch: {
    '$store.state.stays': {
      handler(newVal) {
        this.stays = newVal
      },
      immediate: true
    }
  }
}
</script>
