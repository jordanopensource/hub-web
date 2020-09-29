<template>
  <div id="homepage">
    <banner :title="meta['title_' + $i18n.locale]" :description="meta['description_' + $i18n.locale]" />
    <stepsList :steps="steps" class="mt-12" />
    <getBest :data="hubBest" />
  </div>
</template>
<script>
  import axios from 'axios';
  import banner from '~/components/Home/Banner';
  import stepsList from '~/components/Steps/StepsList';
  import getBest from '~/components/Home/GetBest';
  export default {
    components: {
      banner,
      stepsList,
      getBest
    },
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: this.$i18n.locale == 'ar' ? 'الجمعية الأردنية للمصدر المفتوح' : 'Members Hub - Jordan Open Source Association',
        meta: [{
            name: 'description',
            content: this.meta['metaDescription_' + this.$i18n.locale] ? this.meta[
              'metaDescription_' + this.$i18n.locale] : ''
          },
          ...i18nSeo.meta
        ]
      }
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=hubHome');
      const steps = await axios.get(process.env.baseUrl + '/become-member');
      const hubBest = await axios.get(process.env.baseUrl + '/get-best-hub');
      return {
        meta: pageMeta.data[0],
        steps: steps.data,
        hubBest: hubBest.data
      }
    },
  }

</script>

<style scoped>
  #homepage {
    padding-bottom: 0;
  }
</style>
