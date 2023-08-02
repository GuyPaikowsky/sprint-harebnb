<template>
  <transition name="modal">
    <div class="modal-mask" v-if="stay._id">
      <div class="modal-container">
        <h2>{{ stay.name }}</h2>
        <p>Price: {{ stay.price }}</p>
        <p>Created at: {{ new Date(stay.createdAt).toLocaleDateString() }}</p>
        <p>Labels: {{ Array.isArray(stay.labels) ? stay.labels.join(", ") : "" }}</p>
        <button @click="close">Close</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'StayDetails',
  computed: {
    stay() {
      return this.$store.state.selectedStay
    },
  },
  methods: {
    close() {
      this.$store.commit('clearSelectedStay')
    },
  },
}
</script>
