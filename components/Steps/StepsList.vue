<template>
  <div class="steps">
    <div class="flex flex-row justify-between flex-wrap md:flex-no-wrap">
      <div class="md:max-w-1/2 lg:max-w-1/3 md:mr-12 lg:mr-24">
        <h3>{{ steps['title_' + $i18n.locale] }}</h3>
        <p class="my-8">{{ steps['description_' + $i18n.locale] }}</p>
      </div>
      <div>
        <stepSingle v-for="step in steps.steps" :key="step.id" :step="step" class="mb-12 last:mb-0"/>
      </div>
    </div>
  </div>
</template>

<script>
import stepSingle from '~/components/Steps/StepSingle';
export default {
  name: 'Steps List',
  components: {
    stepSingle
  },
  props: {
    steps: {
      type: Array,
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
