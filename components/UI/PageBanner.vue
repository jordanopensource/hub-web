<template>
  <div id="banner" class="flex flex-row justify-between flex-wrap sm:flex-no-wrap items-start">
    <div class="sm:max-w-1/2 lg:max-w-1/3">
      <h4 class="font-aleoLightItalic mb-8 title">{{ pageMeta['title_' + $i18n.locale] | capitalize }}</h4>
      <p class="display-lead">{{ pageMeta['description_' + $i18n.locale] }}</p>
    </div>
    <appImage :image="pageMeta.image" class="bot mx-auto sm:mx-0 md:ltr:pl-8 md:rtl:pr-8" />
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  export default {
    props: {
      pageMeta: {
        type: Object,
        required: true
      }
    },
    components: {
      appImage
    }
  }

</script>

<style scoped>
  .bot {
    width: 350px;
    height: auto;
  }

  @screen lg {
    .bot {
      width: 400px;
    }
  }

</style>
