'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('movies', {
      url: '/movies',
      template: '<movies></movies>'
    });
}
