'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './movies.routes';

class MoviesComponent {
  /*@ngInject*/
  constructor($rootScope, $http, $uibModal) {
    this.modal = $uibModal;
    this.scope = $rootScope;
    this.message = 'Hello';
    this.http = $http;
    this.getMovies();
    this.filter = {
      title: '',
      actors: '',
    };
  }

  openCreateDialog() {
    let modal = this.modal.open({ component: 'create'});
    modal.result.then(() => this.getMovies());
  }

  getMovies() {
    this.http.get('/api/movies')
      .then(response => {
        this.movies = response.data.sort((a, b) => a.title && b.title
        ? a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
        : 0);
      })
      .catch(error => console.log(error));
  }

  deleteMovie(id) {
    console.log(id);
    this.http.delete(`/api/movies/${id}`)
      .then(() => {
        this.getMovies();
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
