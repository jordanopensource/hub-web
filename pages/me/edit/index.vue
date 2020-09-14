<template>
  <div id="edit-profile-page">
    <editProfile @submit="onSubmitted" :member="member" />
  </div>
</template>

<script>
  import axios from 'axios';
  import editProfile from '~/components/Members/EditProfile'
  export default {
    layout: "default",
    middleware: 'authenticated',
    asyncData({
      store
    }) {
      return {
        member: store.getters.user
      }
    },
    components: {
      editProfile
    },
    methods: {
      async onSubmitted(user) {
        this.$nuxt.$loading.start()
        await this.$store.dispatch("updateUser", user)
          .then(() => {
            this.$router.push('/me');
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
