<template>
  <div class="steps">
    <div class="flex flex-row justify-between flex-wrap lg:flex-no-wrap">
      <div class="w-full lg:w-1/3 lg:max-w-1/3 flex-shrink-0 md:mr-12 lg:mr-24">
        <h3>{{ steps['title_' + $i18n.locale] }}</h3>
        <p class="my-8">{{ steps['description_' + $i18n.locale] }}</p>
      </div>
      <div>
        <stepSingle v-for="step in orderBy(steps.steps, 'order')" :key="step.id" :step="step" class="mb-12 last:mb-0" />
      </div>
    </div>
  </div>
</template>

<script>
  import Vue2Filters from 'vue2-filters';
  import stepSingle from '~/components/Steps/StepSingle';
  export default {
    name: 'Steps List',
    mixins: [Vue2Filters.mixin],
    components: {
      stepSingle
    },
    props: {
      steps: {
        type: Object,
        required: true
      }
    }
  }

</script>

<style scoped>
  .steps {
    @apply py-20
  }

  h3 {
    @apply font-bold
  }

</style>
