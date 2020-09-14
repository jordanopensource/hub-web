<template>
  <div id="profile-page">
    <memberSingle :member="member" />
  </div>
</template>

<script>
  import axios from 'axios';
  import memberSingle from '~/components/Members/Membersingle'
  export default {
    layout: "default",
    async asyncData({params,store}) {
      await store.dispatch('fetchOneUser', params.id);
      return {
        member: store.getters.loadedUser
      }
    },
    components: {
      memberSingle
    }
  };

</script>
