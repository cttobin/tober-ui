import { ITabScope } from '../tab/tab.directive';

/** @ngInject */
export function tabs (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    templateUrl: 'app/components/tabs/tabs.html',
    controller: TabsController,
    controllerAs: 'tabs',
    bindToController: true
  };

}

/** @ngInject */
export class TabsController {

  public tabs: ng.IScope[];

  constructor (public $sce: ng.ISCEService) {
    this.tabs = [];
  }


  /**
   * Register a child tab element
   * @param tabScope
   */
  public registerTab (tabScope: ITabScope): void {
    if (!this.tabs.length) {
      tabScope.active = true;
    }
    this.tabs.push(tabScope);
  }


  /**
   * Handle user selecting tab.
   * @param tabScope
   */
  public selectTab (tabScope: ITabScope): void {

    // Don't bother doing anything if this tab has been selected already.
    if (tabScope.active === true) {
      return;
    }

    // Deactivate other tabs.
    angular.forEach(this.tabs, function (tab: ITabScope) {
      tab.active = false;
    });

    // Show the selected tab.
    tabScope.active = true;
  }


  /**
   * Render tab label HTML.
   * @param content
   * @returns {string}
   */
  public renderTabLabel (content: string): string {
    return this.$sce.trustAsHtml(content);
  }

}
