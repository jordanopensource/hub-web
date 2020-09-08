<!-- Login/Logout Menu Item -->
<template>
  <span>
    <span v-if="$store.getters.auth">
      <NuxtLink class="nav-link" to="/me">My Profile</NuxtLink>
      <button class="nav-link" @click="logout">{{ $t('auth.logout') }}</button>
    </span>
    <NuxtLink class="nav-link" v-else to="/login">{{ $t('auth.login') }}</NuxtLink>
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
