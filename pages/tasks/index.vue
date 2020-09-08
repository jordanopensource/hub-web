<template>
  <div id="tasks-page">
    <div>
      <h2 class="title m-0">{{ taskMeta['title_' + $i18n.locale] }}</h2>
      <p class="display-lead py-8">{{ taskMeta['description_' + $i18n.locale] }}</p>
    </div>
    <!-- Menu -->
    <!-- <div class="flex flex-col sm:flex-row py-6 border-t border-b border-dotted">
      <span :class="activeCat == 'all' ? 'active': ''" class="cat-link display-lead"
        @click="setActiveCat('all')">{{ $t('tasks.all') }}</span>
      <span :class="activeCat == cat.name ? 'active': ''" class="cat-link  display-lead" v-for="cat in taskCategories"
        :key="cat.id" @click="setActiveCat(cat.name)">{{ cat['title_' + $i18n.locale] }}</span>
    </div> -->
    <!-- Preview -->
    <nuxt-link v-if="$store.getters.auth" to="/tasks/create" tag='a' class="button button-blue-full block mb-4">Create new task</nuxt-link>
    <taskList :category="all" />
    </div>
</template>

<script>
  import axios from 'axios';
  import taskList from "~/components/Tasks/TaskList";
  import appButton from '~/components/FormComponents/AppButton';
  import pageBanner from "~/components/UI/PageBanner";

  export default {
    data() {
      return {
        activeCat: 'all'
      }
    },
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: this.taskMeta['title_' + this.$i18n.locale],
        meta: [{
            hid: 'tasks',
            name: 'tasks'
          },
          ...i18nSeo.meta
        ]
      }
    },
    layout: "default",
    components: {
      taskList,
      appButton,
      pageBanner
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=tasks');
      const cats = await axios.get(process.env.baseUrl + '/task-categories');
      return {
        taskMeta: pageMeta.data[0],
        taskCategories: cats.data
      }
    },
    methods: {
      setActiveCat(cat) {
        this.activeCat = cat
      }
    }
  };

</script>

<style scoped>
.button {
  max-width: 200px;
}
</style>
