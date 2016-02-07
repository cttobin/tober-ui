
/** @ngInject */
export function selectItems (): ng.IDirective {

  return {
    restrict: 'E',
    scope: {},
    controller: SelectItemsController,
    controllerAs: 'selectItems',
    bindToController: true
  };

}

/** @ngInject */
export class SelectItemsController {

  constructor () {

  }

}
