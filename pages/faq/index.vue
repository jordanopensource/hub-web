<template>
  <div>
    <banner :title="meta['title_' + $i18n.locale]" :description="meta['description_' + $i18n.locale]" />

    <div class="container py-20 mt-12">
      <div class="px-12 flex flex-col-reverse md:flex-row " v-if="ifNotEmpty()">
        <!-- Section Content -->
        <template v-for="section in content.section">
          <div :key="section.sectionId" v-if="activeSection == section.sectionId" class="section-content flex-grow pt-8 md:pt-0 md:ltr:pr-12 md:rtl:pl-12">
            <span v-if="section['description_' + $i18n.locale]" v-html="section['description_' + $i18n.locale]"></span>
            <span v-else></span>
          </div>
        </template>
        <!-- Sections Menu -->
        <div class="sections-menu md:ltr:pl-12 md:rtl:pr-12 w-full md:w-1/4 flex-shrink-0 border-b border-l-0 md:border-b-0 md:border-l border-josa-warm-grey-dark">
          <div v-for="section in content.section" :key="section.sectionId"
            :class="activeSection == section.sectionId ? 'active': ''" class="section-link"
            @click="setActiveSection(section.sectionId)">
            <span v-if="section['title_' + $i18n.locale]">{{ section['title_' + $i18n.locale] }}</span>
            <span v-else></span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios';
  import banner from "~/components/Home/Banner";
  export default {
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: this.content['title_' + this.$i18n.locale] + ' - ' + (this.$i18n.locale == 'ar' ?
          'الجمعية الأردنية للمصدر المفتوح' : 'Jordan Open Source Association'),
        meta: [{
            name: 'description',
            content: this.content['description_' + this.$i18n.locale] ? this.content[
              'description_' + this.$i18n.locale] : ''
          },
          ...i18nSeo.meta
        ]
      }
    },
    layout: "default",
    components: {
      banner
    },
    methods: {
      setActiveSection(section) {
        this.activeSection = section
      },
      ifNotEmpty() {
        if (Array.isArray(this.content.section) && this.content.section.length)
          return true;
        else
          return false;
      },
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=hubHome');
      const content = await axios.get(process.env.baseUrl + '/info-pages?pageId=hub-faq');
      return {
        meta: pageMeta.data[0],
        content: content.data[0],
        activeSection: content.data[0].section[0].sectionId
      }
    }
  }

</script>

<style scoped>
  .section-link {
    @apply text-josa-warm-grey-dark cursor-pointer relative mb-3 leading-relaxed;
  }

  .section-link:hover,
  .section-link.active {
    @apply text-black;
  }

  .section-link:hover:before,
  .section-link.active:before {
    content: "";
    background-color: #c5e1ee;
    height: 1rem;
    width: 24px;
    top: 5px;
    display: block;
    position: absolute;
  }

  [dir="ltr"] .section-link:hover:before,
  [dir="ltr"] .section-link.active:before {
    left: -24px;
  }

  [dir="rtl"] .section-link:hover:before,
  [dir="rtl"] .section-link.active:before {
    right: -24px;
  }

  [dir="ltr"] .section-link {
    padding-left: 8px;
  }

  [dir="rtl"] .section-link {
    padding-right: 8px;
  }

  .section-content>>>h3 {
    @apply text-2xl pb-4 font-bold opacity-90;
  }

  .section-content>>>p {
    @apply mb-4;
  }

</style>
