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
    asyncData(context) {
      return axios.get(process.env.baseUrl + '/users/' + context.params.id)
        .then(res => {
          return {
            member: res.data
          }
        })
        .catch(e => context.error(e))
    },
    components: {
      memberSingle
    }
  };

</script>
