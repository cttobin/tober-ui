import { OpenModal } from '../components/modal/modal.service';

export class ModalsController {

  private data: string;
  private modal: OpenModal;

  /** @ngInject **/
  constructor (private tobModal,
               private $interval: ng.IIntervalService,
               private $scope: ng.IScope) {
    this.data = 'First';
    $interval(() => {
      this.data = this.data === 'First' ?  'Second' : 'First';
    }, 1000);
  }

  public showBasic () : void {
    this.tobModal.load({
      scope: this.$scope,
      template: `<div>Basic modal with just text and a close button.</div>
      <div class="tob-button" ng-click="modals.closeModal()">
        <i class="fa fa-times"></i>
        Close modal
      </div>
    `}).then((x: OpenModal) => this.modal = x);
  }

  public showAdvanced () : void {
    this.tobModal.load({
      scope: this.$scope,
      templateUrl: 'app/modals/example.html',
    }).then((x: OpenModal) => this.modal = x);
  }

  public closeModal () : void {
    this.modal.close();
  }

}
