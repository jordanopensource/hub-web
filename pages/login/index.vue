<template>
  <div id="login-page">
    <h2 class="title m-0">{{ loginMeta['title_' + $i18n.locale] }}</h2>
    <p class="display-lead py-8">{{ loginMeta['description_' + $i18n.locale] }}</p>
    <loginForm @loggedIn="postLogin" class="border-t border-b border-dotted py-4" />
  </div>
</template>

<script>
  import axios from 'axios';

  import loginForm from '@/components/Auth/LoginForm'
  export default {
    layout: 'default',
    middleware: 'notAuthenticated',
    components: {
      loginForm,
      from: null
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=login');
      return {
        loginMeta: pageMeta.data[0]
      }
    },
    methods: {
      postLogin() {
        this.leave();
      },
      leave() {
        if (this.from.name) {
          this.$router.push(this.from.path)
        } else {
          this.$router.push('/')
        }
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.from = from
      })
    }
  }

</script>

<style>
  hr {
    @apply border-dotted;
  }

</style>
