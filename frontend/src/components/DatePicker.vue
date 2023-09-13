<template>
  <VueDatePicker v-model="date" range
                 placeholder="Select Date"
                 :enable-time-picker="false"/>
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  name: 'DatePicker',
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    }
  },
  mounted() {
    const startDate = new Date()
    const endDate = new Date()
    // this.date = [startDate, endDate]
  }
}
</script>

<style lang="scss">
@import '../assets/style/cmps/_DatePicker.scss';
</style>

