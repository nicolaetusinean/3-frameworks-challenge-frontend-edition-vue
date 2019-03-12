<template>
  <div id="app">
    <nav class="navbar sticky-top navbar-light">
      <router-link to="/beers">Home</router-link>
      <router-link to="/favourites">Favourites</router-link>
    </nav>

    <header class="container-fluid">
      <div class="row">
        <h1 class="col-12">The Beer Bank</h1>
        <h6 class="col-12">Find your favourite beer here</h6>
      </div>

      <div class="row justify-content-center">
        <SearchBar class="col-md-4 col-sm-12"/>
      </div>

      <div class="row justify-content-center text-right advanced-search">
        <router-link to="/advanced-search" class="col-md-4 col-sm-12">Advanced Search</router-link>
      </div>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>

import SearchBar from './app/search/SearchBar.vue'

export default {
  name: 'app',
  components: {
    SearchBar
  }
}
</script>

<style lang="scss">
body {
  background-color: #F8F8F8;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.navbar {
  background-color: $primary-color;
  justify-content: flex-end;
  text-align: right;

  a {
    color: #ffffff;
    margin-left: 2rem;
    text-transform: uppercase;
  }
}

header {
  background-color: $primary-color;
  color: #ffffff;
  padding-bottom: 2rem;
  text-align: center;
}

.advanced-search {
  a {
    color: #ffffff;
  }
}
</style>
