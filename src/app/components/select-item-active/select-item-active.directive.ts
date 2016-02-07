import { ISelectedItem } from '../select/select.directive';


/** @ngInject */
export function selectItemActive (): ng.IDirective {

  return {
    restrict: 'E',
    require: '^^tobSelect',
    transclude: true,
    scope: {},
    controller: SelectItemActiveController,
    controllerAs: 'selectItemActive',
    bindToController: true
  };

}

/** @ngInject */
export class SelectItemActiveController {

  public content: string;
  public item: any[];

  constructor ($element: ng.IAugmentedJQuery, $scope: ISelectItemActiveScope, $transclude: ng.ITranscludeFunction) {

    // Bind tranclusion content to this scope.
    $transclude($scope, function(clone) {
      $element.append(clone);
    });

    // Update the selected value display when a change is detected.
    const selectController = $element.controller('tobSelect');
    $scope.$watch(function () {
      return selectController.selected;
    }, function (item) {
      $scope.item = item.item;
    });

  }

}

interface ISelectItemActiveScope extends ng.IScope {
  item: any;
}
