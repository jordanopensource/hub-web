<template>
  <div id="my-profile-page">
    <memberSingle :member="member"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import memberSingle from '~/components/Members/Membersingle'
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
      memberSingle
    },
  }

</script>
