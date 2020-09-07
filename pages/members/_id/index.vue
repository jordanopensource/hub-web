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
