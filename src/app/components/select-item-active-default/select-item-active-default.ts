import { ISelectedItem } from '../select/select.directive';


/** @ngInject */
export function selectItemActiveDefault (): ng.IDirective {

  return {
    restrict: 'E',
    require: '^^tobSelect',
    scope: {},
    template: '<div ng-bind-html="selectItemActive.content"></div>',
    controller: SelectItemActiveController,
    controllerAs: 'selectItemActive',
    bindToController: true
  };

}

/** @ngInject */
export class SelectItemActiveController {

  public content: string;

  constructor ($element: ng.IAugmentedJQuery, $sce: ng.ISCEService, $scope: ng.IScope) {

    const vm = this;
    vm.content = $sce.trustAsHtml('<div>&nbsp</div>');

    const selectController = $element.controller('tobSelect');
    $scope.$watch(function () {
      return selectController.selected;
    }, function (item) {
      vm.content = $sce.trustAsHtml(item.content);
    });
  }

}
