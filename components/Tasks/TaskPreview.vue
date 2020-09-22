<template>
  <div class="border border-dotted rounded-md p-4">
    <h5 v-if="task.category">{{ task.category['title_' + $i18n.locale] ? task.category['title_' + $i18n.locale] : '' }}
    </h5>
    <!-- Title -->
    <nuxt-link :to="taskLink" tag="a" class="inline-block">
      <h2 class="text-3xl">
        {{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
    </nuxt-link>
    <!-- Status -->
    <p v-if="task.open" class="inline-block text-left p-0" :class="task.assigned ? 'assigned' : 'open'">
      {{ task.assigned ? $t('tasks.assigned') : $t('tasks.open') }}</p>
    <p v-if="!task.open" class="inline-block" :class="task.solved ? 'solved' : 'closed'">
      {{ task.solved ? $t('tasks.solved') : $t('tasks.closed') }}</p>
    <p v-if="task['excerpt_' + $i18n.locale]" class="text-base">{{ task['excerpt_' + $i18n.locale] }}</p>
  </div>
</template>

<script>
  export default {
    name: 'TaskPreview',
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    computed: {
      taskLink() {
        var title = ''
        if (this.task['title_' + this.$i18n.locale]) {
          title = this.task['title_' + this.$i18n.locale]
        } else {
          title = this.task.title_en
        }
        const slug = this.$options.filters.stringToSlug(title)
        return this.localePath('/tasks/' + this.task.id + '/' + slug)
      },
      arrowIcon() {
        if (this.$i18n.locale == "ar") {
          return 'long-arrow-alt-left'
        } else {
          return 'long-arrow-alt-right'
        }
      }
    }
  }

</script>

<style scoped>
  [lang="en"] p {
    @apply leading-golden;
  }

  [lang="ar"] p {
    @apply leading-normal;
  }

  .icon {
    @apply text-josa-warm-grey-dark;
  }

</style>
