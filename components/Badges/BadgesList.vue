<template>
  <div class="badges-list">
    <div v-for="badge in orderBy(badges, 'order')" :key="badge.badgeId"
      class=" flex flex-col sm:flex-row items-start sm:items-center border-b border-dotted">
      <appImage :image="badge.icon" class="inline-block mr-4 my-8" />
      <h2 class="inline-block text-2xl">
        {{ badge['name_' + $i18n.locale] ? badge['name_' + $i18n.locale] : badge['name_en'] }}</h2>
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import Vue2Filters from 'vue2-filters';
  export default {
    name: 'BadgesList',
    mixins: [Vue2Filters.mixin],
    props: {
      badges: {
        type: Array,
        required: true
      }
    },
    components: {
      appImage
    },
  }

</script>

<style scoped>
  .badges-list img {
    width: 80px;
    height: 80px;
    @apply rounded-sm
  }

</style>
