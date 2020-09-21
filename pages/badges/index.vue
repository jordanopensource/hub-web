<template>
  <div id="badges-page">
    <div class="border-b border-dotted">
      <h2 class="title m-0">{{ meta['title_' + $i18n.locale] }}</h2>
      <p v-if="meta['description_' + $i18n.locale]" class="display-lead py-8">{{ meta['description_' + $i18n.locale] }}</p>
    </div>
    <badgesList :badges="badges"/>
  </div>
</template>

<script>
  import badgesList from "~/components/Badges/BadgesList";
  import axios from 'axios';
  export default {
    layout: "default",
    components: {
      badgesList,
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=badges');
      const badges = await axios.get(process.env.baseUrl + '/badges');
      return {
        meta: pageMeta.data[0],
        badges: badges.data
      }
    }
  };

</script>


<style scoped>
</style>
