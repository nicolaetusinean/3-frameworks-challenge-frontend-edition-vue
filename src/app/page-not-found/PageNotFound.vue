<template>
  <div class="container-fluid">
    <div class="row justify-content-center text-center">
      <h2 class="col-md-4">Page not found</h2>
    </div>

    <div class="row justify-content-center  text-center">
      <h5 class="col-md-4">Redirecting you to home page in {{remainingSeconds}}...</h5>
    </div>
  </div>
</template>

<script>
import {timer} from 'rxjs';

export default {
  name: 'PageNotFoundComponent',
  data: function () {
    return {
      remainingSeconds: 5,
      waitTime: 5,
    };
  },
  methods: {
    redirectToHomepage: function() {
      const timerSubscription = timer(0, 1000).subscribe(t => {
        this.remainingSeconds = this.waitTime - t;

        if (this.waitTime === t) {
          timerSubscription.unsubscribe();
          this.$router.push({ path: '/beers' })
        }
      });

    }
  },
  created() {
    this.redirectToHomepage();
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
