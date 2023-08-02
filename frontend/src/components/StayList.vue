<template>
  <ul class="stay-list">
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
import StayDetails from "@/components/StayDetails.vue"
import StayEdit from "@/components/StayEdit.vue"

export default {
  name: 'StayList',
  props: {
    stays: {
      type: Array,
      required: true
    }
  },
  methods: {
    removeStay(stayId) {
      this.$store.dispatch('deleteStay', stayId)
    },
    showDetails(stayId) {
      this.$store.dispatch('loadStay', stayId)
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