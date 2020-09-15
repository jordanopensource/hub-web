<template>
  <div class="input-control">
    <div class="label">
      <label>
        <slot name="label" /></label>
      <p class="subLabel">
        <slot name="sub" />
      </p>
    </div>
    <input v-if="controlType === 'input'" v-bind="$attrs" :value="value" @input="$emit('input', $event.target.value)"
      :placeholder="placeholder" :required="required">
    <input v-if="controlType === 'number'" type="number" :min="min" :max="max" v-bind="$attrs" :value="value" @input="$emit('input', $event.target.value)"
      :placeholder="placeholder" :required="required">
    <input v-if="controlType === 'date'" type="date" v-bind="$attrs" :value="value"
      @input="$emit('input', $event.target.value)" :placeholder="placeholder" :required="required">
    <input v-if="controlType === 'email'" type="email" v-bind="$attrs" :value="value"
      @input="$emit('input', $event.target.value)" :placeholder="placeholder" :required="required">
    <input v-if="controlType === 'password'" type="password" v-bind="$attrs" :value="value"
      @input="$emit('input', $event.target.value)" :placeholder="placeholder" :required="required">
    <textarea v-if="controlType === 'textarea'" rows="5" :value="value" @input="$emit('input', $event.target.value)"
      :placeholder="placeholder" :required="required"></textarea>
  </div>
</template>

<script>
  export default {
    name: 'AppInputControl',
    props: {
      controlType: {
        type: String,
        default: 'input'
      },
      value: {
        type: String,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      required: {
        type: Boolean,
        default: false
      },
      min: {
        type: Number
      },
      max: {
        type: Number
      }
    }
  }

</script>

<style scoped>
  .input-control {
    @apply mb-4;
  }

  .input-control input,
  .input-control textarea {
    @apply p-3 bg-josa-warm-grey-light w-full;
  }

  .input-control input {
    max-width: 400px;
  }

  input::placeholder,
  input:disabled {
    @apply text-josa-warm-grey-dark;
  }

  textarea::placeholder {
    @apply text-josa-warm-grey-dark;
  }

  .input-control input:focus,
  .input-control textarea:focus {
    @apply bg-josa-warm-grey;
    outline: none;
  }

  .subLabel {
    @apply text-sm inline;
  }

  label {
    @apply inline;
  }

  .label {
    @apply mb-2;
  }
  input[type="date"] {
    @apply uppercase;
  }

</style>
