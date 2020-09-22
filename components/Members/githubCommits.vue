<template>
  <div v-if="user.contributionsCollection">
    <table class="table-auto">
      <tbody>
        <tr v-for="item in user.contributionsCollection.commitContributionsByRepository" :key="item.repository.name">
          <td class="text-right text-2xl font-light leading-snug">{{item.contributions.totalCount}}</td>
          <td>
            <font-awesome-icon class="icon ml-6 mr-3" :icon="['fab', 'github' ]" />
          </td>
          <td>{{$t('members.commits')}} {{item.repository.owner.resourcePath | stringToSlug }}/{{item.repository.name}}
          </td>
        </tr>
      </tbody>
    </table>
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
  td {
    @apply align-top pb-4;
  }

  @screen md {
    td {
      @apply align-middle;
    }
  }

</style>
