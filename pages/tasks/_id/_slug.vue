<template>
  <TaskSingle :task="task" />
</template>

<script>
  import axios from 'axios';
  import TaskSingle from '~/components/Tasks/TaskSingle';
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
      TaskSingle
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
