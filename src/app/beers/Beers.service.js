import {Observable} from 'rxjs';

export default class BeersService {
  beersRepository;
  favouriteBeersService;

  constructor(beersRepository, favouriteBeersService) {
    this.beersRepository = beersRepository;
    this.favouriteBeersService = favouriteBeersService;
  }

  getAll(filters, page, pageSize) {
    return this.beersRepository.getAll(filters, page, pageSize);
  }

  /**
   * Get the list of favourite beers. Will return an empty array if there are no favourite beers yet.
   */
  getFavourites() {
    const ids = this.favouriteBeersService.getList();
    if (ids.length === 0) {
      return new Observable(observer => {
        observer.onNext([]);
        observer.onCompleted();
      });
    }

    return this.getAll({ids: ids});
  }
}
