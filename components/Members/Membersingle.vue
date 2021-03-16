<template>
  <div>
    <!-- Name and picture section small screen -->
    <div class="w-full md:hidden">
      <div class="flex flex-row">
        <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small"
          class="profilePicture ltr:mr-8 rtl:ml-8" />
        <img v-else class="profilePicture ltr:mr-8 rtl:ml-8" src="/images/bots/member-default-profile-pic.png" />
        <div>
          <h4 class="title title-small min-content">{{ member.fullName_en | capitalize }}</h4>
        </div>
      </div>
      <section class="w-full">
        <nuxt-link v-if="ifMe()" tag="a" to="/me/edit" class="mb-4 inline-block button button-blue">
          {{ $t('button.editProfile') }}</nuxt-link>
        <div v-if="titles">
          <p v-for="(title,index) in titles" :key="index" class="display-lead">{{ title }}</p>
        </div>
      </section>
    </div>
    <!-- Name and picture section meduim screen and larger -->
    <div class="w-full flex-wrap md:flex-no-wrap hidden md:flex">
      <div class="side md:ltr:mr-8 md:rtl:ml-8 mb-8">
        <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture" />
        <img v-else class="profilePicture" src="/images/bots/member-default-profile-pic.png" />
      </div>
      <div class="main">
        <section class="name-section">
          <h4 class="title">{{ member.fullName_en | capitalize }}</h4>
          <nuxt-link v-if="ifMe()" tag="a" to="/me/edit" class="mb-4 inline-block button button-blue">
            {{ $t('button.editProfile') }}</nuxt-link>
          <div v-if="titles">
            <p v-for="(title,index) in titles" :key="index" class="display-lead">{{ title }}</p>
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
          <p class="text-lg">{{ member.memberSince? member.memberSince : member.created_at  | monthYear($i18n.locale) }}
          </p>
        </section>
        <!-- Social Accounts -->
        <section>
          <h5>{{ $t('members.contacts') }}</h5>
          <div class="en">
            <span v-if="member.github" class="whitespace-no-wrap block my-4 last:mb-0">
              <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'github' ]" />
              <a :href="link.github + member.github" target="_blank" class="text-sm">/{{ member.github }}</a>
            </span>
            <span v-if="member.linkedin" class="whitespace-no-wrap block my-4 last:mb-0">
              <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'linkedin' ]" />
              <a :href="link.linkedin + member.linkedin" target="_blank" class="text-sm">/{{ member.linkedin }}</a>
            </span>
            <span v-if="member.twitter" class="whitespace-no-wrap block my-4 last:mb-0">
              <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'twitter' ]" />
              <a :href="link.twitter + member.twitter" target="_blank" class="text-sm">@{{ member.twitter }}</a>
            </span>
            <span v-if="member.facebook" class="whitespace-no-wrap block my-4 last:mb-0">
              <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'github' ]" />
              <a :href="link.facebook + member.facebook" target="_blank" class="text-sm">/{{ member.facebook }}</a>
            </span>
          </div>
        </section>
        <!-- Badges -->
        <section>
          <h5>{{ $t('members.badges') }}</h5>
          <badges v-if="member.badges" :badges="member.badges" />
        </section>
      </div>
      <div class="main">
        <section v-if="member.about">
          <h3>{{ $t('members.about') }}</h3>
          <div>{{ member.about}}</div>
        </section>
        <section v-if="interests.length">
          <h3>{{ $t('members.interests') }}</h3>
          <div class="-mx-2">
            <span v-for="(interest,index) in interests" :key="index" class="interest">
              {{ interest }}
            </span>
          </div>
        </section>
        <section v-if="member.activities.length">
          <h3>{{ $t('members.activities') }}</h3>
          <div>
            <activity v-for="activity in member.activities" :key="activity.id" :activity="activity"
              class="mb-8 mt-4 last:mb-0" />
          </div>
        </section>
        <section v-if="member.solvedTasks.length">
          <h3>{{ $t('members.tasks') }}</h3>
          <div>
            <solvedTask v-for="task in member.solvedTasks" :key="task.id" :task="task" class="mb-8 mt-4 last:mb-0" />
          </div>
        </section>
        <section v-if="member.github">
          <h3>{{ $t('members.contributions') }}</h3>
          <div>
            <githubCommits :username="member.github" />
          </div>
        </section>
      </div>
    </div>

  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import badges from '~/components/Members/Badges';
  import solvedTask from '~/components/Tasks/SolvedTask';
  import activity from '~/components/Members/Activity';
  import githubCommits from '~/components/Members/githubCommits';
  export default {
    data() {
      return {
        link: {
          github: 'https://github.com/',
          linkedin: 'https://linkedin.com/in/',
          twitter: 'https://twitter.com/',
          facebook: 'https://facebook.com/'
        }
      }
    },
    components: {
      appImage,
      badges,
      solvedTask,
      activity,
      githubCommits
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
      },
    },
    methods: {
      ifMe() {
        if (this.$store.getters.auth && this.$store.getters.auth.id === this.member.id) {
          return true
        } else {
          return false
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

  .button {
    max-width: 200px;
  }
</style>
