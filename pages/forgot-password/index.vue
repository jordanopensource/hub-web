<template>
  <div id="forgot-password-page">
    <h2 class="title m-0">{{ $t('auth.reset') }}</h2>
    <p class="display-lead py-4">{{ $t('auth.sendResetText') }}</p>
    <forgotPasswordForm class="border-t border-b border-dotted py-4"/>
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
