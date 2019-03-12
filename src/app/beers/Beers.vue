<template>
  <div class="container-fluid">
    <div class="row">
      <div class="card-columns">
        <div
            v-for="beer in beers"
            :key="beer.id"
            v-bind:class="{ favourite: beer.isInFavouriteList }"
            v-on:click="openBeerModal(beer)"
            class="card beer"
        >
          <button v-on:click="addOrRemoveToFavourites(beer);"
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

    <div class="row justify-content-center">
      <div class="col-3">
        <div class="loader" v-if="loading">Loading...</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Beers',
  dependencies: ['beersService', 'favouriteBeersService'],
  data: function () {
    return {
      beers: [],
      loading: false,
      errors: [],
    };
  },
  methods: {
    openBeerModal: function (beer) {

    },
    addOrRemoveToFavourites: function (beer) {
      let confirmation;
      if (this.favouriteBeersService.isInList(beer) !== -1) {
        confirmation = this.favouriteBeersService.removeFromList(beer);
        if (confirmation) {
          beer.isInFavouriteList = false;
        }
      } else {
        confirmation = this.favouriteBeersService.addToList(beer);
        if (confirmation) {
          beer.isInFavouriteList = true;
        }
      }

      for (let i; i < this.beers.length; i++) {
        if (this.beers[i].id == beer.id) {
          this.beers[i] = beer;
        }
      }

      return false;
    }
  },
  created() {
    this.beersService.getAll().subscribe(
      beers => {
        this.beers = this.beers.concat(beers);
        this.loading = false;
      },
      error => {
        this.errors.push(error);
        this.loading = false;
      }
    );
  }
}
</script>

<style lang="scss">
  /*@import "../../../node_modules/bootstrap/scss/_functions";*/
  /*@import "../../../node_modules/bootstrap/scss/_variables";*/
  /*@import "../../../node_modules/bootstrap/scss/_mixins";*/
  @import '../../assets/style/variables.scss';

  .card-columns {
    margin: 2rem auto;
    width: 60%;

    /*@include media-breakpoint-only(xs) {*/
      /*column-count: 1;*/
      /*width: 90%;*/
    /*}*/
    /*@include media-breakpoint-only(sm) {*/
      /*column-count: 1;*/
      /*width: 90%;*/
    /*}*/
    /*@include media-breakpoint-only(md) {*/
      /*column-count: 2;*/
      /*width: 80%;*/
    /*}*/
    /*@include media-breakpoint-only(lg) {*/
      /*column-count: 3;*/
    /*}*/
    /*@include media-breakpoint-only(xl) {*/
      /*column-count: 3;*/
    /*}*/
  }

  .card-columns {
    padding: 1rem;
  }

  .beer {
    cursor: pointer;
    height: 20rem;
    padding: 1rem;
    text-align: center;

    &:hover {
       box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .favouriteIcon {
      color: #000000;
      position: absolute;
      right: 5px;
      text-decoration: none;
      top: 5px;

      &:hover:before,
      &:hover ~ &:before,
      &.active:before {
         color: $primary-color;
         content: "\2605";
         position: absolute;
       }
    }

    &.favourite {
      .favouriteIcon:before {
        color: $primary-color;
        content: "\2605";
        position: absolute;
      }
    }

    .card-img-top {
      height: 9rem;
      margin: 0 auto;
      overflow: hidden;

      img {
        height: 100%;
      }
    }

    .card-text {
      color: $secondary-color;
    }

    h5 {
      color: $primary-color;
    }
  }
</style>
