export class ToastsController {

  /* @ngInject */
  constructor (public toastr) {

  }

  public showToastSuccess () : void {
    this.toastr.success('Action was successful', 'Success!');
  }

  public showToastError () : void {
    this.toastr.error('Something went wrong', 'Error!');
  }

  public showToastInfo () : void {
    this.toastr.info('Some information', 'Information');
  }

  public showToastWarning () : void {
    this.toastr.warning('Careful now', 'Warning');
  }
}
