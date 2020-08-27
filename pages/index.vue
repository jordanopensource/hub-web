<template>
  <div class="container">
    <div class="my-12 bg-white">
      <!-- Banner -->
      <pageBanner :pageMeta="registerMeta" />
      <!-- Registration Form -->
      <div class="row">
        <registrationForm @submit="onSubmitted" />
      </div>

    </div>
  </div>
</template>

<script>
  import pageBanner from "@/components/UI/PageBanner";
  import registrationForm from '~/components/Members/RegistrationForm';
  import axios from 'axios';
  export default {
    layout: "default",
    components: {
      pageBanner,
      registrationForm
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=register');
      return {
        registerMeta: pageMeta.data[0]
      }
    },
    methods: {
      async onSubmitted(user) {
        await this.$store.dispatch("newUser", user)
          .then(() => {
            const regRes = this.$store.getters.regRes;
            if (regRes.status != 200) {
              const msg = regRes.data.message[0].messages[0].message;
              this.fail(msg);
            } else {
              this.$router.push('/post-registration');
            }
          })
      },
      fail(msg) {
        this.flashMessage.setStrategy('single');
        this.flashMessage.error({
          message: msg
        });
      }
    }
  };

</script>
<style>

</style>
