<template>
  <div class="flex flex-wrap md:flex-no-wrap w-full pt-4 border-t border-dotted">
    <!-- Profile Picture -->
    <nuxt-link :to="memberLink">
      <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture ltr:mr-4 rtl:ml-4 mb-4" />
      <img v-else class="profilePicture ltr:mr-4 rtl:ml-4 mb-4" src="/images/bots/superbot.svg" />
    </nuxt-link>
    <!-- Full Name -->
    <div class="mb-4">
      <nuxt-link :to="memberLink">
        <h2>{{ member['fullName_' + $i18n.locale] | capitalize }}</h2>
      </nuxt-link>
      <!-- Membership Type -->
      <p class="my-2">{{ member.membershipType | capitalize }}</p>
      <!-- Badges -->
      <badges v-if="member.badges" :badges="member.badges" />
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import badges from '~/components/Members/Badges';
  export default {
    name: 'MemberPreview',
    components: {
      appImage,
      badges
    },
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    computed: {
      memberLink() {
        return this.localePath('/members/' + this.member.id)
      },
    }
  }

</script>

<style scoped>
  .profilePicture {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

</style>
