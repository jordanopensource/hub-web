<template>
  <div id="footer">
    <!-- Primary Footer - Menus -->
    <div class="container flex flex-col md:flex-row flex-wrap md:flex-no-wrap justify-between">
      <!-- About Menu -->
      <section :id="'footer-menu-' + menus.membersFooter.menuId">
        <h6>{{ menus.membersFooter['menuName_' + $i18n.locale] }}</h6>
        <menuItems :menu="menus.membersFooter" />
        <div class="block md:hidden py-8">
          <hr>
        </div>
      </section>
    </div>
    <!-- Secondery Footer -->
    <div id="site-info">
      <div class="container flex flex-col md:flex-row">
        <div class="logo">
          <img v-if="$i18n.locale == 'ar'" src="~/static/logo/logo-white-ar.svg" alt="جوسا">
          <img v-else src="~/static/logo/logo-white-en.svg" alt="JOSA Logo">
        </div>
        <div class="block md:hidden py-8">
          <hr>
        </div>
        <div id="copyright-info" class="">
          <div class="column cc-footer-license">
            <div class="license-icons">
              <a rel="license" href="https://creativecommons.org/licenses/by/4.0/"
                title="Creative Commons Attribution 4.0 International license">
                <i class="cc-icon-cc">
                  <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fab', 'creative-commons']" />
                </i>
                <i class="cc-icon-cc-by">
                  <font-awesome-icon class="icon ltr:mr-3 rtl:ml-3" :icon="['fab', 'creative-commons-by']" />
                </i>
              </a>
            </div>
            <aside>
              <div xmlns:cc="https://creativecommons.org/ns#" about="https://creativecommons.org">
                {{ $t('copyright.except') }}
                <a class="subfoot" href="https://jordanopensource.org/info/privacypolicy"> noted,</a>
                {{ $t('copyright.content') }}
                <a class="subfoot" href="https://creativecommons.org/licenses/by/4.0/" rel="license">
                  {{ $t('copyright.creative') }}</a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import menuItems from '~/components/Menu/MenuItems';
  export default {
    name: 'Footer',
    data() {
      return {
        socialMediaLinks: [{
            icon: 'facebook-square',
            path: 'https://facebook.com/jordanopensource',
            id: '/jordanopensource'
          },
          {
            icon: 'twitter',
            path: 'https://twitter.com/jo_osa',
            id: '@jo_osa'
          },
          {
            icon: 'instagram',
            path: 'https://instagram.com/jordanopensource',
            id: '/jordanopensource'
          },
        ]
      }
    },
    components: {
      menuItems,
    },
    computed: {
      menus() {
        return this.$store.getters.loadedMenus
      }
    }
  }

</script>

<style scoped>

  #footer {
    @apply bg-josa-black text-josa-warm-grey-light;
    line-height: 1.6;
  }

  .cc-footer p {
    margin-bottom: .25em;
    font-family: lato;
  }

  .license-icons {
    margin-top: 0;
    margin-right: 0;
    margin-bottom: .25em;
    text-align: left;
  }

  .subfoot {
    text-decoration: underline;
    font-size: 13px;
  }

  .fa-creative-commons.fa-w-16 {
    color: #ffffff;
  }

  .fa-creative-commons-by.fa-w-16 {
    color: #ffffff;
  }

  .container {
    @apply px-12 py-24 !important;
  }

  #site-info {
    background-color: #282e30;
  }

  #site-info .container {
    @apply py-10 !important;
  }

  section {
    @apply flex-grow;
  }

  [dir="ltr"] section:first-child {
    @apply pl-0;
  }

  [dir="ltr"] section:last-child {
    @apply pr-0;
  }

  [dir="rtl"] section:first-child {
    @apply pr-0;
  }

  [dir="rtl"] section:last-child {
    @apply pl-0;
  }


  h6 {
    @apply uppercase pb-2;
  }

  hr {
    @apply border-dotted;
  }

  img {
    max-width: 240px;
  }

  .logo,
  #copyright-info {
    @apply w-full flex align-middle justify-center text-sm;
  }

  @screen md {

    .logo,
    #copyright-info {
      @apply w-1/2 justify-start;
    }
  }

  @screen md {
    section {
      @apply px-4;
    }
  }

  @screen lg {
    .logo {
      @apply w-4/5;
    }

    #copyright-info {
      @apply w-1/3;
    }
  }

</style>
