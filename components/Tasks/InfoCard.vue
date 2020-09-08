<template>
  <div class="p-4 bg-josa-warm-grey-light">
    <div class="info-card">
      <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'clock']" />
      <div>
        <p class="font-bold leading-none">{{ $t('tasks.due') }}</p>
        <p v-if="task.dueDate">{{ task.dueDate | fullDate($i18n.locale) }}</p>
        <p v-else>{{ $t('tasks.open') }}</p>
      </div>
    </div>
    <!-- <div class="info-card">
      <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'toggle-on']" />
      <div>
        <p class="font-bold leading-none">{{ $t('tasks.status') }}</p>
        <p>{{ $t('tasks.' + task.status) }}</p>
      </div>
    </div> -->
  </div>
</template>

<script>
  export default {
    name: 'InfoCard',
    components: {},
    props: {
      task: {
        type: Object,
        required: true
      }
    }
  }

</script>

<style scoped>
  .info-card {
    @apply m-6 flex align-top;

  }

  .icon {
    @apply text-josa-warm-grey-dark text-2xl;
  }

  .button {
    width: 100%;
  }

</style>
