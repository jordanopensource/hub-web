<template>
  <div class="flex">
    <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'star']" />
    <span>
      <h5>{{ activity.date | monthYear($i18n.locale) }}</h5>
      <h3>{{ activity.title_en }}</h3>
      <p v-if="activity.subTitle_en">{{ activity.subTitle_en }}</p>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      activity: {
        type: Object,
        required: true
      }
    },
  }

</script>
<style scoped>
  h3 {
    @apply leading-none pb-1;
  }

</style>
