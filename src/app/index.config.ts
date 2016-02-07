/** @ngInject */
export function config($logProvider: ng.ILogProvider, $stateProvider: ng.ui.IStateProvider) {
  $logProvider.debugEnabled(true);

  $stateProvider
    .state('main', {
      url: '/main',
      templateUrl: 'app/main/main.html',
      controller: 'MainController',
      controllerAs: 'main'
    })
    .state('toasts', {
      url: '/toasts',
      templateUrl: 'app/toasts/toasts.html',
      controller: 'ToastsController',
      controllerAs: 'toasts'
    })
    .state('forms', {
      url: '/forms',
      templateUrl: 'app/forms/forms.html',
      controller: 'FormsController',
      controllerAs: 'forms'
    })
    .state('buttons', {
      url: '/buttons',
      templateUrl: 'app/buttons/buttons.html',
      controller: 'ButtonsController',
      controllerAs: 'buttons'
    })
    .state('slidePanels', {
      url: '/slide-panels',
      templateUrl: 'app/slide-panels/slide-panels.html',
      controller: 'SlidePanelsController',
      controllerAs: 'slidePanels'
    })
    .state('modals', {
      url: '/modals',
      templateUrl: 'app/modals/modals.html',
      controller: 'ModalsController',
      controllerAs: 'modals'
    })
    .state('tables', {
      url: '/tables',
      templateUrl: 'app/tables/tables.html'
    })
    .state('tabs', {
      url: '/tabs',
      templateUrl: 'app/tabs/tabs.html'
    })
  ;

}
