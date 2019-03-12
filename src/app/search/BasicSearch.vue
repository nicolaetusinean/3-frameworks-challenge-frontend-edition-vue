<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-3">
        <div class="loader" v-if="loading">Loading...</div>
      </div>
    </div>

    <div class="row justify-content-center text-center">
      <h3 v-if="!loading && beers.length === 0" class="col-md-5">No beers with that name were found.</h3>
      <div class="row justify-content-center">

        <div class="row justify-content-center text-center">
          <h3 v-if="!loading && errors.length === 0" class="col-8">{{ errors.join('. ') }}</h3>
        </div>

        <div class="row justify-content-center" v-if="!loading">
          <div class="card-columns">
            <div
                v-for="beer in beers"
                :key="beer.id"
                v-on:click="openBeerModal(beer)"
                class="card beer"
                v-bind:class="{ favourite: beer.isInFavouriteList }"
            >
              <button v-on:click="addOrRemoveToFavourites(beer);$event.stopPropagation();"
                      class="btn btn-link favouriteIcon"
              >&#9734;
              </button>
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
    </div>
  </div>
</template>

<script>
import { EventBus } from '../emitter/EventBus.js';

export default {
  name: 'BasicSearch',
  dependencies: ['beersService', /*modalService,*/ 'favouriteBeersService'],
  data: function () {
    return {
      beers: [],
      loading: false,
      errors: [],
    }
  },
  created() {
    this.search();
  },
  destroyed() {
    EventBus.$emit('left:basic-search');
  },
  watch: {
    '$route' () {
      this.search();
    }
  },
  methods: {
    /**
     * Get the beers matching searching criteria.
     */
    search: function () {
      this.loading = true;

      const filters = {
        'beer_name': this.getSearchTermFromQueryParams(),
      };

      if (filters.beer_name === '') {
        this.redirectToHomepage();
        return;
      }

      this.beersService.getAll(filters).subscribe(
        results => {
          this.beers = results;
          this.loading = false;
        },
        error => {
          this.errors.push(error);
          this.loading = false;
        }
      );
    },

    /**
     * Get the search term from query string parameters.
     */
    getSearchTermFromQueryParams: function () {
      return this.$route.query['searchTerm'];
    },

    redirectToHomepage() {
      this.$router.push({ path: '/beers' })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
