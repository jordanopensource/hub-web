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
    <!-- The Right Block -->
    <div class="relative space-y-4">
      <!-- Membership Type Icon -->
      <div class="flex md:justify-end">
        <span :class="[member.membershipType == 'active' ? 'text-josa-blue-dark':'text-josa-blue']">
          <font-awesome-icon icon="circle" size="xs" class="m-1" /></span>
        <p class="member-id mr-2 font-bold text-sm">{{ member.membershipId }}</p>
        <p class="text-sm text-gray-600">Member for
          {{ member.memberSince ? dateTrans(member.memberSince, "YYYYMMDD"): dateTrans(member.created_at, "YYYYMMDD") | dateTrans(member.created_at, "YYYYMMDD")}}
        </p>
      </div>
      <!-- Member Points ( Show If logged in )-->
      <div v-show="member.solvedTasks.length!=0 && auth!=null" class="flex md:justify-end">
        <font-awesome-icon icon="star" size="xs" class="m-1" />
        <p class="text-sm ml-1">Score:</p>
        <p v-for="task in member.solvedTasks" :key="task.id" class="text-sm"> {{ task.points }} </p>
      </div>
      <!-- Badges -->
      <div class="flex md:absolute bottom-0 right-0 md:justify-end">
        <badges v-if="member.badges" :badges="member.badges" />
      </div>
    </div>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import badges from '~/components/Members/Badges';
  import moment from 'moment';
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
    data: {
      task: Object,
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
    },
    auth() {
        return this.$store.getters.auth;
      },
    methods:{
      dateTrans(from, now) {
        return moment(from, now).fromNow().slice(0, -4);
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
  
  /deep/ .badges img {
    width: 36px;
    height: 36px;
  }

</style>
