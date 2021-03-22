<template>
  <div class="flex flex-wrap md:flex-no-wrap w-full pt-4 border-t border-dotted">
    <!-- Profile Picture -->
    <nuxt-link :to="memberLink">
      <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small"
        class="profilePicture ltr:mr-4 rtl:ml-4 mb-2" />
      <img v-else class="profilePicture ltr:mr-4 rtl:ml-4 mb-2" src="/images/bots/member-default-profile-pic.png" />
    </nuxt-link>
    <!-- The Left Block -->
    <div class='mx-4 relative flex-grow'>
      <!-- Full Name -->
      <nuxt-link :to="memberLink">
        <h2 class="block">{{ member['fullName_' + $i18n.locale] | capitalize }}</h2>
      </nuxt-link>
      <!-- Title -->
      <div v-if="titles">
        <p v-for="(title,index) in titles" :key="index" class="text-sm block">{{ title }}</p>
      </div>
      <!-- Intersets Section -->
      <div>
        <section class="md:absolute bottom-0 left-0" v-if="interests.length">
          <div class="-mx-3">
            <span v-for="(interest,index) in interests.slice(0,3)" :key="index" class="interest inline-block">
              {{ interest }}
            </span>
          </div>
        </section>
      </div>
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
      interests() {
        try {
          const interests = this.$options.filters.stringToArray(this.member.interests)
          return interests
        } catch {
          return []
        }
      },
      titles() {
        try {
          const titles = this.$options.filters.stringToArray(this.member.titles)
          return titles
        } catch {
          return null
        }
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
  .interest {
    @apply inline-block m-2 py-1 rounded-md px-4 bg-grey90 opacity-90;
  }

</style>
