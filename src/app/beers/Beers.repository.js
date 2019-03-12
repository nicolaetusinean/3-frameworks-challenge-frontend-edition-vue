import {of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export default class BeersRepository {
  http;
  url = 'https://api.punkapi.com/';
  apiVersion = 'v2';
  resource   = 'beers';

  constructor(http) {
    this.http = http;
  }

  getAll(filters, page, pageSize) {
    filters = filters || {};
    let params = {};
    const url = this.url + [this.apiVersion, this.resource].join('/');

    if (!isNaN(page) && !isNaN(pageSize)) {
      params['page'] = page.toString();
      params['per_page'] = pageSize.toString();
    }

    let filter;
    for (filter of Object.keys(filters)) {
      if (filter === 'ids') {
        params[filter] = filters[filter].join('|');
        continue;
      }

      params[filter] = filters[filter].toString();
    }

    return this.http.get(url, {
      params: params
    }).pipe(
      map(result => {
        return result.data;
        // return beers.map((beer) => new BeerEntity(beer));
      }),
      catchError(this.handleError('trying to get the beers menu', []))
    );
  }

  handleError(operation = 'operation', result) {
    return (error) => {

      // TODO: send the error to remote logging infrastructure
      console.error(operation, error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }
}

