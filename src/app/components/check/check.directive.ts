import lodash = require('lodash');

/** @ngInject */
export function check (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: true,
    scope: {value: '='},
    templateUrl: 'app/components/check/check.html',
    controller: CheckController,
    controllerAs: 'check',
    bindToController: true
  };

}

/** @ngInject */
export class CheckController {

  public value: boolean;

  constructor () {

  }

}
