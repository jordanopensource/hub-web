<template>
  <div id="edit-profile-form">
    <form @submit.prevent="onSubmit">
      <!-- Name and picture section meduim screen and larger -->
      <div class="w-full flex-wrap md:flex-no-wrap flex">
        <div class="side md:ltr:mr-8 md:rtl:ml-8 mb-8">
          <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture" />
          <img v-else class="profilePicture" src="/images/bots/superbot.svg" />
        </div>
        <div class="main">
          <section class="name-section">
            <h4 class="title">{{ member.fullName_en | capitalize }}</h4>
            <div>
              <appButton btn-style="button-blue-full ltr:mr-2 rtl:ml-2 mb-4 sm:mb-0" type="submit">{{ $t('button.save') }}
              </appButton>
              <nuxt-link to="/me" class="button button-grey inline-block">{{ $t('button.cancel') }}</nuxt-link>
            </div>
          </section>
        </div>
      </div>
      <!-- Information Section -->
      <div class="w-full flex flex-wrap md:flex-no-wrap">
        <div class="main">
          <section>
            <h3>{{ $t('regForm.privacy') }}</h3>
            <toggleButton id="privacy" :value="user.private" v-model="user.private" :label="user.private ? 'Visible only to JOSA members' : 'Visible to everyone'"/>
          </section>
          <section>
            <h3>{{ $t('regForm.personalInfo') }}</h3>
            <appControlInput v-model="user.fullName_en" controlType="input">
              <template v-slot:label>{{ $t('regForm.fullName') }}</template>
              <template v-slot:sub>{{ $t('regForm.en') }}</template>
            </appControlInput>
            <appControlInput v-model="user.fullName_ar" controlType="input">
              <template v-slot:label>{{ $t('regForm.fullName') }}</template>
              <template v-slot:sub>{{ $t('regForm.ar') }}</template>
            </appControlInput>
            <appControlInput v-model="user.birthDate" controlType="date">
              <template v-slot:label>{{ $t('regForm.birthDate') }}</template>
            </appControlInput>
            <appControlInput v-model="user.gender" controlType="input">
              <template v-slot:label>{{ $t('regForm.gender') }}</template>
              <template v-slot:sub>{{ $t('regForm.optional') }}</template>
            </appControlInput>
          </section>
          <section>
            <h3>{{ $t('regForm.contact') }}</h3>
            <appControlInput v-model="user.email" controlType="email" disabled>
              <template v-slot:label>{{ $t('regForm.email') }}</template>
            </appControlInput>
            <appControlInput v-model="user.phone" controlType="input" placeholder="+962">
              <template v-slot:label>{{ $t('regForm.phone') }}</template>
            </appControlInput>
            <!-- Social Media -->
            <appControlInput v-model="user.github" controlType="input" placeholder="Username">
              <template v-slot:label>
                <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'github' ]" />
                {{ $t('socialMedia.github') }}</template>
            </appControlInput>
            <appControlInput v-model="user.linkedin" controlType="input" placeholder="Username">
              <template v-slot:label>
                <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'linkedin' ]" />
                {{ $t('socialMedia.linkedin') }}</template>
            </appControlInput>
            <appControlInput v-model="user.twitter" controlType="input" placeholder="Username">
              <template v-slot:label>
                <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'twitter' ]" />
                {{ $t('socialMedia.twitter') }}</template>
            </appControlInput>
            <appControlInput v-model="user.facebook" controlType="input" placeholder="Username">
              <template v-slot:label>
                <font-awesome-icon class="ltr:mr-2 rtl:ml-2" :icon="['fab', 'facebook' ]" />
                {{ $t('socialMedia.facebook') }}</template>
            </appControlInput>
          </section>
          <section>
            <h3>{{ $t('regForm.titles') }}</h3>
            <appControlInput v-model="user.titles" controlType="textarea">
              <template v-slot:sub>{{ $t('regForm.commaSeperated') }}</template>
            </appControlInput>
          </section>
          <section>
            <h3>{{ $t('members.about') }}</h3>
            <appControlInput v-model="user.about" controlType="textarea">
              <template v-slot:sub>{{ $t('regForm.commaSeperated') }}</template>
            </appControlInput>
          </section>
          <section>
            <h3>{{ $t('members.interests') }}</h3>
            <appControlInput v-model="user.interests" controlType="textarea">
              <template v-slot:sub>{{ $t('regForm.commaSeperated') }}</template>
            </appControlInput>
          </section>
          <section>
            <h3>{{ $t('regForm.occupation') }}</h3>
            <div class="flex mb-4">
              <radioButton id="student" class="radio" value="student" :label="$t('regForm.student')"
                v-model="user.occupation" />
              <radioButton id="professional" class="radio" value="professional" :label="$t('regForm.professional')"
                v-model="user.occupation" />
            </div>
            <appControlInput v-model="user.major" controlType="input">
              <template v-slot:label>{{ $t('regForm.major') }}</template>
            </appControlInput>
            <appControlInput v-model="user.university" controlType="input">
              <template v-slot:label>{{ $t('regForm.university') }}</template>
            </appControlInput>
            <appControlInput v-model="user.gradYear" controlType="date">
              <template v-slot:label>{{ $t('regForm.gradYear') }}</template>
            </appControlInput>
            <appControlInput v-model="user.position" controlType="input">
              <template v-slot:label>{{ $t('regForm.position') }}</template>
            </appControlInput>
            <appControlInput v-model="user.organization" controlType="input">
              <template v-slot:label>{{ $t('regForm.org') }}</template>
            </appControlInput>
          </section>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import badges from '~/components/Members/Badges';
  import appControlInput from "~/components/FormComponents/AppControlInput";
  import appButton from "~/components/FormComponents/AppButton";
  import radioButton from '~/components/FormComponents/RadioButton';
  import toggleButton from '~/components/FormComponents/ToggleButton';
  export default {
    data() {
      return {
        user: {
          id: this.member.id,
          fullName_en: this.member.fullName_en,
          fullName_ar: this.member.fullName_ar,
          gender: this.member.gender,
          email: this.member.email,
          phone: this.member.phone,
          occupation: this.member.occupation,
          major: this.member.major,
          university: this.member.university,
          position: this.member.position,
          organization: this.member.organization,
          gradYear: this.member.gradYear,
          birthDate: this.member.birthDate,
          titles: this.member.titles,
          about: this.member.about,
          interests: this.member.interests,
          facebook: this.member.facebook,
          twitter: this.member.twitter,
          github: this.member.github,
          linkedin: this.member.linkedin,
          private: this.member.private
        }
      }
    },
    components: {
      appImage,
      badges,
      appControlInput,
      appButton,
      radioButton,
      toggleButton
    },
    props: {
      member: {
        type: Object,
        required: true
      }
    },
    methods: {
      onSubmit() {
        this.$emit('submit', this.updatedUser())
      },
      updatedUser() {
        var tempUser = {}
        const user = this.user
        for (var key in user) {
          if (user.hasOwnProperty(key) && user[key] != null) {
            tempUser[key] = user[key]
          }
        }
        tempUser.id = user.id
        return tempUser
      }
    }
  };

</script>

<style scoped>
  .profilePicture {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }

  .side {
    width: 100%;
  }

  @screen md {
    .profilePicture {
      width: 200px;
      height: 200px;
    }

    .side {
      width: 200px;
      @apply flex-shrink-0;
    }
  }

  .main {
    @apply flex-grow mb-8;
  }

  section {
    @apply py-4 border-b border-dotted;
  }

  .name-section {
    @apply pt-0 h-full flex flex-col justify-between;
  }

  h3 {
    @apply mb-4 text-josa-blue uppercase;
  }

  .interest {
    @apply inline-block m-2 py-1 rounded-md px-4 bg-grey90 opacity-90;
  }

  .membership-type {
    @apply flex items-center;
  }

  .josa-icon {
    @apply rounded-md;
    width: 42px;
    height: 42px;
  }

  .membership-text {
    @apply font-semibold text-grey70 text-sm leading-none;
  }

  .member-id {
    @apply text-2xl font-light leading-snug;
  }

  .badges img {
    width: 40px;
    height: 40px;
  }

  .bottom-full {
    bottom: 100%
  }

  .top-full {
    top: 100%
  }

</style>
