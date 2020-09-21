<template>
  <div>
    <div v-if="user.contributionsCollection">
      <div v-for="item in user.contributionsCollection.commitContributionsByRepository" :key="item.repository.name"
        class="flex mb-4 items-start sm:items-center">
        <p class="count">{{item.contributions.totalCount}}</p>
        <font-awesome-icon class="icon ml-6 mr-3" :icon="['fab', 'github' ]" />
        <p>{{$t('members.commits')}} {{item.repository.owner.resourcePath | stringToSlug }}/{{item.repository.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import gql from 'graphql-tag';
  export default {
    data() {
      return {
        user: []
      }
    },
    props: {
      username: {
        type: String,
        required: true
      }
    },
    async mounted() {
      try {
        this.user = await this.$apollo.query({
          query: gql `{
            user(login: "${this.username}") {
              contributionsCollection {
                commitContributionsByRepository {
                  contributions(first: 50) {
                    totalCount
                  }
                  repository {
                    name
                    owner {
                      resourcePath
                    }
                  }
                }
              }
            }
          }`
        }).then(({
          data
        }) => data && data.user)
      } catch {
        this.user.contributionsCollection = null
      }

    }
  }

</script>

<style scoped>
  .count {
    @apply text-2xl font-light leading-snug text-right inline-block flex-shrink-0;
  }

  p {
    @apply inline-block;
  }

</style>
