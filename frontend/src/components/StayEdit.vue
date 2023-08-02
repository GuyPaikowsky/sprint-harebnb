<template>
  <div>
    <h2>Edit Stay</h2>
    <form @submit.prevent="submitForm">
      <label>Name: <input v-model="currentStay.name"/></label>
      <label>Price: <input v-model="currentStay.price"/></label>
      <label>In Stock: <input type="checkbox" v-model="currentStay.inStock"/></label>
      <label>Labels: <input v-model="labelsString"/></label>
      <button type="submit">Save</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'StayEdit',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    stay() {
      return this.$store.getters.getStayById(this.id)
    },
    labelsString: {
      get() {
        return Array.isArray(this.currentStay.labels) ? this.currentStay.labels.join(', ') : ''
      },
      set(newString) {
        this.currentStay.labels = newString.split(',').map(label => label.trim())
      }
    }
  },
  data() {
    return {
      currentStay: null
    }
  },
  methods: {
    submitForm() {
      this.$store.dispatch('saveStay', this.currentStay)
    }
  },
  watch: {
    stay: {
      immediate: true,
      handler(newValue) {
        this.currentStay = {...newValue}
      }
    }
  }
}
</script>
