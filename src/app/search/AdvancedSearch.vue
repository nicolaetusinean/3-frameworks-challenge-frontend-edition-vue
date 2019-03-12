<template>
  <div>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-6">
          <form v-on:submit="search();$event.preventDefault();">
            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="max_ibu">Max IBU</label>
                <input type="number" class="form-control" id="max_ibu"
                       v-model.number="filters.ibu_lt" name="maxIbu">
              </div>

              <div class="form-group col-md-5 offset-2">
                <label for="min_ibu">Min IBU</label>
                <input type="number" class="form-control" id="min_ibu"
                       v-model.number="filters.ibu_gt" name="minIbu">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="max_abv">Max ABV</label>
                <input type="number" class="form-control" id="max_abv"
                       v-model.number="filters.abv_lt" name="maxAbv">
              </div>

              <div class="form-group col-md-5 offset-2">
                <label for="min_abv">Min ABV</label>
                <input type="number" class="form-control" id="min_abv"
                       v-model.number="filters.abv_gt" name="minAbv">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="max_ebc">Max EBC</label>
                <input type="number" class="form-control" id="max_ebc"
                       v-model.number="filters.ebc_lt" name="maxEbc">
              </div>

              <div class="form-group col-md-5 offset-2">
                <label for="min_ebc">Min EBC</label>
                <input type="number" class="form-control" id="min_ebc"
                       v-model.number="filters.ebc_gt" name="minEbc">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="brewed_before_month">Brewed Before (month)</label>
                <select id="brewed_before_month" class="form-control"
                        v-model.number="filters.brewed_before.month" name="brewed_before_month">
                  <option value="" selected>Select</option>
                  <option v-for="month in months" :key="month">{{month}}</option>
                </select>
              </div>
              <div class="form-group col-md-5 offset-2">
                <label for="brewed_before_year">Brewed Before (year)</label>
                <select id="brewed_before_year" class="form-control"
                        v-model.number="filters.brewed_before.year" name="brewed_before_year">
                  <option value="" selected>Select</option>
                  <option v-for="year in years" :key="year">{{year}}</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="brewed_after_month">Brewed After (month)</label>
                <select id="brewed_after_month" class="form-control"
                        v-model.number="filters.brewed_after.month" name="brewed_after_month">
                  <option value="" selected>Select</option>
                  <option v-for="month in months" :key="month">{{month}}</option>
                </select>
              </div>

              <div class="form-group col-md-5 offset-2">
                <label for="brewed_after_year">Brewed After (year)</label>
                <select id="brewed_after_year" class="form-control"
                        v-model.number="filters.brewed_after.year" name="brewed_after_year">
                  <option value="" selected>Select</option>
                  <option v-for="year in years" :key="year">{{year}}</option>
                </select>
              </div>
            </div>

            <button type="submit" class="btn btn-success">Search</button>
            <button type="reset" value="reset" v-on:click="resetForm()" class="offset-1 btn btn-secondary">Reset</button>

          </form>
        </div>
      </div>
    </div>

    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-3">
          <div class="loader" v-if="loading">Loading...</div>
        </div>
      </div>

      <div class="row justify-content-center text-center">
        <h3 v-if="submitted && !loading && beers.length === 0" class="col-md-5">No beers were found matching your criteria.</h3>
      </div>

      <div class="row justify-content-center text-center">
        <h3 v-if="submitted && !loading && errors.length === 0" class="col-8">{{ errors.join('. ') }}</h3>
      </div>

      <div class="row justify-content-center" v-if="!loading">
        <div class="card-columns">
          <div
              v-for="beer in beers"
              :key="beer.id"
              v-bind:class="{ favourite: beer.isInFavouriteList }"
              v-on:click="openBeerModal(beer)"
              class="card beer"
          >
            <button v-on:click="addOrRemoveToFavourites(beer);$event.stopPropagation();"
                    class="btn btn-link favouriteIcon"
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
  </div>
</template>

<script>
export default {
  name: 'AdvancedSearch',
  dependencies: ['beersService', /*modalService,*/ 'favouriteBeersService'],
  data: function () {
    return {
      beers: [],
      filters: {
        ibu_lt: null,
        ibu_gt: null,
        abv_lt: null,
        abv_gt: null,
        ebc_lt: null,
        ebc_gt: null,
        brewed_after: {
          month: "",
          year: "",
        },
        brewed_before: {
          month: "",
          year: "",
        },
      },
      months: [],
      years: [],
      submitted: false,
      loading: false,
      errors: [],
    }
  },
  created() {
    this.months = this.range(1, 12);
    this.years  = this.range(2019, 1900);
  },
  methods: {
    /**
     * Get the beers matching searching criteria.
     */
    search: function () {
      this.loading = true;
      this.submitted = true;

      const filters = this.evaluateFilters();

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

    resetForm: function () {
      for (const filter of Object.keys(this.filters)) {
        if (filter === 'brewed_after' || filter === 'brewed_before') {
          this.filters[filter] = {
            month: "",
            year: "",
          };
          continue;
        }

        this.filters[filter] = null;
      }
    },

    openBeerModal: function () {

    },

    clearResultsList: function () {
      this.beers = [];
      this.submitted = false;
    },

    /**
     * Empty filters are removed and date is formatted.
     */
    evaluateFilters: function () {
      const filters = {
        ...this.filters,
        brewed_after: null,
        brewed_before: null
      };
      delete filters['brewed_after'];
      delete filters['brewed_before'];

      for (const filter of Object.keys(filters)) {
        if (filters[filter] === undefined || filters[filter] === null || filters[filter] === '') {
          delete filters[filter];
        }
      }

      if (this.filters.brewed_before['year']) {
        if (!this.filters.brewed_before['month']) {
          this.filters.brewed_before['month'] = 12;
        }

        filters.brewed_before = [this.filters.brewed_before['month'], this.filters.brewed_before['year']].join('-');
      }

      if (this.filters.brewed_after['year']) {
        if (!this.filters.brewed_after['month']) {
          this.filters.brewed_after['month'] = 1;
        }

        filters.brewed_after = [this.filters.brewed_after['month'], this.filters.brewed_after['year']].join('-');
      }

      return filters;
    },

    /**
     * Generate an array of numbers.
     */
    range: function (start, end) {
      const result = [];
      let i = start;

      if (start === end) {
        result.push(i);
      } else if (start > end) {
        for (i; i >= end; i--) {
          result.push(i);
        }
      } else {
        for (i; i <= end; i++) {
          result.push(i);
        }
      }

      return result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
