
export class ModalsController {

  private data: string;
  private close: () => void;

  /** @ngInject **/
  constructor (
    private tobModal,
    private tobDialog,
    private $interval: ng.IIntervalService,
    private $scope: ng.IScope) {

    this.data = 'First';
    $interval(() => {
      this.data = this.data === 'First' ?  'Second' : 'First';
    }, 1000);
  }

  public showBasic () : void {

    this.tobModal.create({
      scope: this.$scope,
      template: `<div>Basic modal with just text and a close button.</div>
      <div class="tob-button" ng-click="modals.closeModal()">
        <i class="fa fa-times"></i>
        Close modal
      </div>
    `}).then((x: () => void) => this.close = x);

  }

  public showAdvanced () : void {
    this.tobModal.create({
      scope: this.$scope,
      templateUrl: 'app/modals/example.html'
    });
  }

  public closeModal () : void {
    this.close();
  }

  public showAlertDialog () {
    this.tobDialog.createAlert('Server Error', 'Something went wrong with whatever you were trying to do. Please try again later.')
  }

  public showConfirmDialog () {
    this.tobDialog.createConfirm('Delete account?', 'If you delete your account you will not be able to retrieve any of your information!')
  }

}
