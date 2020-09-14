<template>
  <span @click="update" class="input-control">
    <input v-model="isActive" type="checkbox">
    <div class="check" :class="isActive ? 'checked' : ''"></div>
  <label for="checkbox">{{ label }}</label>
  </span>
</template>

<script>
  export default {
    name: 'RadioButton',
    model: {
      prop: 'model',
      event: 'onUpdate'
    },
    data() {
      return {
        isActive: this.value
      }
    },
    props: {
      id: {
        type: String,
        required: true
      },
      value: {
        type: Boolean
      },
      label: {
        type: String,
        required: true
      },
      model: {
        default: ''
      }
    },
    methods: {
      update() {
        this.isActive = !this.isActive;
        this.$emit('onUpdate', this.isActive)
      },
    }
  }

</script>

<style scoped>
input[type="checkbox"] {
  @apply absolute hidden;
}

span {
  @apply text-josa-black inline-block relative h-auto;
}

[dir="ltr"] span {
  @apply mr-4;
}

[dir="rtl"] span {
  @apply ml-4;
}

input[type=radio] {
  position: absolute;
  visibility: hidden;
}

label {
  @apply inline-block relative cursor-pointer;
  z-index: 9;
  -webkit-transition: all 0.25s linear;
}

[dir="ltr"] label {
  padding: 4px 0 4px 40px;
}

[dir="rtl"] label {
  padding: 4px 40px 4px 0;
}

.check {
  @apply border border-josa-blue border-solid rounded;
  display: block;
  position: absolute;
  height: 30px;
  width: 30px;
  z-index: 5;
}

.check::before {
  content: '';
  @apply rounded block absolute;
  height: 20px;
  width: 20px;
  top: 4px;
  left: 4px;
  margin: auto;
  transition: background 0.25s linear;
  -webkit-transition: background 0.25s linear;
}

span:hover .check::before {
  @apply bg-josa-blue;
}

.checked::before {
  @apply bg-josa-blue;
}

</style>
