<!-- Login/Logout Menu Item -->
<template>
  <span class="nav-link">
    <button v-if="$store.getters.auth" @click="logout">{{ $t('auth.logout') }}</button>
    <NuxtLink v-else to="/login">{{ $t('auth.login') }}</NuxtLink>
  </span>
</template>

<script>
  const Cookie = process.client ? require('js-cookie') : undefined;
  export default {
    name: 'LogInOutMenu',
    methods: {
      logout() {
        this.$store.dispatch('logout');
        this.$router.push('/');
      }
    }
  }

</script>
