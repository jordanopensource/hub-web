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
    asyncData({error, store}) {
      return axios.get(process.env.baseUrl + '/users/' + store.getters.auth.id)
        .then(res => {
          return {
            member: res.data
          }
        })
        .catch(e => error(e))
    },
    components: {
      memberSingle
    },
  }

</script>
