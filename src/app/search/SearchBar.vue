<template>
  <form>
    <div class="form-group">
      <input type="text" class="form-control" id="searchTerm"
             name="searchTerm"
             placeholder="Search for beer name"
             autocomplete="off"
      >
    </div>
  </form>

</template>

<script>
export default {
  name: 'SearchBar',
  props: { }
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
