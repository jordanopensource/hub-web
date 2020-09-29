<template>
  <div class="steps">
    <h3>{{ data['title_' + $i18n.locale] }}</h3>
    <p class="mb-8 mt-4">{{ data['description_' + $i18n.locale] }}</p>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
      <div class="preview flex flex-no-wrap items-start justify-start" v-for="step in orderBy(data.steps, 'order')" :key="step.id" :step="step">
        <appImage v-if="step.image" :image="step.image" size="medium"
          class="image flex-shrink-0 ltr:mr-6 rtl:ml-6" />
        <div class="flex-grow">
          <p class="font-bold">{{ step['title_' + $i18n.locale] }}</p>
          <p class="my-2">{{ step['description_' + $i18n.locale] }}</p>
          <nuxt-link :to="step.link" class="mt-2 inline-block text-josa-blue-dark border py-2 px-4 border-josa-blue-dark rounded hover:opacity-75 hover:text-josa-blue-dark normal-case">{{ step['linkTitle_' + $i18n.locale] }}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue2Filters from 'vue2-filters';
  import appImage from '~/components/UI/appImage';
  export default {
    name: 'Get Best',
    mixins: [Vue2Filters.mixin],
    components: {
      appImage
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    }
  }

</script>

<style scoped>
  .steps {
    @apply -mx-12 px-12 py-20 bg-right bg-no-repeat bg-contain;
    background-image: url("/images/bg/background2.svg");
    background-color: #e5f2f7;
  }

  h3 {
    @apply font-bold;
  }

  .image {
    width: 120px;
    height: 120px;
  }
</style>
