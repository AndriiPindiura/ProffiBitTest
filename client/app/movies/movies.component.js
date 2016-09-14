'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './movies.routes';

export class MoviesComponent {
  /*@ngInject*/
  constructor($http) {
    this.message = 'Hello';
    this.http = $http;
    this.getMovies();
  }

  getMovies() {
    this.http.get('/api/movies')
      .then(response => {
        console.log(response.data);
        this.movies = response.data;
      })
      .catch(error => console.log(error));
  }
}

export default angular.module('proffibitTestApp.movies', [uiRouter])
  .config(routes)
  .component('movies', {
    template: require('./movies.html'),
    controller: MoviesComponent,
    controllerAs: 'vm'
  })
  .name;
