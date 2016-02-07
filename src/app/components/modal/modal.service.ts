export class modal {

  /** @ngInject */
  constructor (public $interpolate: ng.IInterpolateService,
               public $templateCache: ng.ITemplateCacheService,
               public $templateRequest: ng.ITemplateRequestService,
               public $q: ng.IQService,
               public ModalService) {

  }


  /**
   * Load a template given a URL.
   * @param   {string} url  Path to HTML file.
   * @returns {promise}
   */
  loadTemplate (url: string): ng.IPromise {

    var blankTemplate = this.$templateCache.get(url);
    if (angular.isDefined(blankTemplate)) {
      return this.$q.when(blankTemplate);
    }

    return this.$templateRequest(url, true)
      .then(template => {
        return template;
      }, function () {
        return null;
      });

  }


  show (options: IModalOptions) {

    var loadUserTemplate;
    if (angular.isDefined(options.templateUrl)) {
      loadUserTemplate = this.loadTemplate(options.templateUrl);
    } else if (angular.isDefined(options.template)) {
      loadUserTemplate = this.$q.when(options.template);
    } else {
      loadUserTemplate = this.$q.when(null);
    }

    var loadBlankTemplate = this.loadTemplate('app/components/modal/modal.html');

    this.$q.all([loadUserTemplate, loadBlankTemplate]).then(templates => {
      this.ModalService.showModal({
        template: this.$interpolate(templates[1])({content: templates[0]}),
        controller: options.controller || function () {}
      });
    });

  }
}

interface IModalOptions {
  controller?: () => void;
  template?: string;
  templateUrl?: string;
}
