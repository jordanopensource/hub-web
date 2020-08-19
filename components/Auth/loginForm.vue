<template>
  <form @submit.prevent="postLogin" class="w-full">
    <AppControlInput v-model="username" controlType="input" :placeholder="$t('auth.email')"></AppControlInput>
    <AppControlInput v-model="password" controlType="password" :placeholder="$t('auth.password')"></AppControlInput>
    <div class="ltr:text-right rtl:text-left">
      <AppButton btn-style="button-blue-full" type="submit">{{ $t('auth.login') }}</AppButton>
    </div>
  </form>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined
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
      async postLogin() {
        await axios.post(process.env.baseUrl + '/auth/local', {
            identifier: this.username,
            password: this.password,
          })
          .then(response => {
            const auth = {
              accessToken: response.data.jwt,
              username: response.data.user.username,
              id: response.data.user.id
            }
            this.$store.commit('setAuth', auth) // mutating to store for client rendering
            Cookie.set('auth', auth, {
              sameSite: 'lax',
              secure: true
            }) // saving token in cookie for server rendering
            this.$router.push('/')
          })
          .catch(error => {
            console.log('An error occurred:', error.response);
          });
      }
    },
  }

</script>
