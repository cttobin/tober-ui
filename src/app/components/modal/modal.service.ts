
export class Modal {

  private tobPopup: Popup;

  /** @ngInject **/
  constructor (tobPopup: Popup) {
    this.tobPopup = tobPopup;
  }

  public create (options: IModalOptions) {
    this.tobPopup.create('tob-modal', options);
  }

}


const POPUP_TEMPLATE = `
<div class="tob-popup-container {{ :: type }}">
  <div class="tob-popup-mask">&nbsp;</div>
  <div class="tob-popup-content">
    {{ content }}
  </div>
</div>
`;

export class Popup {

  private body: ng.IAugmentedJQuery;

  /** @ngInject */
  constructor (
    private $animate: angular.animate.IAnimateService,
    private $compile: ng.ICompileService,
    private $interpolate: ng.IInterpolateService,
    private $templateRequest: ng.ITemplateRequestService,
    private $q: ng.IQService,
    private $document: ng.IDocumentService,
    private $rootScope: ng.IRootScopeService
  ) {

    // The modal will be append to the page body.
    this.body = $document.find('body');

  }

  public create (type: string, options: IModalOptions): ng.IPromise<() => void> {

    const templateDefined = angular.isDefined(options.template);
    const templateUrlDefined = angular.isDefined(options.templateUrl);

    if (templateDefined && templateUrlDefined) {
      throw Error('Do not declare both "template" and "templateUrl".');
    }

    if (!templateDefined && !templateUrlDefined) {
      throw Error('No "template" or "templateUrl" provided for modal.');
    }

    let templateRequest;
    if (templateUrlDefined) {
      templateRequest = this.$templateRequest(options.templateUrl, true);
    } else {
      templateRequest = this.$q.when(options.template);
    }

    return templateRequest.then((template: string) => {

      const content = angular.element(this.$interpolate(POPUP_TEMPLATE)({
        content: template,
        type: type
      }));

      // Compile the modal with the scope or a new scope if none was provided.
      const createScope = angular.isUndefined(options.scope);
      const scope = createScope ? this.$rootScope.$new() : options.scope;
      const compiled = this.$compile(content)(scope);

      // The modal should be the last element on the body.
      const children = this.body.children();
      if (children.length) {
        this.$animate.enter(compiled, this.body, angular.element(children[children.length - 1]));
      } else {
        this.$animate.enter(compiled, this.body);
      }

      let element = angular.element(children[children.length - 1]);
      return () => {
        this.$animate.leave(compiled);
        element = null;
        if (createScope) {
          scope.$destroy();
        }
      };

    });

  }

}

interface IModalOptions {
  template?: string;
  templateUrl?: string;
  scope?: ng.IScope;
}
