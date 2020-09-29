<template>
  <div class="preview flex flex-no-wrap items-start">
    <appImage v-if="step.image" :image="step.image" size="medium" class="image flex-shrink-0 ltr:pr-6 rtl:pl-6" />
    <div class="flex-grow">
      <p class="font-bold mt-4">{{ step['title_' + $i18n.locale] }}</p>
      <p class="my-2">{{ step['description_' + $i18n.locale] }}</p>
      <nuxt-link :to="step.link"
        class="block text-josa-blue font-bold ltr:text-sm rtl:text-base hover:opacity-75">
        {{ step['linkTitle_' + $i18n.locale] }} >
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  export default {
    components: {
      appImage
    },
    props: {
      step: {
        type: Object,
        required: true
      }
    }
  }

</script>

<style scoped>
.image {
  width: 200px;
  height: 150px;
}
@screen lg {
  .image {
  width: 250px;
  height: 200px;
}
}
</style>
