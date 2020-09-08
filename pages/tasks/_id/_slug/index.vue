<template>
  <div id="task-page">
    <taskSingle :task="task" />
  </div>
</template>

<script>
  import axios from 'axios';
  import taskSingle from '~/components/Tasks/TaskSingle';
  export default {
    layout: "default",
    asyncData(context) {
      return axios.get(process.env.baseUrl + '/tasks/' + context.params.id)
        .then(res => {
          return {
            task: res.data
          }
        })
        .catch(e => context.error(e))
    },
    components: {
      taskSingle
    },
    head() {
      const i18nSeo = this.$nuxtI18nSeo()
      return {
        title: this.pageTitle,
        meta: [{
            hid: 'task',
            name: 'Task'
          },
          ...i18nSeo.meta
        ]
      }
    },
    computed: {
      pageTitle() {
        return this.task['title_' + this.$i18n.locale]
      }
    }
  };

</script>
