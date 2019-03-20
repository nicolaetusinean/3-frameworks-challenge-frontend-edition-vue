<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-3">
        <div class="loader" v-if="loading">Loading...</div>
      </div>
    </div>

    <div class="row justify-content-center text-center">
      <h3 v-if="loaded && beers.length === 0" class="col-md-5">You have no beers in your favourites list.</h3>
    </div>

    <div class="row">
      <div class="card-columns">
        <div
            v-for="beer in beers"
            :key="beer.id"
            class="card beer"
            v-on:click="openBeerModal(beer)"
        >
          <button v-on:click="removeFromFavourites(beer);$event.stopPropagation();"
                  class="btn btn-link favouriteIcon active"
          >&#9734;</button>
          <div class="card-img-top">
            <img :src="beer.image_url" :alt="beer.name">
          </div>
          <div class="card-body">
            <h5 class="card-title">{{beer.name}}</h5>
            <p class="card-text">{{beer.tagline}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'FavouriteBeers',
  dependencies: ['beersService', 'favouriteBeersService'],
  data: function () {
    return {
      beers: [],
      loading: false,
      loaded: false,
      errors: [],
    };
  },
  methods: {
    getFavourites: function () {
      this.loading = true;

      this.beersService.getFavourites().subscribe(
        beers => {
          this.loading = false;
          this.loaded = true;
          this.beers = beers;
        },
        error => {
          this.loading = false;
          this.loaded = true;
          this.errors.push(error);
        }
      );
    },
    removeFromFavourites: function (beer) {
      const confirmation = this.favouriteBeersService.removeFromList(beer);
      if (confirmation) {
        const beerListIndex = this.findBeerInList(beer);
        if (beerListIndex !== -1) {
          this.beers.splice(beerListIndex, 1);
        }
      }
    },
    /**
     * @return number >=0 if beer is found in the list, -1 otherwise
     */
    findBeerInList(beer) {
      let i = 0;
      for (i; i < this.beers.length; i++) {
        if (beer.id === this.beers[i].id) {
          return i;
        }
      }

      return -1;
    }
  },
  created() {
    this.getFavourites();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
