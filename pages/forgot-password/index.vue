<template>
  <div id="login-page" class="bg-josa-warm-grey-light">
    <div class="container">
      <div class="p-12 my-12 row">
        <h2 class="title m-0">{{ $t('auth.reset') }}</h2>
        <p class="display-lead py-4">{{ $t('auth.sendResetText') }}</p>
        <div class="block w-full py-8">
          <hr>
        </div>
        <forgotPasswordForm />
        <div class="block w-full py-8">
          <hr>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  import forgotPasswordForm from '@/components/Auth/ForgotPasswordForm'
  export default {
    layout: 'default',
    components: {
      forgotPasswordForm
    }
  }

</script>

<style>
  hr {
    @apply border-dotted;
  }

</style>
