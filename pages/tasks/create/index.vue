<template>
  <div id="create-task">
    <taskForm @submit="onSubmitted" />
  </div>
</template>

<script>
import axios from "axios";
import taskForm from "~/components/Tasks/TaskForm";
export default {
  layout: "default",
  middleware: "authenticated",
  components: {
    taskForm
  },
  methods: {
    onSubmitted(task) {
      this.$store.dispatch("addTask", task).then(() => {
        this.$router.push("/tasks");
      });
    }
  }
};
</script>

<style scoped>

</style>
