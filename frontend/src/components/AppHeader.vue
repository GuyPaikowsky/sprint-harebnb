<template>
  <header class="app-header">
    <div class="harebnb-logo">
      <img src="../assets/img/harebnb.svg" alt="Harebnb">
      <p class="title">harebnb</p>
    </div>
    <nav class="label-header">

    </nav>

<!--    <p v-if="user">Welcome, <RouterLink to="/user">{{ user.fullname }}</RouterLink></p>-->
<!--    <p v-else> <RouterLink to="/user">Login</RouterLink></p>-->

<!--    <div v-if="userMessage" :class="'user-msg ' + userMessageType">{{ userMessage }}</div>-->

<!--    <nav>-->
<!--      <RouterLink to="/stays">Stays</RouterLink>-->
<!--    </nav>-->
  </header>
</template>

<script>
import {mapGetters} from 'vuex'
import {eventBusService, showErrorMsg, showSuccessMsg} from '@/services/event-bus.service'

export default {
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
  }
}
</script>
