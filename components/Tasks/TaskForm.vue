<template>
  <form @submit.prevent="onSave">
    <h2 v-if="editedTask['title_en']" class="title text-3xl m-0 inline-block mb-8">{{ editedTask['title_en'] }}</h2>
    <appControlInput v-model="editedTask.title_en" controlType="input" required>
      <template v-slot:label>{{ $t('taskForm.title') }}</template>
    </appControlInput>
    <appControlInput v-model="editedTask.dueDate" controlType="date">
      <template v-slot:label>{{ $t('taskForm.date') }}</template>
    </appControlInput>
    <appControlInput v-model="editedTask.points" controlType="number" :min="1" placeholder="1">
      <template v-slot:label>{{ $t('tasks.points') }}</template>
    </appControlInput>
    <label class="pb-2 block">{{ $t('taskForm.category') }}</label>
    <div class="flex mb-4">
      <radioButton v-for="cat in categories" :key="cat.id" :id="cat.id" class="radio" :value="cat.id"
        :label="cat.title_en" v-model="editedTask.category.id" />
    </div>
    <appControlInput v-model="editedTask.excerpt_en" controlType="textarea">
      <template v-slot:sub>{{ $t('taskForm.excerpt') }}</template>
    </appControlInput>
    <appControlInput v-model="editedTask.description_en" controlType="textarea">
      <template v-slot:sub>{{ $t('taskForm.description') }}</template>
    </appControlInput>
    <appButton btn-style="button-blue-full" type="submit">{{ $t('button.save') }}</appButton>
    <appButton type="button" style="margin-left: 10px" btn-style="button-grey" @click="onCancel">
      {{ $t('button.cancel') }}</appButton>
  </form>
</template>

<script>
  import axios from 'axios'
  import appControlInput from "~/components/FormComponents/AppControlInput";
  import appButton from "~/components/FormComponents/AppButton";
  import radioButton from "~/components/FormComponents/RadioButton";
  export default {
    head() {
      return {
        title: this.editedTask.id ? 'Edit Task' : 'Create Task'
      }
    },
    components: {
      appControlInput,
      appButton,
      radioButton
    },
    props: {
      task: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        categories: null,
        editedTask: this.task ? {
          ...this.task
        } : {
          title_en: null,
          description_en: null,
          excerpt_en: null,
          dueDate: null,
          category: {
            id: null
          },
          points: null
        }
      };
    },
    created() {
      this.fetchCategories();
    },
    methods: {
      async fetchCategories() {
        await axios.get(process.env.baseUrl + '/task-categories')
          .then(res => {
            this.categories = res.data
          })
          .catch(e => this.context.error(e));
      },
      onSave() {
        this.$emit('submit', this.editedTask)
      },
      onCancel() {
        this.$router.back();
      }
    }
  };

</script>
