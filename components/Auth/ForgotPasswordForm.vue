<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <AppControlInput v-model="email" controlType="input" :placeholder="$t('auth.email')" required></AppControlInput>
    <AppButton btn-style="button-blue-full" type="submit">{{ $t('auth.send') }}</AppButton>
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
        email: null
      }
    },
    components: {
      AppControlInput,
      AppButton,
    },
    methods: {
      async onSubmit() {
        await axios.post(process.env.baseUrl + '/auth/forgot-password', {
            "email": this.email,
          })
          .then(res => {
            this.success(this.$t('auth.resetSent'));
            this.$router.push('/forgot-password/post');
          });
      },
      success(msg) {
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
          message: msg
        });
      }
    }
  }

</script>
