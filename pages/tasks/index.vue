<template>
  <div class="task-page">
    <!-- Banner -->
    <div class="bg-josa-warm-grey-light">
      <pageBanner :pageMeta="taskMeta" class="container" />
    </div>
    <!-- Menu -->
    <div class="bg-josa-black py-8">
      <div class="container">
        <div class="px-12 flex flex-col sm:flex-row">
          <span :class="activeCat == 'all' ? 'active': ''" class="cat-link"
            @click="setActiveCat('all')">{{ $t('tasks.all') }}</span>
          <span :class="activeCat == cat.name ? 'active': ''" class="cat-link" v-for="cat in taskCategories"
            :key="cat.id" @click="setActiveCat(cat.name)">{{ cat['title_' + $i18n.locale] }}</span>
        </div>
      </div>
    </div>
    <!-- Preview -->
    <div class="container pb-20">
      <div v-for="cat in taskCategories" :key="cat.id">
        <taskList v-if="activeCat=='all' || activeCat==cat.name" class="tasks-list" :numberOfTasks="numTasks"
          :category="cat.name" :title="cat['title_' + $i18n.locale]" />
      </div>
    </div>
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
    },
    computed: {
      numTasks() {
        if (this.activeCat == 'all') {
          return 2
        } else {
          return 0
        }
      }
    }
  };

</script>

<style scoped>
  .tasks-list {
    @apply px-12 mt-20;
  }

  .task-page {
    background-color: white;
  }

</style>
