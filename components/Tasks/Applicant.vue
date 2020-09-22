<template>
  <div class="flex items-center">
    <appImage v-if="applicant.user.profilePicture" :image="applicant.user.profilePicture" size="small"
      class="picture" />
    <div v-else class="picture bg-josa-warm-grey"></div>
    <div class="opacity-90">
      <nuxt-link :to="'/members/' + applicant.user.id">
        <h3 class="font-bold">{{ applicant.user.fullName_en }}</h3>
      </nuxt-link>
      <p @click="assign" v-if="!assigned && !taskSolved && showControls" class="text-sm cursor-pointer text-green-900">
        {{ $t('tasks.assign') }}</p>
      <p @click="unAssign" v-if="assigned && !taskSolved && showControls" class="text-sm cursor-pointer text-josa-red">
        {{ $t('tasks.usAssign') }}</p>
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  export default {
    name: 'Applicant',
    props: {
      applicant: {
        type: Object,
        required: true
      },
      assigned: {
        type: Boolean,
        default: false
      },
      taskSolved: {
        type: Boolean,
        default: false
      },
      showControls: {
        type: Boolean,
        default: false
      }
    },
    components: {
      appImage
    },
    methods: {
      assign() {
        this.$emit('assign', this.applicant)
      },
      unAssign() {
        this.$emit('unAssign', this.applicant)
      }
    }
  }

</script>

<style scoped>
  .info {
    @apply flex flex-no-wrap mt-4;
  }

  .picture {
    display: inline;
    width: 50px;
    height: 50px;
    border-radius: 45%;
  }

  [dir="ltr"] .picture {
    margin-right: 1rem;
  }

  [dir="rtl"] .picture {
    margin-left: 1rem;
  }

</style>
