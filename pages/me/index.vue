<template>
  <div class="container">
    <memberSingle :member="member" class="my-12" />
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
