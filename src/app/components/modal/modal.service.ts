export class Modal {

  private body: ng.IAugmentedJQuery;

  /** @ngInject */
  constructor (
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

  public load (options: IModalOptions): ng.IPromise {

    const templateDefined = angular.isDefined(options.template);
    const templateUrlDefined = angular.isDefined(options.templateUrl);

    if (templateDefined && templateUrlDefined) {
      throw Error('Do not declare both "template" and "templateUrl".')
    }

    if (!templateDefined && !templateUrlDefined) {
      throw Error('No "template" or "templateUrl" provided for modal.')
    }

    let templateRequests = [this.$templateRequest('app/components/modal/modal.html', true)];
    if (templateUrlDefined) {
      templateRequests.push(this.$templateRequest(options.templateUrl, true));
    } else {
      templateRequests.push(this.$q.when(options.template));
    }

    return this.$q.all(templateRequests).then((templates: string[]) => {

      const content = angular.element(this.$interpolate(templates[0])({content: templates[1]}));

      // Compile the modal with the scope or a new scope if none was provided.
      const createScope = angular.isUndefined(options.scope);
      const scope = createScope ? this.$rootScope.$new() : options.scope;
      const compiled = this.$compile(content)(scope);

      // Add the modal to the page body.
      this.body.append(compiled);

      // The modal should be the last element on the body.
      const children = this.body.children();
      const element = children[children.length - 1];
      return new OpenModal(element, scope, createScope);

    });

  }

}


export class OpenModal {
  constructor (private element: HTMLElement, private scope: ng.IScope, private createScope: boolean) {}
  public close () : void {
    this.element.remove();

    if (this.createScope) {
      this.scope.$destroy();
    }

  }
}


interface IModalOptions {
  template?: string;
  templateUrl?: string;
  scope?: ng.IScope;
}
