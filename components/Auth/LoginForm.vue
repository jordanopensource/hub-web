<template>
  <form @submit.prevent="submit" class="w-full">
    <AppControlInput v-model="username" controlType="email" :placeholder="$t('auth.email')" required></AppControlInput>
    <AppControlInput v-model="password" controlType="password" :placeholder="$t('auth.password')" required></AppControlInput>
    <h6 v-if="loginFailed" class="text-red-600">{{ $t('auth.incorrect') }}</h6>
    <nuxt-link to='/forgot-password' class="italic text-sm text-josa-blue">{{ $t('auth.forgotPassword') }}</nuxt-link>
    <AppButton btn-style="button-blue-full" type="submit" class="block mt-4">{{ $t('auth.login') }}</AppButton>
  </form>
</template>

<script>
  import axios from 'axios';
  import AppControlInput from "~/components/FormComponents/AppControlInput";
  import AppButton from "~/components/FormComponents/AppButton";

  export default {
    middleware: 'notAuthenticated',
    data() {
      return {
        username: null,
        password: null,
        loginFailed: false,
      }
    },
    components: {
      AppControlInput,
      AppButton,
    },
    methods: {
      submit() {
        const credintials = {
          identifier: this.username,
          password: this.password,
        }
        this.$store.dispatch('login', credintials).then(() => {
          let loginStatus = null
          loginStatus = this.$store.getters.loginStatus
          if (loginStatus) {
          this.loginFailed = false
          this.$emit('loggedIn')
          } else {
            this.loginFailed = true
            this.password=''
          }
        })
      },
    },
  }

</script>
