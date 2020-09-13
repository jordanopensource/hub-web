<template>
  <div id="edit-task-page">
    <taskForm :task="task" @submit="onSubmitted" />
  </div>
</template>

<script>
  import taskForm from "~/components/Tasks/TaskForm";
  import axios from "axios";
  export default {
    layout: "default",
    middleware: "owner",
    components: {
      taskForm
    },
    asyncData(context) {
      return axios.get(process.env.baseUrl + '/tasks/' + context.params.id)
        .then(res => {
          return {
            task: res.data
          }
        })
        .catch(e => context.error(e))
    },
    methods: {
      onSubmitted(editedTask) {
        this.$nuxt.$loading.start()
        this.$store.dispatch("editTask", editedTask).then(() => {
          this.$router.go(-1);
        });
      }
    }
  };

</script>
