<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <AppControlInput v-model="password" controlType="password" :placeholder="$t('auth.password')" required>
    </AppControlInput>
    <AppControlInput v-model="passwordConfirmation" controlType="password"
      :placeholder="$t('auth.passwordConfirmation')" :class="match?'':'no-match'" ref="passwordConfirmation" required>
    </AppControlInput>
    <p id=pass_hint></p>
    <AppButton btn-style="button-blue-full" type="submit">{{ $t('auth.send') }}</AppButton>
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
        password: null,
        passwordConfirmation: null,
        code: this.$route.query.code
      }
    },
    components: {
      AppControlInput,
      AppButton,
    },
    computed: {
      match() {
        if (this.password === this.passwordConfirmation) {
          return true
        } else {
          return false
        }
      }
    },
    methods: {
      async onSubmit() {
        if (this.match) {
          await axios.post(process.env.baseUrl + '/auth/reset-password', {
              "password": this.password,
              "passwordConfirmation": this.passwordConfirmation,
              "code": this.code
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
              this.success(this.$t('auth.success'));
              this.$router.push('/')
            })
            .catch(error => {
              this.fail(this.$t('auth.fail'));
            });
        } else {
          this.fail(this.$t('auth.noMatch'));
        }
      },
      success(msg) {
        this.flashMessage.success({
          message: msg
        });
      },
      fail(msg) {
        this.flashMessage.error({
          message: msg
        });
      }
    }
  }

</script>
<style scoped>
  .no-match /deep/ input {}

</style>
