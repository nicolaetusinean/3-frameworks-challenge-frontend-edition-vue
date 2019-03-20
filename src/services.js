import injector from 'vue-inject';
import AxiosObservable from 'axios-observable';

import BeersRepository from "./app/beers/Beers.repository";
import FavouriteBeersService from './app/beer-favourites/FavouriteBeers.service';
import BeersService from './app/beers/Beers.service';

injector.constant('axios', AxiosObservable);
injector.constant('localStorage', localStorage);

injector.service('beersRepository', ['axios'], BeersRepository);
injector.service('favouriteBeersService', ['localStorage'], FavouriteBeersService);
injector.service('beersService', ['beersRepository', 'favouriteBeersService'],  BeersService);

