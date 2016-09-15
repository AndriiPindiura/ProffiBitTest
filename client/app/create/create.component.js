'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './create.routes';

class CreateComponent {
  /*@ngInject*/
  constructor($rootScope, $http, $timeout, Upload) {
    this.message = 'Hello';
    this.upload = Upload;
    this.http = $http;
    this.scope = $rootScope;
    this.movie = {};
    this.timer = $timeout;
    this.quality = ['DVD', 'VHS', 'Blu-Ray'];
    this.years = [];
    this.filtToImport = {};
    for(let i = 1900; i < 2017; i++) {
      this.years.push(i);
    }
  }

  cancel() {
    console.log('cancel');
    this.dismiss({$value: false});
    // console.log(this.scope.modalInstance);
    // this.scope.modalInstance.close();
  }

  ok() {
    this.close({$value: true});
  }

  submit() {
    console.log(this.movie);
    this.http.post('/api/movies/', this.movie)
      .then(response => console.log(response), error => console.log(error));
    // console.log('qwerty');
    // console.log(this.movieForm);
    this.movie = {};
    this.ok();
  }

  uploadFile(file, fileInvalid) {
    console.log(this.upload);
    file.upload = this.upload.upload({
      url: '/api/movies/import',
      data: { file: file}
    });
    file.upload.then(response => {
      console.log(response);
      this.close();
    }, error => console.log(error), evt => console.log(evt));
    //this.http.post('/api/movies/import')
    // this.http.post('/api/movies/import', file)
    //   .then(response => console.log(response))
    //   .catch(error => console.log(error));
    console.log(file);
    console.log(fileInvalid);
  }
}

export default angular.module('proffibitTestApp.create', [uiRouter])
  .config(routes)
  .component('create', {
    template: require('./create.html'),
    controller: CreateComponent,
    controllerAs: 'vm',
    bindings: {
      close: '&',
      dismiss: '&',
    }
  })
  .name;
