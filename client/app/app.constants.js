'use strict';

import angular from 'angular';

export default angular.module('proffibitTestApp.constants', [])
  .constant('appConfig', require('../../server/config/environment/shared'))
  .name;
