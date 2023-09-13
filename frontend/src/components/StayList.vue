<template>

  <router-link :to="{ name: 'staysMap'}">Display Map</router-link>

  <ul class="stay-list" @scroll.passive="onScroll">
    <StayPreview
        v-for="stay in stays"
        :key="stay._id"
        :stay="stay"
        @remove="removeStay"
    />
  </ul>

  <StayDetails v-if="$store.state.selectedStay._id"/>
</template>

<script>
import StayPreview from '@/components/StayPreview.vue'
import StayDetails from '@/components/StayDetails.vue'
import StayEdit from '@/components/StayEdit.vue'

export default {
  name: 'StayList',
  props: {
    stays: {
      type: Array,
      required: true
    }
  },
  mounted() {
    window.addEventListener('scroll', this.onScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    removeStay(stayId) {
      this.$store.dispatch('deleteStay', stayId)
    },
    showDetails(stayId) {
      this.$store.dispatch('loadStay', stayId)
    },
    onScroll(event) {
      console.log('scroll-down')
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const tolerance = 5
      const bottom = scrollHeight - scrollTop <= clientHeight + tolerance
      if (bottom) {
        this.$store.dispatch('loadStays')
      }
    }
  },
  created() {
    this.$store.dispatch('loadStays')
  },
  components: {
    StayPreview,
    StayDetails,
    StayEdit
  }
}
</script>