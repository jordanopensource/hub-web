<template>
  <div class="flex">
    <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'medal']" />
    <span>
      <nuxt-link v-if="task.task" :to="taskLink">
        <h3>{{ task.taskName }}</h3>
      </nuxt-link>
      <h3 v-else>{{ task.taskName }}</h3>
      <p>{{ $t('tasks.points') }}: {{ task.points }}</p>
    </span>
  </div>
</template>

<script>
  export default {
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    computed: {
      taskLink() {
        var title = ''
        if (this.task.task['title_' + this.$i18n.locale]) {
          title = this.task.task['title_' + this.$i18n.locale]
        } else {
          title = this.task.task.title_en
        }
        const slug = this.$options.filters.stringToSlug(title)
        return this.localePath('/tasks/' + this.task.task.id + '/' + slug)
      },
    }
  }

</script>
<style scoped>
  h3 {
    @apply leading-none pb-1;
  }

</style>
