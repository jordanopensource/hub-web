<template>
  <div id="members-page">
    <div>
      <h2 class="title m-0">{{ membersMeta['title_' + $i18n.locale] }}</h2>
      <p class="display-lead py-8">{{ membersMeta['description_' + $i18n.locale] }}</p>
    </div>
    <memberList />
  </div>
</template>

<script>
  import memberList from "~/components/Members/MemberList";
  import axios from 'axios';
  export default {
    layout: "default",
    components: {
      memberList,
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=members');
      return {
        membersMeta: pageMeta.data[0]
      }
    }
  };

</script>


<style scoped>
</style>
