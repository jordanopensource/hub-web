<template>
  <div class="input-control inline-flex flex-col sm:flex-row sm:items-center">
    <label class="switch">
      <input v-model="isActive" type="checkbox" @click="update">
      <span class="track">
        <span class="handle"></span>
      </span>
    </label>
    <p class="pt-2 sm:pt-0">{{label}}</p>
  </div>
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

  .input-control {
    @apply text-josa-black relative h-auto;
  }

  [dir="ltr"] label {
    @apply mr-4;
  }

  [dir="rtl"] label {
    @apply ml-4;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 30px;
  }

  .track {
    display: flex;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #efedec;
    cursor: pointer;
    border: 0 solid #efedec;
    border-radius: 30px;
    transition: .4s;
    padding: 2px;
  }

  .handle {
    display: flex;
    width: 26px;
    height: 26px;
    background-color: #fff;
    border-radius: 50%;
    transition: .4s;
  }

  input:checked+.track {
    background-color: #3897c0;
    border: 0 solid#3897c0;
  }

  input:focus+.track {
    box-shadow: 0 0 1px #efedec;
  }

  input:checked+.track>.handle {
    transform: translateX(30px);
  }

</style>
