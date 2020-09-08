<template>
  <nav>
    <!-- Main Menu -->
    <menuItems :menu="mainMenu" menuItemClass="nav-link" class="inline-block" />
    <!-- Login/Logout -->
    <logInOutMenu />
  </nav>
</template>

<script>
  import logInOutMenu from '@/components/Auth/LogInOutMenu';
  import menuItems from '@/components/Menu/MenuItems';
  import languageSwitcher from '@/components/UI/LanguageSwitcher'
  export default {
    name: 'Navbar',
    components: {
      logInOutMenu,
      menuItems,
      languageSwitcher
    },
    computed: {
      mainMenu() {
        return this.$store.getters.loadedMenus.membersMainMenu;
      }
    }
  }

</script>

<style scoped>
  .lang {
    @apply text-sm opacity-50;
  }

  .lang.nuxt-link-active {
    @apply opacity-100;
  }

</style>
