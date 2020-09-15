<template>
  <div>
    <div class="text-josa-blue text-xl mb-2">{{ task.category['title_' + $i18n.locale] }}</div>
    <div>
      <!-- Title -->
      <h2 class="text-3xl m-0 inline-block">
        {{ task['title_' + $i18n.locale] ? task['title_' + $i18n.locale] : task['title_en'] }}</h2>
      <!-- Status -->
      <p v-if="task.open" class="inline-block" :class="task.assigned ? 'assigned' : 'open'">
        {{ task.assigned ? $t('tasks.assigned') : $t('tasks.open') }}</p>
      <p v-if="!task.open" class="inline-block" :class="task.solved ? 'solved' : 'closed'">
        {{ task.solved ? $t('tasks.solved') : $t('tasks.closed') }}</p>
    </div>
    <div class="flex mt-4">
      <!-- Edit button -->
      <nuxt-link v-if="task.open && ifTaskOwner()" to="edit" tag='a' class="button button-blue-full block mr-4" append>
        {{ $t('button.edit') }}</nuxt-link>
      <!-- Mark as solved button -->
      <appButton v-if="task.open && ifTaskOwner() && assignedTo != null" btn-style="button-red-full"
        @click="markSolved">
        {{ $t('tasks.markSolved') }}
      </appButton>
    </div>
    <!-- Apply button -->
    <div v-if="task.open && !ifTaskOwner()" class="mt-4">
      <appButton v-if="isApplicable" btn-style="button-blue-full" @click="apply">{{ $t('tasks.apply') }}
      </appButton>
      <p v-if="!isMeAssigned && !isApplicable" class="mt-4">{{ $t('tasks.alreadyApplied') }}</p>
      <p v-if="isMeAssigned" class="mt-4">{{ $t('tasks.meAssigned') }}</p>
    </div>
    <!-- Content -->
    <div class="content mt-12 flex flex-wrap md:flex-no-wrap">
      <div class="w-full md:w-3/5 ltr:mr-8 rtl:ml-8 mb-8">
        <!-- Points -->
        <div v-if="task.points" class="flex flex-row flex-no-wrap mb-4">
          <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'medal']" />
          <p class="font-bold">{{ $t('tasks.points') }}: {{ task.points }}</p>
        </div>
        <!-- Due Date -->
        <div v-if="task.dueDate" class="flex flex-row flex-no-wrap mb-4">
          <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fas', 'clock']" />
          <p class="font-bold">{{ $t('tasks.due') }}: {{ task.dueDate | fullDate($i18n.locale) }}</p>
        </div>
        <!-- Description -->
        <div v-if="task['description_' + $i18n.locale]" class="description pb-8"
          v-html="task['description_' + $i18n.locale]"></div>
      </div>
      <!-- Sidebar -->
      <div class="w-full md:w-2/5 mb-8">
        <!-- Solved by -->
        <div v-if="task.solved" class="mb-8">
          <h3>{{ $t('tasks.solvedBy') }}</h3>
          <div v-if="solvedBy">
            <applicant v-for="applicant in solvedBy" :key="applicant.user.id" :applicant="applicant" class="mb-8"
              :assigned="assignedTo?true:false" :taskSolved="task.solved" />
          </div>
          <p v-else>{{ $t('tasks.notSolved') }}</p>
        </div>
        <!-- Assigned to -->
        <div v-if="!task.solved && ifTaskOwner()" class="mb-8">
          <h3>{{ $t('tasks.assignedTo') }}</h3>
          <div v-if="assignedTo">
            <applicant v-for="applicant in assignedTo" :key="applicant.user.id" :applicant="applicant" class="mb-8"
              :assigned="assignedTo?true:false" @unAssign="unAssignUser" :taskSolved="task.solved" />
          </div>
          <p v-else>{{ $t('tasks.notAssigned') }}</p>
        </div>
        <!-- Applicants -->
        <div v-if="!task.solved && ifTaskOwner()">
          <h3>{{ $t('tasks.applicants') }}</h3>
          <div v-if="ifApplicants()">
            <applicant v-for="applicant in notAssignedTo" :key="applicant.user.id" :applicant="applicant" class="mb-8"
              :assigned="assignedTo?true:false" @assign="assignUser" :taskSolved="task.solved" />
          </div>
          <p v-else>{{ $t('tasks.noApplicants') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
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
    computed: {
      auth() {
        return this.$store.getters.auth;
      },
      isApplicable() {
        if (this.auth) {
          if (this.task.applicants.some(applicant => applicant.user.id === this.auth.id)) {
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
      isMeAssigned() {
        if (this.auth && this.assignedTo) {
          if (this.assignedTo.some(applicant => applicant.user.id === this.auth.id)) {
            return true
          } else {
            return false
          }
        } else {
          return false
        }
      },
      solvedBy() {
        const applicants = this.task.applicants
        const solvedBy = applicants.filter(a => a.solved)
        if (solvedBy && solvedBy.length >> 0) {
          return solvedBy
        } else {
          return null
        }
      }
    },
    methods: {
      async assignUser(applicant) {
        this.$nuxt.$loading.start()
        var temp = {
          ...this.task
        }
        const index = temp.applicants.findIndex(t => t.id == applicant.id)
        temp.applicants[index].approved = true
        await this.$store.dispatch('editTask', temp);
        this.$router.go();
      },
      async unAssignUser(applicant) {
        this.$nuxt.$loading.start()
        var temp = {
          ...this.task
        }
        const index = temp.applicants.findIndex(t => t.id == applicant.id)
        temp.applicants[index].approved = false
        await this.$store.dispatch('editTask', temp);
        this.$router.go();
      },
      apply() {
        if (this.auth) {
          this.task.applicants.push({
            "user": {
              "id": this.auth.id
            }
          });
          this.$store.dispatch('editTask', this.task);
          this.$router.push('/tasks')
          this.success();
        } else {
          this.$router.push('/login');
        }
      },
      async markSolved() {
        // Mark task as sovled and give points to assigned user
        this.$nuxt.$loading.start()
        var temp = {
          ...this.task
        }
        const assignedTo = this.assignedTo.map((a) => a.id)
        const index = temp.applicants.findIndex(t => assignedTo.includes(t.id))
        const userId = temp.applicants[index].user.id
        const solvedTask = {
          taskName: this.task.title_en,
          points: this.task.points,
          task: this.task
        }
        let userSolvedTasks

        // Fetch user's solved tasks and push this task to it
        const user = await axios.get(process.env.baseUrl + "/users/" + userId).then(res => {
          userSolvedTasks = res.data.solvedTasks
        })
        userSolvedTasks.push(solvedTask)
        const tempUser = {
          id: userId,
          solvedTasks: userSolvedTasks
        }
        await this.$store.dispatch('updateUser', tempUser)

        // Set boolean values for this task
        temp.applicants[index].solved = true
        temp.solved = true
        temp.open = false
        await this.$store.dispatch('editTask', temp).then(() => {
          this.$nuxt.$loading.finish()
        })
        // Refresh page
        this.$router.go()
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

  h3 {
    @apply mb-4 text-josa-blue uppercase;
  }

  .icon {
    @apply text-josa-warm-grey-dark text-2xl;
  }

</style>
