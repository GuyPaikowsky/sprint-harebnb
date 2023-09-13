<template>
  <header class="app-header-grid">
    <div class="margin-divider"></div>
    <div class="app-header">
      <div class="harebnb-logo">
        <img src="../assets/img/harebnb.svg" alt="Harebnb">
        <p class="title">Harebnb</p>
<!--            <stay-filter @filter="setFilter"/>-->

      </div>
    </div>
    <div class="margin-divider"></div>
  </header>

  <StayLabels/>

</template>

<script>
import { mapGetters} from 'vuex'
import { eventBusService, showErrorMsg, showSuccessMsg} from '@/services/event-bus.service'
import StayFilter from '@/components/StayFilter.vue'
import StayLabels from '@/components/StayLabels.vue'
import DatePicker from '@/components/DatePicker.vue'

export default {
  name: 'AppHeader',
  components: {
    StayLabels,
    StayFilter,
    DatePicker
  },
  data() {
    return {
      userMessage: null,
      userMessageType: null,
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  mounted() {
    eventBusService.on('show-msg', (msg) => {
      this.userMessage = msg.txt
      this.userMessageType = msg.type === 'success' ? 'success' : 'error'
    })
  },
}
</script>