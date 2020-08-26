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
      onSubmitted(user) {
        this.$store.dispatch("newUser", user).then(() => {
          this.$router.push("/members");
        });
      }
    }
  };

</script>
<style>

</style>
