<template>
  <div id="login-page">
    <h2 class="title m-0">{{ loginMeta['title_' + $i18n.locale] }}</h2>
    <p class="display-lead py-8">{{ loginMeta['description_' + $i18n.locale] }}</p>
    <loginForm class="border-t border-b border-dotted py-4"/>
  </div>
</template>

<script>
  import axios from 'axios';

  import loginForm from '@/components/Auth/LoginForm'
  export default {
    layout: 'default',
    middleware: 'notAuthenticated',
    components: {
      loginForm
    },
    async asyncData(context) {
      const pageMeta = await axios.get(process.env.baseUrl + '/page-metas?pageId=login');
      return {
        loginMeta: pageMeta.data[0]
      }
    }
  }

</script>

<style>
  hr {
    @apply border-dotted;
  }

</style>
