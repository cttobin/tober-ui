
/** @ngInject */
export function select (): ng.IDirective {

  return {
    restrict: 'E',
    transclude: {
      'items': 'tobSelectItems',
      'active': '?tobSelectItemActive',
      'placeholder': '?tobSelectPlaceholder'
    },
    scope: {},
    templateUrl: 'app/components/select/select.html',
    controller: SelectController,
    controllerAs: 'select',
    bindToController: true
  };

}

/** @ngInject */
export class SelectController {

  public items: any[];
  public listIsOpen: boolean;
  public selected: ISelectedItem;
  public test: string;

  constructor (private $scope: ng.IScope) {

    // Check for duplicate item values.
    this.listIsOpen = false;
    this.selected = null;
    this.test = 'Yo';

  }

  toggleList (): void {
    this.listIsOpen = !this.listIsOpen;
  }

  selectItem (item: any, value: any, content: string): void {

    // An item has been selected, so close the drop-down.
    this.listIsOpen = false;

    // Record the selected item.
    this.selected = {
      item: item,
      content: content,
      value: value
    };

    this.$scope.$apply();
  }

}

export interface ISelectedItem {
  item: any;
  content: string;
  value: any;
}
