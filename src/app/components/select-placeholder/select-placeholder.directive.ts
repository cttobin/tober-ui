import lodash = require('lodash');

/** @ngInject */
export function select (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    template: '<ng-transclude></ng-transclude>',
    controller: SelectPlaceholderController,
    controllerAs: 'selectPlaceholder',
    bindToController: true
  };

}

/** @ngInject */
export class SelectPlaceholderController {

  constructor () {

  }

}
