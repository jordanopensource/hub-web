<template>
  <div class="preview flex flex-no-wrap items-start">
    <appImage v-if="step.image" :image="step.image" size="medium" class="w-1/2 lg:w-1/3 flex-shrink-0 ltr:pr-6 rtl:pl-6" />
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
    },
    computed: {
      arrowIcon() {
        if (this.$i18n.locale == "ar") {
          return 'long-arrow-alt-left'
        } else {
          return 'long-arrow-alt-right'
        }
      }
    }
  }

</script>

<style>

</style>
