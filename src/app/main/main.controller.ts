export class MainController {

  public components: IComponent[];

  /* @ngInject */
  constructor () {

    this.components = [
      {name: 'Buttons', type: 'CSS'},
      {name: 'Forms', type: 'CSS'},
      {name: 'Modals', type: 'Service'},
      {name: 'Slide Panels', type: 'Directive'}
    ];

  }

}


interface IComponent {
  name: string;
  type: string;
}
