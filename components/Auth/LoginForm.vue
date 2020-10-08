<template>
  <form @submit.prevent="submit" class="w-full">
    <AppControlInput v-model="username" controlType="input" :placeholder="$t('auth.email')"></AppControlInput>
    <AppControlInput v-model="password" controlType="password" :placeholder="$t('auth.password')"></AppControlInput>
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
        password: null
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
        this.$store.dispatch('login', credintials);
        this.$emit('loggedIn');
      },
    },
  }

</script>
