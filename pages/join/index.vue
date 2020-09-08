<template>
  <div id="join">
    <div>
      <h2 class="title m-0">{{ registerMeta['title_' + $i18n.locale] }}</h2>
      <p class="display-lead py-8">{{ registerMeta['description_' + $i18n.locale] }}</p>
    </div>
    <registrationForm @submit="onSubmitted" />
  </div>
</template>

<script>
  import pageBanner from "@/components/UI/PageBanner";
  import registrationForm from '~/components/Members/RegistrationForm';
  import axios from 'axios';
  export default {
    layout: "default",
    middleware: 'notAuthenticated',
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
              this.$router.push('join/post');
            }
          })
      },
      fail(msg) {
        this.flashMessage.error({
          message: msg
        });
      }
    }
  };

</script>
<style>

</style>
