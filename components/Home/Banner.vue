<template>
  <div class="banner">
    <div class="flex flex-row justify-between align-middle flex-wrap sm:flex-no-wrap">
      <div class="my-auto sm:max-w-1/2 lg:max-w-1/3">
        <h4>We
          <font-awesome-icon @click="philippeKahn()" class="heart" :icon="['fas', 'heart']" />our community</h4>
        <p class="my-8">{{ description }}</p>
        <div>
          <nuxt-link v-if="!$store.getters.auth" to="/join" tag="button"
            class="button-sharp button-dark-blue-full ltr:mr-4 rtl:ml-4 mb-4">
            {{$t('button.signup')}}</nuxt-link>
          <nuxt-link v-if="!$store.getters.auth" to="/login" tag="button" style="width:136.25px;"
            class="button-sharp button-flat">
            {{$t('button.login')}}</nuxt-link>
          <nuxt-link v-if="$store.getters.auth" to="/members" tag="button" class="button-sharp button-dark-blue-full">
            {{$t('members.membersDir')}}</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Banner',
    components: {},
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    },
    methods: {
      philippeKahn() {
        console.log("The power of Open Source is the power of the people. The people rule. - Philippe Kahn")
      }
    }
  }

</script>

<style>
  .banner {
    @apply -m-12 px-12 py-20 bg-josa-blue-light bg-right bg-no-repeat bg-contain;
    background-image: url("/images/bg/background2.svg");
  }

  @screen md {
    .banner {
      background-image: url("/images/bg/background1.svg");
    }
  }

  .heart {
    margin-left: 16px;
    margin-right: 16px;
    color: #db4a14;
  }

</style>
