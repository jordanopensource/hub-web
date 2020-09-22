<template>
  <div class="flex items-center">
    <appImage v-if="user.profilePicture" :image="user.profilePicture" size="small"
      class="picture" />
    <div v-else class="picture bg-josa-warm-grey"></div>
    <div class="opacity-90">
      <nuxt-link :to="'/members/' + user.id">
        <h3 class="font-bold">{{ user.fullName_en }}</h3>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  export default {
    name: 'User',
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    components: {
      appImage
    }
  }

</script>

<style scoped>
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
