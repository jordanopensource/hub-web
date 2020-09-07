<template>
  <div class="p-12 bg-white">
    <!-- Name and picture section small screen -->
    <div class="w-full md:hidden">
      <div class="flex flex-row">
        <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture ltr:mr-8 rtl:ml-8" />
        <img v-else class="profilePicture ltr:mr-8 rtl:ml-8" src="/images/bots/superbot.svg" />
        <h4 class="title title-small min-content">{{ member.fullName_en | capitalize }}</h4>
      </div>
      <section v-if="titles" class="w-full">
        <p v-for="(title,index) in titles" :key="index" class="display-lead">{{ title | capitalize }}</p>
      </section>
    </div>
    <!-- Name and picture section meduim screen and larger -->
    <div class="w-full flex-wrap md:flex-no-wrap hidden md:flex">
      <div class="side md:ltr:mr-8 md:rtl:ml-8 mb-8">
        <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture" />
        <img v-else class="profilePicture" src="/images/bots/superbot.svg" />
      </div>
      <div class="main">
        <section class="name-section">
          <h4 class="title">{{ member.fullName_en | capitalize }}</h4>
          <div v-if="titles">
            <p v-for="(title,index) in titles" :key="index" class="display-lead">{{ title | capitalize }}</p>
          </div>
        </section>
      </div>
    </div>
    <!-- Information Section -->
    <div class="w-full flex flex-wrap md:flex-no-wrap">
      <div class="side md:ltr:mr-8 md:rtl:ml-8 mb-4">
        <section class="membership-type">
          <img class="josa-icon ltr:mr-2 rtl:ml-2" src="/logo/favicon.png">
          <p class="membership-text min-content">{{ $t('members.' + member.membershipType) | uppercase }}</p>
        </section>
        <section>
          <h5>{{ $t('members.id') }}</h5>
          <p class="member-id mb-4">{{ member.membershipId }}</p>
          <h5>{{ $t('members.since') }}</h5>
          <p class="text-lg">{{ member.memberSince? member.memberSince : member.created_at  | monthYear($i18n.locale) }}</p>
        </section>
        <!-- Badges -->
        <section>
          <h5>{{ $t('members.badges') }}</h5>
          <badges v-if="member.badges" :badges="member.badges" />
        </section>
      </div>
      <div class="main">
        <section>
          <h3>{{ $t('members.about') }}</h3>
          <div>{{ member.about}}</div>
        </section>
        <section>
          <h3>{{ $t('members.interests') }}</h3>
          <div class="-mx-2">
            <span v-for="(interest,index) in interests" :key="index" class="interest">
              {{ interest | lowercase | capitalize({ onlyFirstLetter: true }) }}
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
      titles() {
        try {
          const titles = this.$options.filters.stringToArray(this.member.titles)
          return titles
        } catch {
          return null
        }
      },
      interests() {
        try {
          const interests = this.$options.filters.stringToArray(this.member.interests)
          return interests
        } catch {
          return []
        }
      }
    }
  };

</script>

<style scoped>
  .profilePicture {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  .side {
    width: 100%;
  }

  @screen md {
    .profilePicture {
      width: 200px;
      height: 200px;
    }

    .side {
      width: 200px;
      @apply flex-shrink-0;
    }
  }

  .main {
    @apply flex-grow mb-8;
  }

  section {
    @apply py-4 border-b border-dotted;
  }

  .name-section {
    @apply pt-0 h-full flex flex-col justify-between;
  }

  h3 {
    @apply mb-4 text-josa-blue uppercase;
  }

  .interest {
    @apply inline-block m-2 py-1 rounded-md px-4 bg-grey90 opacity-90;
  }

  .membership-type {
    @apply flex items-center;
  }

  .josa-icon {
    @apply rounded-md;
    width: 42px;
    height: 42px;
  }

  .membership-text {
    @apply font-semibold text-grey70 text-sm leading-none;
  }

  .member-id {
    @apply text-2xl font-light leading-snug;
  }

  .badges img {
    width: 40px;
    height: 40px;
  }

  .bottom-full {
    bottom: 100%
  }

  .top-full {
    top: 100%
  }

</style>
