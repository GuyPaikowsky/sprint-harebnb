<!--// TODO: check possibility of using props here.-->

<template>
  <div>

    <form v-if="!user"
      @submit.prevent="onSubmit">
      <input v-model="credentials.username" placeholder="Username" required/>
      <input v-model="credentials.password" placeholder="Password" required type="password"/>

      <input v-if="!isLoginMode" v-model="credentials.fullname" placeholder="Full Name" required/>
      <button type="submit">{{ isLoginMode ? 'Login' : 'Signup' }}</button>
      <button @click="toggleMode">{{ isLoginMode ? 'Switch to Signup' : 'Switch to Login' }}</button>
    </form>
    <div v-else>
      <p>Hello {{user.fullname}}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>

</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
  data() {
    return {
      credentials: {username: "", password: ""},
      isLoginMode: true
    }
  },
  methods: {
    ...mapActions(['login', 'signup', 'logout']),
    async onSubmit() {
      try {
        if (this.isLoginMode) {
          await this.login(this.credentials)
        } else {
          await this.signup(this.credentials)
        }
      } catch (err) {
        console.error(err);
      }
    },
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    },
    async onLogout() {
      try {
        await this.logout()
      } catch(err) {
        console.error(err)
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  }
}
</script>