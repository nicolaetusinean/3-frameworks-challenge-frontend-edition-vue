<template>
  <form v-on:submit="search();$event.preventDefault();">
    <div class="form-group">
      <input type="text" class="form-control" id="searchTerm"
             name="searchTerm" v-model="searchTerm"
             placeholder="Search for beer name"
             autocomplete="off"
      >
    </div>
  </form>

</template>

<script>
import { EventBus } from '../emitter/EventBus.js';

export default {
  name: 'SearchBar',
  data: function () {
    return {
      searchTerm: '',
    };
  },
  created() {
    EventBus.$on('left:basic-search', () => {
      this.searchTerm = '';
    });
  },
  events: {
    // 'left:basic-search': function () {
    //   this.searchTerm = '';
    // }
  },
  methods: {
    search: function () {
      this.redirectToBasicSearch({
        'searchTerm': this.searchTerm
      });
    },
    redirectToBasicSearch: function (queryParams) {
      this.$router.push({ path: '/basic-search', query: queryParams });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
