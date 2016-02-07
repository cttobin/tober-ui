import lodash = require('lodash');

/** @ngInject */
export function selectItem (): ng.IDirective {

  return {
    restrict: 'E',
    require: '^^tobSelect',
    scope: {value: '=', item: '='},
    controller: SelectItemController,
    controllerAs: 'selectItem',
    bindToController: true
  };

}

/** @ngInject */
export class SelectItemController {

  // The model value of the item.
  public value: any;
  public item: any;

  constructor ($element) {

    const selectController = $element.controller('tobSelect');
    const value = this.value;
    const item = this.item;

    if (angular.isUndefined(selectController)) {
      throw Error('Select item elements must be wrapped with the select directive.');
    }

    $element.bind('click', function () {
      selectController.selectItem(item, value, $element.html());
    });

  }

}
