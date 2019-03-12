export default class FavouriteBeersService {
  localstorageId = 'favouriteBeersIds';
  idsSeparator = '|';
  localStorageService;

  constructor(localStorageService) {
    this.localStorageService = localStorageService;
  }

  addToList(beer) {
    const beerListIndex = this.isInList(beer);

    if (beerListIndex > -1) {
      return true;
    }

    const favouriteBeersIds = this.getList();
    favouriteBeersIds.push(beer.id.toString());

    this.storeList(favouriteBeersIds);

    return true;
  }

  /**
   * @return number (position index in list or -1 if not found)
   */
  isInList(beer) {
    const favouriteBeersIds = this.getList();
    const beerIndex = favouriteBeersIds.indexOf(beer.id.toString());

    return beerIndex;
  }

  removeFromList(beer) {
    const beerListIndex = this.isInList(beer);

    if (beerListIndex === -1) {
      return true;
    }

    const favouriteBeersIds = this.getList();
    favouriteBeersIds.splice(beerListIndex, 1);

    this.storeList(favouriteBeersIds);

    return true;
  }

  /**
   * Gets the beers ids from local storage;
   */
  getList() {
    const favouriteBeersIds = this.localStorageService.getItem(this.localstorageId);

    if (typeof favouriteBeersIds !== 'string') {
      return [];
    }

    return favouriteBeersIds.split(this.idsSeparator);
  }

  /**
   * Saves list in local storage.
   */
  storeList(list) {
    const listAsString = list.join(this.idsSeparator);
    this.localStorageService.setItem('favouriteBeersIds', listAsString);
  }
}
