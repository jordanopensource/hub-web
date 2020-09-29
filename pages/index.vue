<template>
  <div id="homepage">
    <banner :title="meta['title_' + $i18n.locale]" :description="meta['description_' + $i18n.locale]" />
  </div>
</template>
<script>
  import axios from 'axios';
  import banner from '~/components/Home/Banner';
  export default {
    components: {
      banner
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
      return {
        meta: pageMeta.data[0],
      }
    },
  }

</script>
