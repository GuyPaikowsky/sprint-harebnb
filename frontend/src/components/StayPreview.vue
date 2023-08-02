<template>
  <li>
    <h2>{{ stay.name }}</h2>
    <p>Price: ${{ stay.price }}</p>
    <p>Labels: {{ Array.isArray(stay.labels) ? stay.labels.join(", ") : "" }}</p>
    <button @click="removeStay">X</button>
    <button @click="showDetails">Details</button>
    <router-link :to="{ name: 'stay-edit', params: { id: stay._id } }">Edit</router-link>
  </li>
</template>

<script>
import StayDetails from "@/components/StayDetails.vue"

export default {
  name: 'StayPreview',
  props: {
    stay: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeStay() {
      this.$emit('remove', this.stay._id)
    },
    showDetails() {
      this.$store.dispatch('loadStay', this.stay._id)
    }
  },
  components: {
    StayDetails
  }
}
</script>
