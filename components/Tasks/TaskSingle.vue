<template>
  <div>
    <div class="text-josa-blue text-xl mb-2">{{ task.category['title_' + $i18n.locale] }}</div>
    <div>
      <!-- Title -->
      <h2 class="text-3xl m-0 inline-block">
        {{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
      <!-- Status -->
      <p class="inline-block" :class="task.assigned ? 'assigned' : 'open'">
        {{ task.assigned ? $t('tasks.assigned') : $t('tasks.open') }}</p>
    </div>
    <!-- Edit button -->
    <nuxt-link v-if="ifTaskOwner()" to="edit" tag='a' class="button button-blue-full block mt-4" append>Edit
    </nuxt-link>
    <!-- Apply button -->
    <div v-if="task.open && !ifTaskOwner()" class="mt-4">
      <appButton v-if="isApplicable" btn-style="button-blue-full" @click="apply">{{ $t('tasks.apply') }}
      </appButton>
      <p v-if="!ifMeAssigned && !isApplicable" class="mt-4">{{ $t('tasks.alreadyApplied') }}</p>
      <p v-if="ifMeAssigned" class="mt-4">{{ $t('tasks.meAssigned') }}</p>
    </div>
    <!-- Content -->
    <div class="content mt-12 flex flex-wrap md:flex-no-wrap">
      <div class="w-full md:w-3/5 ltr:mr-8 rtl:ml-8 mb-8">
        <div v-if="task.dueDate" class="flex flex-row flex-no-wrap mb-4">
          <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'clock']" />
          <p class="font-bold">{{ $t('tasks.due') }}: {{ task.dueDate | fullDate($i18n.locale) }}</p>
        </div>
        <div v-if="task.points" class="flex flex-row flex-no-wrap mb-4">
          <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'medal']" />
          <p class="font-bold">{{ $t('tasks.points') }}: {{ task.points }}</p>
        </div>

        <div v-if="task['description_' + $i18n.locale]" class="description pb-8"
          v-html="task['description_' + $i18n.locale]"></div>
      </div>
      <!-- Sidebar -->
      <div v-if="ifTaskOwner()" class="w-full md:w-2/5 mb-8">
        <!-- Applicants -->
        <div class="mb-8">
          <h3>Assigned to</h3>
          <div v-if="assignedTo">
            <applicant v-for="applicant in assignedTo" :key="applicant.user.id" :applicant="applicant" class="mb-8"
              :assigned="assignedTo?true:false" />
          </div>
          <p v-else>No Assigned yet.</p>

        </div>
        <!-- Applicants -->
        <div>
          <h3>Applicants</h3>
          <div v-if="ifApplicants()">
            <applicant v-for="applicant in notAssignedTo" :key="applicant.user.id" :applicant="applicant" class="mb-8"
              :assigned="assignedTo?true:false" @assign="assignUser" />
          </div>
          <p v-else>No Applicants yet.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import infoCard from '~/components/Tasks/InfoCard';
  import appButton from '~/components/FormComponents/AppButton';
  import applicant from '~/components/Tasks/Applicant';
  export default {
    name: 'TaskSingle',
    components: {
      infoCard,
      appButton,
      applicant
    },
    props: {
      task: {
        type: Object,
        required: true
      }
    },
    created() {
      const applicantsArray = this.task.applicants.map((applicant) => applicant.user.id);
      this.$store.dispatch('setApplicants', applicantsArray);
    },
    computed: {
      applicants() {
        return this.$store.getters.applicants;
      },
      auth() {
        return this.$store.getters.auth;
      },
      isApplicable() {
        if (this.auth) {
          const userId = this.auth.id;
          if (this.applicants.includes(userId)) {
            return false
          } else {
            return true
          }
        } else {
          return true
        }
      },
      assignedTo() {
        const applicants = this.task.applicants
        const assignedTo = applicants.filter(a => a.approved)
        if (assignedTo && assignedTo.length >> 0) {
          return assignedTo
        } else {
          return null
        }
      },
      notAssignedTo() {
        const applicants = this.task.applicants
        const notAssignedTo = applicants.filter(a => !a.approved)
        if (notAssignedTo) {
          return notAssignedTo
        } else {
          return null
        }
      },
      ifMeAssigned() {
        if (this.auth && this.assignedTo) {
          const userId = this.auth.id
          const assignedTo = this.assignedTo.map((a) => a.user.id)
          if (assignedTo.includes(userId)) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
    },
    methods: {
      async assignUser(applicant) {
        var temp = {
          ...this.task
        }
        const index = temp.applicants.findIndex(t => t.id == applicant.id)
        temp.applicants[index].approved = true
        await this.$store.dispatch('editTask', temp);
      },
      apply() {
        if (this.auth) {
          this.task.applicants.push({
            "user": {
              "id": this.auth.id
            }
          });
          this.$store.dispatch('addApplicant', this.task);
          this.$router.push('/tasks')
          this.success();
        } else {
          this.$router.push('/login');
        }
      },
      ifTaskOwner() {
        if (this.$store.getters.auth && this.task.taskOwner && this.$store.getters.auth.id === this.task.taskOwner.id) {
          return true
        } else {
          return false
        }
      },
      ifApplicants() {
        if (Array.isArray(this.task.applicants) && this.task.applicants.length)
          return true;
        else
          return false;
      },
      success() {
        this.flashMessage.setStrategy('single');
        this.flashMessage.success({
          message: this.$t('msg.applySuccess')
        });
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

  h3 {
    @apply mb-4 text-josa-blue uppercase;
  }

  .icon {
    @apply text-josa-warm-grey-dark text-2xl;
  }

</style>
