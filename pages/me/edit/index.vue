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
        await this.$store.dispatch("updateUser", user)
          .then(() => {
            const res = this.$store.getters.updateRes;
            if (res.status != 200) {
              // const msg = res.data.message[0].messages[0].message;
              // this.fail(msg);
              console.log(res)
            } else {
              this.$router.push('/me');
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
