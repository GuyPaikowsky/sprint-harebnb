<template>
  <section class="container">
    <AppHeader/>
    <main>
      <router-view />
    </main>
    <AppFooter/>
    <UserMsg />
  </section>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import UserMsg from './components/UserMsg.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    AppHeader,
    AppFooter,
    UserMsg,
  }
}
</script>
