<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <!-- Personal Info -->
    <section id="personalInfo">
      <div class="w-full flex flex-wrap md:flex-no-wrap">
        <div class="side md:ltr:mr-8 md:rtl:ml-8">
          <h3>{{ $t('regForm.personalInfo') }}</h3>
        </div>
        <div class="main">
          <appControlInput v-model="user.fullName_en" controlType="input" required>
            <template v-slot:label>{{ $t('regForm.fullName') }}</template>
            <template v-slot:sub>{{ $t('regForm.en') }}</template>
          </appControlInput>
          <appControlInput v-model="user.fullName_ar" controlType="input" required>
            <template v-slot:label>{{ $t('regForm.fullName') }}</template>
            <template v-slot:sub>{{ $t('regForm.ar') }}</template>
          </appControlInput>
          <appControlInput v-model="user.birthDate" controlType="date" required>
            <template v-slot:label>{{ $t('regForm.birthDate') }}</template>
          </appControlInput>
          <appControlInput v-model="user.gender" controlType="input">
            <template v-slot:label>{{ $t('regForm.gender') }}</template>
            <template v-slot:sub>{{ $t('regForm.optional') }}</template>
          </appControlInput>
        </div>
      </div>
    </section>
    <!-- Contact Details -->
    <section id="contactDetails">
      <div class="w-full flex flex-wrap md:flex-no-wrap">
        <div class="side md:ltr:mr-8 md:rtl:ml-8">
          <h3>{{ $t('regForm.contact') }}</h3>
        </div>
        <div class="main">
          <appControlInput v-model="user.email" controlType="email" required>
            <template v-slot:label>{{ $t('regForm.email') }}</template>
          </appControlInput>
          <appControlInput v-model="user.phone" controlType="input" placeholder="+962" required>
            <template v-slot:label>{{ $t('regForm.phone') }}</template>
          </appControlInput>
        </div>
      </div>
    </section>
    <!-- Professional & Membership Information -->
    <section id="membershipInformation">
      <div class="w-full flex flex-wrap md:flex-no-wrap">
        <div class="side md:ltr:mr-8 md:rtl:ml-8">
          <h3>{{ $t('regForm.info') }}</h3>
        </div>
        <div class="main">
          <radioButton id="student" class="radio" value="student" :label="$t('regForm.student')"
            v-model="user.occupation" />
          <appControlInput v-model="user.major" controlType="input">
            <template v-slot:label>{{ $t('regForm.major') }}</template>
          </appControlInput>
          <appControlInput v-model="user.university" controlType="input">
            <template v-slot:label>{{ $t('regForm.university') }}</template>
          </appControlInput>
          <appControlInput v-model="user.gradYear" controlType="date">
            <template v-slot:label>{{ $t('regForm.gradYear') }}</template>
          </appControlInput>
          <br>
          <radioButton id="professional" class="radio" value="professional" :label="$t('regForm.professional')"
            v-model="user.occupation" />
          <appControlInput v-model="user.position" controlType="input">
            <template v-slot:label>{{ $t('regForm.position') }}</template>
          </appControlInput>
          <appControlInput v-model="user.organization" controlType="input">
            <template v-slot:label>{{ $t('regForm.org') }}</template>
          </appControlInput>
        </div>
      </div>
    </section>
    <!-- Submit button -->
    <div class="ltr:text-right rtl:text-left">
      <appButton btn-style="button-blue-full" type="submit">{{ $t('regForm.submit') }}</appButton>
    </div>
  </form>
</template>

<script>
  import appControlInput from "~/components/FormComponents/AppControlInput";
  import appButton from "~/components/FormComponents/AppButton";
  import radioButton from '~/components/FormComponents/RadioButton';

  export default {
    data() {
      return {
        user: {
          fullName_en: null,
          fullName_ar: null,
          gender: null,
          email: null,
          phone: null,
          occupation: null,
          major: null,
          university: null,
          position: null,
          organization: null,
          gradYear: null,
          birthDate: null
        }
      }
    },
    components: {
      appControlInput,
      appButton,
      radioButton
    },
    methods: {
      onSubmit() {
        this.$emit('submit', this.newUser())
      },
      generateUsername() {
        return this.$options.filters.stringToSlug(this.user.fullName_en)
      },
      generatePassword() {
        return this.$options.filters.generatePassword(16)
      },
      newUser() {
        var newUser = {}
        const user = this.user
        for (var key in user) {
          if (user.hasOwnProperty(key) && user[key] != null) {
            newUser[key] = user[key]
          }
        }
        newUser.username = this.generateUsername();
        newUser.password = this.generatePassword();
        return newUser
      }
    }
  };

</script>

<style scoped>
  h3 {
    width: min-intrinsic;
    width: -webkit-min-content;
    width: -moz-min-content;
    width: min-content;
    display: table-caption;
    display: -ms-grid;
    -ms-grid-columns: min-content;
    @apply font-aleoLight;
  }

  .side {
    width: 100%;
    @apply py-4 border-t border-dotted;
  }

  .main {
    @apply py-8 flex-grow;
  }

  section {
    @apply pb-8;
  }

  .input-control {
    @apply w-full flex flex-wrap items-center;
  }

  .input-control>>>input {
    @apply flex-grow inline-block;
  }

  .input-control>>>.label {
    @apply w-1/4 mr-8 mb-2 inline-block;
  }

  .radio {
    @apply pb-4;
  }

  @screen md {
    .side {
      @apply w-1/3 flex-shrink-0;
    }

    .main {
      @apply border-t border-dotted;
    }

    .input-control {
      @apply flex-no-wrap;
    }

    .input-control>>>.label {
      @apply mb-0;
    }
  }

</style>
