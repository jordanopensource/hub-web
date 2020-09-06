<template>
  <div class="badges flex flex-wrap">
    <span v-for="badge in badges" :key="badge.badgeId" class="tooltip my-2 ltr:mr-2 rtl:ml-2">
      <appImage :image="badge.icon" class="inline-block" />
      <tooltip>{{ badge['name_' + $i18n.locale] ? badge['name_' + $i18n.locale] : badge['name_en'] }}</tooltip>
    </span>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import tooltip from '~/components/UI/Tooltip';

  export default {
    name: 'Badges',
    props: {
      badges: {
        type: Array,
        required: true
      }
    },
    components: {
      appImage,
      tooltip
    },
  }

</script>

<style scoped>
  .badges img {
    width: 64px;
    height: 64px;
    @apply rounded-sm
  }

</style>
