<template>
  <div id="reset-password-page">
    <h2 class="title m-0">{{ $t('auth.reset') }}</h2>
    <p class="display-lead py-4">{{ $t('auth.resetText') }}</p>
    <resetPasswordForm class="border-t border-b border-dotted py-4" />
  </div>
</template>

<script>
  import axios from 'axios';

  import resetPasswordForm from '@/components/Auth/ResetPasswordForm'
  export default {
    layout: 'default',
    components: {
      resetPasswordForm
    }
  }

</script>

<style>
  hr {
    @apply border-dotted;
  }

</style>
