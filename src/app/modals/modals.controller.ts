export class ModalsController {

  /** @ngInject **/
  constructor (public tobModal) {

  }

  public show () {
    this.tobModal.show({
      templateUrl: 'app/main/example-modal.html',
      controller: function () {

      }
    });
  }

}
