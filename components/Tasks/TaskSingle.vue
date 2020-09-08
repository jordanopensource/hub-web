<template>
  <div>
    <div class="text-josa-blue text-xl mb-2">{{ task.category['title_' + $i18n.locale] }}</div>
    <!-- Title and Status -->
    <div>
      <h2 class="text-3xl m-0 inline-block">
        {{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
      <p v-if="task.status == 'closed'" class="closed inline-block">{{ $t('tasks.closed') }}</p>
      <p v-if="task.status == 'open'" class="open inline-block">{{ $t('tasks.open') }}</p>
      <p v-if="task.status == 'assigned'" class="assigned inline-block">{{ $t('tasks.assigned') }}</p>
    </div>
    <!-- Edit button -->
    <nuxt-link v-if="taskOwner()" to="edit" tag='a' class="button button-blue-full block mt-4" append>Edit
    </nuxt-link>
    <!-- Apply button -->
    <div v-if="(task.status == 'open') && !taskOwner()" class="mt-4">
      <appButton v-if="isApplicable" btn-style="button-blue-full" @click="apply">{{ $t('tasks.apply') }}
      </appButton>
      <p v-else class="mt-4">{{ $t('tasks.alreadyApplied') }}</p>
    </div>
    <!-- Content -->
    <div class="content mt-12 flex">
      <div class="w-full md:w-3/5 ltr:mr-8 rtl:ml-8 mb-8">
        <div v-if="task['description_' + $i18n.locale]" class="description pb-8"
          v-html="task['description_' + $i18n.locale]"></div>
      </div>
      <!-- Sidebar -->
      <div class="w-full md:w-2/5 mb-8">
        <!-- Information -->
        <infoCard class="mb-8" :task="task" />
      </div>
    </div>
  </div>
</template>

<script>
  import infoCard from '~/components/Tasks/InfoCard';
  import appButton from '~/components/FormComponents/AppButton';
  export default {
    name: 'TaskSingle',
    components: {
      infoCard,
      appButton
    },
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    created() {
      const assigneesArray = this.task.assignees.map((assignee) => assignee.user.id);
      this.$store.dispatch('setAssignees', assigneesArray);
    },
    computed: {
      assignees() {
        return this.$store.getters.assignees;
      },
      auth() {
        return this.$store.getters.auth;
      },
      isApplicable() {
        if (this.auth) {
          const userId = this.auth.id;
          if (this.assignees.includes(userId)) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      }
    },
    methods: {
      apply() {
        if (this.auth) {
          this.task.assignees.push({
            "user": {
              "id": this.auth.id
            }
          });
          this.$store.dispatch('addAssignee', this.task);
          this.$router.push('/tasks')
          this.success();
        } else {
          this.$router.push('/login');
        }
      },
      success() {
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
          message: this.$t('msg.applySuccess')
        });
      },
      taskOwner() {
        if (this.$store.getters.auth && this.task.taskOwner && this.$store.getters.auth.id === this.task.taskOwner.id) {
          return true
        } else {
          return false
        }
      }
    }
  }

</script>

<style scoped>
  .description>>>p,
  .description>>>h3 {
    @apply mb-4;
  }

  .button {
    width: 150px;
  }

</style>
