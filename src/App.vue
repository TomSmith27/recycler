<template>
  <div id="app">
    <b-navbar toggleable="lg" type="light" sticky class="bg-white shadow-sm">
      <b-navbar-brand tag="h1" class="mb-0" :to="{name : 'home'}">No More Bin Days</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse v-model="navOpen" id="nav-collapse" is-nav>
        <b-navbar-nav class="text-right">
          <b-nav-item-dropdown text="Products" right>
            <b-dropdown-item :to="{name : 'products'}">A-Z</b-dropdown-item>
            <b-dropdown-item :to="{name : 'locations'}">Categories</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Locations" right>
            <b-dropdown-item class="d-none d-xl-block" :to="{name : 'shops'}">A-Z</b-dropdown-item>
            <b-dropdown-item>Categories</b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{name : 'bins' }">Bins</b-nav-item>
          <b-nav-item :to="{name : 'about' }">About</b-nav-item>
          <b-nav-item :to="{name : 'news' }">News</b-nav-item>
          <b-nav-item :to="{name : 'did-you-know' }">Did you know?</b-nav-item>

          <!--    <b-nav-item href="#">Blogs</b-nav-item>
          <b-nav-item href="#">Bins</b-nav-item>
          <b-nav-item href="#">Composting</b-nav-item>-->
          <b-nav-item-dropdown v-if="isLoggedIn" text="Admin" right>
            <b-dropdown-item :to="{name : 'product-admin'}">Product Admin</b-dropdown-item>
            <b-dropdown-item :to="{name : 'shop-admin'}">Shop Admin</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto text-right">
          <b-nav-item>
            <small>{{ version }}</small>
          </b-nav-item>
          <b-nav-item v-if="!isLoggedIn">
            <b-button v-b-modal.login-modal variant="outline-primary">Login</b-button>
            <b-modal hide-footer title="Login" centered id="login-modal">
              <b-form @submit.prevent="onSubmit">
                <b-form-group id="input-group-1" label="Email address:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.email" type="email" required></b-form-input>
                </b-form-group>

                <b-form-group id="input-group-2" label="Password" label-for="input-2">
                  <b-form-input id="input-2" v-model="form.password" type="password" required></b-form-input>
                </b-form-group>

                <div class="d-flex justify-content-between w-100">
                  <button class="btn btn-secondary" type="button" @click="$bvModal.hide('login-modal')">Cancel</button>
                  <button class="btn btn-primary" type="submit">Login</button>
                </div>
              </b-form>
            </b-modal>
          </b-nav-item>
          <b-nav-item-dropdown v-else right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
              <em>{{user.email}}</em>
            </template>
            <b-dropdown-item @click="logout">Log out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from './components/HelloWorld.vue';
import { mapGetters } from 'vuex';
const packageInfo = require('../package.json')
export default Vue.extend({
  name: 'app',
  components: {
    HelloWorld,
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'user']),
    version() {
      return packageInfo.version
    }
  },
  data() {
    return {
      navOpen: false,
      form: {
        email: '',
        password: '',
      },
    }
  },
  watch: {
    '$route': function () {
      this.navOpen = false;
    }
  },
  created() {
    var user = window.localStorage.getItem('recycle-user');
    if (user != undefined) {
      this.$store.commit('setUser', {
        email: user
      })
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
      this.$router.push({ name: 'home' })
    },
    async onSubmit() {
      await this.$store.dispatch('LOGIN', this.form)
      this.$bvModal.hide('login-modal')
    },

  }
});
</script>

<style lang="scss">
body {
  background-color: #fcfcfa !important;
}
</style>
