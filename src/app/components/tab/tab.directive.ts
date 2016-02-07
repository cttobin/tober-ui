import { TabsController } from '../tabs/tabs.directive';


/** @ngInject */
export function tab (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: {},
    scope: {label: '@'},
    template: '<div ng-if="active" ng-transclude></div>',
    require: '^tobTabs',
    controller: TabController,
    controllerAs: 'tab',
    link: function (scope: ITabScope, element: ng.IAugmentedJQuery, attributes: ng.IAttributes, tabController: TabsController) {
      scope.active = false;
      tabController.registerTab(scope);
    }
  };

}

/** @ngInject */
export class TabController {

}


export interface ITabScope extends ng.IScope {
  active: boolean;
  label: string;
}
