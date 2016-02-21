import { Popup } from '../modal/modal.service';

const DIALOG_TEMPLATE = `
  <div class="tob-heading">
    <h3>{{ title }}</h3>
  </div>
  <div class="tob-content">
    <p>{{ content }}</p>
  </div>
  <div class="tob-footer">
    <div ng-repeat="button in buttons track by $index"
      class="tob-button {{ button.type }}" ng-click="button.handler()"
      ng-bind-html=":: button.text">
    </div>
  </div>

`;

export class Dialog {

  private tobPopup: Popup;

  /** @ngInject **/
  constructor (tobPopup: Popup, private $rootScope: ng.IRootScopeService) {
    this.tobPopup = tobPopup;
  }

  public createCustom (title: string, content: string, buttons: IDialogButton[]) {
    let scope = this.$rootScope.$new();
    return new CustomDialog(this.tobPopup, scope, title, content, buttons);
  }

  public createAlert (title: string, content: string) {
    let scope = this.$rootScope.$new();
    return new AlertDialog(this.tobPopup, scope, title, content);
  }

  public createConfirm (title: string, content: string) {
    let scope = this.$rootScope.$new();
    return new ConfirmDialog(this.tobPopup, scope, title, content);
  }

}

export class CustomDialog {

  private close: () => void;
  private open: boolean;

  constructor (popup: Popup, scope: ng.IRootScopeService, title: string, content: string, buttons: IDialogButton[]) {

    this.open = true;

    // Every button should close the dialog.
    angular.forEach(buttons, (button: IDialogButton) => {

      if (button.hasOwnProperty('handler')) {

        // The button already has a handler function, so extend it to make sure the dialog closes when the button is
        // clicked. The user may explicitly close the dialog in their own handler.
        var handler = button.handler;
        button.handler = () => {
          handler();
          if (!this.open) {
            this.close();
          }
        };

      } else {

        // No custom handler has been set so just close the dialog when any button is clicked.
        button.handler = this.close;

      }

    });

    scope = angular.extend(scope, {
      buttons: buttons,
      title: title,
      content: content
    });

    popup.create('tob-dialog', {
      template: DIALOG_TEMPLATE,
      scope: scope
    }).then((close: () => void) => this.close = close);

  }

}

export class AlertDialog extends CustomDialog {

  constructor (popup: Popup, scope: ng.IScope, title: string, content: string) {

    // An alert button will have a single "OK" button.
    const buttons = [{text: 'OK'}];
    super(popup, scope, title, content, buttons);

  }

}


export class ConfirmDialog extends CustomDialog {

  constructor (popup: Popup, scope: ng.IScope, title: string, content: string) {

    const buttons = [
      {text: '<i class="fa fa-times"></i> No', type: 'tob-dark'},
      {text: '<i class="fa fa-check"></i> Yes', type: 'tob-positive'}
    ];
    super(popup, scope, title, content, buttons);

  }

}

export interface IDialogButton {
  text?: string;
  content?: string;
  handler?: () => void;
}
