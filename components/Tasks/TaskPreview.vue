<template>
  <div class="preview my-8 flex flex-wrap lg:flex-no-wrap">
    <div class="flex-grow">
      <div class="mb-2">
        <nuxt-link :to="taskLink" tag="a" class="inline-block">
          <h2 class="text-3xl m-0">
            {{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
        </nuxt-link>
        <p v-if="task.status == 'closed'" class="closed inline-block">{{ $t('tasks.closed') }}</p>
        <p v-if="task.status == 'assigned'" class="assigned inline-block">{{ $t('tasks.assigned') }}</p>
      </div>
      <p v-if="task['excerpt_' + $i18n.locale]">{{ task['excerpt_' + $i18n.locale] }}</p>
      <nuxt-link :to="taskLink" class="block py-4 text-josa-blue font-bold ltr:text-sm rtl:text-base hover:opacity-75">
        {{ $t('meta.knowMore') }}
        <font-awesome-icon class="ltr:ml-2 rtl:mr-2 align-middle" :icon="['fas', arrowIcon ]" />
      </nuxt-link>
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
