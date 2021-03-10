<template>
  <div class="flex flex-wrap md:flex-no-wrap w-full pt-4 border-t border-dotted">
    <!-- Profile Picture -->
    <nuxt-link :to="memberLink">
      <appImage v-if="member.profilePicture" :image="member.profilePicture" size="small" class="profilePicture ltr:mr-4 rtl:ml-4 mb-4" />
      <img v-else class="profilePicture ltr:mr-4 rtl:ml-4 mb-4" src="/images/bots/superbot.svg" />
    </nuxt-link>
    <!-- Full Name -->
    <div class="grid md:grid-cols-2 w-full">
      <div class='justify-start mx-4'>
      <nuxt-link :to="memberLink">
        <h2>{{ member['fullName_' + $i18n.locale] | capitalize }}</h2>
      </nuxt-link>
      <!-- Membership Type -->
      <!-- <p class="my-2">{{ member.membershipType | capitalize }}</p> -->
      <!-- Badges -->
      <!-- <badges v-if="member.badges" :badges="member.badges" /> -->
      <div v-if="titles">
            <p v-for="(title,index) in titles" :key="index" class="text-sm">{{ title | capitalize }}</p>
          </div>
      <section  v-if="interests.length">
          
          <div class="-mx-3 ">
            <span v-for="(interest,index) in interests.slice(0,3)" :key="index" class="interest">
              {{ interest | lowercase | capitalize({ onlyFirstLetter: true }) }}
            </span>
          </div>
        </section>
        </div>
       
        <div class="">
        <div class="flex flex-row">
          <span :class="[member.membershipType == 'active' ? 'text-josa-blue-dark':'text-josa-blue']"><font-awesome-icon  icon="circle" size="xs" class="m-1"/></span>
          
          
          <p class="member-id mr-2 font-bold text-sm">{{ member.membershipId }}</p>
          
          <p class="text-sm text-gray-600">Member for {{ member.memberSince ? dateTrans(member.memberSince, "YYYYMMDD"): dateTrans(member.created_at, "YYYYMMDD") | dateTrans(member.created_at, "YYYYMMDD")}}
          </p>
       </div>
       <div v-show="member.solvedTasks.length!=0 && auth!=null" class="flex flex-row-reverse"> 
       
       <p v-for="task in member.solvedTasks" :key="task.id" class="text-sm"> {{ task.points }} </p>
       <p class="text-sm ml-1">Score  :  </p>
       <font-awesome-icon  icon="star" size="xs" class="m-1"/>

       </div>
        
       <badges  v-if="member.badges" :badges="member.badges" />
        </div>
       </div>
          
       
        
        
    
  </div>  
</template>

<script>
  import appImage from '~/components/UI/appImage';
  import badges from '~/components/Members/Badges';
  import solvedTask from '~/components/Tasks/SolvedTask';
  import {mapGetters} from 'vuex';
  import moment from 'moment';

  export default {
    name: 'MemberPreview',
    components: {
      appImage,
      badges,
      solvedTask,
      
    },
    props: {
      member: {
        type: Object,
        required: true
      },
      
      
      
    },
    data:{
        task:Object,
    },
    
    computed: {
      memberLink() {
        return this.localePath('/members/' + this.member.id)
      },
      interests() {
        try {
          const interests = this.$options.filters.stringToArray(this.member.interests)
          return interests
        } catch {
          return []
        }
      },
      titles() {
        
        try {
          const titles = this.$options.filters.stringToArray(this.member.titles)
         
          return titles
        } catch {
          return null
        }
      },
      ...mapGetters(['auth']),
      
    },
    methods:{
      dateTrans(from,now){
        
        return moment(from,now).fromNow().slice(0,-4);
        
        

      },
      
      
    }
    
  }

</script>

<style scoped>
  .profilePicture {
    width: 150px;
    height: 150px;
    object-fit: cover;
  }
  
  
  .interest {
    @apply inline-block m-2 py-1 rounded-md px-4 bg-grey90 opacity-90;
  }
  .badges img{
     width: '40px';
     height: '40px';
  }
  

</style>
