<template>
  <div class="border border-dotted rounded-md p-4 flex flex-col justify-between">
    <div class="mb-8">
      <h5>{{ task.category['title_' + $i18n.locale] }}</h5>
      <nuxt-link :to="taskLink" tag="a" class="inline-block">
      <h2 class="text-3xl">{{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
      </nuxt-link>
      <p v-if="task['excerpt_' + $i18n.locale]" class="text-base">{{ task['excerpt_' + $i18n.locale] }}</p>
    </div>
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
