<!-- Fetch and list task tasks based on categories-->
<template>
  <section v-if="ifNotEmpty()">
      <h3>{{ title }}</h3>
      <taskPreview v-for="task in loadedTasks" :key="task.id" :id="'task-' + task.id" :task="task" />
  </section>
</template>

<script>
  import taskPreview from '~/components/Tasks/TaskPreview';
  import axios from 'axios';
  export default {
    data() {
      return {
        sortBy: 'created_at:DESC',
        loadedTasks: [],
      }
    },
    components: {
      taskPreview
    },
    props: {
      title: {
        type: String,
        required: true
      },
      category: {
        type: String,
        required: true
      },
      numberOfTasks: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.fetchTasks()
    },
    methods: {
      query() {
        var args = []
        var query = ""
        if (this.numberOfTasks >> 0) {
          let q = "_limit=" + this.numberOfTasks;
          args.push(q)
        }
        if (this.sortBy) {
          let q = "_sort=" + this.sortBy;
          args.push(q)
        }
        if (this.category && this.category != "all") {
          let q = "category.name=" + this.category;
          args.push(q)
        }
        query = args.join("&")
        return query
      },
      async fetchTasks() {
        const query = this.query()
        await axios
          .get(process.env.baseUrl + "/tasks?" + query)
          .then(res => {
            const tasksArray = []
            for (const key in res.data) {
              tasksArray.push({
                ...res.data[key]
              })
            }
            this.loadedTasks = tasksArray
          })
          .catch(e => this.context.error(e));
      },
      ifNotEmpty() {
        if (Array.isArray(this.loadedTasks) && this.loadedTasks.length)
          return true;
        else
          return false;
      }
    },
  }

</script>
