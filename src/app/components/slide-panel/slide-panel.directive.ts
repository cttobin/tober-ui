/** @ngInject */
export function slidePanel (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: true,
    scope: {show: '='},
    templateUrl: 'app/components/slide-panel/slide-panel.html',
    controller: SlidePanelController,
    controllerAs: 'slidePanel',
    bindToController: true
  };

}

/** @ngInject */
export class SlidePanelController {

  constructor ($element: ng.IAugmentedJQuery, $scope: ng.IScope) {

    $scope.$watch('slidePanel.show', function (show: boolean) {
      if (show === true) {
        $element.addClass('tob-slide-panel-open');
      } else {
        $element.removeClass('tob-slide-panel-open');
      }
    });

  }

}
