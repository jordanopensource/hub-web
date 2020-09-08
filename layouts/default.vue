<template>
  <div :dir="$dir()">
    <mainHeader />
    <FlashMessage :position="'right top'" />
    <div class="bg-josa-warm-grey-light">
      <div class="container">
        <nuxt class="row" />
      </div>
    </div>
    <mainFooter />
  </div>
</template>

<script>
  import mainHeader from '~/components/UI/Header';
  import mainFooter from '~/components/UI/Footer';

  export default {
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: 'Jordan Open Source Association',
        meta: [{
            hid: 'home-page',
            name: 'Home Page',
            content: 'JOSA Portal Web App'
          },
          ...i18nSeo.meta
        ]
      }
    },
    components: {
      mainHeader,
      mainFooter
    },
  }

</script>
<style>

</style>
